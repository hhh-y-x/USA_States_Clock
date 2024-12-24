import { CreateClockForState } from './clock.js';

function showTooltipBtnForMobile() {
    if ( !CreateClockForState.isMobile() ) return;

    const tooltipDiv = document.querySelector('.tooltip');
    const descendants = tooltipDiv.querySelectorAll('*');
    const bubbleTooltipDiv = document.querySelector('.tooltip-bubble');

    tooltipDiv.style.display = 'inline-block';

    function showTooltipBubble(event) {
        if (event.target.classList.contains('tooltip') || Array.from(descendants).includes(event.target)) {
            const isBubbleDisplayBlock = window.getComputedStyle(bubbleTooltipDiv).display === 'block';

            if (isBubbleDisplayBlock) {
                bubbleTooltipDiv.style.display = 'none';
            } else {
                bubbleTooltipDiv.style.display = 'block';
            };
        } else {
            bubbleTooltipDiv.style.display = 'none';
        };
    };

    document.addEventListener('click', showTooltipBubble);
};