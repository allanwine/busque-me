// Prepara o termo de busca para inclusão na URL
export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById('search').value.trim();
  //filtra espaços extras e substitui por espaços simples
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ');
  return searchTerm;
};

/* Função principal, faz a busca, processa o array de resposta e retorna
o array de resultados */
export const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchString = getWikiSearchString(searchTerm);
  const wikiSearchResults = await requestData(wikiSearchString);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty('query')) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

// Monta a URL da busca
const getWikiSearchString = (searchTerm) => {
  const maxChars = getMaxChars();

  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=25&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;

  // Encoda a string de busca para UTF-8
  const searchString = encodeURI(rawSearchString);
  console.log(searchString);
  return searchString;
};

/* Verifica a largura da janela para determinar quantos 
caracteres de resumo mostrar */
const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  if (width < 414) maxChars = 65;
  if (width >= 414 && width < 1400) maxChars = 100;
  if (width >= 1400) maxChars = 130;
  return maxChars;
};

// Faz o fetch a partir da URL montada
const requestData = async (searchString) => {
  try {
    const resp = await fetch(searchString);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

/* Processa o array de retorno da fetch atribuindo a cada resultado 
as informações que serão renderizadas na forma de resultados */
const processWikiResults = (results) => {
  const resultArray = [];
  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty('thumbnail')
      ? results[key].thumbnail.source
      : null;
    const item = {
      id: id,
      title: title,
      img: img,
      text: text,
    };
    resultArray.push(item);
  });
  return resultArray;
};
