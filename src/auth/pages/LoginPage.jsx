import { useEffect, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography,Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../Hooks/useForm';
import { useDispatch,useSelector } from 'react-redux';
import {  startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';


export const LoginPage = () => {

  const dispatch= useDispatch();
  const { status,errorMessage } = useSelector(state => state.auth) 

  
  
  const {email,password, handdleInputChange} = useForm({
    email: "",
    password: "",

  })

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const handleSubmit = (e) => {
    e.preventDefault()
  
    dispatch(startLoginWithEmailPassword({email,password}))
    
    console.log("logueado");
  
  }

  const onGoogleSignIn=()=>{
   
    dispatch(startGoogleSignIn())

  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn animate_faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                name="email"
                autoComplete="off"
                value={email}
                onChange={handdleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                name="password"
                autoComplete="off"
                value={password}
                onChange={handdleInputChange}
                fullWidth
              />
            </Grid>
            

          <Grid
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}>
            <Grid
              item
              xs={12}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                 disabled={isAuthenticating}
                 type='submit'
                  variant='contained' 
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                disabled={isAuthenticating}
                 variant='contained'
                 onClick={onGoogleSignIn}
                 fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
