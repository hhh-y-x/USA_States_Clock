'use strict';

import { SetClockForState } from './clock.js';
import { checkIsStateInLocalStorage } from './util/localStorage.js';

function addStatesToDOM() {
  for (let i = 0; i < localStorage.length; i++) {
    let keyInLocalStorage = localStorage.key(i);
    if (checkIsStateInLocalStorage(keyInLocalStorage)) {
      let createAndSetTime = new SetClockForState(localStorage.getItem(keyInLocalStorage));
       
      createAndSetTime.render();
      createAndSetTime.setTimeForState();
    };
  };
};

export { addStatesToDOM };