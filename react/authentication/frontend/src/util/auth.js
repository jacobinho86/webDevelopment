import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }

export function getAuthToken() {
    const token = localStorage.getItem('token');

    //case #1: no token at all, return null
    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();

    //case #2: there is a token and it is expired, then return "expired"
    if(tokenDuration<0) {
        return 'EXPIRED';
    }

    //case #3: there is a token and is not expired, then return the token
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();

    if(!token){
        return redirect('/auth');
    }

    return null;
}