# SOS Chuva 🌧️

![SOS Chuva Banner](public/assets/banner.png)

## 📋 Sobre o Projeto

O **SOS Chuva** é uma plataforma humanitária desenvolvida para centralizar e coordenar esforços de ajuda em situações de emergência causadas por chuvas intensas e enchentes. O objetivo principal é conectar pessoas em situação de vulnerabilidade com voluntários e recursos de forma rápida e eficiente.

A plataforma nasceu da necessidade de organizar informações críticas em tempo real, permitindo que pedidos de resgate, doações de suprimentos básicos e buscas por pessoas desaparecidas sejam geridos de forma transparente.

---

## ✨ Principais Funcionalidades

### 🆘 Central de Ajuda (Dashboard de Necessidades)
- **Solicitação de Auxílio:** Cadastro de necessidades urgentes como alimentos, água potável, medicamentos, abrigo e resgate.
- **Níveis de Urgência:** Sistema de priorização para garantir que casos críticos sejam atendidos primeiro.
- **Geolocalização:** Identificação rápida dos bairros e áreas mais afetadas (Ex: Porto Alegre - Sarandi, Humaitá, Navegantes).

### 🤝 Coordenação de Voluntários
- **Cadastro de Habilidades:** Voluntários podem se registrar informando suas capacidades (Primeiros Socorros, Resgate com Barco, Psicologia, Logística).
- **Disponibilidade em Tempo Real:** Gestão de status dos voluntários (Disponível, Em Atendimento).
- **Match de Necessidades:** Conexão direta entre o que o voluntário oferece e o que a comunidade precisa.

### 🔍 Pessoas e Animais Desaparecidos
- **Central de Buscas:** Espaço dedicado para reportar e buscar por crianças, adultos e animais de estimação.
- **Informações Detalhadas:** Fotos, descrições físicas, última localização vista e data do desaparecimento.
- **Status de Busca:** Atualização em tempo real sobre o paradeiro dos desaparecidos.

### 📊 Dashboards Personalizados
- **Visão do Solicitante:** Interface simplificada para quem precisa de ajuda imediata.
- **Visão do Voluntário:** Painel com métricas de impacto e lista de tarefas pendentes.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza o que há de mais moderno no ecossistema Web para garantir performance e uma experiência de usuário premium:

- **[React](https://reactjs.org/):** Biblioteca principal para a interface.
- **[Vite](https://vitejs.dev/):** Ferramenta de build ultra-rápida.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Estilização moderna e responsiva.
- **[Radix UI](https://www.radix-ui.com/):** Componentes acessíveis e robustos.
- **[Framer Motion](https://www.framer.com/motion/):** Micro-animações e transições fluidas.
- **[Lucide React](https://lucide.dev/):** Conjunto de ícones consistentes.
- **[React Router v7](https://reactrouter.com/):** Gestão de rotas e navegação.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (Versão LTS recomendada)
- [pnpm](https://pnpm.io/) (Gerenciador de pacotes recomendado)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/EwertonHecsley/project-SOS-chuva.git
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

4. **Acesse no navegador:**
   O projeto estará disponível em `http://localhost:5173`.

---

## 📂 Estrutura de Pastas

```text
src/
├── app/
│   ├── components/   # Componentes reutilizáveis (UI)
│   ├── context/      # Estados globais e contextos
│   ├── data/         # Mock de dados e serviços de API
│   ├── pages/        # Telas da aplicação (Landing, Dashboards, Login)
│   ├── routes.tsx    # Configuração de rotas
│   └── types.ts      # Definições de tipos TypeScript
├── styles/           # Configurações globais de CSS
└── main.tsx          # Ponto de entrada da aplicação
```

---

## 🤝 Contribuição

Contribuições são o que fazem a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Insira suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com 💙 para ajudar quem mais precisa.