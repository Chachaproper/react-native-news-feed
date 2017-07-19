import React, { PureComponent } from 'react'
import { NEWS, LOGIN } from '../../constants/navigation'
import storage from '../../storage'

export default class Layout extends PureComponent {
  componentDidMount () {
    storage.login().then(login => {
      const { navigation } = this.props
      const { navigate } = navigation
      const { routeName } = navigation.state
      if (routeName === LOGIN && login === '1') navigate(NEWS)
      else if (routeName !== LOGIN && login !== '1') navigate(LOGIN)
    })
  }
}
