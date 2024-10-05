'use strict';

import { fetchStates } from './fetchStates.js';

async function isInAlphabeticalOrder() {
  const statesData = await fetchStates();
  const statesArray = Object.keys(statesData).sort();
  
  const clockForState = document.querySelector('#clock-for-states');
  
  if (clockForState.childNodes.length > 0) {
    sortSectionsByStateArray();
  };

  const observer = new MutationObserver(() => {
    sortSectionsByStateArray();
  });
  
  observer.observe(clockForState, {
    childList: true,
    subtree: false
  });

  function sortSectionsByStateArray() {
    statesArray.forEach((state, index) => {
      const stateNoSpaces = state.trim().replaceAll(' ', '');
      const getStateSection = document.querySelector(`.section${stateNoSpaces}`);
      
      if (getStateSection) {
        getStateSection.style.order = index;
      };
    });
  };
};

export { isInAlphabeticalOrder };