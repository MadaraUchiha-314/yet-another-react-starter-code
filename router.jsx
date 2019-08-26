/*
* Contains the routing logic for the static pages which are generated.
*/
/* global window, document */
import React from 'react';
import ReactDOM from 'react-dom';

/*
* Import your page level components here.
*/
import HomePage from 'src/js/widgets/homepage/HomePage.jsx';

/*
* Add your routes here.
* The whole routing logic is based out of here.
* NOTE: This is highly ineffecient as it doesn't support "dynamic routing".
* TODO: Find out a good way to get routing done.
*/
function renderWidgetBasedOnRoute() {
  const path = window.location.pathname;
  switch (path) {
    case '/':
      return <HomePage />;
    default:
      return <HomePage />;
  }
}

ReactDOM.render(
  renderWidgetBasedOnRoute(),
  document.getElementById('root'),
);
