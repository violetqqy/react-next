import Layout from '../components/MyLayout'
import fetch from 'isomorphic-unfetch'
// export default (props) => (
//   <Layout>
//     <h1>{props.url.query.title}</h1>
//     <p>This is the blog post content.</p>
//   </Layout>
// )

// const Content = (props) =>(
//   <div>
//      {/* <h1>{props.url.query.title}</h1> */}
//      {/* <p>This is the blog post content.</p> */}
//      <h1>{props.show.name}</h1>
//      <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
//      <img src={props.show.image.medium} />
//   </div>
// )

// const Post =  (props) => (
//   <Layout>
//     <Content show={props.show} />
//   </Layout>
// )

// Post.getInitialProps = async (context) => {
//   const { id } = context.query
//   const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
//   const show = await res.json()

//   console.log(`Fetched show: ${show.name}`)

//   return { show }
// }

// export default Post
const Post =  (props) => (
  <Layout>
     <h1>{props.show.name}</h1>
     <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
     <img src={props.show.image.medium}/>
  </Layout>
)

Post.getInitialProps = async (context) => {
  console.log(context)
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post