import { CreateClockForState } from './clock.js';

function showTooltipBtnForMobile() {
    if ( !CreateClockForState.isMobile() ) return;

    const tooltipDiv = document.querySelector('.tooltip');
    const descendants = tooltipDiv.querySelectorAll('*');
    const bubbleTooltipDiv = document.querySelector('.tooltip-bubble');

    tooltipDiv.style.display = 'inline-block';
};