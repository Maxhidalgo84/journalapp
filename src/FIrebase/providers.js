import { async } from "@firebase/util";
import { GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleprovider = new GoogleAuthProvider();

export const singInWithGoogle = async()=> {
    
    try{

        const result = await signInWithPopup(FirebaseAuth,googleprovider)
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName,email,photoURL,uid} = result.user
        
        return {
            ok: true,
            displayName,email,photoURL,uid
        }
        
    }catch(error){
    
            // Handle Errors here.
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            ok: false,
            errorMessage,
        }

    }
}

export const register = async ({email,password,displayName})=>{
    try {

        
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);

        const {uid,photoURL} = resp.user;
        //TODO: actualizar el displayName en firebase

        await updateProfile(FirebaseAuth.currentUser,{displayName})
        
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
        
        
    } catch (error) {
        // Handle Errors here.
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage: errorMessage,
        }
        
    }
}

export const loginWithEmailPassword = async({email,password})=>{
  
        try {

            const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password)
            //const credentials = GoogleAuthProvider.credentialFromResult(result);
            
            const { uid,displayName, photoURL } = resp.user
            
            return {
                ok: true,
                displayName, photoURL, uid
            }

    } catch (error)  {
       
        const errorMessage = error.message;
            return {
                ok: false,
                errorMessage: errorMessage,
            }

        }
    }

export const logoutFirebase = async() =>{

    return await FirebaseAuth.signOut();

}