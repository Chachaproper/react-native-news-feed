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
  return {
    user: state.auth.user,
    initialValues: {
      name: ownProps.navigation.state.params.content.name,
      description: ownProps.navigation.state.params.content.description
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
      db.refs.journals.child(user.uid).set({ [newNoteRef.key]: true })
    }

    navigation.goBack()
  }

  componentDidMount () {
    this.props.navigation.setParams(
      { handleSubmit: this.props.handleSubmit(this.handleSubmit) })
  }

  render () {
    const { content } = this.props.navigation.state.params
    let resultContent = content || {}

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
            defaultValue={resultContent.name || ''}
          />
          <Field
            style={{
              marginBottom: 25
            }}
            name='description'
            component={FormInput}
            onSubmitEditing={this.props.handleSubmit(this.handleSubmit)}
            placeholder='Your content'
            defaultValue={resultContent.description || ''}
          />
        </ScrollView>
      </View>
    )
  }
}
