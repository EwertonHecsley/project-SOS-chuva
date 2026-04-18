import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockNeeds } from '../data/mockData';
import { Need, UrgencyLevel } from '../types';
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

const urgencyColors: Record<UrgencyLevel, string> = {
  critical: 'bg-red-100 text-red-800 border-red-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  low: 'bg-green-100 text-green-800 border-green-300'
};

const urgencyLabels: Record<UrgencyLevel, string> = {
  critical: 'CRÍTICO',
  high: 'ALTO',
  medium: 'MÉDIO',
  low: 'BAIXO'
};

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const [needs, setNeeds] = useState<Need[]>(mockNeeds);
  const [filter, setFilter] = useState<'all' | UrgencyLevel>('all');
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);

  const filteredNeeds = needs
    .filter(need => filter === 'all' || need.urgency === filter)
    .filter(need => need.status === 'pending')
    .sort((a, b) => {
      const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    });

  const handleOfferHelp = (needId: string) => {
    setNeeds(prev =>
      prev.map(need =>
        need.id === needId
          ? { ...need, status: 'in-progress', volunteerId: user?.id }
          : need
      )
    );
    setSelectedNeed(null);
    alert('Você se ofereceu para ajudar! A pessoa será notificada.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">Painel do Voluntário</h1>
          <p>Bem-vindo(a), {user?.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{needs.filter(n => n.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Necessidades Ativas</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">
              {needs.filter(n => n.urgency === 'critical' && n.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Casos Críticos</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {needs.filter(n => n.status === 'in-progress' && n.volunteerId === user?.id).length}
            </div>
            <div className="text-sm text-gray-600">Você Está Ajudando</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {needs.filter(n => n.status === 'resolved' && n.volunteerId === user?.id).length}
            </div>
            <div className="text-sm text-gray-600">Ajudas Concluídas</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-3">Filtrar por Urgência:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'critical' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              Crítico
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'high' ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
            >
              Alto
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'medium' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              Médio
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'low' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Baixo
            </button>
          </div>
        </div>

        {/* Needs List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Necessidades Disponíveis ({filteredNeeds.length})</h2>
          {filteredNeeds.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Nenhuma necessidade encontrada com este filtro.
            </div>
          ) : (
            filteredNeeds.map(need => (
              <div key={need.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${urgencyColors[need.urgency]}`}>
                          {urgencyLabels[need.urgency]}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {need.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{need.userName}</h3>
                      <p className="text-gray-700 mb-3">{need.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {need.userLocation}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {need.userPhone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(need.createdAt).toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNeed(need)}
                      className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition whitespace-nowrap"
                    >
                      Oferecer Ajuda
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedNeed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Confirmar Ajuda</h3>
            <p className="text-gray-700 mb-4">
              Você está prestes a se oferecer para ajudar <strong>{selectedNeed.userName}</strong> com:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-semibold mb-2">{selectedNeed.category}</p>
              <p className="text-sm text-gray-600 mb-3">{selectedNeed.description}</p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedNeed.userLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{selectedNeed.userPhone}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedNeed(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleOfferHelp(selectedNeed.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
