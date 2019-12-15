import { createContext } from 'react';

// interface BackdropContext {
//   backgroundImage: string;
//   setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
//   backgroundMatches: (string) => boolean;
// }

export const initialStateContext = {
  backgroundImage:
    'https://image.tmdb.org/t/p/w1280/xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg',
};

export const StateContext = createContext(initialStateContext);

const initialUpdateContext = null;

export const UpdateContext = createContext(initialUpdateContext);
