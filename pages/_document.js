// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file ./pages/_document.js
import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({
    renderPage
  }) {
    const {
      html,
      head,
      errorHtml,
      chunks
    } = renderPage()
    const styles = flush()
    return {
      html,
      head,
      errorHtml,
      chunks,
      styles
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'/>
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd-mobile/2.1.8/antd-mobile.min.css'/>
          <script src='https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js' />
          {/* <script>
            if ('addEventListener' in document) {
              document
                .addEventListener('DOMContentLoaded', function () {
                  FastClick.attach(document.body);
                }, false)
            }
            if (!window.Promise) {
              document.writeln('<script src='https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-prom' +
                  'ise.min.js'></script>')
            }
          </script> */}
        </Head>
        <body className='custom_class'>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
        `}</style>
      </html>
    )
  }
}
