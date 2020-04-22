$(document).ready(function(){

  $('#lookingFor').on('click', research);

  $('#search').keypress(function (e) {
      var key = e.which;
      if(key == 13){
          research();
      }
  });

  function research(){

    var search = $('#search').val();
    search = search.replace(" ","+");

    $('#films').html('');

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?",
      method: "GET",
      data: {
          api_key: "886eef916355a6adc533e0b21005b3a1",
          query: search,
      },
      success: function (data) {
        for (var i = 0; i < data.results.length; i++) {
          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);
          var context = {
            poster: data.results[i].poster_path,
            title: data.results[i].title,
            titleOriginal: data.results[i].original_title ,
            rate: converterBase5(data.results[i].vote_average),
            lang: flags(data.results[i].original_language)
          };
          var html = template(context);
          $('#films').append(html);
        }
      },
      error: function(error, status){
      }
    });
  }

  function converterBase5(rate) {
    var converted = (rate * 5) / 10;
    return Array.from(Array(Math.round(converted)).keys());
  };

  function flags(lang) {
    if (lang == "en" ) {
      return "<img src='img/flag-england.png' alt=''>";
    } else if (lang == "it") {
      return "<img src='img/flag-italy.jpg' alt=''>";
    } else {
      return lang;
    }
  };
})
