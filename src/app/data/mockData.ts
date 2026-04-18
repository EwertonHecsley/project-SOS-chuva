import { Need, Volunteer, MissingPerson } from '../types';

export const mockNeeds: Need[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Maria Silva',
    userLocation: 'Bairro Sarandi, Porto Alegre',
    userPhone: '(51) 98888-1111',
    category: 'Alimentos',
    description: 'Família com 4 pessoas, incluindo 2 crianças. Precisamos de alimentos não perecíveis urgentemente.',
    urgency: 'critical',
    status: 'pending',
    createdAt: new Date('2026-04-18T08:00:00')
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'João Santos',
    userLocation: 'Bairro Humaitá, Porto Alegre',
    userPhone: '(51) 98888-2222',
    category: 'Medicamentos',
    description: 'Preciso de insulina e medicamentos para pressão alta. Idoso de 75 anos.',
    urgency: 'critical',
    status: 'pending',
    createdAt: new Date('2026-04-18T07:30:00')
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Ana Costa',
    userLocation: 'Bairro Navegantes, Porto Alegre',
    userPhone: '(51) 98888-3333',
    category: 'Resgate',
    description: 'Estamos ilhados no segundo andar. 3 adultos e 1 bebê. Água subindo.',
    urgency: 'critical',
    status: 'pending',
    createdAt: new Date('2026-04-18T09:15:00')
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Carlos Oliveira',
    userLocation: 'Bairro São João, Porto Alegre',
    userPhone: '(51) 98888-4444',
    category: 'Roupas',
    description: 'Perdemos tudo. Precisamos de roupas para casal e 3 filhos (8, 12 e 15 anos).',
    urgency: 'high',
    status: 'pending',
    createdAt: new Date('2026-04-18T06:00:00')
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Fernanda Lima',
    userLocation: 'Bairro Menino Deus, Porto Alegre',
    userPhone: '(51) 98888-5555',
    category: 'Abrigo',
    description: 'Família de 5 pessoas procura abrigo temporário. Temos 2 idosos.',
    urgency: 'high',
    status: 'pending',
    createdAt: new Date('2026-04-18T10:00:00')
  },
  {
    id: '6',
    userId: 'user6',
    userName: 'Roberto Alves',
    userLocation: 'Bairro Restinga, Porto Alegre',
    userPhone: '(51) 98888-6666',
    category: 'Água Potável',
    description: 'Sem acesso a água potável. 6 pessoas, incluindo gestante.',
    urgency: 'high',
    status: 'pending',
    createdAt: new Date('2026-04-18T08:45:00')
  },
  {
    id: '7',
    userId: 'user7',
    userName: 'Patrícia Souza',
    userLocation: 'Bairro Cristal, Porto Alegre',
    userPhone: '(51) 98888-7777',
    category: 'Produtos de Higiene',
    description: 'Fraldas infantis (tamanho G) e produtos de higiene básica.',
    urgency: 'medium',
    status: 'pending',
    createdAt: new Date('2026-04-18T11:00:00')
  },
  {
    id: '8',
    userId: 'user8',
    userName: 'Marcos Ferreira',
    userLocation: 'Bairro Lomba do Pinheiro, Porto Alegre',
    userPhone: '(51) 98888-8888',
    category: 'Colchões',
    description: 'Precisamos de colchões ou cobertores. 4 pessoas dormindo no chão.',
    urgency: 'medium',
    status: 'pending',
    createdAt: new Date('2026-04-18T09:30:00')
  }
];

