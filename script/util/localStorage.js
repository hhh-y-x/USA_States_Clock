function saveStates(stateName) {
  if (localStorage.getItem(stateName) === null) {
    localStorage.setItem(`state${stateName.replaceAll(' ', '')}`, stateName);
  };
};

function checkIsStateInLocalStorage(key) {
  if (key.startsWith('state')) {
    return true;
  };
};

function escapeLiState(stateName) {
  localStorage.setItem(`hidden${stateName.replaceAll(' ', '')}`, true);
};
  