import { FIREBASE_API_KEY,
FIREBASE_AUTH_DOMAIN,
FIREBASE_DATABASE_URL,
FIREBASE_PROJECT_ID,
FIREBASE_STORAGE_BUCKET,
FIREBASE_MESSAGING_SENDER_ID,
FIREBASE_APP_ID
 } from '@env';
import {firebase} from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//const app = initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //
  } else {
    user = null;
    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  }
});

export default firebase;
