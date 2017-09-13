import React, { PureComponent } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import storage from '../../storage'
import { LOGIN } from '../../constants/navigation'
import { LOGOUT } from '../../redux/constants/auth'
import db from '../../storage/firebase'

@connect(() => ({}))
export class LogoutScreen extends PureComponent {
  componentDidMount () {
    const { dispatch, navigation } = this.props
    db.auth.signOut().then(() => {
      storage.remove('user')
        .then(() => {
          dispatch({ type: LOGOUT })
          navigation.navigate(LOGIN)
        })
        .catch((err) => console.log('err', err))
    })
  }

  render () { return null }
}
