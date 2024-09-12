import { fetchStates } from './fetchStates.js';

async function renderStates() {
  try {
    const dataStates = await fetchStates();
    const ulStates = document.querySelector('#states');

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
        console.log(chosenLiText);
      };
    });
  });
};
