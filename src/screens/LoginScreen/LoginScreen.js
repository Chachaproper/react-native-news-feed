import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import FormInput from '../../components/FormInput/FormInput'


@reduxForm({
  form: 'signInTest'
})
export class LoginScreen extends PureComponent {
  handleSubmit = values => {
    if (values.password !== 'test') throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })

    try {
      AsyncStorage.setItem('@HelloAppStore:login', 'true')
    } catch (error) {
      console.log('error', error);
    }

    setTimeout(() => {
      AsyncStorage.getItem('@HelloAppStore:login')
        .then(login => {
          this.props.navigation.navigate('News')
        })
    }, 1000)
  }

  render() {
    return (
      <View>
        <Text>Hello login screen</Text>
        <Field
          name={'login'}
          component={FormInput}
          placeholder="Login"
        />
        <Field
          name={'password'}
          component={FormInput}
          type="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={this.props.handleSubmit(this.handleSubmit)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


