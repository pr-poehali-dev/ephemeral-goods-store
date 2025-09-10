import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Emotion {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  gradient: string;
}

interface CartItem {
  emotionId: string;
  quantity: number;
}

const emotions: Emotion[] = [
  {
    id: 'joy',
    name: 'Радость',
    emoji: '😊',
    description: 'Чистая радость и счастье',
    color: 'bg-yellow-200',
    gradient: 'from-yellow-200 to-orange-200'
  },
  {
    id: 'love',
    name: 'Любовь',
    emoji: '💝',
    description: 'Теплая, безусловная любовь',
    color: 'bg-pink-200',
    gradient: 'from-pink-200 to-red-200'
  },
  {
    id: 'peace',
    name: 'Спокойствие',
    emoji: '🕊️',
    description: 'Глубокое внутреннее спокойствие',
    color: 'bg-blue-200',
    gradient: 'from-blue-200 to-indigo-200'
  },
  {
    id: 'confidence',
    name: 'Уверенность',
    emoji: '💪',
    description: 'Сила духа и уверенность в себе',
    color: 'bg-green-200',
    gradient: 'from-green-200 to-emerald-200'
  },
  {
    id: 'inspiration',
    name: 'Вдохновение',
    emoji: '✨',
    description: 'Творческая энергия и мотивация',
    color: 'bg-purple-200',
    gradient: 'from-purple-200 to-violet-200'
  },
  {
    id: 'gratitude',
    name: 'Благодарность',
    emoji: '🙏',
    description: 'Глубокая признательность',
    color: 'bg-amber-200',
    gradient: 'from-amber-200 to-yellow-200'
  },
  {
    id: 'empathy',
    name: 'Эмпатия',
    emoji: '🤗',
    description: 'Понимание и сочувствие',
    color: 'bg-teal-200',
    gradient: 'from-teal-200 to-cyan-200'
  },
  {
    id: 'clarity',
    name: 'Ясность',
    emoji: '🔮',
    description: 'Ментальная ясность и понимание',
    color: 'bg-indigo-200',
    gradient: 'from-indigo-200 to-blue-200'
  }
];

const PRICE_PER_UNIT = 1000;

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (emotionId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.emotionId === emotionId);
      if (existing && existing.quantity < 20) {
        return prev.map(item =>
          item.emotionId === emotionId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else if (!existing) {
        return [...prev, { emotionId, quantity: 1 }];
      }
      return prev;
    });
  };

  const removeFromCart = (emotionId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.emotionId === emotionId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.emotionId === emotionId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter(item => item.emotionId !== emotionId);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.quantity * PRICE_PER_UNIT), 0);
  };

  const getEmotionQuantity = (emotionId: string) => {
    return cart.find(item => item.emotionId === emotionId)?.quantity || 0;
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-primary/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌸</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Магазин Эмоций
                </h1>
                <p className="text-sm text-muted-foreground">Эфемерные товары для души</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="relative hover:scale-105 transition-transform"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <Icon name="ShoppingCart" size={20} />
              <span className="ml-2">Корзина</span>
              {getCartItemsCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Каталог Чувств и Эмоций
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите нужные эмоции и добавьте их в свою жизнь. Каждое деление стоит 1000₽, максимум 20 делений на эмоцию.
          </p>
        </div>

        {/* Emotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {emotions.map((emotion) => (
            <Card key={emotion.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${emotion.gradient} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform`}>
                  {emotion.emoji}
                </div>
                <CardTitle className="text-xl font-semibold">{emotion.name}</CardTitle>
                <CardDescription className="text-sm">{emotion.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Количество:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(emotion.id)}
                      disabled={getEmotionQuantity(emotion.id) === 0}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="w-8 text-center font-semibold">
                      {getEmotionQuantity(emotion.id)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addToCart(emotion.id)}
                      disabled={getEmotionQuantity(emotion.id) >= 20}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {getEmotionQuantity(emotion.id) * PRICE_PER_UNIT} ₽
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Section */}
        {isCartOpen && (
          <Card className="max-w-2xl mx-auto shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={24} />
                Корзина покупок
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
        )}
      </div>
    </div>
  );
}