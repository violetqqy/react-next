import react from 'react'
import Link from 'next/link'
import {
  List,
  Icon
} from 'antd-mobile'
import AccountList from './AccountList'

class FamilyAccount extends React.Component {
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

export default FamilyAccount
