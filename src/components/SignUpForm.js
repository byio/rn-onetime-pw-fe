import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = "https://us-central1-rn-onetime-pw.cloudfunctions.net";

class SignUpForm extends Component {
  // es2017 syntax for declaring state outside of constructor function
    /*
     phone property is an empty string by default because react native form inputs
     report inputs as strings
    */
  state = {
    phone: ''
  };

  // helper methods (use arrow functions so it's not necessary bind the handler to 'this' context; es2017 syntax)
  handleSignup = async () => {
    try {
      // create user
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      // request otp
      await axios.post(`${ROOT_URL}/requestOtp`, { phone: this.state.phone });
    } catch (err) {
      console.log(err);
    }
    this.setState({ phone: '' });
  }

  // render method
  render () {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button
          title="Sign Up"
          onPress={this.handleSignup}
        />
      </View>
    );
  }
}

export default SignUpForm;
