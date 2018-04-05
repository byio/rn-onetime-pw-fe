import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import SignUpForm from './src/components/SignUpForm';
import SignInForm from './src/components/SignInForm';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode='on-drag'
      >
        <SignUpForm />
        <SignInForm />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
