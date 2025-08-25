## 💻 Front-end (React Native ou Angular 16+)

### Desafio Técnico - App de Simulação de Empréstimos

A CAIXA está evoluindo sua plataforma de crédito digital. O backend já está pronto e oferece endpoints para cadastrar produtos de empréstimo e simular financiamentos com base em taxa de juros anual e prazo

Agora o desafio é criar um **experiência mobile completa** que permita:

- Cadastrar novos produtos de empréstimo
- Visualizar os produtos disponíveis
- Simular empréstimos com base nos dados cadastrados
- Exibir os resultados de forma clara, incluindo a memória de cálculo mês a mês

- Imagine que Lucas, um microempreendedor, quer investir em novos equipamentos. Ele acessa o app, cadastra u, novo empréstimo com taxa personalizada, simula um financiamento e entende quanto pagará mês a mês. Seu app será a ponte entre a necessidade e a decisão financeira.

### 📱 Objetivo

Criar um aplicativo **React Native** que permita:

#### 1. Cadastro de Produtos de Empréstimo
- Tela com formulário para:
  - Nome do produto
  - Taxa de juros anual (%)
  - Prazo máximo (em meses)
- Enviar os dados para o backend via API

#### 2. Listagem de Produtos
- Buscar produtos cadastrados via API
- Exibir:
  - Nome
  - Taxa de juros anual
  - Prazo máximo

#### 3. Simulação de Empréstimo
- Tela com formulário para:
  - Selecionar um produto
  - Informar valor do empréstimo
  - Informar número de meses
- Enviar os dados para o endpoint de simulação
- Exibir:
  - Dados do produto
  - Taxa de juros efetiva mensal
  - Valor total com juros
  - Valor da parcela mensal
  - Memória de cálculo mês a mês (juros, amortização, saldo)

## 🛠 Requisitos Técnicos

- **Framework**: React Native ou Angular 16+
- **Gerenciamento de estado**: `useState`, `useEffect`, `useReducer` ou `Context API`
- **Estilo**: `StyleSheet`, `Tailwind` ou `styled-components`
- **Testes**: `Jest` + `React Native Testing Library`
  - Cobertura mínima de **80%**
- **Integração com API**: `Fetch` ou `Axios`
- **Responsividade**: Interface adaptável a diferentes tamanhos de tela

## 🔗 Endpoints esperados do backend

- `POST /produtos` – Cadastrar produto
- `GET /produtos` – Listar produtos
- `POST /simulações` – Realizar simulação de empréstimo

## 🧮 Exemplo de Resultado da Simulação

- **Produto**: Empréstimo Pessoal  
- **Valor solicitado**: R$ 10.000,00  
- **Prazo**: 12 meses  
- **Taxa efetiva mensal**: 1,39%  
- **Parcela mensal**: R$ 931,50  
- **Valor total com juros**: R$ 11.178,00  

### Memória de cálculo:

- **Mês 1**: Juros R$ 139,78 | Amortização R$ 791,72 | Saldo: R$ 9.208,28  
- **Mês 2**: Juros R$ 128,74 | Amortização R$ 802,76 | Saldo: R$ 8.405,52  
