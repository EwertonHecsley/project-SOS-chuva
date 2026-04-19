import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { MissingPerson, MissingType } from "../types";
import { api } from "../services/api";
import {
  Search,
  MapPin,
  Clock,
  User,
  Baby,
  Dog,
  Plus,
  Phone,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const typeIcons: Record<MissingType, any> = {
  person: User,
  child: Baby,
  animal: Dog,
};

const typeLabels: Record<MissingType, string> = {
  person: "Pessoa",
  child: "Criança",
  animal: "Animal",
};

const typeColors: Record<MissingType, string> = {
  person: "bg-blue-100 text-blue-800",
  child: "bg-orange-100 text-orange-800",
  animal: "bg-green-100 text-green-800",
};

export default function MissingPersonsPage() {
  const { user } = useAuth();
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | MissingType>("all");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    type: "person" as MissingType,
    description: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    reporterPhone: user?.phone || "",
  });

  useEffect(() => {
    const fetchMissingPersons = async () => {
      try {
        const data = await api.missingPersons.list();
        const missingPersonsData = data.missingPersons || [];
        setMissingPersons(Array.isArray(missingPersonsData) ? missingPersonsData : []);
      } catch (error) {
        console.error("Erro ao buscar desaparecidos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissingPersons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newMissing = await api.missingPersons.create({
        reportedBy: user?.id || "",
        reportedByName: user?.name || "",
        reporterPhone: formData.reporterPhone,
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : undefined,
        type: formData.type,
        description: formData.description,
        lastSeenLocation: formData.lastSeenLocation,
        lastSeenDate: new Date(formData.lastSeenDate),
        status: "missing",
      });

      setMissingPersons((prev: MissingPerson[]) => [newMissing, ...prev]);
      setFormData({
        name: "",
        age: "",
        type: "person",
        description: "",
        lastSeenLocation: "",
        lastSeenDate: "",
        reporterPhone: user?.phone || "",
      });
      setShowForm(false);
      toast.success("Registro de desaparecido cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar registro. Tente novamente.");
    }
  };

  const filteredMissing = missingPersons
    .filter((mp: MissingPerson) => filter === "all" || mp.type === filter)
    .filter((mp: MissingPerson) => mp.status === "missing");

  const handleMarkFound = async (id: string) => {
    try {
      await api.missingPersons.update(id, { status: "found" });
      setMissingPersons((prev: MissingPerson[]) =>
        prev.map((mp: MissingPerson) =>
          mp.id === id ? { ...mp, status: "found" } : mp,
        ),
      );
      toast.success("Marcado como encontrado! A família será notificada.");
    } catch (error) {
      toast.error("Erro ao atualizar status. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-8 h-8" />
            <h1 className="text-2xl font-bold">
              Pessoas e Animais Desaparecidos
            </h1>
          </div>
          <p>Ajude a reencontrar quem se perdeu durante a enchente</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-orange-600">
              {missingPersons.filter((mp: MissingPerson) => mp.status === "missing").length}
            </div>
            <div className="text-sm text-gray-600">Casos Ativos</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {
                missingPersons.filter(
                  (mp: MissingPerson) => mp.type === "person" && mp.status === "missing",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Pessoas</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-pink-600">
              {
                missingPersons.filter(
                  (mp: MissingPerson) => mp.type === "child" && mp.status === "missing",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Crianças</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {
                missingPersons.filter(
                  (mp: MissingPerson) => mp.type === "animal" && mp.status === "missing",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Animais</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Registrar Desaparecido
              </h3>
              <p className="text-sm text-gray-600">
                Se você está procurando alguém, cadastre as informações aqui
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Cadastrar Desaparecido
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-3">Filtrar por Tipo:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("person")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "person"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              Pessoas
            </button>
            <button
              onClick={() => setFilter("child")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "child"
                  ? "bg-pink-600 text-white"
                  : "bg-pink-100 text-pink-800 hover:bg-pink-200"
              }`}
            >
              Crianças
            </button>
            <button
              onClick={() => setFilter("animal")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "animal"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              Animais
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">
            Desaparecidos ({filteredMissing.length})
          </h2>
          {filteredMissing.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Nenhum registro encontrado com este filtro.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredMissing.map((missing: MissingPerson) => {
                const Icon = typeIcons[missing.type];
                return (
                  <div
                    key={missing.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold">{missing.name}</h3>
                          {missing.age && (
                            <span className="text-sm text-gray-600">
                              ({missing.age} anos)
                            </span>
                          )}
                        </div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${typeColors[missing.type]}`}
                        >
                          {typeLabels[missing.type]}
                        </span>
                        <p className="text-sm text-gray-700 mb-3">
                          {missing.description}
                        </p>
                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Visto(a) em: {missing.lastSeenLocation}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(missing.lastSeenDate).toLocaleString(
                              "pt-BR",
                            )}
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <p className="text-xs text-gray-600 mb-1">
                            Contato para informações:
                          </p>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <span>{missing.reportedByName || "Anônimo"}</span>
                            <span className="text-gray-400">•</span>
                            <span>{missing.reporterPhone}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleMarkFound(missing.id)}
                          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                          Marcar como Encontrado
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Cadastrar Desaparecido</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      type: e.target.value as MissingType,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="person">Pessoa (Adulto)</option>
                  <option value="child">Criança ou Adolescente</option>
                  <option value="animal">Animal de Estimação</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome {formData.type === "animal" ? "do Animal" : "Completo"}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev: any) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {formData.type !== "animal" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Idade (opcional)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev: any) => ({ ...prev, age: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min="0"
                    max="150"
                  />
                </div>
              )}

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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Características físicas, roupas, sinais particulares..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Local Onde Foi Visto(a) Pela Última Vez
                </label>
                <input
                  type="text"
                  value={formData.lastSeenLocation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      lastSeenLocation: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ex: Abrigo Municipal, Rua X..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Data e Hora
                </label>
                <input
                  type="datetime-local"
                  value={formData.lastSeenDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      lastSeenDate: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Telefone para Contato
                </label>
                <input
                  type="tel"
                  value={formData.reporterPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      reporterPhone: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

