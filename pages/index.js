import Link from 'next/link'
// import Header from '../components/Header'
import Layout from '../components/MyLayout'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

const Index = (props) => (
  // <div>
  //   {/* <Link href="/about">
  //     <button style={{fontSize: 20}}>About Page</button>
  //   </Link> */}
  //   <Header/>
  //   <p>Hello Next.js</p>
  // </div>
  <Layout>
    {/* <p>Hello Next.js</p> */}
    {/* <h1>My Blog</h1>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js" />
      <PostLink id="learn-nextjs" title="Learn Next.js" />
      <PostLink id="deploy-nextjs" title="Deploy Next.js" />
    </ul> */}
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async (context) => {
  const { openId } = context.query
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Content ${data.length},openId: ${openId}`)

  return {
    shows: data
  }
}

export default Index