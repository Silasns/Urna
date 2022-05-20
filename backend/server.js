"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var fs = require('fs');
var porta = 3000;
var jwt = require('jsonwebtoken');
var SECRET = "SohEuSei";
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.listen(porta, function () {
    console.log("Servidor rodando na porta " + porta);
});
app.get("/opcoes", function (req, resp) {
    return __awaiter(this, void 0, void 0, function () {
        var buscaOpcoes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tratarOpcoes()];
                case 1:
                    buscaOpcoes = _a.sent();
                    resp.json(buscaOpcoes);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/tipoeleicao", function (req, resp) {
    return __awaiter(this, void 0, void 0, function () {
        var buscaOpcoes, tipo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tratarOpcoes()];
                case 1:
                    buscaOpcoes = _a.sent();
                    tipo = JSON.parse(JSON.stringify(buscaOpcoes));
                    resp.json(tipo.tipo);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/votos", function (req, resp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.readFile("./dados/votos.csv", "utf8", function (error, data) {
                if (error) {
                    console.log("Erro ao ler arquivo");
                }
                else {
                    var dados = data.split(";");
                    dados.pop();
                    resp.send(dados);
                }
            });
            return [2 /*return*/];
        });
    });
});
app.post("/votos", function (req, resp) {
    return __awaiter(this, void 0, void 0, function () {
        var voto;
        return __generator(this, function (_a) {
            voto = req.body.usuario + "," + req.body.voto + "," + req.body.data + ";";
            fs.appendFile("./dados/votos.csv", voto, function (error) {
                if (error) {
                    resp.json({
                        "status": "500",
                        "mensagem": "Erro " + error
                    });
                }
                else {
                    resp.json({
                        "status": "200",
                        "mensagem": "Voto Registrado Com sucesso"
                    });
                }
            });
            return [2 /*return*/];
        });
    });
});
app.post("/conferir", function (req, resp) {
    var usuario = "\"" + req.body.usuario + "\"";
    var todosVotos = [];
    var mensagem = {
        "mensagem": "Usuario autorizado"
    };
    fs.readFile("./dados/votos.csv", "utf8", function (error, data) {
        if (error) {
            console.log("Erro ao ler arquivo");
        }
        else {
            var dados = data.split(";");
            dados.pop();
            todosVotos = dados;
            for (var index = 0; index < todosVotos.length; index++) {
                var atual = todosVotos[index].split(",");
                if ((usuario).toLocaleUpperCase() == (atual[0]).toLocaleUpperCase()) {
                    mensagem = {
                        "mensagem": "Usuario ja votou"
                    };
                    index = todosVotos.length;
                }
            }
        }
        resp.send(mensagem);
    });
});
app.get("/relatorio", function (req, resp) {
    fs.readFile("./dados/votos.csv", "utf8", function (error, data) {
        if (error) {
            console.log("Erro ao ler arquivo: " + error);
        }
        else {
            resp.send(data);
        }
    });
});
function tratarOpcoes() {
    return new Promise(function (resolve, reject) {
        fs.readFile("./dados/opcoes.csv", "utf8", function (error, data) {
            if (error) {
                console.log("Erro ao ler arquivo");
                reject({
                    "mensagem": error
                });
            }
            else {
                if (error) {
                    console.log("Erro ao ler arquivo: " + error);
                }
                else {
                    //var obj: { property: string; } = { property: "foo" };
                    var dados = data.split(";");
                    var dadoInfo = dados[0].split(",");
                    var opcoes = dados[1].split(",");
                    var valores = [];
                    var candidatos = [];
                    var urls = [];
                    for (var index = 0; index < opcoes.length; index += 3) {
                        valores.push(opcoes[index]);
                        candidatos.push(opcoes[index + 1]);
                        urls.push(opcoes[index + 2]);
                    }
                    var array = [];
                    for (var index = 0; index < valores.length; index++) {
                        var opcao = {
                            value: valores[index],
                            nome: candidatos[index],
                            url: urls[index]
                        };
                        array.push(opcao);
                    }
                    var votacao = { titulo: dadoInfo[0], tipo: dadoInfo[1], opcoes: array };
                    resolve(votacao);
                }
            }
        });
    });
}
app.post('/urna', verificaUser, function (req, res) {
    ;
    res.send(req.body);
});
function verificaUser(req, resp, next) {
    var token = req.body.token;
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            return resp.status(401).end();
        }
        req.dec = decoded.xxx;
        next();
    });
}
//login
app.post("/login", function (req, resp) {
    fs.readFile("./dados/usuarios.csv", "utf8", function (err, dados) {
        if (err) {
            resp.send(err);
        }
        else {
            var usuarios_1 = [];
            var usuario = [];
            var arrayUsuarios = dados.split(";");
            arrayUsuarios.forEach(function (element) {
                usuarios_1.push(element.split(","));
            });
            usuarios_1.pop();
            for (var index = 0; index < usuarios_1.length; index++) {
                if (usuarios_1[index][0] == req.body.usuario) {
                    usuario.push(usuarios_1[index][0]);
                    usuario.push(usuarios_1[index][1]);
                }
            }
            if (req.body.usuario == usuario[0] && req.body.senha === usuario[1]) {
                var retornoUsuario = usuario[0];
                var token = jwt.sign({ xxx: req.body.usuario }, SECRET, { expiresIn: 10 });
                return resp.json({ auth: true, token: token, retornoUsuario: retornoUsuario });
            }
            else {
                return resp.status(401).end();
            }
        }
    });
});
app.post("/cadastro", function (req, resp) {
    return __awaiter(this, void 0, void 0, function () {
        var usuario, resolve, usuarios, teste, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usuario = req.body.usuario + "," + req.body.senha + ";";
                    return [4 /*yield*/, verificaUsuarioCadastrado()];
                case 1:
                    resolve = _a.sent();
                    usuarios = [];
                    usuarios.push(resolve);
                    teste = false;
                    //For para verificar se já existe um usuario cadastrado
                    for (i = 0; i < usuarios[0].length; i++) {
                        if ((usuarios[0][i][0]).toUpperCase() == (req.body.usuario).toUpperCase()) {
                            teste = true;
                            resp.json({
                                "status": "401",
                                "mensagem": "Usuário já registrado"
                            });
                        }
                    }
                    //if caso não possua um usuario cadastrado ele cadastra um novo usuario  
                    if (!teste) {
                        fs.appendFile("./dados/usuarios.csv", usuario, function (err) {
                            if (err) {
                                resp.json({
                                    "status": "500",
                                    "mensagem": "Erro " + err
                                });
                            }
                            else {
                                resp.json({
                                    "status": "200",
                                    "mensagem": "Usuário registrado com sucesso"
                                });
                            }
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
function verificaUsuarioCadastrado() {
    return new Promise(function (resolve, reject) {
        fs.readFile("./dados/usuarios.csv", "utf8", function (err, dados) {
            if (err) {
                reject("Erro ao ler os usuários: " + err);
            }
            else {
                var usuarios = [];
                var arrayUsuarios = dados.split(";");
                arrayUsuarios.forEach(function (element) {
                    usuarios.push(element.split(","));
                });
                usuarios.pop();
                resolve(usuarios);
            }
        });
    });
}
