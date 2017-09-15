import React, { PureComponent } from 'react'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import { ScrollView } from 'react-native'
import styles from './FormInputStyles'

export default class FormInputGrow extends PureComponent {
  render () {
    const { input, style, meta, ...inputProps } = this.props

    const newStyles = [
      styles.inputContainer,
      style
    ]

    return (
      <ScrollView style={newStyles}>
        <AutoGrowingTextInput
          {...inputProps}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value || inputProps.defaultValue}
          style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}
          minHeight={30}
          placeholderTextColor='rgba(0, 0, 0, 0.3)'
          underlineColorAndroid='transparent'
        />
      </ScrollView>
    )
  }
}
