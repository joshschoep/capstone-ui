import React, { useEffect, useState } from 'react';
import './App.scss';
import AppRouter from './Router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Auth } from './api/Index';
import Loading from './components/loading/Loading';
import Login from './routes/login/Login';

function LoggedInApp() {
  return (
    <>
      <AppRouter>
        <Header />
      </AppRouter>
      <Footer />
    </>
  )
}

function App() {

  const [app, setApp] = useState(<Loading />);

  useEffect(() => {
    Auth.startSession().then(
      session => {
        Auth.user().then(
          response => {
            setApp(LoggedInApp());
          },
          err => {
            setApp(<Login />);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }, [])

  return (
    <>
      { app }
    </>
  );
}

export default App;
