import Head from 'next/head'

export default function Home() {
  // TODO reuse tags from shared lib, preferably built with bazel

  const tags = [
    'nodejs',
    'mysql',
    'docker',
    'kubernetes',
    'angular',
    'typescript',
    'kafka',
    'progressive-web-app',
    'websockets',
    'google-cloud',
    'bazel',
    'monorepo',
    'server-side-rendering',
    'docker-comopse',
  ]

  return (
    <div className="flex items-center justify-center text-center">
      <Head>
        <title>Fullbazel</title>
      </Head>

      <main className="flex-1 max-w-lg flex flex-col items-center">
        <svg className="w-40 h-40 mt-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path style={{fill: '#76D275'}} d="M144 32 l112 112 -112 112 l-112 -112z" />
          <path style={{fill: '#43A047'}} d="M32 144 v112 l112 112 v-112z" />
          <path style={{fill: '#76D275'}} d="M368 32  l112 112 -112 112 -112 -112z" />
          <path style={{fill: '#43A047'}} d="M480 144 v112 l-112 112 v-112z" />
          <path style={{fill: '#43A047'}} d="M256 144 l112 112 -112 112 -112 -112z" />
          <path style={{fill: '#00701A'}} d="M256 368 v112 l-112 -112  v-112z" />
          <path style={{fill: '#004300'}} d="M256 368 l112 -112 v112 l-112 112z" />
        </svg>

        <h1 className="mt-8 mb-2 text-5xl font-normal font-serif">Fullstack Bazel</h1>
        <p className="text-xl">Let's build something great!</p>
        <span className="bg-primary-color h-0.5 rounded w-20 block mt-4 mb-12"></span>

        <div>
          {tags.map((value, index) => {
            return (
              <span
                key={index}
                className="bg-primary-color-dark text-white m-2 inline-block py-1 px-3 rounded-full"
              >
                {value}
              </span>
            )
          })}
        </div>
      </main>
    </div>
  )
}
