from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

produtos = []
next_id = 1

def calcular_simulacao(produto, valor, meses):
    taxa_anual = float(produto["taxa"])
    meses = int(meses)
    taxa_mensal = (1 + taxa_anual / 100) ** (1 / 12) - 1
    parcela = valor * (taxa_mensal * (1 + taxa_mensal) ** meses) / ((1 + taxa_mensal) ** meses - 1)
    total = parcela * meses

    memoria = []
    saldo = valor
    for mes in range(1, meses + 1):
        juros = saldo * taxa_mensal
        amortizacao = parcela - juros
        saldo -= amortizacao
        memoria.append({
            "mes": mes,
            "juros": round(juros, 2),
            "amortizacao": round(amortizacao, 2),
            "saldo": round(saldo, 2)
        })

    return {
        "produto": produto,
        "valor_solicitado": valor,
        "prazo": meses,
        "taxa_efetiva_mensal": round(taxa_mensal * 100, 2),
        "parcela_mensal": round(parcela, 2),
        "valor_total_com_juros": round(total, 2),
        "memoria_de_calculo": memoria
    }

@app.route("/produtos", methods=["GET"])
def listar_produtos():
    return jsonify(produtos)

@app.route("/produtos/<int:produto_id>", methods=["GET"])
def buscar_produto(produto_id):
    produto = next((p for p in produtos if p["id"] == produto_id), None)
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404
    return jsonify(produto)

@app.route("/produtos", methods=["POST"])
def criar_produto():
    global next_id
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    produto = {
        "id": next_id,
        "nome": data.get("nome"),
        "prazo": data.get("prazo"),
        "taxa": data.get("taxa")
    }
    produtos.append(produto)
    next_id += 1
    return jsonify(produto), 201

@app.route("/simulacao", methods=["POST"])
def simular_emprestimo():
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    produto_id = data.get("produto_id")
    valor = data.get("valor")
    meses = data.get("meses")

    produto = next((p for p in produtos if p["id"] == produto_id), None)
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404

    resultado = calcular_simulacao(produto, valor, meses)
    return jsonify(resultado)

if __name__ == "__main__":
    app.run(debug=True, port=80)
