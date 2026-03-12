import firebaseAdmin from 'firebase-admin';

firebaseAdmin.initializeApp();

const auth = firebaseAdmin.auth();

export {
  auth
}
