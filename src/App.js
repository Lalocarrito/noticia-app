import React from 'react';
import NoticiaList from './components/NoticiaList';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <NoticiaList />
    </ThemeProvider>
  );
}

export default App;
