# Sistema IDR - API Backend

API RESTful desenvolvida em **Node.js** para a gestão e acompanhamento do sistema IDR (Insuficiência Renal / Gestão de Consultas e Pacientes). O projeto foi construído seguindo o padrão arquitetural **MVC (Model-View-Controller)**, utilizando **Sequelize ORM** para manipulação do banco de dados **MySQL** e **JWT (JSON Web Token)** para autenticação e segurança de rotas.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web para criação das rotas e middlewares da API.
- **Sequelize**: ORM para integração e manipulação de dados no MySQL.
- **MySQL**: Banco de dados relacional.
- **JWT (jsonwebtoken)**: Autenticação stateless baseada em tokens.
- **Bcrypt**: Criptografia de senhas (hashing).
- **Dotenv**: Gerenciamento seguro de variáveis de ambiente.

---

## 📁 Arquitetura do Projeto (MVC)

```text
.
├── controllers/
│   ├── consultaController.js  # Lógica de negócios de agendamento e listagem
│   └── pacienteController.js  # Lógica de registro, login e perfil
├── db/
│   └── conn.js                # Conexão com a base de dados MySQL via Sequelize
├── helpers/
│   └── verificarToken.js      # Middleware de proteção e validação de JWT
├── models/
│   ├── Consulta.js            # Modelo de dados das consultas
│   └── Paciente.js            # Modelo de dados dos pacientes
├── routes/
│   ├── consultaRoutes.js      # Definição dos endpoints de consultas
│   └── pacienteRoutes.js      # Definição dos endpoints de pacientes
├── .env.example               # Modelo para configuração das variáveis de ambiente
├── index.js                   # Ponto de entrada da aplicação
├── package.json               # Dependências do projeto
└── README.md                  # Documentação do projeto
```

---

## 🔒 Segurança e Relacionamento

1. **Criptografia de Senha**: Todas as senhas são encriptadas com `bcrypt` antes de serem salvas no MySQL.
2. **Proteção de Rotas**: Endpoints privados exigem o envio de um **Bearer Token** no cabeçalho de autorização.
3. **Integridade Relacional**: Relacionamento de **1 para N (1:N)** estabelecido entre `Paciente` e `Consulta` (`pacienteId` como chave estrangeira).
4. **Variáveis de Ambiente**: Credenciais de banco de dados e chave secreta JWT isoladas em arquivo `.env` para evitar exposição no repositório.

---

## 🚀 Endpoints da API

### Pacientes (`/pacientes`)
| Método | Rota | Descrição | Requer Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/pacientes/registrar` | Cadastro de novo paciente | ❌ |
| `POST` | `/pacientes/login` | Autenticação e geração de token JWT | ❌ |
| `GET` | `/pacientes/perfil` | Consulta os dados do paciente logado | Sim |

### Consultas (`/consultas`)
| Método | Rota | Descrição | Requer Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/consultas/agendar` | Agenda uma nova consulta para o paciente | Sim |
| `GET` | `/consultas/minhas-consultas` | Lista todas as consultas do paciente logado | Sim |

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd EstudodeCasoP1
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Abra o arquivo `.env` e defina suas credenciais do MySQL (`DB_USER`, `DB_PASS`, `DB_NAME`, `DB_HOST`) e sua chave secreta do JWT (`JWT_SECRET`).

4. **Configure a Base de Dados:**
   Certifique-se de ter o MySQL rodando e crie o banco de dados:
   ```sql
   CREATE DATABASE idr_database;
   ```

5. **Inicie o servidor:**
   ```bash
   node index.js
   ```
   O servidor estará rodando em `http://localhost:3000`.