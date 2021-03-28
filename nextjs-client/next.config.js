/* eslint-disable @typescript-eslint/no-var-requires */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  /**
   * Compression is handled by the Kubernetes NGINX Ingress
   * Thus, the Next.js server has more resources to do its thing
   */
  compress: false,
  poweredByHeader: false,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
})
