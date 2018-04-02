export default async () => {
  const firebase = require('firebase')

  try {
    firebase.initializeApp({
      databaseURL: 'https://hacker-news.firebaseio.com'
    })
  } catch (err) {
    if(!/already exists/.test(err.message)){
      console.error('Firebase initialization error', err.stack)
    }
  }

  return firebase.database().ref('v0')
}