import React from 'react'
import FamilyAccount from '../../components/Account/FamilyAccount'
import * as axios from 'axios'

export default class extends React.Component {
  static async getInitialProps() {
    const res = await axios.get(`http://10.2.10.10/pci-micro/api/user/family/apply?openId=ovMkVwCVm__t7PODaLbA0r5ZkIAw`)
    const familyList = await res.data.data.content
    familyList.map(data => {
      data.avatar = data.avatarUrl
      data.status = data.status == 1 ? '已添加' : '申请中'
    })
    console.log(familyList)
    return {
      familyList
    }
    // const userAgent = req ? req.headers['user-agent'] : nabigator.userAgent;
    // return {
    //   userAgent
    // }
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FamilyAccount familyList={this.props.familyList} />
    )
  }
}
