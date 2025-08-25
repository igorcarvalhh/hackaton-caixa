# 📄 API de Simulação de Empréstimos

Esta API foi desenvolvida em **Flask** e permite cadastrar produtos de empréstimo, listar produtos e simular financiamentos com memória de cálculo mês a mês.

## 📦 Instalação

1. Clonar o repositório:
```bash
git clone <URL_DO_REPO>
cd api
```
Instalar dependências:

```bash
pip install -r requirements.txt
```
Executar a API:

```bash
python app.py
```

Por padrão, a API será executada em:

```arduino
http://localhost:4000
```

## 🛠 Endpoints

1. Listar Produtos
GET /produtos

Retorna todos os produtos cadastrados.

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "nome": "Empréstimo Pessoal",
    "prazo": 12,
    "taxa": 15.0
  }
]
```
2. Buscar Produto por ID
GET /produtos/<produto_id>

Retorna um produto específico pelo seu ID.

Exemplo de resposta:

```json
{
  "id": 1,
  "nome": "Empréstimo Pessoal",
  "prazo": 12,
  "taxa": 15.0
}
```
3. Criar Produto
POST /produtos

Cria um novo produto de empréstimo.

Body (JSON):

```json
{
  "nome": "Empréstimo Empresarial",
  "prazo": 24,
  "taxa": 12.0
}
```

Exemplo de resposta:

```json
{
  "id": 2,
  "nome": "Empréstimo Empresarial",
  "prazo": 24,
  "taxa": 12.0
}
```

4. Simular Empréstimo
POST /simulacao

Calcula o financiamento com base em um produto existente, valor solicitado e prazo.

Body (JSON):

```json
{
  "produto_id": 1,
  "valor": 10000,
  "meses": 12
}
```

Exemplo de resposta:

```json
{
  "produto": {
    "id": 1,
    "nome": "Empréstimo Pessoal",
    "prazo": 12,
    "taxa": 15.0
  },
  "valor_solicitado": 10000,
  "prazo": 12,
  "taxa_efetiva_mensal": 1.17,
  "parcela_mensal": 896.35,
  "valor_total_com_juros": 10756.2,
  "memoria_de_calculo": [
    {"mes": 1, "juros": 117.0, "amortizacao": 779.35, "saldo": 9220.65},
    {"mes": 2, "juros": 108.03, "amortizacao": 788.32, "saldo": 8432.33},
    ...
  ]
}
```
