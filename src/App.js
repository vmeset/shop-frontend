import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import './app.css'
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userAPI';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import Basket from './components/Basket/Basket';
import Footer from './components/Footer';
// import { fetchBrands, fetchDevices, fetchTypes } from './http/deviceAPI';

const App = observer ( () => {

  const {user, device} = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState("light");
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [order, setOrder] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    // fetchTypes().then(data => device.setTypes(data))
    // fetchBrands().then(data => device.setBrands(data))
    // fetchDevices(null, null).then(data => device.setDevices(data))
    check().then(data => {
      if(data) {
        user.setUser(data)
        user.setIsAuth(true)
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  // useEffect(() => {
  //   fetchDevices(device.selectedType._id, device.selectedBrand._id, device.page, device.limit).then(data => {
  //     device.setDevices(data.devices)
  //     device.setTotalCount(data.totalCount)
  //   })
  // }, [device.selectedType._id, device.selectedBrand._id, device.page])

  if(loading) {
    return <CircularProgress />
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={'background.default'} color={'text.primary'}>
          <NavBar mode={mode} setMode={setMode} handleCart={() => setIsCartOpen(true)} />
          <AppRouter />
          <Basket cartOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} order={order} />
          <Footer mode={mode} setMode={setMode} />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
});

export default App