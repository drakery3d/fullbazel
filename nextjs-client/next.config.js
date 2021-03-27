module.exports = {
  /**
   * Compression is handled by the Kubernetes NGINX Ingress
   * Thus, the Next.js server has more resources to do its thing
   */
  compress: false,
  poweredByHeader: false,
}
