import {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO try to access database from here directly?!
  const res = await fetch('http://localhost:3001/messages')
  const data = await res.json()

  return {
    props: {
      data,
    },
  }

}

export default function Discussions({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Discussions</title>
      </Head>

      <main>
        <h1>Discussions</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  )
}
