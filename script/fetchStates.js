async function fetchStates() {
  try {
    const response = await fetch('./data/GMT.json');
    const dataStates = await response.json();
    
    return dataStates;
  } catch (error) {
    console.error('Error fetching states:', error);
  };
};

export { fetchStates };