import React, { PureComponent } from 'react'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import storage from '../../storage'
import { LOGIN } from '../../constants/navigation'
import { LOGOUT } from '../../redux/constants/auth'
import db from '../../storage/firebase'

@connect(() => ({}))
export class LogoutScreen extends PureComponent {
  componentDidMount () {
    const { dispatch, navigation } = this.props
    db.auth.signOut()
    storage.remove('user')
      .then(() => {
        dispatch({ type: LOGOUT })
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: LOGIN })]
        })
        navigation.dispatch(resetAction)
      })
      .catch((err) => console.log('err', err))
  }

  render () { return null }
}
