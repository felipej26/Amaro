
var serverElasticSearch = "http://localhost:9200"

function buscar() {
    var xhr = new XMLHttpRequest();

    var parent = document.getElementById("lista-produtos");
    var child = document.getElementById("produtos");

    if (child != null) {
      parent.removeChild(child);
    }

    var postData = {
      "query": {
        "query_string": {
          "query": document.getElementById("txtBusca").value
        }
      }
    }

    $.ajax({
      url: serverElasticSearch + "/catalogo/produtos/_search",
      type: "POST",
      dataType: "JSON",
      data: JSON.stringify(postData),
      success: function(data) {
        criarElementos(data);
      },
    });

  /*
  xhr.onreadystatechange = function(data){
      if (this.readyState == 4) {
          location.href = "/acervo";
      }
  }
  xhr.open('POST', '/Produto/search');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  */
}

function criarElementos(data) {
  $("#lista-produtos").append(
    "<div id=\"produtos\"><\div>"
  )
  
  $.map(data.hits.hits, function(p) {
    var produto = p._source;
    $("#produtos").append(
      "<div class=\"box-produto col-lg-3 col-md-3 col-sm-6 col-xs-6\">" +
        "<a onclick=\"abrirProduto(\"" + produto.id + "\")\">" +
          "<div>" +
            "<img class=\"image-produto img-responsive\" src=\"/img/produtos/" + produto.imagem + "\" alt=\"" + produto.nome + "\">" +
          "</div>" +
          "<br>" +
          "<div class=\"info-produto\">" +
            "<div class=\"nome-produto\">" +
               produto.nome +
            "</div>" +
            "R$ " + produto.preco +
          "</div>" +
        "</a>" +
      "</div>"
    )
  });
}

function abrirProduto(id) {
  $.ajax({
    url: serverElasticSearch + "/catalogo/produtos/_search?q=id:" + id,
    type: "GET",
    success: function(data) {
      var produto = data.hits.hits[0]._source;
      alert(JSON.stringify(produto));
    },
  });
}

function runScript(e) {
    if (e.keyCode == 13) {
        buscar();
        return false;
    }
}

function insertParam(key, value) {
    key = encodeURI(key); value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&'); 
}

$(function(){

  /* Altera a URL
  history.pushState({}, null, "AAAA");
  */
  $("#txtBusca").autocomplete({
    source: function(request, response) {
      var postData = {
        "query": {
          "query_string": {
            "query": request.term.toLowerCase()
          }
        }
      }
      
      $.ajax({
        url: serverElasticSearch + "/catalogo/produtos/_search",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(postData),
        success: function(data) {
          response($.map(data.hits.hits, function(item) {
            return {
              label: item._source.nome,
              id: item._source._id
            }
          }));
        },
      });
    },
    minLength: 2
  });
});