export const mockVolunteers: Volunteer[] = [
  {
    id: 'v1',
    userId: 'vol1',
    name: 'Pedro Martins',
    location: 'Centro, Porto Alegre',
    phone: '(51) 97777-1111',
    skills: ['Primeiros Socorros', 'Direção'],
    availability: 'Tempo integral',
    status: 'available',
    helpedCount: 12
  },
  {
    id: 'v2',
    userId: 'vol2',
    name: 'Juliana Rocha',
    location: 'Zona Norte, Porto Alegre',
    phone: '(51) 97777-2222',
    skills: ['Enfermagem', 'Cozinha'],
    availability: 'Manhãs e tardes',
    status: 'available',
    helpedCount: 8
  },
  {
    id: 'v3',
    userId: 'vol3',
    name: 'André Gonçalves',
    location: 'Zona Sul, Porto Alegre',
    phone: '(51) 97777-3333',
    skills: ['Resgate', 'Barco'],
    availability: 'Tempo integral',
    status: 'busy',
    helpedCount: 15
  },
  {
    id: 'v4',
    userId: 'vol4',
    name: 'Camila Ribeiro',
    location: 'Zona Leste, Porto Alegre',
    phone: '(51) 97777-4444',
    skills: ['Psicologia', 'Apoio Emocional'],
    availability: 'Tardes e noites',
    status: 'available',
    helpedCount: 6
  },
  {
    id: 'v5',
    userId: 'vol5',
    name: 'Ricardo Santos',
    location: 'Centro, Porto Alegre',
    phone: '(51) 97777-5555',
    skills: ['Transporte', 'Logística'],
    availability: 'Tempo integral',
    status: 'available',
    helpedCount: 20
  },
  {
    id: 'v6',
    userId: 'vol6',
    name: 'Luciana Pereira',
    location: 'Zona Norte, Porto Alegre',
    phone: '(51) 97777-6666',
    skills: ['Distribuição de Alimentos', 'Organização'],
    availability: 'Manhãs',
    status: 'available',
    helpedCount: 10
  }
];

export const mockMissingPersons: MissingPerson[] = [
  {
    id: 'm1',
    reportedBy: 'Sandra Martins',
    reporterPhone: '(51) 96666-1111',
    name: 'Lucas Martins',
    age: 8,
    type: 'child',
    description: 'Menino de 8 anos, cabelos castanhos, vestindo camiseta azul e bermuda jeans.',
    lastSeenLocation: 'Abrigo Municipal São Pedro',
    lastSeenDate: new Date('2026-04-17T15:00:00'),
    status: 'missing',
    createdAt: new Date('2026-04-17T18:00:00')
  },
  {
    id: 'm2',
    reportedBy: 'José Oliveira',
    reporterPhone: '(51) 96666-2222',
    name: 'Maria Oliveira',
    age: 68,
    type: 'person',
    description: 'Idosa de 68 anos, cabelos grisalhos curtos, usa óculos. Portadora de Alzheimer.',
    lastSeenLocation: 'Bairro Navegantes, próximo à Igreja',
    lastSeenDate: new Date('2026-04-18T06:00:00'),
    status: 'missing',
    createdAt: new Date('2026-04-18T07:30:00')
  },
  {
    id: 'm3',
    reportedBy: 'Carla Souza',
    reporterPhone: '(51) 96666-3333',
    name: 'Rex',
    type: 'animal',
    description: 'Cachorro da raça Labrador, cor dourada, coleira vermelha com plaquinha.',
    lastSeenLocation: 'Bairro Menino Deus, Rua da Praia',
    lastSeenDate: new Date('2026-04-18T08:00:00'),
    status: 'missing',
    createdAt: new Date('2026-04-18T09:00:00')
  },
  {
    id: 'm4',
    reportedBy: 'Antonio Silva',
    reporterPhone: '(51) 96666-4444',
    name: 'Felipe Silva',
    age: 15,
    type: 'child',
    description: 'Adolescente de 15 anos, cabelos pretos, vestindo moletom cinza.',
    lastSeenLocation: 'Abrigo Escola Central',
    lastSeenDate: new Date('2026-04-18T09:30:00'),
    status: 'missing',
    createdAt: new Date('2026-04-18T11:00:00')
  },
  {
    id: 'm5',
    reportedBy: 'Beatriz Costa',
    reporterPhone: '(51) 96666-5555',
    name: 'Nina',
    type: 'animal',
    description: 'Gata siamesa, olhos azuis, sem coleira.',
    lastSeenLocation: 'Bairro Cristal, perto do mercado',
    lastSeenDate: new Date('2026-04-18T07:00:00'),
    status: 'missing',
    createdAt: new Date('2026-04-18T08:30:00')
  }
];
