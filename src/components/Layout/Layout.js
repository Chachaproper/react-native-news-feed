import React, { PureComponent } from 'react'
import { BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { NEWS, LOGIN } from '../../constants/navigation'
import storage from '../../storage'
import { syncFirebase } from '../../redux/actions/data'
import { AUTH } from '../../redux/constants/auth'

export default class Layout extends PureComponent {
  handleBackButton = () => {
    console.log(this)
    return true
  }

  componentDidMount () {
    const { dispatch } = this.props
    storage.user().then(user => {
      const { navigation } = this.props
      const { routeName } = navigation.state
      if (user) {
        console.log('user', user)
        const resultUser = JSON.parse(user)
        dispatch({ type: AUTH.SUCCESS, resp: resultUser })
        dispatch(syncFirebase())
        if (routeName === LOGIN) {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: NEWS })]
          })
          navigation.dispatch(resetAction)
        }
      } else if (routeName !== LOGIN) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: LOGIN })]
        })
        navigation.dispatch(resetAction)
      }
    })

    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }

  /*  componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }*/
}
