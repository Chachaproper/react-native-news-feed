import React from 'react'
import { View, Text } from 'react-native'
import styles from './NewDetailsScreenStyles'
import Camera from 'react-native-camera'
import Layout from '../../components/Layout/Layout'

export class NewDetailsScreen extends Layout {
  static navigationOptions = {
    title: 'Details'
  }

  setCameraRef = camera => {
    this.camera = camera
  }

  takePicture = () => {
    if (!this.camera) return
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err))
  }

  constructor (props) {
    super(props)
    this.camera = null
  }

  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={this.setCameraRef}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text
            style={styles.capture}
            onPress={this.takePicture}>
            [CAPTURE]
          </Text>
        </Camera>
      </View>
    )
  }
}
