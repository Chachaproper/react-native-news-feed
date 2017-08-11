import React from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableHighlight,
  Platform,
  PermissionsAndroid
} from 'react-native'
import Camera from 'react-native-camera'
import Video from 'react-native-video'
import {
  DocumentPicker,
  DocumentPickerUtil
} from 'react-native-document-picker'
import Sound from 'react-native-sound'
import { AudioRecorder, AudioUtils } from 'react-native-audio'
import Layout from '../../components/Layout/Layout'
import styles from './FeaturesScreenStyles'

export class FeaturesScreen extends Layout {
  setCameraRef = camera => {
    this.camera = camera
  }

  setPlayerRef = player => {
    this.player = player
  }

  handlePickFile = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()]
    }, (err, res) => {
      if (err) return this.setState({ fileError: err, file: null })
      this.setState({ fileError: null, file: res })
    })
  }

  handleTakePicture = () => {
    this.camera.capture()
      .then(data => {
        this.setState({ picture: data, video: null })
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
        this.setState({ video: data, picture: null })
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

  _renderButton = (title, onPress, active) => {
    const style = active ? styles.activeButtonText : styles.buttonText

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    )
  }

  prepareRecordingPath = audioPath => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  _pause = () => {
    const { recording } = this.state
    if (!recording) {
      console.warn('Can\'t pause, not recording!')
      return
    }

    this.setState({ stoppedRecording: true, recording: false })

    return AudioRecorder.pauseRecording()
      .then(filePath => {
        if (Platform.OS === 'android') this._finishRecording(true, filePath)
      })
  }

  _stop = () => {
    const { recording } = this.state
    if (!recording) {
      console.warn('Can\'t stop, not recording!')
      return
    }

    this.setState({ stoppedRecording: true, recording: false })

    return AudioRecorder.stopRecording()
      .then(filePath => {
        if (Platform.OS === 'android') this._finishRecording(true, filePath)
      })
  }

  _play = () => {
    const { recording } = this.state
    if (recording) this._stop()

    // These timeouts are a hacky workaround for some issues with
    // react-native-sound. See
    // https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      const sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error)
        }
      })

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing')
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }, 100)
    }, 100)
  }

  _record = () => {
    const { recording, hasPermission, stoppedRecording, audioPath } = this.state
    if (recording) {
      console.warn('Already recording!')
      return
    }

    if (!hasPermission) {
      console.warn('Can\'t record, no permission granted!')
      return
    }

    if (stoppedRecording) {
      this.prepareRecordingPath(audioPath)
    }

    this.setState({ recording: true })

    try {
      AudioRecorder.startRecording()
    } catch (error) {
      console.error(error)
    }
  }

  _finishRecording (didSucceed, filePath) {
    this.setState({ finished: didSucceed })
    console.log(
      `Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`)
  }

  constructor (props) {
    super(props)
    this.camera = null
    this.player = null
    this.watchId = null
    this.state = {
      cameraIsEnabled: false,
      positionError: null,
      position: null,
      picture: null,
      video: null,
      file: null,
      fileError: null,
      isVideoRecording: false,
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: null
    }
  }

  componentDidMount () {
    this.watchPosition()

    this._checkPermission().then(hasPermission => {
      this.setState({ hasPermission })

      if (!hasPermission) return

      this.prepareRecordingPath(this.state.audioPath)

      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) })
      }

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === 'OK', data.audioFileURL)
        }
      }
    })
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

  _checkPermission () {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true)
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    }

    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result)
        return (result === true || result ===
          PermissionsAndroid.RESULTS.GRANTED)
      })
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
      video,
      file,
      fileError,
      isVideoRecording,
      positionError,
      recording,
      currentTime
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

        <Text />

        <Button
          onPress={this.handlePickFile}
          title='Pick file'
        />

        <Text style={styles.title}>
          {positionError || position ? this.formatPosition : 'Geolocation...'}
        </Text>

        {(fileError || file) ? (
          <Text style={styles.title}>
            {fileError || (file ? file.fileName : '')}
          </Text>
        ) : null}

        <View style={styles.controls}>
          {this._renderButton('RECORD', this._record, recording)}
          {this._renderButton('PLAY', this._play)}
          {this._renderButton('STOP', this._stop)}
          {this._renderButton('PAUSE', this._pause)}
          <Text style={styles.progressText}>{currentTime}s</Text>
        </View>

        <View style={styles.content}>
          {video ? (
            <Video
              muted
              repeat
              ref={this.setPlayerRef}
              source={{ uri: video.path }}
              style={styles.img}
            />
          ) : (
            <Image
              style={styles.img}
              source={{
                uri: picture
                  ? picture.path
                  : 'https://perspektiva-inva.ru/userfiles/kinofest_juri/no-photo.jpg'
              }}
            />
          )}

        </View>
      </View>
    )
  }
}
