import React from 'react'
import styled from 'styled-components';
import Grid from './Grid'
import { ModalProvider } from 'styled-react-modal'
import { Normalize } from 'styled-normalize'
function Sudoku() {
  return (
    <Wrapper>
      < Normalize/>
      <ModalProvider>
        <Grid/>
      </ModalProvider>
    </Wrapper>
  );
}

export default Sudoku;

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center
`;
