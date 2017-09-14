import React from 'react'
import {
  View,
  Button,
  Image,
  Text,
  Keyboard,
  ScrollView
} from 'react-native'
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
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ScrollView>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/logo.png')}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>Sign in</Text>
            <Field
              name={'login'}
              component={FormInput}
              onSubmitEditing={this.props.handleSubmit(this.handleSubmit)}
              placeholder='Email'
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
              onPress={this.props.handleSubmit(this.handleSubmit)}
              title='Submit'
            />
          </ScrollView>
        </View>
      </View>
    )
  }
}
