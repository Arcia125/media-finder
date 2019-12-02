import React from 'react';
import ReactDOM from 'react-dom';

const render = () => {
  const elem = document.getElementById('root');
  ReactDOM.render(<h1>hello</h1>, elem);
};

render();
