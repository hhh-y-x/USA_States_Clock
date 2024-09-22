import { fetchStates } from './fetchStates.js';

async function isInAlphabeticalOrder() {
  const statesData = await fetchStates();
  const statesArray = Object.keys(statesData).sort();
  
  const clockForState = document.querySelector('#clock-for-states');
  
  const observer = new MutationObserver(() => {
    statesArray.forEach((state, index) => {
      const stateNoSpaces = state.trim().replaceAll(' ', '');
      const getStateSection = document.querySelector(`.section${stateNoSpaces}`);
      
      if (getStateSection) {
        getStateSection.style.order = index;
      };
    });
  });

};

