var apiKey = "AIzaSyARXJGDIORZQn_QRIyhaUt9Mq29ALUcpSE";
var canal = "OraculosauroVLOG";
var upload_id;

$(document).ready(function() {
  $.get("https://www.googleapis.com/youtube/v3/channels", {
    part: 'contentDetails',
    forUsername: canal,
    key: apiKey },
    function(data) {
      upload_id = data.items[0].contentDetails.relatedPlaylists.uploads
      pegarVideos(upload_id);
    }
  )

  function pegarVideos(id) {
    $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
      part: 'snippet',
      maxResults: 50,
      key: apiKey,
      playlistId: id },
      function(data) {
        var imagem;
        var arquivo;
        var descricao;
        var titulo;
        $.each(data.items, function(i, item) {
          imagem = item.snippet.thumbnails.medium.url;
          titulo = item.snippet.title;
          descricao = item.snippet.description;
          videoId = item.snippet.resourceId.videoId;
          arquivo = '<li class="principal"><a data-fancybox="gallery" href="https://www.youtube.com/watch?v='+ videoId +'"><div class="foto"><img src="' + imagem + '"/><div class="legenda"><h5>'+ titulo +'</h5><p>'+ descricao +'</p></div></div></a></li>';
          $('div#janela ul').append(arquivo);
        });
      }
    )
  }


});
