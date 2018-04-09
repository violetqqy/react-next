import react from 'react'
import * as axios from 'axios'
import Head from 'next/head'
import Login from '../components/Login'

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
    this.onComplete = this.onComplete.bind(this)
  }

  onComplete(value) {
    console.log(value)
  }

  render() {
    return (
      <div>
        <Head>
          <title>登录</title>
        </Head>
        <Login onComplete={this.onComplete} />
      </div>
    )
  }
}
