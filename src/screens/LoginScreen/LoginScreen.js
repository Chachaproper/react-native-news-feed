import React from 'react'
import {
  View,
  Button,
  Image,
  Keyboard,
  ScrollView
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
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
        Keyboard.dismiss()
      })
    }, 1000)
  }

  render () {
    return (
      <LinearGradient
        colors={[
          '#009fb1',
          '#01a0b1',
          '#07a1b1',
          '#09a2b0',
          '#0ca2b0',
          '#16a5b0',
          '#17a6b0',
          '#35afae',
          '#3db4ad',
          '#71cba8'
        ]}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <ScrollView>
            <View style={styles.logoContainer}>
              <Image source={require(
                '../../../assets/logo-white.png')} style={styles.logo} />
            </View>
            <Field
              name={'login'}
              component={FormInput}
              onSubmitEditing={this.props.handleSubmit(this.handleSubmit)}
              placeholder='Login'
            />
            <Field
              style={{ marginBottom: 25 }}
              name={'password'}
              component={FormInput}
              onSubmitEditing={this.props.handleSubmit(this.handleSubmit)}
              type='password'
              placeholder='Password'
              secureTextEntry
            />
            <Button
              color='#6249ca'
              onPress={this.props.handleSubmit(this.handleSubmit)}
              title='Submit'
            />
          </ScrollView>
        </View>
      </LinearGradient>
    )
  }
}
