const db = require('../db');
//const http = require('http');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM clients', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });
    },
    findById: (id) => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM clients WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                if(results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },
    add: ({nome, tipo_pessoa, cpf_cnpj, cep, endereco, bairro, cidade, estado, pais, numero, complemento}) => {
        return new Promise((resolve, reject)=>{

            db.query('INSERT INTO clients (nome, tipo_pessoa, cpf_cnpj, cep, endereco, bairro, cidade, estado, pais, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nome, tipo_pessoa, cpf_cnpj, cep, endereco, bairro, cidade, estado, pais, numero, complemento],
                (error, results) => {
                    if(error) { reject(error); return; }
                    resolve(results.insertId);
                }
            )

        });
    },
    update: (id, nome, tipo_pessoa, cpf_cnpj, cep, endereco, bairro, cidade, estado, pais, numero, complemento) => {
        // {
        // "cep": "88085-120",
        // "logradouro": "Rua Joaquim Carneiro",
        // "complemento": "até 678/679",
        // "bairro": "Capoeiras",
        // "localidade": "Florianópolis",
        // "uf": "SC",
        // "ibge": "4205407",
        // "gia": "",
        // "ddd": "48",
        // "siafi": "8105"
        // }
        // const inputdousu = {
        //     a: 1
        // }

        // const correio = {
        //     endereco: 'aaa'
        // }

        // inputdousu.endereco = correio.endereco;
        

        return new Promise((resolve, reject)=>{
            db.query('UPDATE clients SET nome = ?, tipo_pessoa = ?, cpf_cnpj = ?, cep = ?, endereco = ?, bairro = ?, cidade = ?, estado = ?, pais = ?, numero = ?, complemento = ? WHERE id = ?',
                [nome, tipo_pessoa, cpf_cnpj, cep, endereco, bairro, cidade, estado, pais, numero, complemento, id],
                (error, results) => {
                   // console.log(error);
                   //console.log(results);
                    if(error) { reject(error); return; }
                    resolve(results);
                }
            )
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject)=>{

            db.query('DELETE FROM clients WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                resolve(results);
            });
        });
    }
};