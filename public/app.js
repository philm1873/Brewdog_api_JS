var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var completeRequest = function() {
  if (this.status !== 200) return;
  localStorage.setItem('beers', this.responseText)
  displayBeers();
};

var displayBeers = function() {
  var jsonString = localStorage.getItem('beers');
  var beers = JSON.parse(jsonString);
  beers.forEach(function(beer) {
    var container = document.querySelector('#beer-list');
    var pTag = document.createElement('p');
    pTag.innerText = "Beer name: " + beer.name;
    container.appendChild(pTag);
    var image = document.createElement('img');
    image.setAttribute('src', beer.image_url);
    image.setAttribute('width', 50);
    container.appendChild(image);
  })
};

var app = function(){
  var url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, completeRequest);
};

document.addEventListener('DOMContentLoaded', app);
