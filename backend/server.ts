import { json } from "stream/consumers";

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const porta = 3000;
const jwt = require('jsonwebtoken');
const SECRET = "SohEuSei"

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(porta, function () {
    console.log(`Servidor rodando na porta ${porta}`)
});

app.get("/opcoes", async function (req, resp) {

    let buscaOpcoes = await tratarOpcoes()

    resp.json(buscaOpcoes)

})

app.get("/tipoeleicao", async function (req, resp) {

    let buscaOpcoes = await tratarOpcoes()
    let tipo = JSON.parse(JSON.stringify(buscaOpcoes))

    resp.json(tipo.tipo)

})

app.get("/votos", async function (req, resp) {
    fs.readFile("./dados/votos.csv", "utf8", function (error, data) {
        if (error) {
            console.log("Erro ao ler arquivo");
        } else {
            let dados = data.split(";");
            dados.pop()
            resp.send(dados)
        }
    })
})

app.post("/votos",async function (req, resp) {
    let voto: string = `${req.body.usuario},${req.body.voto},${req.body.data};`


    fs.appendFile("./dados/votos.csv", voto, function (error) {

        if (error) {
            resp.json({
                "status": "500",
                "mensagem": `Erro ${error}`
            })
        } else {
            resp.json({
                "status": "200",
                "mensagem": "Voto Registrado Com sucesso"
            })
        }
    })
})

app.post("/conferir", function (req, resp) {

    let usuario: string = `"${req.body.usuario}"`
    var todosVotos = []

    let mensagem = {
        "mensagem": "Usuario autorizado"
    }


    fs.readFile("./dados/votos.csv", "utf8", function (error, data) {
        if (error) {
            console.log("Erro ao ler arquivo");
        } else {
            let dados = data.split(";");
            dados.pop()
            todosVotos = dados
            for (let index = 0; index < todosVotos.length; index++) {
                let atual = todosVotos[index].split(",")
                if ((usuario).toLocaleUpperCase() == (atual[0]).toLocaleUpperCase()) {
                    mensagem = {
                        "mensagem":"Usuario ja votou" 
                    }                   
                    index = todosVotos.length
                }
            }
        }
        resp.send(mensagem)
    })
})





app.get("/relatorio", function (req, resp) {
    fs.readFile("./dados/votos.csv", "utf8", function (error, data) {

        if (error) {
            console.log(`Erro ao ler arquivo: ${error}`);
        } else {


            resp.send(data)
        }
    })
})

function tratarOpcoes() {
    return new Promise(function (resolve, reject) {
        fs.readFile("./dados/opcoes.csv", "utf8", function (error, data) {
            if (error) {
                console.log("Erro ao ler arquivo");
                reject({
                    "mensagem": error
                })
            } else {
                if (error) {
                    console.log(`Erro ao ler arquivo: ${error}`);
                } else {
                    //var obj: { property: string; } = { property: "foo" };

                    let dados = data.split(";");
                    let dadoInfo = dados[0].split(",");
                    let opcoes = dados[1].split(",");
                    
                    let valores: string[] = []
                    let candidatos: string[] = []
                    let urls:string[]=[]
                    
                    for (let index = 0; index < opcoes.length; index+=3) {
                        valores.push(opcoes[index])
                        candidatos.push(opcoes[index+1])
                        urls.push(opcoes[index+2])
                    }
                    var array: any[] = []

                    for (let index = 0; index < valores.length; index++) {

                        let opcao: {
                            value: string,
                            nome: string,
                            url:string
                        } = {
                            value: valores[index],
                            nome: candidatos[index],
                            url:urls[index]
                        }
                        array.push(opcao);
                    }
                    let votacao: {
                        titulo: string,
                        tipo: string,
                        opcoes: any[]
                    } = { titulo: dadoInfo[0], tipo: dadoInfo[1], opcoes: array }
                    
                    resolve(votacao)
                }
            }
        })
    })
}

app.post('/urna',verificaUser,function(req,res){;
    res.send(req.body)
})

function verificaUser(req, resp, next) {

    const token = req.body.token
    
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            return resp.status(401).end()
        }
        req.dec = decoded.xxx
        next()
    })
}

//login

app.post("/login", function (req, resp) {
    fs.readFile("./dados/usuarios.csv", "utf8", function (err, dados) {
        if (err) {
            resp.send(err)
        } else {
            let usuarios = []
            let usuario = []
            let arrayUsuarios = dados.split(";")
            
            arrayUsuarios.forEach(function (element) {
                usuarios.push(element.split(","))
            })
            usuarios.pop()
            for (let index = 0; index < usuarios.length; index++) {
                if (usuarios[index][0] == req.body.usuario) {
                    usuario.push(usuarios[index][0])
                    usuario.push(usuarios[index][1])
                }
            }  
            
            if (req.body.usuario == usuario[0] && req.body.senha === usuario[1]) {
                let retornoUsuario = usuario[0]
                const token = jwt.sign({ xxx: req.body.usuario }, SECRET, { expiresIn: 10 })
                return resp.json({ auth: true, token, retornoUsuario })
            }else{
                return resp.status(401).end()
            }
        }
    })

})

app.post("/cadastro", async function(req, resp){
    let usuario: string = `${req.body.usuario},${req.body.senha};`
    let resolve =  await verificaUsuarioCadastrado()
    let usuarios = []
    usuarios.push(resolve)
    let teste: boolean = false;
    //For para verificar se já existe um usuario cadastrado
    for (let i = 0; i < usuarios[0].length; i++) { 
        if ((usuarios[0][i][0]).toUpperCase() == (req.body.usuario).toUpperCase()) { 
            teste = true
             resp.json({
                "status": "401",
                "mensagem": "Usuário já registrado"
            })      
        }                 
    }
    //if caso não possua um usuario cadastrado ele cadastra um novo usuario  
    if (!teste) {        
        fs.appendFile("./dados/usuarios.csv", usuario, function (err) {        
            if (err) {
                resp.json({
                    "status": "500",
                    "mensagem": `Erro ${err}`
                })
            }else {
                
                  resp.json({
                  "status": "200",
                      "mensagem": "Usuário registrado com sucesso"
                  })
            } 
       
        })
    }
    
})

function verificaUsuarioCadastrado() {
    return new Promise(function (resolve, reject) { 
        fs.readFile("./dados/usuarios.csv",  "utf8", function (err, dados) {
            if (err) {
                reject("Erro ao ler os usuários: " + err)
            } else {
                var usuarios = []    
                let arrayUsuarios = dados.split(";")

                arrayUsuarios.forEach(function (element) {
                    usuarios.push(element.split(","))
                })
                usuarios.pop()
                resolve(usuarios)
            }
        })

    })
}