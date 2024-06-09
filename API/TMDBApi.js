
import { API_TOKEN } from '@env';

export async function getFilmsFromApiWithSearchedText(text, page) {
  const url =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    API_TOKEN +
    '&language=fr&query=' +
    text +
    '&page=' +
    page;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}
export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name;
}

// Récupération du détail d'un film
export async function getFilmDetailFromApi(id) {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        id +
        '?api_key=' +
        API_TOKEN +
        '&language=fr',
    );
    return await response.json();
  } catch (error) {
    return console.error(error);
  }
}
// Récupération des derniers films
export async function getBestFilmsFromApi(page) {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=' +
        API_TOKEN +
        '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' +
        page,
    );
    return await response.json();
  } catch (error) {
    return console.error(error);
  }
}

// Récupération des films sur base des notes>6.9 par ordre descendant
export async function getFilmsSortedByDescRatingFromApi(page) {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=' +
        API_TOKEN +
        '&vote_average.gte=10&release_date.gte=2019-10-01&release_date.lte=2023-09-31&sort_by=vote_average.desc&sort_by=release_date.desc&language=fr&page=' +
        page,
    );
    return await response.json();
  } catch (error) {
    return console.error(error);
  }
}

// Récupération des films sur base de l'ordre alphabétique des films
export function getFilmsSortedByAscTitleFromApi(page) {
  return fetch(
    'https://api.themoviedb.org/3/discover/movie?api_key=' +
      API_TOKEN +
      '&vote_count.gte=1000&release_date.gte=2019-10-01&release_date.lte=2023-09-30&sort_by=title.desc&sort_by=release_date.desc&language=fr&page=' +
      page,
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
// Récupération des films sur base de genres (Action)
export function getFilmsSortedByGenreActionFromApi(page) {
  return fetch(
    'https://api.themoviedb.org/3/discover/movie?api_key=' +
      API_TOKEN +
      '&with_genres=28&language=fr&page=' +
      page,
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
// Récupération des films sur base de genres (Horror)
export function getFilmsSortedByGenreHorrorFromApi(page) {
  return fetch(
    'https://api.themoviedb.org/3/discover/movie?api_key=' +
      API_TOKEN +
      '&with_genres=27&language=fr&page=' +
      page,
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getNewFilmFromApi() {
  var today = new Date();
  var month =
    today.getMonth() + 1 < 10
      ? '0' + (today.getMonth() + 1)
      : today.getMonth() + 1;

  var day =
    today.getDate() + 1 < 10
      ? '0' + (today.getDate() + 1)
      : today.getDate() + 1;

  return fetch(
    'https://api.themoviedb.org/3/discover/movie?api_key=' +
      API_TOKEN +
      '&release_date.gte=2019-09-01&release_date.lte=' +
      today.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      '&language=fr&page='
  )
  .then((response) => {
    //console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => console.error(error));
}
