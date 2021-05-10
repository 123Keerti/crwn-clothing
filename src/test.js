import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('yg1TFfFfPYE6Tf9PWZNi').collection('cartItems').doc('DQCCIaHn8OAQeIxi1uBw');
firestore.doc('/users/yg1TFfFfPYE6Tf9PWZNi/cartItems/DQCCIaHn8OAQeIxi1uBw');
firestore.collection('/users/yg1TFfFfPYE6Tf9PWZNi/cartItems');