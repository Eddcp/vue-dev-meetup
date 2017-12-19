import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBLoxIOSlHvzNYB20R5ViO-c3HfDpAssps",
  authDomain: "academind-vue-devmeetup.firebaseapp.com",
  databaseURL: "https://academind-vue-devmeetup.firebaseio.com",
  projectId: "academind-vue-devmeetup",
  storageBucket: "academind-vue-devmeetup.appspot.com",
  messagingSenderId: "580417947986"
}

export const firebaseApp = firebase.initializeApp(config)
