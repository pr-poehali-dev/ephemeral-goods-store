import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AdminLoginModalProps {
  isOpen: boolean;
  loginForm: { email: string; password: string };
  onClose: () => void;
  onLogin: () => void;
  onFormChange: (field: 'email' | 'password', value: string) => void;
}

export default function AdminLoginModal({ 
  isOpen, 
  loginForm, 
  onClose, 
  onLogin, 
  onFormChange 
}: AdminLoginModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Lock" size={20} />
                Вход в админ-панель
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
          
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => onFormChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => onFormChange('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите пароль"
              />
            </div>
            
            <Button 
              onClick={onLogin}
              className="w-full"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}