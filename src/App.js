import React from 'react';
import AppRouter from './Routes/AppRouter';
import { toast } from 'react-toastify'

toast.configure()
const App = () => {
  return (
    <AppRouter/>
  );
}

export default App;
