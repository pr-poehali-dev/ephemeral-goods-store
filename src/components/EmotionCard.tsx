import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Emotion, PRICE_PER_UNIT } from '@/types/emotion';

interface EmotionCardProps {
  emotion: Emotion;
  quantity: number;
  availableStock: number;
  onAddToCart: (emotionId: string) => void;
  onRemoveFromCart: (emotionId: string) => void;
}

export default function EmotionCard({ 
  emotion, 
  quantity, 
  availableStock, 
  onAddToCart, 
  onRemoveFromCart 
}: EmotionCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-2 border-gray-600 bg-gray-200">
      <CardHeader className="text-center pb-4">
        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${emotion.gradient} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform border-2 border-black`}>
          {emotion.emoji}
        </div>
        <CardTitle className="text-xl font-semibold">{emotion.name}</CardTitle>
        <CardDescription className="text-sm">{emotion.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Индикатор количества (полоски) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Доступно:</span>
            <span className="text-sm font-semibold">{availableStock}/20</span>
          </div>
          <div className="flex border-4 border-black rounded overflow-hidden h-8 bg-gray-900 shadow-lg">
            {Array.from({ length: 20 }, (_, index) => {
              const isAvailable = index < availableStock;
              
              return (
                <div
                  key={index}
                  className={`flex-1 transition-all duration-200 border-r border-border last:border-r-0 ${
                    isAvailable
                      ? emotion.color.replace('-200', '-400') + ' shadow-sm'
                      : 'bg-white'
                  }`}
                />
              );
            })}
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs text-gray-600">
              Остаток: <span className="font-semibold text-black">{availableStock} шт</span>
            </div>
            <div className="text-xs text-gray-600">
              {availableStock === 0 ? (
                <span className="text-red-600 font-bold">Товар не доступен</span>
              ) : availableStock <= 10 ? (
                <span className="text-red-600 font-medium">Товар заканчивается</span>
              ) : (
                <span className="text-green-600 font-medium">В наличии</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Количество:</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemoveFromCart(emotion.id)}
              disabled={quantity === 0}
              className="h-8 w-8 p-0"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="w-8 text-center font-semibold">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddToCart(emotion.id)}
              disabled={quantity >= availableStock}
              className="h-8 w-8 p-0"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {quantity * PRICE_PER_UNIT} ₽
          </p>
        </div>
      </CardContent>
    </Card>
  );
}