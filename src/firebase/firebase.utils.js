import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyAZrCTRJF1Wr9F5ztDVNusJd7Brg5xWHtA",
        authDomain: "crwn-db-a1b11.firebaseapp.com",
        projectId: "crwn-db-a1b11",
        storageBucket: "crwn-db-a1b11.appspot.com",
        messagingSenderId: "701153764407",
        appId: "1:701153764407:web:8a467ec5d7dadf5358cbb2",
        measurementId: "G-NESRSJFMEG"
      };

      export const createUserProfileDocument = async (userAuth, additionalData) => {
          if(!userAuth) return;

          const userRef = firestore.doc(`users/${userAuth.uid}`);
          const snapShot= await userRef.get();

        //   console.log(snapShot);
        if(!snapShot.exists){
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })

            }catch (error){
                console.log('error creating user', error.message);

            }
        }

        return userRef;

      };

      firebase.initializeApp(config);

    export const auth = firebase.auth();
    export const firestore = firebase.firestore();

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    export const signInWithGoogle = () => auth.signInWithPopup(provider);

    export default firebase;
