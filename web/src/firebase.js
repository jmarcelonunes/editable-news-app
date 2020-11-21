import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA1V5C5kG-34L6H3Ri4qU_EawmOE1W8exQ',
  authDomain: 'editable-news-app.firebaseapp.com',
  databaseURL: 'https://editable-news-app.firebaseio.com',
  projectId: 'editable-news-app',
  storageBucket: 'editable-news-app.appspot.com',
  messagingSenderId: '435056804528',
  appId: '1:435056804528:web:022dc998d3837cad9c7175',
  measurementId: 'G-R1STTE3MKG',
};
firebase.initializeApp(config);

export default firebase;
