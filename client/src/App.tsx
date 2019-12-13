import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';
import ApplicationContainer from './components/ApplicationContainer';
import Header from './components/Header';
import GlobalStyle from './components/GlobalStyle';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import TitleSingle from './components/TitleSingle';

const App = props => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <ApplicationContainer>
          <Header></Header>
          <GlobalStyle />
          <Router>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/movie/:movieId">
              <React.Suspense fallback={<h2>Loading...</h2>}>
                <TitleSingle />
              </React.Suspense>
            </Route>
          </Router>
          <Footer />
        </ApplicationContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
