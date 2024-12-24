import { CreateClockForState } from './clock.js';

function showTooltipBtnForMobile() {
    if ( !CreateClockForState.isMobile() ) return;
};