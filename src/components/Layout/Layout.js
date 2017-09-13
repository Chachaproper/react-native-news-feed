import React, { PureComponent } from 'react'
import { NEWS, LOGIN } from '../../constants/navigation'
import storage from '../../storage'
import { syncFirebase } from '../../redux/actions/data'
import { AUTH } from '../../redux/constants/auth'

export default class Layout extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    storage.user().then(user => {
      const { navigation } = this.props
      const { navigate } = navigation
      const { routeName } = navigation.state
      if (user) {
        console.log('user', user)
        const resultUser = JSON.parse(user)
        dispatch({ type: AUTH.SUCCESS, resp: resultUser })
        dispatch(syncFirebase())
        if (routeName === LOGIN) navigate(NEWS)
      } else if (routeName !== LOGIN) navigate(LOGIN)
    })
  }
}
