import react from 'react'
import {
  List,
  InputItem,
  Toast,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import Head from 'next/head'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      value: ''
    }
    this.onErrorClick = this
      .onErrorClick
      .bind(this)
    this.onChange = this
      .onChange
      .bind(this)
    this.getTelephone = this
      .getTelephone
      .bind(this)
  }

  onErrorClick() {
    if (this.state.hasError) {
      Toast.info('请输入正确的手机号码')
    }
  }

  onChange(value) {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({hasError: true})
    } else {
      this.setState({hasError: false})
    }
    this.setState({value: value})
  }

  getTelephone() {
    console.log(this.state.value)
  }

  render() {
    return (
      <div>
        <WhiteSpace size="xl"/>
        <List>
          <InputItem
            type="phone"
            placeholder="请输入手机号"
            error={this.state.hasError}
            onErrorClick={this.onErrorClick}
            onChange={this.onChange}
            value={this.state.value}></InputItem>
        </List>
        <WhiteSpace size="xl"/>
        <WingBlank size="lg">
          <List>
            <Button type="primary" onClick={this.getTelephone}>下一步</Button>
          </List>
        </WingBlank>
        <WhiteSpace size="xl"/>
      </div>
    );
  }
}

export default class extends React.Component {
  static async getInitialProps({req}) {
    const userAgent = req
      ? req.headers['user-agent']
      : nabigator.userAgent
    return {userAgent}
  }

  render() {
    return (
      <div>
        <Head>
          <title>登录</title>
        </Head>
        <Login/>
      </div>
    )
  }
}