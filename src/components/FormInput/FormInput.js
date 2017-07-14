import React, { PureComponent } from 'react'
import { TextInput, View } from 'react-native'
import styles from './FormInputStyles'


export default class FormInput extends PureComponent {
  render() {
    const { input, meta, ...inputProps } = this.props

    return (
      <View style={styles.inputContainer}>
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          underlineColorAndroid="transparent"
        />
      </View>
    )
  }
}
