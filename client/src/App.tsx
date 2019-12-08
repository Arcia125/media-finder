import React from 'react';
import { ThemeProvider } from 'styled-components';

import ApplicationContainer from './components/ApplicationContainer';
import Header from './components/Header';
import GlobalStyle from './components/GlobalStyle';
import { theme } from './theme';
import MainContent from './components/MainContent';
import ErrorBoundary from './components/ErrorBoundary';

const App = props => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <ApplicationContainer>
          <GlobalStyle />
          <Header></Header>
          <MainContent></MainContent>
        </ApplicationContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
