import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { CartItem, emotions, PRICE_PER_UNIT } from '@/types/emotion';

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
}

export default function CartModal({ isOpen, cart, onClose }: CartModalProps) {
  if (!isOpen) return null;

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.quantity * PRICE_PER_UNIT), 0);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border-0 relative">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={24} />
                Корзина покупок
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                <Icon name="X" size={20} />
              </Button>
            </CardTitle>
            <CardDescription>
              Ваши выбранные эмоции
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Корзина пуста</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => {
                  const emotion = emotions.find(e => e.id === item.emotionId)!;
                  return (
                    <div key={item.emotionId} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{emotion.emoji}</span>
                        <div>
                          <h4 className="font-medium">{emotion.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × {PRICE_PER_UNIT} ₽
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.quantity * PRICE_PER_UNIT} ₽</p>
                      </div>
                    </div>
                  );
                })}
                
                <Separator />
                
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{getTotalPrice().toLocaleString()} ₽</span>
                </div>
                
                <Button className="w-full mt-6" size="lg">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}