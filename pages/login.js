import react from 'react'
import * as axios from 'axios'
import {
  List,
  InputItem,
  Toast,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import Head from 'next/head'
import LoginTelephone from '../components/Login/LoginTelephone'
import LoginValidCode from '../components/Login/LoginValidCode'
import {
  LOGIN_STEP
} from '../components/Login/_login.entity'

class Login extends React.Component {
  /**
   * 
   * @param {step, onStepChange} props 
   */
  constructor(props) {
    super(props)
    /**
     * telephone 手机号码
     * code 验证码
     * password 密码
     */
    this.state = {
      telephone: '',
      code: '',
      password: '',
    }
    this.onTelephoneChange = this.onTelephoneChange.bind(this)
    this.onCodeChange = this.onCodeChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.login = this.login.bind(this)
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

  login() {

  }

  render() {
    switch (this.props.step) {
      case LOGIN_STEP.SET_TELEPHONE:
        return (
          <LoginTelephone 
            telephone={this.state.telephone} 
            onTelephoneChange={this.onTelephoneChange} 
            onStepChange={this.props.onStepChange} />
        )
      case LOGIN_STEP.SET_VALIDCODE:
        return (
          <LoginValidCode
            code={this.state.code} 
            onCodeChange={this.onCodeChange} 
            onComplete={this.props.onStepChange} />
        )

        // case LOGIN_STEP.SET_PASSWORD:
        //   return (
        //     <LoginPassword
        //       code={this.state.code} 
        //       onCodeChange={this.onCodeChange} 
        //       password={this.state.password} 
        //       onPasswordChange={this.onPasswordChange} 
        //       onStepChange={this.props.onStepChange} />
        //   )
      default:
        return (
          <LoginTelephone 
            telephone={this.state.telephone} 
            onTelephoneChange={this.onTelephoneChange} 
            onStepChange={this.props.onStepChange} />
        )
    }
  }
}

export default class extends React.Component {
  static async getInitialProps({
    req
  }) {
    const userAgent = req ? req.headers['user-agent'] : nabigator.userAgent;
    return {
      userAgent
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      step: LOGIN_STEP.SET_TELEPHONE
    }
    this.onStepChange = this.onStepChange.bind(this)
  }

  onStepChange(value) {
    this.setState({
      step: value
    })
  }

  render() {
    return (
      <div>
        <Head>
          <title>登录</title>
        </Head>
        <Login step={this.state.step} onStepChange={this.onStepChange} />
      </div>
    )
  }
}
