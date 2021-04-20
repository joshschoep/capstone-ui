import React from 'react';
import './App.scss';
import AppRouter from './Routers';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <>
      <AppRouter>
        <Header />
      </AppRouter>
      <Footer />
    </>
  );
}

export default App;
