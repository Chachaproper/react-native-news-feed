import React from 'react'
import {
  View,
  Button,
  Alert,
  Image,
  Text,
  Keyboard,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Layout from '../../components/Layout/Layout'
import FormInput from '../../components/FormInput/FormInput'
import storage from '../../storage'
import { auth } from '../../redux/actions/auth'
import styles from './LoginScreenStyles'

@connect(() => ({}))
@reduxForm({ form: 'signInTest' })
export class LoginScreen extends Layout {
  handleSubmit = ({ login, password }) => {
    if (!password || !login) return

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
      .catch(err => {
        return Alert.alert('Auth error', err.message,
          [{ text: 'Ok' }])
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
