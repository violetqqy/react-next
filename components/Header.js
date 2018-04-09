import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href='/'>
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href='/case-list'>
      <a style={linkStyle}>电子病历</a>
    </Link>
    <Link href='/case-upload'>
      <a style={linkStyle}>上传病例</a>
    </Link>
    <Link href='/doctor-mini'>
      <a style={linkStyle}>我的医生</a>
    </Link>
    <Link href='/doctor-find'>
      <a style={linkStyle}>找医生</a>
    </Link>
    <Link href='/family-account'>
      <a style={linkStyle}>家庭账号</a>
    </Link>
    <Link href='/followup-plan'>
      <a style={linkStyle}>随访计划</a>
    </Link>
    <Link href='/risk-assessment'>
      <a style={linkStyle}>风险评估</a>
    </Link>
  </div>
)

export default Header