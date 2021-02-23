import React from 'react';
import ReactDOM from 'react-dom';

import Sudoku from './components/Sudoku';
import { Normalize } from 'styled-normalize'

ReactDOM.render(
  <React.StrictMode>
    <Normalize/>
    <Sudoku />
  </React.StrictMode>,
  document.getElementById('root')
);



