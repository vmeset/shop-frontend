import React, {useState, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const theme = createTheme();

const Auth = observer( () => {

  const {user} = useContext(Context)

  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const sign = async (event) => {
    event.preventDefault();
    try {
      if (isLogin) {
        const response = await login(username, password)
        user.setUser(response)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)
      } else {
        const response = await registration(username, password)
        alert(`Пользователь ${user.user.username} успешно зарегистрирован и авторизован`)
        user.setUser(response)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }

    return (
      <Container component="main" maxWidth="xs"
        sx={{height: '73vh'}}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            { isLogin ? "Sign in" : "Sign Up" }
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
              bgcolor={'background.default'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={sign}
            >
              { isLogin ? "Sign in" : "Sign Up" }
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {isLogin
                  ? 
                  <NavLink to={REGISTRATION_ROUTE} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                  :
                  <NavLink to={LOGIN_ROUTE} variant="body2">
                    {"Already have accont? Sign In"}
                  </NavLink>
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
});

export default Auth;