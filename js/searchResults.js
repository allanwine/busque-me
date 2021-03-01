// Limpa os resultados anteriores
export const deleteSearchResults = () => {
  const parentElement = document.getElementById('searchResults');
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

/* Monta os resultados a partir do array recebido e 
insere no DOM (dentro da Div searchResults) */
export const buildSearchResults = (resultArray) => {
  resultArray.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultContent = document.createElement('div');
    resultContent.classList.add('resultContents');
    if (result.img) {
      const resultImage = createResultImage(result);
      resultContent.append(resultImage);
    }
    const resultText = createResultText(result);
    resultContent.append(resultText);
    resultItem.append(resultContent);
    const searchResults = document.getElementById('searchResults');
    searchResults.append(resultItem);
  });
};

// Cria os elementos HTML do item
const createResultItem = (result) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('resultItem');
  const resultTitle = document.createElement('div');
  resultTitle.classList.add('resultTitle');
  const link = document.createElement('a');
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = '_blank';
  resultTitle.append(link);
  resultItem.append(resultTitle);
  return resultItem;
};

// Cria o elemento HTML de imagem do item
const createResultImage = (result) => {
  const resultImage = document.createElement('div');
  resultImage.classList.add('resultImage');
  const img = document.createElement('img');
  img.src = result.img;
  img.alt = result.title;
  resultImage.append(img);
  return resultImage;
};

// Cria o elemento HTML de resumo do item
const createResultText = (result) => {
  const resultText = document.createElement('div');
  resultText.classList.add('resultText');
  const resultDescription = document.createElement('p');
  resultDescription.classList.add('resultDescription');
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
};

// Limpa a barra de status
export const ClearStatsLine = () => {
  document.getElementById('stats').textContent = '';
};

// Seta as informações na barra de status de acordo com o resultado da busca
export const setStatsLine = (numberOfResults) => {
  const statsLine = document.getElementById('stats');
  if (numberOfResults) {
    statsLine.textContent = `Mostrando ${numberOfResults} resultados.`;
  } else {
    statsLine.textContent =
      'Desculpe, não foram encontrados resultados para sua pesquisa';
  }
};
