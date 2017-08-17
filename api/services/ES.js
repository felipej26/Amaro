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
                "settings": {
                    "analysis": {
                        "filter": {
                            "autocomplete_filter": {
                                "type": "edge_ngram",
                                "min_gram": 1,
                                "max_gram": 10
                            }
                        },
                        "analyzer": {
                            "autocomplete": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "filter": [
                                    "lowercase",
                                    "autocomplete_filter"
                                ]
                            }
                        }
                    }
                },
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
                                "type": "integer",
                                "index": "not_analyzed"
                            },
                            "subcategoria": {
                                "type": "integer",
                                "index": "not_analyzed"
                            },
                            "cor": {
                                "type": "string",
                                "index": "not_analyzed"
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