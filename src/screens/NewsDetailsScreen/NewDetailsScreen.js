import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Button } from 'react-native-elements'
import { View, Text, ScrollView } from 'react-native'
import FormInput from '../../components/FormInput/FormInput'
import { reduxForm, Field } from 'redux-form'
import db from '../../storage/firebase'
import styles from './NewDetailsScreenStyles'

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

    const { user, navigation } = this.props
    const { content } = navigation.state.params

    if (content && content._id) {
      db.refs.notes.child(content._id).set({ name, description })
    } else {
      const newNoteRef = db.refs.notes.push({ name, description })
      db.refs.journals.child(user.uid).child(newNoteRef.key).set(true)
    }

    navigation.goBack()
  }

  componentDidMount () {
    this.props.navigation.setParams(
      { handleSubmit: this.props.handleSubmit(this.handleSubmit) })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>{moment().format('MM/DD/YYYY h:mm a')}</Text>
          <Field
            style={{
              borderWidth: 0,
              borderColor: 'transparent'
            }}
            name='name'
            component={FormInput}
            onSubmitEditing={this.props.handleSubmit(this.handleSubmit)}
            placeholder='Title'
          />
          <Field
            style={{
              marginBottom: 25
            }}
            name='description'
            component={FormInput}
            onSubmitEditing={this.props.handleSubmit(this.handleSubmit)}
            placeholder='Your content'
          />
        </ScrollView>
      </View>
    )
  }
}
