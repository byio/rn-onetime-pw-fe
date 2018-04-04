import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

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
      await axios.post(`${ROOT_URL}/verifyOtp`, { phone, code });
    } catch (err) {
      console.log(err);
    }
  }

  // render method
  render () {
    return (
      <View>
        {/* Phone number input */}
        <View>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        {/* OTP code input */}
        <View>
          <FormLabel>Enter OTP</FormLabel>
          <FormInput
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

export default SignInForm;
