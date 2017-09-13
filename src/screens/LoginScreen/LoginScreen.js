import React from 'react'
import {
  View,
  Button,
  Keyboard,
  ScrollView
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import Layout from '../../components/Layout/Layout'
import FormInput from '../../components/FormInput/FormInput'
import storage from '../../storage'
import { auth } from '../../redux/actions/auth'
import styles from './LoginScreenStyles'

@connect(() => ({}))
@reduxForm({ form: 'signInTest' })
export class LoginScreen extends Layout {
  handleSubmit = ({ login, password }) => {
    if (!password || !login) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    }

    this.props.dispatch(auth({ email: login, password }))
      .then(user => {
        try {
          storage.user(user)
        } catch (error) {
          return console.log('error', error)
        }

        this.props.navigation.navigate('News')
        Keyboard.dismiss()
      })
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
