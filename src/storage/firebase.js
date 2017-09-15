import RNFirebase from 'react-native-firebase'

export const config = {
  persistence: true,
  apiKey: 'AIzaSyCbNw-ajEj5xnJNxlgDkBfS7-0oJS59fTs',
  authDomain: 'casekeepers-4b528.firebaseapp.com',
  databaseURL: 'https://casekeepers-4b528.firebaseio.com',
  projectId: 'casekeepers-4b528',
  storageBucket: 'casekeepers-4b528.appspot.com',
  messagingSenderId: '752992849544'
}

export class Db {
  constructor (config) {
    this.config = config
    this.firebase = RNFirebase.initializeApp(config)
    this.auth = this.firebase.auth()
    this.db = this.firebase.database()
    this.refs = {
      journals: this.db.ref('journals'),
      notes: this.db.ref('notes')
    }
  }
}

export default new Db(config)
