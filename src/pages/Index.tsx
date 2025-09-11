import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import EmotionCard from '@/components/EmotionCard';
import CartModal from '@/components/CartModal';
import AdminLoginModal from '@/components/AdminLoginModal';
import AdminPanel from '@/components/AdminPanel';
import { emotions, CartItem } from '@/types/emotion';

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [inventory, setInventory] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('emotion-shop-inventory');
    return saved 
      ? JSON.parse(saved)
      : emotions.reduce((acc, emotion) => ({ ...acc, [emotion.id]: 20 }), {});
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const addToCart = (emotionId: string) => {
    const availableStock = inventory[emotionId] || 0;
    const currentQuantity = getEmotionQuantity(emotionId);
    
    if (currentQuantity >= availableStock) {
      return; // Не можем добавить больше, чем есть в наличии
    }
    
    setCart(prev => {
      const existing = prev.find(item => item.emotionId === emotionId);
      if (existing) {
        return prev.map(item =>
          item.emotionId === emotionId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { emotionId, quantity: 1 }];
      }
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

  const getEmotionQuantity = (emotionId: string) => {
    return cart.find(item => item.emotionId === emotionId)?.quantity || 0;
  };

  const getAvailableStock = (emotionId: string) => {
    const totalStock = inventory[emotionId] || 0;
    const usedQuantity = getEmotionQuantity(emotionId);
    return Math.max(0, totalStock - usedQuantity);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAdminLogin = () => {
    const ADMIN_EMAIL = 's4777752@ya.ru';
    const ADMIN_PASSWORD = '89024777752s';
    
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setIsAdminModalOpen(false);
      setLoginForm({ email: '', password: '' });
    } else {
      alert('Неверные данные для входа!');
    }
  };

  const updateInventory = (emotionId: string, newQuantity: number) => {
    const clampedQuantity = Math.max(0, Math.min(20, newQuantity));
    const currentInCart = getEmotionQuantity(emotionId);
    
    // Если админ устанавливает количество меньше чем в корзине, корректируем корзину
    if (clampedQuantity < currentInCart) {
      setCart(prev => 
        prev.map(item =>
          item.emotionId === emotionId
            ? { ...item, quantity: clampedQuantity }
            : item
        ).filter(item => item.quantity > 0)
      );
    }
    
    setInventory(prev => ({
      ...prev,
      [emotionId]: clampedQuantity
    }));
    setHasUnsavedChanges(true);
  };

  const saveInventory = () => {
    localStorage.setItem('emotion-shop-inventory', JSON.stringify(inventory));
    setHasUnsavedChanges(false);
  };

  const handleLoginFormChange = (field: 'email' | 'password', value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
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
          <p className="text-lg max-w-2xl mx-auto text-[#000000] mb-8">Выберите нужные эмоции и добавьте их в свою жизнь. Каждое деление 1товар стоит 1000р , после покупки товар действует сразу !</p>
          
          {/* Psychological Effect Description */}
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex items-center justify-center mb-6">
              <Icon name="Brain" size={32} className="text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Психология Эмоциональных Покупок</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Icon name="Sparkles" size={20} className="text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Эффект Плацебо</h4>
                    <p className="text-gray-600 text-sm">Сам акт "покупки" эмоции активирует психологические механизмы самовнушения и создаёт ожидание позитивных изменений.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Icon name="Target" size={20} className="text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Фокусировка Внимания</h4>
                    <p className="text-gray-600 text-sm">Выбор конкретной эмоции направляет ваше внимание на соответствующие аспекты жизни, делая их более заметными.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Icon name="RefreshCw" size={20} className="text-orange-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Нейропластичность</h4>
                    <p className="text-gray-600 text-sm">Осознанная работа с эмоциями помогает формировать новые нейронные связи и эмоциональные паттерны.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Icon name="Zap" size={20} className="text-yellow-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Ритуал Трансформации</h4>
                    <p className="text-gray-600 text-sm">Процесс выбора и "покупки" создаёт символический ритуал изменения, который психологически закрепляет намерение.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Icon name="Heart" size={20} className="text-red-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Эмоциональная Валидация</h4>
                    <p className="text-gray-600 text-sm">Признание и "покупка" эмоции помогает принять и легализовать свои чувства, что само по себе терапевтично.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Icon name="Lightbulb" size={20} className="text-purple-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Осознанность</h4>
                    <p className="text-gray-600 text-sm">Процесс выбора эмоции повышает эмоциональную осознанность и помогает лучше понимать свои потребности.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 text-sm font-medium">
                💡 <strong>Научный факт:</strong> Исследования показывают, что символические действия и ритуалы действительно влияют на наше эмоциональное состояние через активацию психосоматических механизмов.
              </p>
            </div>
          </div>
        </div>

        {/* Emotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {emotions.map((emotion) => (
            <EmotionCard
              key={emotion.id}
              emotion={emotion}
              quantity={getEmotionQuantity(emotion.id)}
              availableStock={getAvailableStock(emotion.id)}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
            />
          ))}
        </div>

        {/* Admin Button */}
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setIsAdminModalOpen(true)}
              variant="secondary"
              size="sm"
              className="bg-gray-800 text-white hover:bg-gray-700 shadow-lg"
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Администратор
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CartModal 
        isOpen={isCartOpen} 
        cart={cart} 
        onClose={() => setIsCartOpen(false)} 
      />

      <AdminLoginModal
        isOpen={isAdminModalOpen && !isAdminAuthenticated}
        loginForm={loginForm}
        onClose={() => setIsAdminModalOpen(false)}
        onLogin={handleAdminLogin}
        onFormChange={handleLoginFormChange}
      />

      <AdminPanel
        isOpen={isAdminAuthenticated}
        inventory={inventory}
        hasUnsavedChanges={hasUnsavedChanges}
        onClose={() => setIsAdminAuthenticated(false)}
        onUpdateInventory={updateInventory}
        onSave={saveInventory}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link 
              to="/terms" 
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Icon name="FileText" size={16} className="mr-2" />
              Правила использования
            </Link>
            <div className="flex items-center text-gray-300">
              <Icon name="Shield" size={16} className="mr-2" />
              Безопасное пространство для души
            </div>
            <div className="flex items-center text-gray-300">
              <Icon name="Heart" size={16} className="mr-2" />
              Магазин Эмоций © 2024
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            Данный сервис носит развлекательный характер и не заменяет профессиональную помощь
          </div>
        </div>
      </footer>
    </div>
  );
}