'use strict';

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

function setFirstSundayOfNovember() {
  let theFirstSunday;
  const currentYear = new Date().getFullYear();
  
  for (let i = 1; i <= 7; i++) {
    let date = new Date(currentYear, 10, i);
   
    if (date.getDay() === 0) {
      theFirstSunday = date;
      break;
    };
   
    continue;
  };

  return theFirstSunday;
};

function checkWinterOrSummerTime() {
  const now = new Date().getTime();
  const currentYear = new Date().getFullYear();
 
  if (setSecondSundayOfMarch().getTime() <= now && now < setFirstSundayOfNovember().getTime()) {
    return 'Summer';
  } else {
    return 'Winter';
  };
};

export { checkWinterOrSummerTime };
