# 🛡️ RPG Educacional (Fullstack)

> Projeto desenvolvido para as avaliações **EA2 (Backend)** e **EA3 (Frontend)** da disciplina de Programação de Computadores.
> Uma plataforma de gamificação escolar onde professores podem gerenciar turmas e lançar missões (quests) para os alunos.

---

## 🎯 Objetivo do Projeto

Este projeto visa integrar conceitos avançados de desenvolvimento web, atendendo aos seguintes requisitos acadêmicos:

* **EA2 (Backend):** Implementação de uma API RESTful com persistência de dados em **MongoDB**.
* **EA3 (Frontend):** Interface interativa em **ReactJS** consumindo a API.
* **Integração:** CRUDs completos com **relacionamentos** entre entidades (Professor → Turma → Quest).
* **Arquitetura:** Uso de padrões de projeto como **DAO** (Data Access Object) e **Entidades** com encapsulamento.

---

## 🧩 Tecnologias e Ferramentas

| Categoria | Tecnologias |
| --- | --- |
| **Frontend** | [ReactJS](https://react.dev/), [Vite](https://vitejs.dev/), [Ant Design](https://ant.design/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) |
| **Banco de Dados** | [MongoDB Atlas](https://www.mongodb.com/atlas) (Nuvem), [Mongoose](https://mongoosejs.com/) |
| **Linguagem** | JavaScript (ES6+)|

---

## 📁 Estrutura do Projeto

O projeto foi organizado em camadas para separar responsabilidades:

```
/
├─ backend/                 # API e Lógica do Servidor
│  ├─ src/
│  │  ├─ dao/               # Data Access Objects (Lógica de Banco)
│  │  ├─ database/          # Conexão com MongoDB
│  │  ├─ models/            # Schemas do Mongoose
│  │  └─ routes/            # Rotas da API (Endpoints)
│  └─ index.js              # Entrada do Servidor
│
└─ frontend/                # Interface do Usuário
   ├─ src/
   │  ├─ components/
   │  │  ├─ forms/          # Formulários com Ant Design
   │  │  ├─ layout/         # Navbar, Footer e Sidebar
   │  │  └─ tables/         # Tabelas de listagem
   │  ├─ objetos/
   │  │  ├─ dao/            # Comunicação com a API (fetch)
   │  │  └─ entidades/      # Classes com atributos privados (#)
   │  ├─ pages/             # Telas principais (Professores, Turmas, Quests)
   │  └─ routes/            # Configuração de Rotas
   ├─ index.html         
   └─ main.jsx

```

---

## 🚀 Como Executar o Projeto

Este projeto é um monorepo. Você precisará de **dois terminais** abertos: um para o Backend e outro para o Frontend.

### 🧱 Pré-requisitos

* Node.js (>= 14)
* npm (ou yarn)
* Conexão com a Internet (para o MongoDB Atlas)

### 1️⃣ Configurando o Backend (Terminal 1)

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm start

```

> Você deve ver a mensagem: `✅ MongoDB Conectado com Sucesso!` e `📡 Servidor rodando na porta 3000`.

### 2️⃣ Configurando o Frontend (Terminal 2)

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

```

> Acesse o link gerado (geralmente `http://localhost:5173`) no seu navegador.

---

## 🧠 Diferenciais Técnicos Implementados

### 1. Orientação a Objetos Real

Diferente de frameworks que usam apenas JSON, este projeto utiliza **Classes ES6** tanto no Front quanto no Back.

* Atributos privados (`#nome`, `#id`).
* Métodos Getters e Setters.
* Método `toJSON()` customizado para serialização.

### 2. Padrão DAO (Data Access Object)

A lógica de comunicação não fica espalhada nas telas.

* **Backend:** O DAO gerencia as queries do Mongoose.
* **Frontend:** O DAO gerencia os `fetch` para a API e converte JSON em instâncias de Objetos.

### 3. Relacionamentos (Integridade Referencial)

O sistema garante a consistência dos dados:

* Uma **Turma** só pode ser criada se vinculada a um **Professor** existente.
* Uma **Quest** só pode ser criada se vinculada a uma **Turma** existente.

### 4. Interface Rica (Ant Design)

Utilização de componentes profissionais:

* **Tabelas** com paginação e tags coloridas.
* **Modais** para formulários de cadastro.
* **Feedback** visual (mensagens de sucesso/erro e spinners de carregamento).
* **Layout** responsivo com Sidebar e Navbar.

---

## ✅ Funcionalidades (CRUDs)

| Entidade | Funcionalidades | Dados Armazenados |
| --- | --- | --- |
| **Professores** | Listar, Cadastrar, Excluir | Nome, Email, Especialidade, Nível, Telefone |
| **Turmas** | Listar, Cadastrar, Excluir | Nome, Código, Semestre, Professor (Vínculo), Status |
| **Quests** | Listar, Cadastrar, Excluir | Título, XP, Dificuldade, Data Entrega, Turma (Vínculo) |

---

## 🤝 Autores

Desenvolvido por 
**Arthur Daniel Ribeiro Pereira Dantas Lourenço - Danilo Moraes Borges Piquiá - Matheus Oliveira Gouveia Campos**
para a disciplina de Programação de Computadores.