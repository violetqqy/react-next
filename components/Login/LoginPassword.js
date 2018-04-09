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
import {
  LOGIN_STEP
} from './_login.entity'

export default class LoginValidCode extends React.Component {
  /**
   * 
   * @param {telephone, code, onCodeChange, password, onPasswordChange, onComplete} props 
   */
  constructor(props) {
    super(props)
    this.state = {
      codeValid: false,
      codeMsg: `获取验证码`,
      passwordValid: false,
    }
    this.onCodeErrorClick = this.onCodeErrorClick.bind(this)
    this.onCodeChange = this.onCodeChange.bind(this)
    this.onPasswordErrorClick = this.onPasswordErrorClick.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.getCode = this.getCode.bind(this)
  }

  onCodeErrorClick() {
    if (this.state.codeValid) {
      Toast.info('请输入正确的6位验证码')
    }
  }

  onCodeChange(value) {
    if (value.length < 6) {
      this.setState({
        codeValid: true
      })
    } else {
      this.setState({
        codeValid: false
      })
    }
    this.props.onCodeChange(value)
  }

  onPasswordErrorClick() {
    if (this.state.passwordValid) {
      Toast.info('请设置密码')
    }
  }

  onPasswordChange(value) {
    if (!value) {
      this.setState({
        passwordValid: true
      })
    } else {
      this.setState({
        passwordValid: false
      })
    }
    this.props.onPasswordChange(value)
  }

  onComplete() {
    if (!this.state.codeValid) {
      this.props.onComplete(LOGIN_STEP.LOGIN_COMPLETE)
    }
  }

  getCode() {
    if (this.state.codeMsg == '获取验证码') {
      let time = 60
      const codeTimer = setInterval(
        () => {
          this.setState({
            codeMsg: `${--time}秒后重新获取`
          })
          if (time < 0) {
            this.setState({
              codeMsg: `获取验证码`
            })
            clearInterval(codeTimer)
          }
        }, 1000)
      axios.get('http://10.2.101.149:3008/tel').then(res => {
        if (res.data.code == 0) {
          Toast.info('获取验证码成功')
        } else {
          Toast.info('服务器链接错误，请稍后重试')
        }
      })
    } else {
      console.log(this.props.code)
    }
  }

  render() {
    return (
      <div>
        <WhiteSpace size='xl' />
        <List>
          <InputItem
            type='number'
            maxLength='6'
            placeholder='请输入短信验证码'
            error={this.state.codeValid}
            onErrorClick={this.onCodeErrorClick}
            onChange={this.onCodeChange}
            extra={this.state.codeMsg}
            onExtraClick={this.getCode}
            value={this.props.code} />
          <InputItem
            type='password'
            placeholder='设置密码'
            error={this.state.passwordValid}
            onErrorClick={this.onPasswordErrorClick}
            onChange={this.onPasswordChange}
            value={this.props.password} />
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <List>
            <Button type='primary' onClick={this.onComplete} 
              disabled={!this.props.code || this.state.codeValid || !this.props.password || this.state.passwordValid}>登录</Button>
          </List>
        </WingBlank>
        <WhiteSpace size='xl' />
        <style jsx>{`
          .text {
            font-size: 14px;
            color: #666;
          }
        `}</style>
      </div>
    )
  }
}
