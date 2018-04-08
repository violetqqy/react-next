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
   * @param {code, onCodeChange, onComplete} props 
   */
  constructor(props) {
    super(props)
    this.state = {
      codeValid: false,
      codeMsg: `获取验证码`,
    }
    this.onErrorClick = this.onChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.getCode = this.getCode.bind(this)
  }

  onErrorClick() {
    if (this.state.codeValid) {
      Toast.info('请输入正确的6位验证码')
    }
  }

  onChange(value) {
    if (value < 6) {
      this.setState({
        telephoneValid: true
      })
    } else {
      this.setState({
        telephoneValid: false
      })
    }
    this.props.onCodeChange(value)
  }

  onComplete() {
    if (!codeValid) {
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
            onErrorClick={this.onErrorClick}
            onChange={this.onChange}
            extra={this.state.codeMsg}
            onExtraClick={this.getCode}
            value={this.props.code} />
        </List>
        <WingBlank size='lg'>
          <p>该手机已注册，请直接登录</p>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <List>
            <Button type='primary' onClick={this.onComplete} disabled={!this.props.code || this.state.codeValid}>下一步</Button>
          </List>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}
