import React, { PureComponent } from 'react'
import storage from '../../storage'
import { LOGIN } from '../../constants/navigation'

export class LogoutScreen extends PureComponent {
  componentDidMount () {
    storage.login('0')
    this.props.navigation.navigate(LOGIN)
  }

  render () { return null }
}
