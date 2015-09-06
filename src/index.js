import 'babel-core/polyfill';
import React from 'react';

import Root from 'containers/Root';


const targetEl = document.getElementById('root');

React.render(<Root />, targetEl);
