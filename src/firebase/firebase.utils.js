import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD0K1y3koZLqjhg61pYSeBNv45La0_BkxE",
    authDomain: "crwn-clothing-d9b3c.firebaseapp.com",
    databaseURL: "https://crwn-clothing-d9b3c.firebaseio.com",
    projectId: "crwn-clothing-d9b3c",
    storageBucket: "crwn-clothing-d9b3c.appspot.com",
    messagingSenderId: "271860860269",
    appId: "1:271860860269:web:0d2569658f0df52f708664",
    measurementId: "G-DRM4SC0KPZ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;