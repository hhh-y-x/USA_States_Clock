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

function saveTimeFormat() {
  const switchLabel = document.querySelector('.switch-time-format');
  const switchBox = document.querySelector('.switch-input');
  const isChecked = JSON.parse(localStorage.getItem('checkbox'));
  
  if (isChecked === null) {
    localStorage.setItem('checkbox', JSON.stringify(true));
    switchBox.checked = true;
  } else {
    switchBox.checked = isChecked;
  };

  switchLabel.addEventListener('click', () => {
    const isChecked = switchBox.checked;
    localStorage.setItem('checkbox', JSON.stringify(isChecked));
  });
};
  
