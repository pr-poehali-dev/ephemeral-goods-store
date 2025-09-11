import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { emotions } from '@/types/emotion';
import { useRef, useCallback } from 'react';

interface AdminPanelProps {
  isOpen: boolean;
  inventory: Record<string, number>;
  hasUnsavedChanges: boolean;
  onClose: () => void;
  onUpdateInventory: (emotionId: string, newQuantity: number) => void;
  onSave: () => void;
}

export default function AdminPanel({ 
  isOpen, 
  inventory, 
  hasUnsavedChanges,
  onClose, 
  onUpdateInventory,
  onSave
}: AdminPanelProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  if (!isOpen) return null;

  const getAvailableStock = (emotionId: string) => {
    return inventory[emotionId] || 0;
  };

  const startAutoUpdate = useCallback((emotionId: string, increment: boolean) => {
    const updateValue = () => {
      const currentStock = getAvailableStock(emotionId);
      const newValue = increment 
        ? Math.min(currentStock + 1, 20)
        : Math.max(currentStock - 1, 0);
      onUpdateInventory(emotionId, newValue);
    };
    
    updateValue(); // Первое обновление сразу
    
    intervalRef.current = setInterval(updateValue, 150);
  }, [inventory, onUpdateInventory]);

  const stopAutoUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Package" size={20} />
                Управление товарами
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
              >
                <Icon name="X" size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-4">
              {emotions.map(emotion => (
                <div key={emotion.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{emotion.emoji}</span>
                    <div>
                      <h4 className="font-medium">{emotion.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        В наличии: {getAvailableStock(emotion.id)} шт
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onMouseDown={() => startAutoUpdate(emotion.id, false)}
                      onMouseUp={stopAutoUpdate}
                      onMouseLeave={stopAutoUpdate}
                      onTouchStart={() => startAutoUpdate(emotion.id, false)}
                      onTouchEnd={stopAutoUpdate}
                      disabled={getAvailableStock(emotion.id) <= 0}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    
                    <span className="w-12 text-center font-semibold">
                      {getAvailableStock(emotion.id)}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onMouseDown={() => startAutoUpdate(emotion.id, true)}
                      onMouseUp={stopAutoUpdate}
                      onMouseLeave={stopAutoUpdate}
                      onTouchStart={() => startAutoUpdate(emotion.id, true)}
                      onTouchEnd={stopAutoUpdate}
                      disabled={getAvailableStock(emotion.id) >= 20}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button 
                onClick={onSave}
                disabled={!hasUnsavedChanges}
                className="min-w-[120px]"
              >
                <Icon name="Save" size={16} className="mr-2" />
                {hasUnsavedChanges ? 'Сохранить' : 'Сохранено'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}