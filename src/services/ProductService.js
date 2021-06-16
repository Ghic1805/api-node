const db = require('../db');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM products', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });
    },
    findById: (id) => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                if(results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },
    add: ({descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao}) => {
        return new Promise((resolve, reject)=>{

            db.query('INSERT INTO products (descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao) VALUES (?, ?, ?, ?, ?)',
                [descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao],
                (error, results) => {
                    if(error) { reject(error); return; }
                    resolve(results.insertId);
                }
            )

        });
    },
    update: (id, descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao) => {        

        return new Promise((resolve, reject)=>{
            db.query('UPDATE products SET descricao = ?, descritivo = ?, valor_de_venda = ?, tipo = ?, forma_de_comercializacao = ? WHERE id = ?',
                [descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao, id],
                (error, results) => {
                    // console.log(error);
                    // console.log(results);
                    if(error) { reject(error); return; }
                    resolve(results);
                }
            )
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject)=>{

            db.query('DELETE FROM products WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                resolve(results);
            });
        });
    }
};