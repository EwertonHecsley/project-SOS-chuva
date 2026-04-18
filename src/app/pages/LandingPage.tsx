import { Link } from 'react-router';
import { Heart, Users, Search, AlertTriangle, Phone, MapPin } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Sistema de Apoio a Emergências em Enchentes
            </h1>
            <p className="text-xl mb-8">
              Conectando pessoas que precisam de ajuda com voluntários dispostos a ajudar
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/register?type=volunteer"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Quero Ser Voluntário
              </Link>
              <Link
                to="/register?type=need-help"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border-2 border-white"
              >
                Preciso de Ajuda
              </Link>
            </div>
            <div className="mt-6">
              <Link to="/login" className="text-white hover:underline">
                Já tenho cadastro - Fazer login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma organiza informações e conecta pessoas de forma rápida e eficiente
            durante situações de emergência
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Para Voluntários</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Visualize necessidades por urgência</li>
              <li>• Ofereça sua ajuda diretamente</li>
              <li>• Acompanhe suas ações de ajuda</li>
              <li>• Conecte-se com quem precisa</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Para Quem Precisa</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Cadastre suas necessidades</li>
              <li>• Classifique por nível de urgência</li>
              <li>• Veja voluntários disponíveis</li>
              <li>• Solicite ajuda diretamente</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Desaparecidos</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Cadastre pessoas desaparecidas</li>
              <li>• Busque por crianças e idosos</li>
              <li>• Registre animais perdidos</li>
              <li>• Ajude famílias a se reencontrarem</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Principais Categorias de Ajuda
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Alimentos', color: 'bg-red-100 text-red-700' },
              { name: 'Medicamentos', color: 'bg-purple-100 text-purple-700' },
              { name: 'Abrigo', color: 'bg-blue-100 text-blue-700' },
              { name: 'Resgate', color: 'bg-orange-100 text-orange-700' },
              { name: 'Roupas', color: 'bg-green-100 text-green-700' },
              { name: 'Água Potável', color: 'bg-cyan-100 text-cyan-700' },
              { name: 'Transporte', color: 'bg-indigo-100 text-indigo-700' },
              { name: 'Produtos de Higiene', color: 'bg-pink-100 text-pink-700' }
            ].map((category) => (
              <div
                key={category.name}
                className={`${category.color} p-4 rounded-lg text-center font-semibold`}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Info */}
      <div className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Em Caso de Emergência Extrema
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-700 p-6 rounded-lg">
                <Phone className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Defesa Civil</h3>
                <p className="text-2xl font-bold">199</p>
              </div>
              <div className="bg-red-700 p-6 rounded-lg">
                <Phone className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Corpo de Bombeiros</h3>
                <p className="text-2xl font-bold">193</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Impacto da Plataforma
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">250+</div>
              <div className="text-gray-600">Pessoas Ajudadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">80+</div>
              <div className="text-gray-600">Voluntários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-gray-600">Pessoas Reencontradas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Disponibilidade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            Sistema de Apoio a Emergências em Enchentes
          </p>
          <p className="text-gray-400 text-sm">
            Desenvolvido para ajudar comunidades em momentos de crise
          </p>
        </div>
      </footer>
    </div>
  );
}
