/**
 * ProdutoController
 *
 * @description :: Server-side logic for managing Produtoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: function(req, res) {

        console.log('Chegou Aqui 1');

        Produto.find()
        .exec(function(err, produtos) {
            if (err) return res.send(err, 500);

            console.log('Chegou Aqui 2');

            produtos.forEach(function(produto) {
                //ES.index(produto);
            });

            console.log('Chegou Aqui 4');

            res.view('produto/produtos', { produtos: produtos, tipo: 0 });
        });
    },

    search: function(req, res) {
        ES.search(req.param('busca')).then(function(dados) {
            console.log(JSON.stringify(dados));
            res.view('produto/produtos', {produtos: dados.hits.hits, tipo: 1 });
        });
    },

    autocomplete: function(req, res) {
        ES.autocomplete(req.query.term).then(function(dados) {
            if (dados && dados.hits.total != "0") {
                res.send({ dadosAutoComplete: dados.hits.hits, tipo: 1 });
            }
        });
    }
};

