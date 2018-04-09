import react from 'react'
import Link from 'next/link'
import {
  List,
  Icon
} from 'antd-mobile'

class AccountList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='box'>
          <div className='middle-wrap'>
            <div className='middle'>
              {this.props.name}
            </div>
          </div>
          <div className='left'>
            <img className='avatar' src={this.props.avatar} />
          </div>
          {
            this.props.status == '申请中' ? (
              <div className='right red'>
                {this.props.status}
              </div>
            ) : (
              <div className='right'>
                {this.props.status}
              </div>
            )
          }
        </div>
        <style jsx>{`
          .box {
            position: relative;
            height: 36px;
            line-height: 36px;
            color: #666;
            font-size: 15px;
          }
          .middle-wrap {
            position: relative;
            float: left;
            width: 100%;
            height: 100%;
          }
          .middle-wrap .middle {
            height: 100%;
            margin: 0 100px 0 50px;
            text-algin: left;
          }
          .left {
            float: left;
            width: 50px;
            margin-left: -100%;
            height: 100%;
          }
          .right {
            float: left;
            width: 100px;
            height: 100%;
            margin-left: -100px;
            font-size: 14px;
            text-align: right;
            color: #999;
          }
          .avatar {
            display: block;
            width: 36px;
            height: 36px;
            border-radius: 36px;
          }
          .red {
            color: #da322e;
          }
        `}
        </style>
      </div>
    )
  }
}

class FamilyAccountAccount extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <List>{
          Array.isArray(this.props.familyList) ? 
          this.props.familyList.map((obj, i) => (
            <List.Item  key={i}>
              <AccountList key={i} name={obj.name} status={obj.status} avatar={obj.avatar} />
            </List.Item>
          )) : ''
          }
          <List.Item>
            <Link href='/account/add'>
              <div className='item-add'>添加新家庭成员</div>
            </Link>
          </List.Item>
        </List>
        <style jsx>{`
          .item-add {
            width: 100%;
            padding: 45px 0 0 0;
            margin: 10px;
            background: url(/static/images/icon-add.png) top center no-repeat;
            background-size: 35px 35px;
            color: #999;
            font-size: 16px;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default FamilyAccountList
