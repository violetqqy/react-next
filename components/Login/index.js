import react from 'react'
import * as axios from 'axios'
import LoginTelephone from './LoginTelephone'
import LoginValidCode from './LoginValidCode'
import LoginPassword from './LoginPassword'
import {
  LOGIN_STEP
} from './_login.entity'

class Login extends React.Component {
  /**
   * 
   * @param {onComplete} props 
   */
  constructor(props) {
    super(props)
    /**
     * step 登录步骤
     * telephone 手机号码
     * code 验证码
     * password 密码
     */
    this.state = {
      step: LOGIN_STEP.SET_TELEPHONE,
      telephone: '',
      code: '',
      password: '',
    }
    this.onStepChange = this.onStepChange.bind(this)
    this.onCompleteLogin = this.onCompleteLogin.bind(this)
    this.onCompleteRegister = this.onCompleteRegister.bind(this)
    this.onTelephoneChange = this.onTelephoneChange.bind(this)
    this.onCodeChange = this.onCodeChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onStepChange(value) {
    this.setState({
      step: value
    })
  }

  onCompleteLogin(value) {
    console.log(this.state.telephone)
    console.log(this.state.code)
    axios.get('http://10.2.101.149:3008/tel').then(res => {
      if (res.data.code == 0) {
        this.props.onComplete(res.data)
      } else {
        Toast.info('登录失败')
      }
    })
  }

  onCompleteRegister(value) {
    console.log(this.state.telephone)
    console.log(this.state.code)
    console.log(this.state.password)
    axios.get('http://10.2.101.149:3008/tel').then(res => {
      if (res.data.code == 0) {
        this.props.onComplete(res.data)
      } else {
        Toast.info('登录失败')
      }
    })
  }

  onTelephoneChange(value) {
    this.setState({
      telephone: value
    })
  }

  onCodeChange(value) {
    this.setState({
      code: value
    })
  }

  onPasswordChange(value) {
    this.setState({
      password: value
    })
  }

  render() {
    switch (this.state.step) {
      case LOGIN_STEP.SET_TELEPHONE:
        return (
          <LoginTelephone 
            telephone={this.state.telephone} 
            onTelephoneChange={this.onTelephoneChange} 
            onStepChange={this.onStepChange} />
        )
      case LOGIN_STEP.SET_VALIDCODE:
        return (
          <LoginValidCode
            telephone={this.state.telephone} 
            code={this.state.code} 
            onCodeChange={this.onCodeChange} 
            onComplete={this.onCompleteLogin} />
        )
      case LOGIN_STEP.SET_PASSWORD:
        return (
          <LoginPassword
            telephone={this.state.telephone} 
            code={this.state.code} 
            onCodeChange={this.onCodeChange} 
            password={this.state.password} 
            onPasswordChange={this.onPasswordChange} 
            onComplete={this.onCompleteRegister} />
        )
    }
  }
}

export default Login
