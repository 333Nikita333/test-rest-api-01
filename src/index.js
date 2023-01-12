import './css/styles.css';
const debounce = require('lodash.debounce');

const BASE_URL = 'https://api.disneyapi.dev';
const listDisneyCharacters = document.querySelector(
  '.js-list-disney-characters'
);
const input = document.querySelector('.search-box');
const DELAY = '300';
input.addEventListener('input', debounce(onSearch, DELAY));

function fetchDisneyCharacters() {
  return fetch(`${BASE_URL}/characters`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchDisneyCharacterByName(name) {
  return fetch(`${BASE_URL}/character?name=${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
fetchDisneyCharacters().then(renderMarkupDisneyCharacters).catch(onError);

function renderMarkupDisneyCharacters({ data }) {
  console.log(data);
  const markupCharactersCards = data
    .map(
      ({ imageUrl, name }) =>
        `<li class="js-item-disney">
        <img src="${imageUrl}" alt="disney character" width="300px" height="300px"/>
        <h2 class="js-title-disney">${name}</h2>
      </li>`
    )
    .join('');

  listDisneyCharacters.innerHTML = markupCharactersCards;
}

function onError() {
  return alert('Something went wrong');
}

function onSearch(e) {
  const searchQuerry = e.target.value.trim();

  fetchDisneyCharacterByName(searchQuerry)
    .then(renderMarkupDisneyCharacters)
    .catch(onError);
}
