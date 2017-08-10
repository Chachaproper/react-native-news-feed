import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import Camera from 'react-native-camera'
import {
  DocumentPicker,
  DocumentPickerUtil
} from 'react-native-document-picker'
import Layout from '../../components/Layout/Layout'
import styles from './FeaturesScreenStyles'

export class FeaturesScreen extends Layout {
  static navigationOptions = {
    title: 'Features'
  }

  setCameraRef = camera => {
    this.camera = camera
  }

  handlePickFile = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()]
    }, (err, res) => {
      if (err) return console.log(err)
      console.log(res)
    })
  }

  handleTakePicture = () => {
    this.camera.capture()
      .then(data => {
        this.setState({ cameraIsEnabled: false, picture: data })
        this.handleDisableCamera()
      })
      .catch(err => console.error(err))
  }

  handleTakeVideo = () => {
    this.setState({ isVideoRecording: true })
    this.camera.capture({
      audio: true,
      mode: Camera.constants.CaptureMode.video,
      captureTarget: Camera.constants.CaptureTarget.disk
    })
      .then(data => {
        console.log(data)
        this.handleDisableCamera()
      })
      .catch(err => console.error(err))
  }

  handleStopRecord = () => {
    this.camera.stopCapture()
    this.handleDisableCamera()
  }

  handleEnableCamera = () => this.setState({ cameraIsEnabled: true })

  handleDisableCamera = () => {
    this.setState({
      cameraIsEnabled: false,
      isVideoRecording: false
    })
  }

  constructor (props) {
    super(props)
    this.camera = null
    this.watchId = null
    this.state = {
      cameraIsEnabled: false,
      positionError: null,
      position: null,
      picture: null,
      file: null,
      isVideoRecording: false
    }
  }

  componentDidMount () {
    this.watchPosition()
  }

  watchPosition = () => {
    this.watchId = navigator.geolocation.watchPosition(
      position => this.setState({ position }),
      error => this.setState({ positionError: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    )
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchId)
  }

  get formatPosition () {
    const { position } = this.state
    const { coords } = position
    return `Lat: ${coords.latitude}\nLon: ${coords.longitude}\nSpeed: ${coords.speed}`
  }

  render () {
    const {
      cameraIsEnabled,
      position,
      picture,
      isVideoRecording,
      positionError
    } = this.state
    if (cameraIsEnabled) {
      return (
        <View style={styles.cameraContainer}>
          <Camera
            ref={this.setCameraRef}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
          >
            <View style={styles.cameraToolbar}>
              <Button
                onPress={this.handleTakePicture}
                title='Photo'
              />
              <Button
                onPress={isVideoRecording
                  ? this.handleStopRecord
                  : this.handleTakeVideo}
                title={isVideoRecording ? 'Stop' : 'Record'}
              />
              <Button
                onPress={this.handleDisableCamera}
                title='Close'
              />
            </View>
          </Camera>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleEnableCamera}
          title='Camera'
        />
        <Button
          onPress={this.handlePickFile}
          title='Pick file'
        />
        <Text style={styles.title}>
          {positionError || position ? this.formatPosition : 'Geolocation...'}
        </Text>
        <View style={styles.content}>
          <Image
            style={styles.img}
            source={{
              uri: picture
                ? picture.path
                : 'https://perspektiva-inva.ru/userfiles/kinofest_juri/no-photo.jpg'
            }}
          />
        </View>
      </View>
    )
  }
}
