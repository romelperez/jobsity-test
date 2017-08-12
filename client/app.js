import './app.scss';

import 'babel-polyfill';
import 'vulcanval';
import 'client/tools/validators';

import injectTapEventPlugin from 'react-tap-event-plugin';
import render from './render';

injectTapEventPlugin();
render();
