
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
      "<a>" +
        "<div class=\"col-lg-3 col-md-3 col-sm-6 col-xs-6\">" +
          "<img src=\"../img/produtos/" + produto.imagem + "\" alt=\"" + produto.nome + "\" style=\"height:200px; width:200px;\">" +
          "<br>" +
          produto.nome +
        "</div>" +
      "</a>"
    )
  });
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