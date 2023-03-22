import { useState,useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../Hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startRegister } from '../../store/auth/thunks';



const formData = {
  email: '',
  password: '',
  displayName: '',
}


const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch();

   

  const {formState,displayName,password,email,handdleInputChange, displayNameValid, passwordValid, emailValid,isFormValid
  }= useForm(formData,formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status,errorMessage } = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true)
   
     if(!isFormValid) return;
    dispatch(startRegister(formState))
  }


  return (
    <AuthLayout title="Crear cuenta">
      
      <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn animate_faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                name='displayName'
                value={displayName}
                onChange={handdleInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
                placeholder='Nombre completo' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                name='email'
                value={email}
                onChange={handdleInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
                placeholder='correo@google.com' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                name='password'
                value={password}
                onChange={handdleInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
                placeholder='Contraseña' 
                fullWidth
              />
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid 
                item 
                xs={12}
                display={!!errorMessage? '' : 'none'}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            </Grid>
              
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


      </form>
        
    </AuthLayout>
  )
}
