# Email Classifier 📧

Uma aplicação web para classificar emails automaticamente usando inteligência artificial. A aplicação utiliza a API Groq para análise de conteúdo e fornece uma interface web intuitiva para upload e classificação de emails.

## 🚀 Características

- ✅ Classificação automática de emails usando IA
- 📤 Suporte para upload de arquivos (TXT e PDF)
- 💬 Interface web responsiva e amigável
- 🔒 Limite de tamanho de arquivo (máx. 16MB)
- 🔄 API REST para integração
- ⚡ Execução rápida com Groq API

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Python 3.8+** - [Baixar](https://www.python.org/downloads/)
- **pip** - Gerenciador de pacotes do Python (geralmente incluído com Python)
- **Git** - [Baixar](https://git-scm.com/)
- **Chave API Groq** - [Obter em https://console.groq.com](https://console.groq.com)

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/email-classifier.git
cd email-classifier
```

### 2. Crie um ambiente virtual (recomendado)

**No Windows (PowerShell ou CMD):**
```bash
python -m venv venv
venv\Scripts\activate
```

**No macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

## ⚙️ Configuração

### 1. Crie um arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` com as variáveis de ambiente:

```env
GROQ_API_KEY=sua_chave_api_aqui
PORT=5000
```

**Como obter a chave Groq API:**
1. Acesse [console.groq.com](https://console.groq.com)
2. Crie uma conta ou faça login
3. Gere uma nova chave de API
4. Copie a chave e adicione ao arquivo `.env`

### 2. Estrutura de Pastas

A aplicação cria automaticamente as seguintes pastas:
- `uploads/` - Armazena arquivos enviados para classificação

## 🏃 Como Executar

### Desenvolvimento Local

```bash
python app.py
```

A aplicação estará disponível em: **http://localhost:5000**

### Produção (com Gunicorn)

```bash
gunicorn --bind 0.0.0.0:5000 app:app
```

## 📖 Uso da Aplicação

### Via Interface Web

1. Acesse http://localhost:5000 em seu navegador
2. Escolha um dos métodos para fornecer um email:
   - **Colar Texto**: Digite ou cole o email no campo de texto
   - **Fazer Upload**: Selecione um arquivo `.txt` ou `.pdf`
3. Clique em "Classificar"
4. Veja o resultado da classificação

### Via API REST

**Endpoint:** `POST /classify`

**Exemplo com cURL:**

```bash
# Classificar usando texto direto
curl -X POST http://localhost:5000/classify \
  -F "text=Seu email aqui com o conteúdo que deseja classificar"

# Classificar usando arquivo
curl -X POST http://localhost:5000/classify \
  -F "file=@caminho/para/arquivo.txt"
```

**Resposta (JSON):**
```json
{
  "classification": "Categoria do email",
  "confidence": 0.95,
  "summary": "Resumo da análise"
}
```

## 🔌 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Interface web principal |
| `POST` | `/classify` | Classifica um email |
| `GET` | `/health` | Status da aplicação |

## 📁 Estrutura do Projeto

```
email-classifier/
├── app.py                 # Arquivo principal da aplicação
├── config.py              # Configurações da aplicação
├── requirements.txt       # Dependências do projeto
├── .env                   # Variáveis de ambiente (não versionado)
├── routes/
│   └── routes.py          # Definição das rotas
├── services/
│   ├── __init__.py
│   ├── classifier.py      # Lógica de classificação
│   ├── file_handler.py    # Manipulação de arquivos
│   └── prompts.py         # Prompts para IA
├── static/
│   ├── css/
│   │   └── style_custom.css
│   └── js/
│       ├── app.js         # Lógica principal
│       ├── fetcher.js     # Requisições HTTP
│       └── upload.js      # Manipulação de uploads
├── templates/
│   └── index.html         # Interface web
└── uploads/               # Pasta para arquivos enviados
```

## 🔧 Tecnologias Utilizadas

- **Flask** - Framework web Python
- **Groq API** - Motor de IA para classificação
- **PyPDF2** - Processamento de arquivos PDF
- **Python-dotenv** - Gerenciamento de variáveis de ambiente
- **Gunicorn** - Servidor WSGI para produção

## 📋 Dependências

Veja [requirements.txt](requirements.txt) para a lista completa de dependências e suas versões.

## ⚠️ Limitações e Configurações

- **Tamanho máximo de arquivo:** 16MB
- **Formatos suportados:** `.txt`, `.pdf`
- **Modelos suportados:** Modelos disponíveis na Groq API

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'flask'"

```bash
# Certifique-se de ter ativado o ambiente virtual
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```

### "GROQ_API_KEY não configurada"

1. Verifique se o arquivo `.env` existe na raiz do projeto
2. Verifique se a chave está configurada corretamente: `GROQ_API_KEY=sua_chave`
3. Reinicie a aplicação

### Erro ao processar PDF

- Verifique se o arquivo PDF está corrompido
- Tente converter para TXT se o problema persistir

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `GROQ_API_KEY` | Chave de API da Groq (obrigatório) | - |
| `PORT` | Porta da aplicação | 5000 |


