import { async } from "@firebase/util";
import { register, singInWithGoogle, loginWithEmailPassword, logoutFirebase } from "../../FIrebase/providers";
import { checkingCredencials, login, logout } from "./authSlice"


export const checkingAuthentication = () => {

    return async(dispatch)=>{

        dispatch(checkingCredencials());
    }

}

export const startGoogleSignIn = () => {
    return async(dispatch) => {

       dispatch(checkingCredencials())

       const result = await singInWithGoogle();
       if (!result.ok){ dispatch(logout(result.errorMessage));
       }else{
       dispatch(login(result))
       }
    }
}

export const startRegister = ({email,password,displayName}) =>{
    return async(dispatch)=>{

        dispatch(checkingCredencials())

       const result = await register({email,password,displayName})

       if(!result.ok) return dispatch(logout(result))

       dispatch(login(result))
    }
}

export const startLoginWithEmailPassword = ({email,password}) =>{
    return async (dispatch) => {

        dispatch(checkingCredencials())
        
        const resp = await loginWithEmailPassword({email,password});
        if (!resp.ok){return dispatch(logout(resp));
        }else {        
        dispatch(login(resp))
        }              
    }
}

export const startLogout=()=>{
    return async(dispatch)=>{
        
        await logoutFirebase()

        dispatch(logout())

    }
}
