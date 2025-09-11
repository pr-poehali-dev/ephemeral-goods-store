import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface PsychologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PsychologyModal({ isOpen, onClose }: PsychologyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Icon name="Brain" size={32} className="text-purple-600 mr-3" />
            Психология Эмоциональных Покупок
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Наш магазин эмоций основан на научно обоснованных психологических принципах. 
            Вот как "покупка" эмоций действительно может влиять на ваше состояние:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Icon name="Sparkles" size={20} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Эффект Плацебо</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Сам акт "покупки" эмоции активирует психологические механизмы самовнушения 
                    и создаёт ожидание позитивных изменений. Мозг начинает искать подтверждения 
                    этих ожиданий в реальности.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Icon name="Target" size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Фокусировка Внимания</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Выбор конкретной эмоции направляет ваше внимание на соответствующие аспекты жизни, 
                    делая их более заметными. Это называется "эффектом выборочного внимания".
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Icon name="RefreshCw" size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Нейропластичность</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Осознанная работа с эмоциями помогает формировать новые нейронные связи 
                    и эмоциональные паттерны. Мозг буквально перестраивается под новые привычки.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Icon name="Zap" size={20} className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Ритуал Трансформации</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Процесс выбора и "покупки" создаёт символический ритуал изменения, 
                    который психологически закрепляет намерение. Ритуалы имеют мощное 
                    воздействие на подсознание.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Icon name="Heart" size={20} className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Эмоциональная Валидация</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Признание и "покупка" эмоции помогает принять и легализовать свои чувства, 
                    что само по себе терапевтично. Принятие эмоций — первый шаг к их регуляции.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Icon name="Lightbulb" size={20} className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Осознанность</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Процесс выбора эмоции повышает эмоциональную осознанность и помогает 
                    лучше понимать свои потребности. Это развивает эмоциональный интеллект.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Icon name="BookOpen" size={16} className="mr-2" />
                Научные исследования
              </h4>
              <p className="text-blue-700 text-sm">
                Исследования показывают, что символические действия и ритуалы действительно 
                влияют на наше эмоциональное состояние через активацию психосоматических механизмов.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <Icon name="Shield" size={16} className="mr-2" />
                Безопасность
              </h4>
              <p className="text-green-700 text-sm">
                Наш подход полностью безопасен и основан на позитивной психологии. 
                Мы не заменяем профессиональную помощь, а дополняем её.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Как максимизировать эффект?
            </h4>
            <ul className="text-purple-700 text-sm space-y-1 ml-4">
              <li>• Выбирайте эмоции осознанно, думая о том, что они значат для вас</li>
              <li>• Представляйте, как эта эмоция будет проявляться в вашей жизни</li>
              <li>• Создайте небольшой ритуал после "покупки" — медитация, дыхательные упражнения</li>
              <li>• Регулярно возвращайтесь к выбранным эмоциям и отслеживайте изменения</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}