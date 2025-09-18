import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { CartItem, emotions, PRICE_PER_UNIT } from '@/types/emotion';
import { useState } from 'react';

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
}

export default function CartModal({ isOpen, cart, onClose }: CartModalProps) {
  const [showQR, setShowQR] = useState(false);
  
  if (!isOpen) return null;

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.quantity * PRICE_PER_UNIT), 0);
  };

  const handleOrderClick = () => {
    setShowQR(true);
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
                
                {!showQR ? (
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleOrderClick}
                  >
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оформить заказ
                  </Button>
                ) : (
                  <div className="mt-6 text-center space-y-4">
                    <h3 className="text-lg font-semibold">Оплата через QR-код</h3>
                    <div className="flex justify-center">
                      <img 
                        src="data:image/png;base64,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" 
                        alt="QR код для оплаты"
                        className="w-48 h-48 border rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Отсканируйте QR-код для оплаты заказа на сумму {getTotalPrice().toLocaleString()} ₽
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowQR(false)}
                      className="mt-4"
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Назад
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}