import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import Camera from 'react-native-camera'
import FilePickerManager from 'react-native-file-picker'
import {
  DocumentPicker,
  DocumentPickerUtil
} from 'react-native-document-picker'
import Layout from '../../components/Layout/Layout'
import styles from './NewDetailsScreenStyles'

export class NewDetailsScreen extends Layout {
  static navigationOptions = {
    title: 'Details'
  }

  setCameraRef = camera => {
    this.camera = camera
  }

  handlePickFile = () => {
    /*    FilePickerManager.showFilePicker(null, (response) => {
          console.log('Response = ', response)

          if (response.didCancel) {
            console.log('User cancelled file picker')
          } else if (response.error) {
            console.log('FilePickerManager Error: ', response.error)
          } else {
            this.setState({
              file: response
            })
          }
        })*/

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
    this.state = {
      cameraIsEnabled: false,
      position: null,
      picture: null,
      file: null,
      isVideoRecording: false
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => this.setState({ position }),
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  get formatPosition () {
    const { position } = this.state
    const { coords } = position
    return `lat: ${coords.latitude}, lon: ${coords.longitude}, speed: ${coords.speed}`
  }

  render () {
    const { content } = this.props.navigation.state.params
    const { cameraIsEnabled, position, picture, isVideoRecording } = this.state
    if (cameraIsEnabled) {
      return (
        <View style={styles.container}>
          <Camera
            ref={this.setCameraRef}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
          />
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
        <Text style={styles.title}>{position
          ? this.formatPosition
          : 'Geolocation...'}</Text>
        <View style={styles.content}>
          <Image
            source={{ uri: picture ? picture.path : content.img }}
            style={styles.img}
          />
          <Text style={styles.text}>{content.description}</Text>
        </View>
      </View>
    )
  }
}
