import {
  setSearchFocus,
  showClearTextButton,
  clearSearchText,
  clearPushListener,
} from './searchBar.js';

import {
  deleteSearchResults,
  buildSearchResults,
  ClearStatsLine,
  setStatsLine,
} from './searchResults.js';

import { getSearchTerm, retrieveSearchResults } from './dataFunctions.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  // Seta o focus
  setSearchFocus();

  // 3 listeners para limpar a barra de busca
  const search = document.getElementById('search');
  search.addEventListener('input', showClearTextButton);

  const clear = document.getElementById('clear');
  clear.addEventListener('click', clearSearchText);

  clear.addEventListener('keydown', clearPushListener);

  // Submete a busca
  const form = document.getElementById('searchBar');
  form.addEventListener('submit', submitTheSearch);
};

// Primeira função procedural
const submitTheSearch = (event) => {
  event.preventDefault();

  // Apaga os resultados anteriores
  deleteSearchResults();
  // Processa a busca
  processSearch();
  // Seta o focus
  setSearchFocus();
};

// Segunda função procedural
const processSearch = async () => {
  // clear stats line
  ClearStatsLine();
  const searchTerm = getSearchTerm();
  // Termo vazio retorna
  if (searchTerm === '') return;
  // Chama a função principal para buscar o termo
  const resultArray = await retrieveSearchResults(searchTerm);
  //Se houver retorno válido, constrói os resultados
  if (resultArray.length) buildSearchResults(resultArray);
  // Modifica a barra de status
  setStatsLine(resultArray.length);
};
