import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import Layout from '../../components/Layout/Layout'
import FormInput from '../../components/FormInput/FormInput'
import storage from '../../storage'
import styles from './LoginScreenStyles'

@reduxForm({ form: 'signInTest' })
export class LoginScreen extends Layout {
  handleSubmit = values => {
    if (values.password !== 'test') {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    }

    try {
      storage.login('1')
    } catch (error) {
      console.log('error', error)
    }

    setTimeout(() => {
      storage.login().then(() => {
        this.props.navigation.navigate('News')
      })
    }, 1000)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign in</Text>
        <Field
          name={'login'}
          component={FormInput}
          placeholder='Login'
        />
        <Field
          name={'password'}
          component={FormInput}
          type='password'
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity onPress={this.props.handleSubmit(this.handleSubmit)}>
          <Text style={styles.submitBtn}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
