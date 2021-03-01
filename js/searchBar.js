// Seta o focus na barra
export const setSearchFocus = () => {
  document.getElementById('search').focus();
};

// Apenas exibe o botão clear se houver texto na barra
export const showClearTextButton = () => {
  const search = document.getElementById('search');
  const clear = document.getElementById('clear');
  if (search.value.length) {
    clear.classList.remove('none');
    clear.classList.add('flex');
  } else {
    clear.classList.add('none');
    clear.classList.remove('flex');
  }
};

// Limpa o texto na barra
export const clearSearchText = (event) => {
  event.preventDefault();
  document.getElementById('search').value = '';
  const clear = document.getElementById('clear');
  clear.classList.add('none');
  clear.classList.remove('flex');
  setSearchFocus();
};

// Permite ativar o botão clear com enter ou espaço - acessibilidade
export const clearPushListener = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    document.getElementById('clear').click();
  }
};
