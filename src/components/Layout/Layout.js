import React, { PureComponent } from 'react'
import { NEWS, LOGIN } from '../../constants/navigation'
import storage from '../../storage'
import { syncFirebase } from '../../redux/actions/data'

export default class Layout extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    storage.login().then(login => {
      const { navigation } = this.props
      const { navigate } = navigation
      const { routeName } = navigation.state
      if (login === '1') {
        dispatch(syncFirebase())
        if (routeName === LOGIN) navigate(NEWS)
      } else if (routeName !== LOGIN) navigate(LOGIN)
    })
  }
}
