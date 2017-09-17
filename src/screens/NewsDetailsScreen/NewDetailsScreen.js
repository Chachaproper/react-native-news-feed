import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { isEqual, reduce } from 'lodash'
import { Button } from 'react-native-elements'
import { View, Text, ScrollView } from 'react-native'
import FormInput from '../../components/FormInput/FormInput'
import FormInputGrow from '../../components/FormInput/FormInputGrow'
import { reduxForm, Field } from 'redux-form'
import db from '../../storage/firebase'
import styles from './NewDetailsScreenStyles'
import { addNote, updateNote } from '../../redux/actions/data'

@connect((state, ownProps) => {
  const { params } = ownProps.navigation.state
  const content = params ? params.content : null
  return {
    user: state.auth.user,
    initialValues: {
      name: content ? content.name : '',
      description: content ? content.description : ''
    }
  }
})
@reduxForm({
  form: 'note'
})
export class NewDetailsScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Note',
      headerRight: (
        <Button
          title='Save'
          color='#999'
          fontSize={20}
          backgroundColor='transparent'
          onPress={() => params.handleSubmit()}
        />
      )
    }
  }

  handleSubmit = ({ name, description }) => {
    if (!name || !description) return

    const { user, navigation, dispatch } = this.props
    const { content } = navigation.state.params
    const timestamp = content ? content.timestamp : new Date().getTime()

    const newNote = { timestamp, name, description }

    if (content && content._id) {
      dispatch(updateNote(content, newNote))
    } else {
      const ref = db().refs.notes.push()
      const id = ref.key
      dispatch(addNote({ _id: id, ...newNote }))
      ref.set(newNote)
        .then(() => db().refs.journals.child(user.uid).child(id).set(true))
    }

    navigation.goBack()
  }

  componentDidMount () {
    this.props.navigation.setParams(
      { handleSubmit: this.props.handleSubmit(this.handleSubmit) })
  }

  render () {
    const { params } = this.props.navigation.state
    const content = params ? params.content : null
    return (
      <View style={styles.container}>
        <ScrollView>

          <View style={styles.titleWrapper}>
            {content ? (
              <Text style={{ paddingLeft: 10, paddingRight: 10 }}>{moment(
                new Date(content.timestamp))
                .format('MM/DD/YYYY h:mm a')}</Text>
            ) : null}

            <View style={styles.fakeBtnWrapper}>
              <Icon name='camera' style={styles.fakeBtn} />
              <Icon name='microphone' style={styles.fakeBtn} />
              <Icon name='paperclip' style={styles.fakeBtn} />
            </View>
          </View>

          <Field
            style={{
              borderWidth: 0,
              borderColor: 'transparent'
            }}
            name='name'
            component={FormInput}
            placeholder='Title'
          />
          <Field
            style={{
              marginBottom: 25,
              borderColor: 'transparent'
            }}
            name='description'
            component={FormInputGrow}
            placeholder='Your content'
          />
        </ScrollView>
      </View>
    )
  }
}
