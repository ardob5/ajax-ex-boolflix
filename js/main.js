$(document).ready(function(){

  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var contentFilms = $('#films');

  $('#lookingFor').on('click', research);

  $('#search').keypress(function (e) {
      var key = e.which;
      if(key == 13){
        research();
      }
  });

  // ?????????
  // $(".container").mouseenter(
  // function() {
  //   $(this).children(".img-cards").style().display("none");
  // });
  // ???????????

  function research(){

    var search = $('#search').val();
    search = search.replace(" ","+");

    contentFilms.html('');

    // Film Request
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?",
      method: "GET",
      data: {
        api_key: "886eef916355a6adc533e0b21005b3a1",
        query: search,
      },
      success: function (data) {
        var requestList = data.results;
        outputGenerator(requestList, "Film");
      },
      error: function(error, status){
      }
    });

    // TV Request
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data: {
        api_key: "886eef916355a6adc533e0b21005b3a1",
        query: search,
      },
      success: function (data) {
        var requestList = data.results;
        outputGenerator(requestList, "SerieTV");
      },
      error: function(error, status){
      }
    });
  };




  // OutputGenerator Function
  function outputGenerator(objectsList, type) {
    for (var i = 0; i < objectsList.length; i++) {

      var movie = objectsList[i];
      var titleMovie, originalTitle;


      if (type === "Film") {
        titleMovie = movie.title;
        originalTitle = movie.original_title;
      } else if (type === "SerieTV"){
        titleMovie = movie.name;
        originalTitle = movie.original_title;
      }

      var context = {
        title: titleMovie,
        titleOriginal: originalTitle,
        rate: converterBaseFive(movie.vote_average),
        lang: flags(movie.original_language),
        requestType: type,
        poster: posterGenerator(movie.poster_path),
        overview: movie.overview
      }

      var html = template(context);
      contentFilms.append(html);

    }
  };

  // Converter Function
  function converterBaseFive(rate) {
    var convertedNum = (rate * 5) / 10;
    var stars = "";
    for (var i = 0; i < 5; i++) {
      if (i <= convertedNum) {
        stars += '<i class="fas fa-star"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      };
    }
    return stars;
  };

  // Flags Function
  function flags(lang) {

    if (lang == "en" ) {
      return "<img src='img/flag-england.png' alt=''>";
    } else if (lang == "it") {
      return "<img src='img/flag-italy.jpg' alt=''>";
    } else {
      return lang;
    }
  };

  // Poster Function
  function posterGenerator(urlImg) {
    var myPoster;
    if (urlImg) {
      var newUrl = "https://image.tmdb.org/t/p/w342" + urlImg;
      return myPoster = "<img src='" + newUrl + "' alt='immagine'>"
    }
    return myPoster;
  }


});

// FINE
