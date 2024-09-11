function setSecondSundayOfMarch() {
  let theSecondSunday;
  const currentYear = new Date().getFullYear();

  for (let i = 7; i <= 14; i++) {
    let date = new Date(currentYear, 2, i);
   
    if (date.getDay() === 0) {
      theSecondSunday = date;
      break;
    };
   
    continue;
  };
  
  return theSecondSunday;
};
