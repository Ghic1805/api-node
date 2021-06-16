const ClientService = require('../services/ClientService');

module.exports = {
    ping: (req, res) => {
        res.json({pong:true});
    },
    all: async (req, res)=>{
        let json = {error: '', result: []}

        let clients = await ClientService.getAll();


        for(let i in clients) {
            json.result.push({
                id: clients[i].id,
                nome: clients[i].descricao,
                tipo_pessoa: clients[i].tipo_pessoa,
                cpf_cnpj: clients[i].cpf_cnpj,
                cep: clients[i].cep,
                endereco: clients[i].endereco,
                bairro: clients[i].bairro,
                cidade: clients[i].cidade,
                estado: clients[i].estado,
                pais: clients[i].pais,
                numero: clients[i].numero,
                complemento: clients[i].complemento
            });
        }

        res.json(json);
    },
    one: async (req, res) => {
        let json = {error: '', result: {}}

        let id = req.params.id;
        let client = await ClientService.findById(id);

        if(client) {
            json.result = client;
        }

        res.json(json);
    },
    new: async (req, res) => {
        let json = {error: '', result: {}}

        let body = req.body;

        if(body) {

            // if (!['SaaS', 'Locação', 'Serviço Técnico', 'Produto'].includes(body.descricao)) {
            //     json.error = 'campos invaliso';
            //     res.json(json);
            //     return;
            // }

            let clientId = await ClientService.add(body);

            json.result = {
                id: clientId,
                ...body
            }

        } else {
            json.error = 'campos não enviados';
        }


        res.json(json);
    },
    edit: async (req, res) => {
        let json = {error: '', result: {}}

        
        //nome, tipo_pessoa, cpf_cnpj, cep, endereco, bairro, cidade, estado, pais, numero, complemento

        let id = req.params.id;
        let nome = req.body.nome;
        let tipo_pessoa = req.body.tipo_pessoa;
        let cpf_cnpj = req.body.cpf_cnpj;
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let bairro = req.body.bairro;
        let cidade = req.body.cidade;
        let estado = req.body.estado;
        let pais = req.body.pais;
        let numero = req.body.numero;
        let complemento = req.body.complemento;

        if(id && nome && tipo_pessoa && cpf_cnpj && cep && endereco && bairro && cidade && estado && pais && numero && complemento) {

            // const http = require('http');
            // const cep = '88085120'

            // const options = {
            //     hostname: 'viacep.com.br',
            //     port: 80,
            //     path: `/ws/${cep}/json/`,
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // };

            // const req = http.request(options, (res, err) => {
            //     res.setEncoding('utf8');
            //     res.on('data', (chunk) => {
            //         console.log('cep certo');
            //     });
            // });
            // req.on('error', (e) => {
            //     console.error(`problem with request: ${e.message}`);
            //   });
            // req.end();
            // console.log(req);

            const result = await ClientService.update(id, nome, tipo_pessoa, cpf_cnpj, cep, endereco, bairro, cidade, estado, pais, numero, complemento);
            
            if (result.affectedRows === 0) {
                json.error = 'falhou';
            } else {
                json.result = {
                    id,
                    nome,
                    tipo_pessoa,
                    cpf_cnpj,
                    cep,
                    endereco,
                    bairro,
                    cidade,
                    estado,
                    pais,
                    numero,
                    complemento
                }

            }


        } else {
            json.error = 'campos não enviados';
        }

        res.json(json);
    },
    delete: async (req, res) => {
        let json = {error: '', result: {}}

        await ClientService.delete(req.params.id);

        res.json(json);
    }
};