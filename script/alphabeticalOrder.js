import { fetchStates } from './fetchStates.js';

async function isInAlphabeticalOrder() {
  const statesData = await fetchStates();
  const statesArray = Object.keys(statesData).sort();
  
  const clockForState = document.querySelector('#clock-for-states');
  
  
};

