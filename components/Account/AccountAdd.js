import react from 'react'
import Link from 'next/link'
import {
  InputItem,
  List,
  Picker
} from 'antd-mobile'

class AccountAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      name: '',
      telephone: '',
      call: '',
      callList: [
        [{
          value: '父亲',
          label: '父亲'
        }, {
          value: '母亲',
          label: '母亲'
        }, {
          value: '丈夫',
          label: '丈夫'
        }]
      ]
    }
    this.onTelephoneChange = this.onTelephoneChange.bind(this)
  }

  onTelephoneChange(value) {
    console.log(value)
    this.setState({
      telephone: value
    })
  }

  render() {
    return (
      <div>
        <div className='card'>
          <img src={this.state.avatar} />
          <span>{this.state.name}</span>
        </div>
        <div>
          <p>1.他/她的手机号</p>
          <InputItem 
            type='phone' 
            onChange={this.onTelephoneChange} 
            value={this.state.telephone} />
        </div>
        <List>
          <Picker 
            extra='请选择'
            data={this.state.callList}
            cascade={false}
            title='您的选择'
            value={this.state.call}
            onOk={e => console.log('ok', e)}
            onDismiss={e => console.log('dismiss', e)}>
            <List.Item arrow='horizontal'>{this.state.call}</List.Item>
          </Picker>
        </List>
        <style jsx>{`
        `}
        </style>
      </div>
    )
  }
}

export default AccountAdd
