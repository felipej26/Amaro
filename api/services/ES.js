console.log('Iniciou ElasticSeach');

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

module.exports = {
    createIndexProduto: function() {

        client.indices.delete({index: 'catalogo'});

        client.indices.create({
            index: 'catalogo',
            body: {
                "mappings": {
                    "produtos": {
                        "properties": {
                            "nome": {
                                "type": "string"
                            },
                            "descricao": {
                                "type": "string",
                                "index": "not_analyzed"
                            },
                            "imagem": {
                                "type": "string",
                                "index": "not_analyzed"
                            },
                            "categoria": {
                                "type": "string"
                            },
                            "subcategoria": {
                                "type": "string"
                            },
                            "cor": {
                                "type": "string"
                            },
                            "tecido": {
                                "type": "string",
                                "index": "not_analyzed"
                            },
                            "tamanho": {
                                "type": "string",
                                "index": "not_analyzed"
                            },
                            "preco": {
                                "type": "float",
                                "index": "not_analyzed"
                            }
                        }
                    }
                }
            }
        }, function(error, response) {
            if (error) console.log(error.message);

            console.log(response);
        });
    },

    index: function(produto) {
        client.index({
            index: 'catalogo',
            type: 'produtos',
            id: produto.id,
            body: produto
        }, function (error, response) {
            console.log(response);
        });
    },

    search: function(busca) {
        return client.search({
            index: 'catalogo',
            type: 'produtos',
            body: {
                query: {
                    query_string:{
                        query: busca
                    }
                }
            }
        }).then(function (dados) {
            return dados;
        }, function (err) {
            console.log(err.message);
        });
    },

    searchByCategorie: function(categoria, subcategoria) {
        return client.search({
            index: 'catalogo',
            type: 'produtos',
            body: {
                query: {
                    bool: {
                        must: {
                            term: {
                                "categoria": categoria
                            }
                        },
                        filter: {
                            term: {
                                "subcategoria": subcategoria
                            }
                        }
                    }
                }
            }
        }).then(function (dados) {
            return dados;
        }, function (err) {
            console.log(err.message);
        });
    },

    autocomplete: function(busca) {
        return client.search({
            index: 'catalogo',
            type: 'produtos',
            body: {
                query: {
                    query_string:{
                        query: busca
                    }
                }
            }
        }).then(function (dados) {
            console.log('Dados Encontrados: ' + JSON.stringify(dados));

            return dados;
        }, function (err) {
            console.log(err.message);
        });
    }
}