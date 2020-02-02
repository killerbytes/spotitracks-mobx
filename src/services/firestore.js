import 'firebase/firestore';
import firebase from 'firebase/app';

export default class FirestoreService {
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    };

    const app = firebase.initializeApp(firebaseConfig);
    const firestore = app.firestore();
    this.spotitracks = firestore.collection('spotitracks');
  }

  findAll = (id) => {
    return new Promise((resolve, reject) => {
      this.spotitracks
        .doc(id)
        .get()
        .then((res) => {
          if (res.exists) {
            resolve(res.data());
          }
          reject('Not Found');
        });
    });
  };

  create = (id, payload) => {
    return this.spotitracks.doc(id).set(payload);
  };
}
