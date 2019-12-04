import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const render = () => {
  const rootElem = document.getElementById('root');
  // ReactDOM.render(<App />, rootElem);
  ReactDOM.createRoot(rootElem).render(<App />);
};

render();
