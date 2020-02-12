import React from 'react';
import AppRouter from './Routes/AppRouter';
import { toast } from 'react-toastify'


const App = () => {
  toast.configure()
  return (
    <AppRouter/>
  );
}

export default App;
