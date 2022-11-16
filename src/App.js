import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userAPI';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import Basket from './components/Basket/Basket';
import Footer from './components/Footer';
import 'reset-css';

const App = observer ( () => {

  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState("light");
  const [isCartOpen, setIsCartOpen] = useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    check().then(data => {
      if(data) {
        user.setUser(data)
        user.setIsAuth(true)
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if(loading) {
    return <CircularProgress />
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={'background.default'} color={'text.primary'}
          sx={{
            p: 0,
            m: 0,
            boxSizing: 'border-box'
          }}
        >
          <NavBar mode={mode} setMode={setMode} handleCart={() => setIsCartOpen(true)} />
          <AppRouter />
          <Basket cartOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} />
          <Footer mode={mode} setMode={setMode} />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
});

export default App