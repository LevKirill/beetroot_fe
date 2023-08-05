let baseUrl = 'https://api.themoviedb.org/3/discover/movie';
let apiKey = 'ddfb10c51e93bea162e98742b4f4c826';
let page = 167;
let imgBaseURL = "https://image.tmdb.org/t/p/w500"

function data () {
  $.ajax({
    url: baseUrl,
    method: 'get',
    dataType: 'json',
    data: {
      api_key: apiKey,
      page: page,
    },
    success: function(data){
      render (data);
      console.log(data);
    },
    error: function (jqXHR, exception) {
      if (jqXHR.status === 0) {
        alert('Not connect. Verify Network.');
      } else if (jqXHR.status == 404) {
        alert('Requested page not found (404).');
      } else if (jqXHR.status == 500) {
        alert('Internal Server Error (500).');
      } else if (exception === 'parsererror') {
        alert('Requested JSON parse failed.');
      } else if (exception === 'timeout') {
        alert('Time out error.');
      } else if (exception === 'abort') {
        alert('Ajax request aborted.');
      } else {
        alert('Uncaught Error. ' + jqXHR.responseText);
      }
    }
  });
}

data ();

function render (data) {
  let items = data.results;
  let itemNav = data.page - 2;
  for (let i = 0; i < items.length; i++) {
    let layout = `<div class="movie">` +
      `<a href="movie.html#id=${items[i].id}"><img src="${imgBaseURL + items[i].poster_path}">` +
      `<h2 class="title">${items[i].title}</h2></a>` +
      `<button onclick="like(${items[i].id})" class="like">like</button>` +
      `</div>`;
    $(".movies").append(layout);
  }
  // console.log(data.total_pages);
  // for (let i = 0; i < 5; i++) {
  //   let listNav = `<li><a href="movie.html#id=${items[i].id}">${itemNav}</li></a>`;
  //   itemNav++;
  //   $('.nav_pages ul').append(listNav);
  // }

}
function like (id) {
  window.localStorage.setItem('movie-'+id, id);
}
