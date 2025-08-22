from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse, parse_qs

# Dados em memória
produtos = []
next_id = 1

class SimpleAPI(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        if self.path == '/produtos':
            self._set_headers()
            self.wfile.write(json.dumps(produtos).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Rota não encontrada"}).encode())

    def do_POST(self):
        global next_id
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        try:
            data = json.loads(post_data)
        except json.JSONDecodeError:
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": "JSON inválido"}).encode())
            return

        if self.path == '/produtos':
            produto = {
                "id": next_id,
                "nome": data.get("nome"),
                "prazo": data.get("prazo"),
                "taxa": data.get("taxa")
            }
            produtos.append(produto)
            next_id += 1
            self._set_headers(201)
            self.wfile.write(json.dumps(produto).encode())

        elif self.path == '/simulacoes':
            produto_id = data.get("produto_id")
            valor = data.get("valor")
            meses = data.get("meses")

            produto = next((p for p in produtos if p["id"] == produto_id), None)
            if not produto:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "Produto não encontrado"}).encode())
                return

            taxa_anual = produto["taxa"]
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

            resultado = {
                "produto": produto,
                "valor_solicitado": valor,
                "prazo": meses,
                "taxa_efetiva_mensal": round(taxa_mensal * 100, 2),
                "parcela_mensal": round(parcela, 2),
                "valor_total_com_juros": round(total, 2),
                "memoria_de_calculo": memoria
            }

            self._set_headers()
            self.wfile.write(json.dumps(resultado).encode())

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Rota não encontrada"}).encode())

def run(server_class=HTTPServer, handler_class=SimpleAPI, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Servidor rodando em http://localhost:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
