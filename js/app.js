var cnn
var bbc
var nyt
$(document).ready(function () {
  $.ajax({
    url: "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=NkRWUHzaw7phw8fxDn0cFB3Cc0BybaLU",
    type: "get",
    success: function (res) {
      nyt = res
      $("#main").append("<h1>Select Source to view articles</h1>")
      $(".loader").hide()
    },
    error: function (xhr, status, err) {
      alert(err)
    }
  })

  $.ajax({
    url: "https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=08902d874d864755b523b2074c71f416",
    type: "get",
    success: function (res) {
      cnn = res
    },
    error: function (xhr, status, err) {
      alert(err)
    }
  })

  $.ajax({
    url: "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=08902d874d864755b523b2074c71f416",
    type: "get",
    success: function (res) {
      bbc = res
    },
    error: function (xhr, status, err) {
      alert(err)
    }
  })
})

function popUp(id) {
  array = id.split("+")
  $("#main").append(`<div id="popUp">
    <a href="javascript:closePopUp()" class="closePopUp">X</a>
    <div class="container">
      <h1>${array[0]}</h1>
      <p>
      ${array[1]}
      </p>
      <a href="${array[2]}" id = "link" class="popUpAction" target="_blank">Read more from source</a>
    </div>
    </div>`)
}

function closePopUp() {
  var para = document.getElementById("main");
  var child = document.getElementById("popUp");
  para.removeChild(child)
}

function puplishCNN() {
  $("#main").html("")
  $("#sourceName").html("CNN")
  cnn.articles.forEach(element => {
    published_date = element.publishedAt.split("T")
    date = published_date[0]
    $("#main").append(`<article class="article" id = "${element.title}+${element.description}+${element.url}" onClick="popUp(this.id)">
          <section class="featuredImage">
            <img src="${element.urlToImage}" alt="" />
          </section>
          <section class="articleContent">
              <a href="#"><h3>${element.title}</h3></a>
              <h6>${element.author}</h6>
          </section>
          <section class="impressions">
          ${date}
          </section>
          <div class="clearfix"></div>
        </article>`)
  });
}

function puplishBBC() {
  $("#main").html("")
  $("#sourceName").html("BBC")
  bbc.articles.forEach(element => {
    published_date = element.publishedAt.split("T")
    date = published_date[0]
    $("#main").append(`<article class="article" id = "${element.title}+${element.description}+${element.url}" onClick="popUp(this.id)">
            <section class="featuredImage">
              <img src="${element.urlToImage}" alt="" />
            </section>
            <section class="articleContent">
                <a href="#"><h3>${element.title}</h3></a>
                <h6>${element.author}</h6>
            </section>
            <section class="impressions">
            ${date}
            </section>
            <div class="clearfix"></div>
          </article>`)
  });
}

function puplishNYT() {
  $("#main").html("")
  $("#sourceName").html("The new york times")
  nyt.results.forEach(element => {
    published_date = element.published_date.split("T")
    date = published_date[0]
    $("#main").append(`<article class="article" id = "${element.title}+${element.abstract}+${element.url}" onClick="popUp(this.id)">
          <section class="featuredImage">
            <img src="${element.thumbnail_standard}" alt="" />
          </section>
          <section class="articleContent">
              <a href="#"><h3>${element.title}</h3></a>
              <h6>${element.section}</h6>
          </section>
          <section class="impressions">
          ${date}
          </section>
          <div class="clearfix"></div>
        </article>`)
  });
}

function headerClicked() {
  $("#sourceName").html("")
  $("#main").html("<h1>Select Source to view articles</h1>")
}