'use strict';

import { fetchStates } from './fetchStates.js';
import { SetClockForState } from './clock.js';
import { saveStates , escapeLiState, checkIsHidden, saveTimeFormat } from './util/localStorage.js';
import { addStatesToDOM } from './addStatesToDOM.js';


async function renderStates() {
  try {
    const dataStates = await fetchStates();
    const ulStates = document.getElementById('states');

    let searchCatalog = '';
    Object.keys(dataStates).forEach(state => {
      searchCatalog += `
        <li class="the-state-in-search hide searchState${state.trim().replaceAll(' ', '')}">
          ${state}
        </li>
      `;
    });
    
    ulStates.innerHTML = searchCatalog;
   
    document.querySelector('#state-search-input').addEventListener('input', search);
   
    setClickToState();
   
    if (localStorage.length !== 0) {
      addStatesToDOM()
      checkIsHidden(dataStates);
      saveTimeFormat();
    };
  } catch (error) {
    console.error('Error rendering states:', error);
  };
};

function search() {
  const value = this.value.trim().toLowerCase();
  const searchItems = document.querySelectorAll('#states li');
 
  searchItems.forEach(element => {
    const stateName = element.innerText.trim().toLowerCase();
    if (value !== '') {
      if (stateName.includes(value)) {
        element.classList.remove('hide');
      } else {
        element.classList.add('hide');
      };
    } else {
      element.classList.add('hide');
    };
  });
};

function setClickToState() {
  const searchItems = document.querySelectorAll('#states li');

  const selectStateAndSetTime = (event) => {
    const targetElement = event.target || event;

    if (targetElement && targetElement.tagName === 'LI') {
      const chosenLi = event.target;
      const chosenLiText = event.target.textContent.trim();
     
      escapeLiState(chosenLiText);
     
      let createAndSetTime = new SetClockForState(chosenLiText);
     
      createAndSetTime.render();
      createAndSetTime.setTimeForState();
      
      chosenLi.hidden = localStorage.getItem(`hidden${chosenLiText.replaceAll(' ', '')}`);
     
      saveStates(chosenLiText);
    };
  };

  searchItems.forEach((element) => {
    element.addEventListener('click', selectStateAndSetTime);
  });

  navigateListWithArrows(selectStateAndSetTime);
};

function navigateListWithArrows(selectStateAndSetTime) {
  const searchInput = document.querySelector('#state-search-input');
  let currentFocusedIndex = -1;
  const focusedClassWithArrow = 'focuse-with-arrow';

  document.addEventListener('keydown', (event) => {
    const statesInSearchVisible = document.querySelectorAll('#states li:not(.hide):not([hidden])');
  
    if (statesInSearchVisible.length === 0) return;
    
    if (document.activeElement === searchInput) removeClassFocusedForLi();

    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && document.activeElement === searchInput) {
      searchInput.blur();
    };
  
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      currentFocusedIndex++;
      
      if ((statesInSearchVisible.length - 1) < currentFocusedIndex) {
        currentFocusedIndex = 0;

        statesInSearchVisible[statesInSearchVisible.length - 1].classList.remove(focusedClassWithArrow);
      } else if (currentFocusedIndex > 0) {
        statesInSearchVisible[currentFocusedIndex - 1].classList.remove(focusedClassWithArrow);
      };

      statesInSearchVisible[currentFocusedIndex].classList.add(focusedClassWithArrow);
      
      statesInSearchVisible[currentFocusedIndex].scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      
      currentFocusedIndex--;

      if (currentFocusedIndex < 0) {
        currentFocusedIndex = statesInSearchVisible.length - 1;
        
        statesInSearchVisible[currentFocusedIndex].classList.add(focusedClassWithArrow);
        statesInSearchVisible[0].classList.remove(focusedClassWithArrow)
      } else if (currentFocusedIndex !== statesInSearchVisible.length - 1){
        statesInSearchVisible[currentFocusedIndex].classList.add(focusedClassWithArrow);
        statesInSearchVisible[currentFocusedIndex + 1].classList.remove(focusedClassWithArrow);
      };
      
      statesInSearchVisible[currentFocusedIndex].scrollIntoView({ block: 'nearest' });
    };

    if (event.key === 'Enter') {
      let chosenLi = {
        target: document.querySelector(`.${focusedClassWithArrow}`)
      };

      selectStateAndSetTime(chosenLi);
      
      removeClassFocusedForLi();
    };
  });

  function removeClassFocusedForLi() {
    const statesInSearch = document.querySelectorAll('#states li');
   
    currentFocusedIndex = -1;

    statesInSearch.forEach((li) => {
      if (li.classList.contains(focusedClassWithArrow)) {
        li.classList.remove(focusedClassWithArrow);
      };
    });
  };

  function removeClassFocusedForLiIfHover() {
    document.addEventListener('mouseover', (element) => { 
      if (element.target.tagName === 'LI') {
        removeClassFocusedForLi();
      };
    });
  };

  removeClassFocusedForLiIfHover();
};

export { renderStates, setClickToState };