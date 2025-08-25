# 📱 App de Simulação de Empréstimos

Este repositório contém a solução para o **Desafio Técnico - Front-end (React Native)** proposto pela **CAIXA**.  
Os detalhes completos estão descritos no arquivo [desafio.md](./desafio.md).

## 📂 Estrutura do Projeto

```
├── api/ # API em Python (FastAPI) usada para testes (publicada na Render)
├── front/ # Aplicativo em React Native
├── DEsafio.md # Documento com os detalhes completos do desafio
└── README.md # Resumo do projeto
```

- **API** disponível em: [https://hackaton-caixa.onrender.com](https://hackaton-caixa.onrender.com)  
- **Front-end** desenvolvido em React Native, consumindo os endpoints da API.  

## 🎯 Funcionalidades

- Cadastro de produtos de empréstimo  
- Listagem de produtos disponíveis  
- Simulação de empréstimos com memória de cálculo mês a mês  

## 🛠 Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/<nome-do-repo>.git
cd <nome-do-repo>
```

### 2. Executar o Front-end
```
cd front
npm install
npx expo start
```

Abra no celular via Expo Go ou no emulador Android/iOS.

### 3. (Opcional) Executar a API localmente
```
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🖼️ Screenshots
### Cadastro de Produto

### Listagem de Produtos

### Simulação

## 👨‍💻 Autor

Desenvolvido por Igor Carvalho 🚀

🔗 LinkedIn
 | GitHub
