'use strict';

import { renderStates } from './script/search.js';
import { isInAlphabeticalOrder } from './script/alphabeticalOrder.js';
import { openSearchMenu, closeSearchMenu } from './script/searchMenu.js';

renderStates();

isInAlphabeticalOrder();

openSearchMenu();
closeSearchMenu();