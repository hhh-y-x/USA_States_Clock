import { fetchStates } from './fetchStates.js';
import { checkWinterOrSummerTime } from './updateSummerAndWinterTime.js';

class CreateClockForState {
    constructor(name) {
      this.name = name;
      this.element = null;
      this.noSpacesName = this.name.trim().replaceAll(' ', '');
    };
};
