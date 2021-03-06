const API_URL = 'https://api.unsplash.com/search?query=photos&image_size%5B%5D=&client_id=API_KEY_GOES_HERE';
const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.images');



loadingImage.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  
  searchStart();
  search(searchTerm)
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = 'none';
    });
}

function searchStart() {
  loadingImage.style.display = '';
  imageSection.innerHTML = '';
}

function search(searchTerm) {
  const url = `${API_URL}&term=${searchTerm}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.photos;
    });
}

function displayImages(images) {
  const forEach = images.forEach(image => {
    const imageElement = document.createElement('img');
    imageElement.src = image.image_url[0];
    imageSection.appendChild(imageElement);
  });



}