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
  }
}
