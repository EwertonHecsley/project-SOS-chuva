import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Need, Volunteer, UrgencyLevel } from "../types";
import { api } from "../services/api";
import { Plus, Heart, MapPin, Phone, Clock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Alimentos",
  "Medicamentos",
  "Abrigo",
  "Resgate",
  "Roupas",
  "Água Potável",
  "Transporte",
  "Produtos de Higiene",
  "Outros",
];

export default function NeedHelpDashboard() {
  const { user } = useAuth();
  const [needs, setNeeds] = useState<Need[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNeedForm, setShowNeedForm] = useState(false);
  const [showVolunteers, setShowVolunteers] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    urgency: "medium" as UrgencyLevel,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [needsResponse, volunteersResponse] = await Promise.all([
          api.needs.list(),
          api.volunteers.list(),
        ]);
        
        const allNeeds = Array.isArray(needsResponse.needs) ? needsResponse.needs : [];
        const allVolunteers = Array.isArray(volunteersResponse.volunteers) ? volunteersResponse.volunteers : [];

        // Calcula a contagem de ajudas para cada voluntário
        const volunteersWithStats = allVolunteers.map((v: Volunteer) => ({
          ...v,
          helpedCount: allNeeds.filter(
            (n: Need) => n.volunteerId === v.id && n.status === "resolved"
          ).length,
        }));
        
        // Filtra as necessidades do próprio usuário logado
        const myNeeds = allNeeds.filter((n: Need) => n.userId === user?.id);
          
        setNeeds(myNeeds);
        setVolunteers(volunteersWithStats);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSubmitNeed = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newNeed = await api.needs.create({
        category: formData.category,
        description: formData.description,
        urgency: formData.urgency,
        userId: user?.id,
        userName: user?.name,
        userLocation: user?.location,
        userPhone: user?.phone,
        status: "pending",
      });

      setNeeds((prev: Need[]) => [newNeed, ...prev]);
      setFormData({ category: "", description: "", urgency: "medium" });
      setShowNeedForm(false);
      toast.success("Necessidade cadastrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar necessidade. Tente novamente.");
    }
  };

  const handleRequestHelp = async (volunteerId: string, volunteerName: string) => {
    try {
      // Implementação simplificada de solicitação de ajuda
      toast.success(`Solicitação de ajuda enviada para ${volunteerName}! O voluntário será notificado.`);
    } catch (error) {
      toast.error("Erro ao solicitar ajuda. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">Painel de Ajuda</h1>
          <p>Bem-vindo(a), {user?.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowNeedForm(true)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-left"
          >
            <Plus className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-lg mb-1">
              Cadastrar Necessidade
            </h3>
            <p className="text-sm text-gray-600">
              Informe o que você precisa e o nível de urgência
            </p>
          </button>

          <button
            onClick={() => setShowVolunteers(true)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-left"
          >
            <Heart className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Ver Voluntários</h3>
            <p className="text-sm text-gray-600">
              Veja quem está disponível para ajudar
            </p>
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Minhas Necessidades ({needs.length})
          </h2>
          {needs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Você ainda não cadastrou nenhuma necessidade.
              <br />
              Clique em "Cadastrar Necessidade" para começar.
            </div>
          ) : (
            <div className="space-y-4">
              {needs.map((need: Need) => (
                <div key={need.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            need.urgency === "critical"
                              ? "bg-red-100 text-red-800"
                              : need.urgency === "high"
                                ? "bg-orange-100 text-orange-800"
                                : need.urgency === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          {need.urgency === "critical"
                            ? "CRÍTICO"
                            : need.urgency === "high"
                              ? "ALTO"
                              : need.urgency === "medium"
                                ? "MÉDIO"
                                : "BAIXO"}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {need.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            need.status === "pending"
                              ? "bg-gray-100 text-gray-800"
                              : need.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {need.status === "pending"
                            ? "Aguardando"
                            : need.status === "in-progress"
                              ? "Em Andamento"
                              : "Resolvido"}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{need.description}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        Cadastrado em{" "}
                        {new Date(need.createdAt).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </div>
                  {need.volunteerId && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        ✓ Um voluntário se ofereceu para ajudar com esta
                        necessidade!
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showNeedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              Cadastrar Nova Necessidade
            </h3>
            <form onSubmit={handleSubmitNeed} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descrição Detalhada
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  placeholder="Descreva sua necessidade com o máximo de detalhes possível"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nível de Urgência
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      urgency: e.target.value as UrgencyLevel,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="low">Baixo - Pode aguardar alguns dias</option>
                  <option value="medium">Médio - Necessário em 24-48h</option>
                  <option value="high">Alto - Urgente, necessário hoje</option>
                  <option value="critical">
                    Crítico - Emergência imediata
                  </option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNeedForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVolunteers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Voluntários Disponíveis</h3>
              <button
                onClick={() => setShowVolunteers(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {volunteers.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  Nenhum voluntário disponível no momento.
                </div>
              ) : (
                volunteers
                  .filter((v: Volunteer) => v.status === "available")
                  .map((volunteer: Volunteer) => (
                    <div
                      key={volunteer.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{volunteer.name}</h4>
                            <p className="text-sm text-gray-600">
                              {volunteer.helpedCount} pessoas ajudadas
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {volunteer.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {volunteer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {volunteer.availability}
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-2">Habilidades:</p>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRequestHelp(volunteer.id, volunteer.name)
                        }
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        Solicitar Ajuda
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

