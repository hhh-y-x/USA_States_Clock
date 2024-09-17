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

function checkIsHidden(dataStates) {
  Object.keys(dataStates).forEach(state => {
    const statesClass = `.searchState${state.trim().replaceAll(' ', '')}`;
    const elementLi = document.querySelector(statesClass);
  
    if (localStorage.getItem(`hidden${state.trim().replaceAll(' ', '')}`)) {
      elementLi.hidden = true;
    };
  });
};
  
