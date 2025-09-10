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
  // Положительные эмоции
  { id: 'love', name: 'Любовь', emoji: '❤️', description: 'Глубокое чувство привязанности', color: 'bg-red-200', gradient: 'from-red-200 to-pink-200' },
  { id: 'joy', name: 'Радость', emoji: '😄', description: 'Яркое положительное чувство', color: 'bg-yellow-200', gradient: 'from-yellow-200 to-orange-200' },
  { id: 'happiness', name: 'Счастье', emoji: '😊', description: 'Состояние полного удовлетворения', color: 'bg-green-200', gradient: 'from-green-200 to-lime-200' },
  { id: 'admiration', name: 'Восхищение', emoji: '🤩', description: 'Чувство глубокого уважения', color: 'bg-purple-200', gradient: 'from-purple-200 to-violet-200' },
  { id: 'pleasure', name: 'Удовольствие', emoji: '😌', description: 'Приятное ощущение', color: 'bg-pink-200', gradient: 'from-pink-200 to-rose-200' },
  { id: 'peace', name: 'Умиротворённость', emoji: '🕊️', description: 'Глубокое внутреннее спокойствие', color: 'bg-blue-200', gradient: 'from-blue-200 to-sky-200' },
  { id: 'pride', name: 'Гордость', emoji: '😤', description: 'Чувство собственного достоинства', color: 'bg-indigo-200', gradient: 'from-indigo-200 to-blue-200' },
  { id: 'confidence', name: 'Уверенность', emoji: '💪', description: 'Вера в свои силы', color: 'bg-emerald-200', gradient: 'from-emerald-200 to-green-200' },
  { id: 'compassion', name: 'Сочувствие', emoji: '🤗', description: 'Понимание чужой боли', color: 'bg-teal-200', gradient: 'from-teal-200 to-cyan-200' },
  { id: 'empathy', name: 'Сочувствие (эмпатия)', emoji: '💜', description: 'Глубокое понимание других', color: 'bg-violet-200', gradient: 'from-violet-200 to-purple-200' },
  { id: 'sympathy', name: 'Сочувствие (симпатия)', emoji: '💙', description: 'Доброжелательное отношение', color: 'bg-cyan-200', gradient: 'from-cyan-200 to-blue-200' },
  { id: 'compassion2', name: 'Сострадание', emoji: '🤲', description: 'Желание помочь страдающему', color: 'bg-amber-200', gradient: 'from-amber-200 to-yellow-200' },
  { id: 'trust', name: 'Доверие', emoji: '🤝', description: 'Уверенность в надежности', color: 'bg-lime-200', gradient: 'from-lime-200 to-green-200' },
  { id: 'gratitude', name: 'Благодарность', emoji: '🙏', description: 'Признательность за доброту', color: 'bg-orange-200', gradient: 'from-orange-200 to-yellow-200' },
  { id: 'warmth', name: 'Теплота', emoji: '☀️', description: 'Душевное тепло', color: 'bg-red-100', gradient: 'from-red-100 to-orange-100' },
  { id: 'care', name: 'Забота', emoji: '🤱', description: 'Внимание к благополучию других', color: 'bg-green-100', gradient: 'from-green-100 to-emerald-100' },
  
  // Печальные эмоции
  { id: 'longing', name: 'Тоска', emoji: '😔', description: 'Глубокая печаль по утраченному', color: 'bg-slate-300', gradient: 'from-slate-300 to-gray-300' },
  { id: 'nostalgia', name: 'Ностальгия', emoji: '🌅', description: 'Грустная тоска по прошлому', color: 'bg-amber-300', gradient: 'from-amber-300 to-orange-300' },
  { id: 'sadness', name: 'Грусть', emoji: '😢', description: 'Чувство печали', color: 'bg-blue-300', gradient: 'from-blue-300 to-indigo-300' },
  { id: 'sorrow', name: 'Печаль', emoji: '😿', description: 'Глубокая грусть', color: 'bg-gray-300', gradient: 'from-gray-300 to-slate-300' },
  { id: 'upset', name: 'Огорчение', emoji: '😞', description: 'Расстройство от неудачи', color: 'bg-stone-300', gradient: 'from-stone-300 to-gray-300' },
  { id: 'disappointment', name: 'Разочарование', emoji: '😕', description: 'Несоответствие ожиданиям', color: 'bg-zinc-300', gradient: 'from-zinc-300 to-gray-300' },
  
  // Тревожные эмоции
  { id: 'anxiety', name: 'Тревога', emoji: '😰', description: 'Беспокойство о будущем', color: 'bg-yellow-300', gradient: 'from-yellow-300 to-amber-300' },
  { id: 'fear', name: 'Страх', emoji: '😨', description: 'Ожидание опасности', color: 'bg-purple-300', gradient: 'from-purple-300 to-violet-300' },
  { id: 'horror', name: 'Ужас', emoji: '😱', description: 'Крайняя степень страха', color: 'bg-red-400', gradient: 'from-red-400 to-pink-400' },
  { id: 'nervousness', name: 'Тревожность', emoji: '😬', description: 'Нервное беспокойство', color: 'bg-lime-300', gradient: 'from-lime-300 to-yellow-300' },
  { id: 'insecurity', name: 'Неуверенность', emoji: '😟', description: 'Сомнение в себе', color: 'bg-cyan-300', gradient: 'from-cyan-300 to-blue-300' },
  { id: 'shame', name: 'Стыд', emoji: '😳', description: 'Чувство вины за поступок', color: 'bg-pink-300', gradient: 'from-pink-300 to-red-300' },
  { id: 'guilt', name: 'Вина', emoji: '😣', description: 'Осознание неправильности', color: 'bg-rose-300', gradient: 'from-rose-300 to-pink-300' },
  { id: 'embarrassment', name: 'Смущение', emoji: '😊', description: 'Неловкость в ситуации', color: 'bg-orange-300', gradient: 'from-orange-300 to-red-300' },
  
  // Гневные эмоции
  { id: 'anger', name: 'Злость', emoji: '😠', description: 'Раздражение и негодование', color: 'bg-red-300', gradient: 'from-red-300 to-orange-300' },
  { id: 'rage', name: 'Гнев', emoji: '😡', description: 'Сильная ярость', color: 'bg-red-400', gradient: 'from-red-400 to-red-500' },
  { id: 'irritation', name: 'Раздражение', emoji: '😤', description: 'Мелкое недовольство', color: 'bg-orange-400', gradient: 'from-orange-400 to-red-400' },
  { id: 'disgust', name: 'Отвращение', emoji: '🤢', description: 'Сильное неприятие', color: 'bg-green-400', gradient: 'from-green-400 to-lime-400' },
  { id: 'contempt', name: 'Презрение', emoji: '😒', description: 'Пренебрежительное отношение', color: 'bg-slate-400', gradient: 'from-slate-400 to-gray-400' },
  { id: 'hatred', name: 'Ненависть', emoji: '😈', description: 'Крайняя степень неприязни', color: 'bg-black', gradient: 'from-gray-600 to-black' },
  { id: 'envy', name: 'Зависть', emoji: '😏', description: 'Желание чужого успеха', color: 'bg-emerald-400', gradient: 'from-emerald-400 to-green-400' },
  { id: 'jealousy', name: 'Ревность', emoji: '😾', description: 'Страх потерять любимого', color: 'bg-yellow-400', gradient: 'from-yellow-400 to-orange-400' },
  
  // Нейтральные/другие эмоции
  { id: 'security', name: 'Обеспечение (чувство защищённости)', emoji: '🛡️', description: 'Ощущение безопасности', color: 'bg-blue-100', gradient: 'from-blue-100 to-indigo-100' },
  { id: 'fatigue', name: 'Усталость', emoji: '😴', description: 'Физическое и моральное истощение', color: 'bg-gray-400', gradient: 'from-gray-400 to-slate-400' },
  { id: 'powerlessness', name: 'Бессилие', emoji: '😵', description: 'Отсутствие возможности действовать', color: 'bg-zinc-400', gradient: 'from-zinc-400 to-gray-400' },
  { id: 'apathy', name: 'Апатия', emoji: '😑', description: 'Безразличие ко всему', color: 'bg-stone-400', gradient: 'from-stone-400 to-gray-400' },
  { id: 'loneliness', name: 'Одиночество', emoji: '😞', description: 'Чувство изоляции', color: 'bg-indigo-300', gradient: 'from-indigo-300 to-purple-300' },
  { id: 'isolation', name: 'Изоляция', emoji: '🏝️', description: 'Отстранённость от других', color: 'bg-teal-300', gradient: 'from-teal-300 to-cyan-300' },
  { id: 'boredom', name: 'Скука', emoji: '😐', description: 'Отсутствие интереса', color: 'bg-neutral-300', gradient: 'from-neutral-300 to-gray-300' },
  { id: 'satisfaction', name: 'Удовлетворение', emoji: '😌', description: 'Чувство выполненного долга', color: 'bg-green-300', gradient: 'from-green-300 to-emerald-300' },
  { id: 'surprise', name: 'Удивление', emoji: '😮', description: 'Неожиданная реакция', color: 'bg-yellow-100', gradient: 'from-yellow-100 to-orange-100' },
  { id: 'shock', name: 'Шок', emoji: '😲', description: 'Сильное потрясение', color: 'bg-purple-400', gradient: 'from-purple-400 to-violet-400' }
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
              <div className="text-3xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div>
                <h1 className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-[#000000] text-4xl">
                  Магазин Эмоций
                </h1>
                <p className="text-[#000000] font-medium text-lg">Эфемерные товары для души</p>
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

      <div className="container mx-auto px-6 py-12 bg-slate-300">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-[#000000]">
            Каталог Чувств и Эмоций
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-[#000000]">
            Выберите нужные эмоции и добавьте их в свою жизнь. Каждое деление стоит 1000₽, максимум 20 делений на эмоцию.
          </p>
        </div>

        {/* Emotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {emotions.map((emotion) => (
            <Card key={emotion.id} className="group hover:shadow-md transition-all duration-200 border-2 border-gray-600 bg-gray-200">
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
                    <span className="text-sm font-semibold">{20 - getEmotionQuantity(emotion.id)}/20</span>
                  </div>
                  <div className="flex border-2 border-black rounded overflow-hidden h-4 bg-orange-400">
                    {Array.from({ length: 20 }, (_, index) => {
                      const isAvailable = index < (20 - getEmotionQuantity(emotion.id));
                      
                      return (
                        <div
                          key={index}
                          className={`flex-1 transition-all duration-200 border-r border-border last:border-r-0 ${
                            isAvailable
                              ? emotion.color.replace('bg-', 'bg-').replace('-200', '-500')
                              : 'bg-gray-200'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

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