import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';
import ApplicationContainer from './components/ApplicationContainer';
import Header from './components/Header';
import GlobalStyle from './components/GlobalStyle';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import TitleSingle from './components/TitleSingle/';
import {
  initialStateContext,
  UpdateContext,
  StateContext,
} from './backdropContext';

const WrapppedApplicationContainer = ({
  gradientColorStops,
  backgroundAlpha,
  children,
}) => {
  const context = React.useContext(StateContext);

  return (
    <ApplicationContainer
      background={`
        linear-gradient(
          137.13deg,
          rgba(29, 38, 113, ${backgroundAlpha}) ${gradientColorStops[0]}%,
          rgba(195, 55, 100, ${backgroundAlpha}) ${gradientColorStops[1]}%
        ),
        url(${context.backgroundImage})
      `}
    >
      {children}
    </ApplicationContainer>
  );
};

const App = props => {
  const gradientColorStops = [0.27, 74.68];
  const backgroundAlpha = 0.65;

  const [backgroundImage, setBackgroundImage] = React.useState(
    initialStateContext.backgroundImage
  );
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Router>
          <UpdateContext.Provider
            value={{
              backgroundMatches: backdropPath =>
                backgroundImage.split('/').slice(-1)[0] === backdropPath,
              setBackdropPath: backdropPath =>
                setBackgroundImage(
                  `https://image.tmdb.org/t/p/w1280/${backdropPath}`
                ),
            }}
          >
            <StateContext.Provider value={{ backgroundImage }}>
              <WrapppedApplicationContainer
                gradientColorStops={gradientColorStops}
                backgroundAlpha={backgroundAlpha}
              >
                <Header></Header>
                <GlobalStyle />
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/movie/:movieId">
                  <React.Suspense fallback={<h2>Loading...</h2>}>
                    <TitleSingle />
                  </React.Suspense>
                </Route>
                <Footer />
              </WrapppedApplicationContainer>
            </StateContext.Provider>
          </UpdateContext.Provider>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
