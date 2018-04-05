import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = "https://us-central1-rn-onetime-pw.cloudfunctions.net";

class SignInForm extends Component {
  // declare initial state using es2017 syntax
  state = { phone: '', code: '' };

  // helper methods
  handleSignin = async () => {
    // es6 destructuring
    const { phone, code } = this.state;
    // verify otp
    try {
      let { data } = await axios.post(`${ROOT_URL}/verifyOtp`, { phone, code });
      firebase.auth()
              .signInWithCustomToken(data.token);
    } catch (err) {
      console.log(err);
    }
    this.setState({ phone: '', code: '' });
  }

  // render method
  render () {
    return (
      <View>
        <View style={styles.headerTextStyle}>
          <Text>Log In</Text>
        </View>
        {/* Phone number input */}
        <View>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            placeholder="e.g. 6512345678"
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        {/* OTP code input */}
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter OTP</FormLabel>
          <FormInput
            placeholder="e.g. 1234"
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>
        {/* Sign in button */}
        <Button
          title="Log In"
          onPress={this.handleSignin}
        />
      </View>
    );
  }
}

const styles = {
  headerTextStyle: {
    alignItems: 'center'
  }
}

export default SignInForm;
