import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth =  firebase.auth;

const updateUser = name => {
    const user = auth().currentUser;
    
    user.updateProfile({
     displayName: name
    })
    .then(() => true)
    .catch(() => false);
}

export const setUser = (user, name) => {
    const { photoURL, email, displayName } = user;

    if (name) {
        updateUser(name);
    }
    
    return {
        photo: photoURL,
        email,
        name: displayName||name
    }
}

export const createUser = (name, email, password) => {
    return auth().createUserWithEmailAndPassword(email, password)
    .then(res => setUser(res.user, name))
    .catch(err => err);
}

export const signInUser = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password)
  .then(res => setUser(res.user))
  .catch(err => err);
}

export const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return auth()
    .signInWithPopup(provider)
    .then(res => setUser(res.user))
    .catch(err => err);
}