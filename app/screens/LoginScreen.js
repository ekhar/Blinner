import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './MenuScreen';
import HomeScreen from './ScheduleScreen';
import * as SecureStore from 'expo-secure-store';
import * as firebaseApp from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAEO49cw3PV8HhDqpGLwSwK6TKMV3-ZSok",
  authDomain: "blinner-f40e2.firebaseapp.com",
  databaseURL: "https://blinner-f40e2.firebaseio.com",
  projectId: "blinner-f40e2",
  storageBucket: "blinner-f40e2.appspot.com",
  messagingSenderId: "947181888521",
  appId: "1:947181888521:web:842ad927fecf9dbdc284d8",
  measurementId: "G-EJ2B9CK4TB"
};
// Initialize Firebase
if (firebaseApp.apps.length == 0) {
  firebaseApp.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, token: null };
  }

  componentWillMount() {
    setTimeout(() => {
      this.checkForToken();
    }, 2000);
    this.checkForFirebaseCredential();
    // Listen for authentication state to change.
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log('We are authenticated now!');
        Alert.alert('We authneticated with Fireabse!', `Hi ${user}`);
      }
    });
  }

  //Check Async Storage if token is available
  //If it is available set loading state to false
  async checkForToken() {
    let token = await SecureStore.getItemAsync('token');
    this.setState({
      token: token,
      loading: false,
    });
  }

  async checkForFirebaseCredential() {
    let credential = await SecureStore.getItemAsync('firebaseCredential');
    if (credential) {
      firebaseApp
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log('Auth failed and here the error' + JSON.stringify(error));
        });
    }
  }

  //Write token to secure storage and firebase credital.
  async saveTokenToSecureStorage(token, credential) {
    SecureStore.setItemAsync('token', token);
    //Save Firebase credential
    SecureStore.setItemAsync('firebaseCredential', credential);
    this.setState({
      token: token,
    });
  }

  render() {
    if (this.state.loading === true) {
      return <View></View>;
    } else if (this.state.token === null) {
      return (
        <View style={styles.container}>
          <Button title="LogIn With Facebook" onPress={() => this.logIn()} />
        </View>
      );
    } else {
      return <HomeScreen navigation= {this.props.navigation}/>;
    }
  }

  async logIn() {
    try {
      //Seed documentation on course site at mobileappdev.teachable.com
      //For default user names and passwords.
      await Facebook.initializeAsync('908935599913482');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        let credential = firebaseApp.auth.FacebookAuthProvider.credential(
          token
        );
        firebaseApp
          .auth()
          .signInWithCredential(credential)
          .catch(error => {
            console.log(
              'Auth failed and here is the error ' + JSON.stringify(error)
            );
          });
        this.saveTokenToSecureStorage(token, credential);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


