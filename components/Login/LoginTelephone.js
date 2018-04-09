import react from 'react'
import {
  List,
  InputItem,
  Toast,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {
  LOGIN_STEP
} from './_login.entity'

export default class LoginTelephone extends React.Component {
  /**
   * 
   * @param {telephone, onTelephoneChange, onStepChange} props 
   */
  constructor(props) {
    super(props)
    this.state = {
      telephoneValid: false
    }
    this.onErrorClick = this.onErrorClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onStepChange = this.onStepChange.bind(this)
  }

  onErrorClick(value) {
    if (this.state.telephoneValid) {
      Toast.info('请输入正确的11位手机号')
    }
  }

  onChange(value) {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        telephoneValid: true
      })
    } else {
      this.setState({
        telephoneValid: false
      })
    }
    this.props.onTelephoneChange(value)
  }

  onStepChange() {
    if (!this.state.telephoneValid) {
      // axios.get('/').then(res => {

      // })
      if (false) {
        this.props.onStepChange(LOGIN_STEP.SET_VALIDCODE)
      } else {
        this.props.onStepChange(LOGIN_STEP.SET_PASSWORD)
      }
    }
  }

  render() {
    return (
      <div>
        <WhiteSpace size='xl' />
        <List>
          <InputItem
            type='phone'
            placeholder='请输入手机号'
            error={this.state.telephoneValid}
            onErrorClick={this.onErrorClick}
            onChange={this.onChange}
            value={this.props.telephone} />
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <List>
            <Button type='primary' onClick={this.onStepChange} 
              disabled={!this.props.telephone || this.state.telephoneValid}>下一步</Button>
          </List>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}
