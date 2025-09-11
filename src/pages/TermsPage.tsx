import React from 'react';
import { ArrowLeft, Heart, Shield, AlertTriangle, Users, Scale, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться в магазин
            </Link>
            <div className="text-center">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Правила использования</h1>
              <p className="text-xl text-gray-600">Магазин Эмоций — безопасное пространство для души</p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
            
            {/* Important Notice */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Важное уведомление</h3>
                  <p className="text-amber-700">
                    Данный сервис носит исключительно развлекательный и метафорический характер. 
                    Мы не предоставляем медицинские, психологические или терапевтические услуги. 
                    При серьёзных эмоциональных проблемах обращайтесь к квалифицированным специалистам.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Section */}
            <section>
              <div className="flex items-center mb-6">
                <Scale className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Правила использования</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Характер услуг</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Магазин Эмоций предлагает символические "товары" в виде эмоциональных состояний и переживаний. 
                    Это творческий проект, направленный на саморефлексию, вдохновение и позитивное мышление. 
                    Все "покупки" носят метафорический характер.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Ответственность пользователя</h3>
                  <ul className="text-gray-600 space-y-2 ml-6">
                    <li>• Использовать сервис исключительно в позитивных целях</li>
                    <li>• Понимать метафорический характер предлагаемых "товаров"</li>
                    <li>• Не рассматривать сервис как замену профессиональной помощи</li>
                    <li>• Относиться с уважением к другим пользователям</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Ограничения использования</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Запрещается использование сервиса для причинения вреда себе или другим, 
                    распространения негативного контента, а также попыток получения 
                    профессиональной психологической помощи через данную платформу.
                  </p>
                </div>
              </div>
            </section>

            {/* Psychological Guidelines */}
            <section>
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Психологические рекомендации</h2>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-blue-800">Здоровое отношение к эмоциям</h3>
                <ul className="text-blue-700 space-y-2 ml-4">
                  <li>• Все эмоции естественны и имеют право на существование</li>
                  <li>• Важно признавать и принимать свои чувства</li>
                  <li>• Эмоциональная регуляция — навык, который можно развивать</li>
                  <li>• При затруднениях не стесняйтесь обращаться к специалистам</li>
                </ul>
              </div>
            </section>

            {/* Privacy and Safety */}
            <section>
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Конфиденциальность и безопасность</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Мы уважаем вашу приватность и не собираем персональную информацию без необходимости. 
                  Любые данные, которые вы предоставляете, используются исключительно для улучшения 
                  пользовательского опыта и не передаются третьим лицам.
                </p>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>Помните:</strong> Если вы переживаете серьёзный эмоциональный кризис, 
                    немедленно обратитесь к врачу, психологу или на телефон доверия.
                  </p>
                </div>
              </div>
            </section>

            {/* Emergency Contacts */}
            <section>
              <div className="flex items-center mb-6">
                <Phone className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Экстренные контакты</h2>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Телефон доверия</h4>
                    <p className="text-red-700">8-800-2000-122 (бесплатно, круглосуточно)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Психологическая помощь</h4>
                    <p className="text-red-700">051 (с мобильного), 8-495-051 (с городского)</p>
                  </div>
                </div>
                <p className="text-red-600 mt-4 text-sm">
                  При угрозе жизни немедленно вызывайте скорую помощь: 103 или 112
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t pt-6 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
              </p>
              <p className="text-gray-600">
                Магазин Эмоций создан с заботой о вашем эмоциональном благополучии ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}