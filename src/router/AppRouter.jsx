import { FirebaseAuth } from '../FIrebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { login, logout } from '../store/auth/authSlice';


export const AppRouter = () => {

  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(FirebaseAuth, (user)=> {
      if(!user) return dispatch(logout());
      
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      
    } )  
  }, [])
  

  if (status === 'checking') {
    return <CheckingAuth/>
  }

  return (
    <Routes>
        {
          (status === 'authenticated')
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
        }

        <Route path='/*' element={<Navigate  to='/auth/login'/>}/>
        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
