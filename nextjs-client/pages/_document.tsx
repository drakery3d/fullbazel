import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="72x72" href="icons/icon-72x72.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192x192.png" />
          <link rel="apple-touch-icon" href="icons/icon-192x192.png" />

          <meta name="description" content="Fullstack Example Monorepo with Bazel" />
          <meta name="theme-color" content="#4d9f4e" />

          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css?family=Material+Icons&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="theme light">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
