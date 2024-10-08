'use strict';

import { fetchStates } from './fetchStates.js';
import { checkWinterOrSummerTime } from './updateSummerAndWinterTime.js';

class CreateClockForState {
 
  constructor(name) {
    this.name = name;
    this.element = null;
    this.noSpacesName = this.name.trim().replaceAll(' ', '')
  };

  render() {
    const clockForState = document.querySelector('#clock-for-states');
   
    if (document.querySelector(`.section${this.noSpacesName}`)) {
        return;
    };
   
    const timeSection = document.createElement('section');
    timeSection.classList.add('stateSection', `section${this.noSpacesName}`);
   
    timeSection.innerHTML = `
      <div>
        ${this.name}
      </div>
      <div class="watch clock-state-${this.noSpacesName}">
        <span class="clockElement hours">
          00
        </span>
        <span class="clockElement minutes">
          00
        </span>
        <span class="clockElement seconds">
          00
        </span>
      </div>

      <div id="removeButton${this.noSpacesName}" class="removeState">
        <svg fill="#000000" width="68px" height="68px" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"></path></g></svg>
      </div >
    `;
   
    clockForState.appendChild(timeSection);
    this.element = timeSection;
   
    const removeButton = document.querySelector(`#removeButton${this.noSpacesName}`);
    
    removeButton.addEventListener('click', () => this.removeState());
  };
 
  removeState() {
    this.element.remove();
     
    localStorage.removeItem(`state${this.noSpacesName}`);
    
    document.querySelector(`.searchState${this.noSpacesName}`).hidden = false;
     
    localStorage.removeItem(`hidden${this.noSpacesName}`);
  };
};

class SetClockForState extends CreateClockForState {
 
  constructor(name) {
    super(name);
  };
 
  async getState() {
    const statesData = await fetchStates();
    const state = statesData[this.name];
    return state;
  };
 
  padZero(timeValue) {
    return String(timeValue).padStart(2, '0');
  };
 
  adjustTime(hours) {
    if (hours < 0) {
      return `${Number(hours) + 24}`
    };
   
    return `${Number(hours)}`
  };
 
  checkSeason(now, state) {
    if (checkWinterOrSummerTime() === 'Summer') {
      return now.getUTCHours() + state.GMTSummer;
    };
   
    return now.getUTCHours() + state.GMTWinter;
  };

  timeFormat12(now, state) {
    const stateTime = document.querySelector(`.clock-state-${this.noSpacesName}`);
    let setFormatHour;
    let hours = this.adjustTime(this.checkSeason(now, state));
 
    const addClassAmOrPm = () => {
      const stateElement = document.querySelector(`.clock-state-${this.noSpacesName} .seconds`);
 
      if (Number(hours) < 12) {
        stateElement.classList.remove('pm');
        stateElement.classList.add('am');
      } else if (Number(hours) > 12 ||  Number(hours) === 12) {
        stateElement.classList.remove('am');
        stateElement.classList.add('pm');
      };
    
      return;
    };
 
    if (!stateTime) {
      return
    } else if (Number(hours) > 12) {
      addClassAmOrPm();
      
      setFormatHour = this.adjustTime(hours - 12);
    } else if (Number(hours) === 0) {
      addClassAmOrPm();
      
      setFormatHour = 12;
    } else if (Number(hours) <= 12) {
      addClassAmOrPm();
      
      setFormatHour = this.adjustTime(hours);
    };
 
     return setFormatHour
  };

  timeFormat24(now, state) {
    const secondsSpans = document.querySelectorAll('.seconds');
    const stateTime = document.querySelector(`.clock-state-${this.noSpacesName}`);
 
    if (!stateTime) {
      return;
    } else if (secondsSpans[0].classList.contains('am') || secondsSpans[0].classList.contains('pm')) {
      secondsSpans.forEach((span) => {
        span.classList.remove('am', 'pm');
      });
    };
   
    return this.adjustTime(this.checkSeason(now, state));
  };

  checkSwitch12or24(now, state) {
    const switchBox = document.querySelector('.switch-input');
   
    if (switchBox.checked) {
      return this.timeFormat12(now, state);
    };

    return this.timeFormat24(now, state);
  };

  setDayPeriodClass(hours) {
    const currentTimeStateSection = document.querySelector(`.section${this.name}`);
    
    // 24 format time
    if (hours >= 5 && hours <= 7) {
      currentTimeStateSection.classList.add('morning');
    } else if (hours >= 8 && hours <= 17) {
      currentTimeStateSection.classList.add('afternoon');
    } else if (hours >= 18 && hours <= 20) {
      currentTimeStateSection.classList.add('evening');
    } else if (hours >= 21 || hours >= 4) {
      currentTimeStateSection.classList.add('night');
    };
  };

  updateClockAfterTimeFormat(state) {
    const switchLabel = document.querySelector('.switch-time-format');
    const stateTime = document.querySelector(`.clock-state-${this.noSpacesName}`);
    const hoursElement = stateTime.querySelector('.hours');
   
    switchLabel.addEventListener('click', () => {
      const now = new Date();
      const timeFormatChecker = this.checkSwitch12or24(now, state);
   
      hoursElement.textContent = `${this.padZero(timeFormatChecker)}`;
    });
  };

  async setTimeForState() {
    const state = await this.getState();
    const stateTime = document.querySelector(`.clock-state-${this.noSpacesName}`);
   
    if (!stateTime) {
      return;
    };

    const hoursElement = stateTime.querySelector('.hours');
    const minutesElement = stateTime.querySelector('.minutes');
    const secondsElement = stateTime.querySelector('.seconds');

    const updateClock = () => {
      const now = new Date();
      const timeFormatChecker = this.checkSwitch12or24(now, state);
   
      hoursElement.textContent = `${this.padZero(timeFormatChecker)}`;
      minutesElement.textContent = ` : ${this.padZero(now.getUTCMinutes())} :`;
      secondsElement.textContent = this.padZero(now.getUTCSeconds());

      this.setDayPeriodClass(Number(this.adjustTime(this.checkSeason(now, state))));

      const nextSecond = new Date(now.getTime() + 1000 - now.getMilliseconds());
      const timeToNextSecond = nextSecond.getTime() - now.getTime();

      setTimeout(updateClock, timeToNextSecond);
    };

    updateClock();

    this.updateClockAfterTimeFormat(state);
  };
};  

export { SetClockForState };