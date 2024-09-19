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
 
  searchItems.forEach((element) => {
    element.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const chosenLi = event.target;
        const chosenLiText = event.target.textContent.trim();
       
        escapeLiState(chosenLiText);
       
        let createAndSetTime = new SetClockForState(chosenLiText);
       
        createAndSetTime.render();
        createAndSetTime.setTimeForState();
   
        chosenLi.hidden = localStorage.getItem(`hidden${chosenLiText.replaceAll(' ', '')}`);
       
        saveStates(chosenLiText);
      };
    });
  });
};

export { renderStates, setClickToState };