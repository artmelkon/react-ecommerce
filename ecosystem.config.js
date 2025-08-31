module.exports = {
  apps: [
    {
      name: "server",
      script: "pnpm",
      args: ['run', 'pm2:dev'],
      exec_mode: "fork",
      cwd: './server',
      watch: process.env.NODE_ENV === 'development' ? true : false,
      env: {
        NODE_ENV: 'development',
        DB_URI: 'mongodb://localhost/react-ecom',
        STRIPE_WEBHOOK_SECRET: 'whsec_159674c1aef42ec8b6f7d2bf76503b84db0d5640fe71b1f3b4fd833c93d7732c',
        PRIVATE_KEY: 'cQ62H2uNcBPiW55o+TWwADDBuiPt4rH4+90BmbdOXAg=',
        PORT: 4000
      }
    },
    {
      name: 'client',
      script: 'pnpm',
      args: ['start'],
      cwd: './client',
      instances: 1,
      env: {
        NODE_ENV: 'development',
        REACT_APP_STRIPE_PUBLISHABLE_KEY: 'pk_test_51PyLlxE5SubHOlS9cqTWOzA1oBQMmO1GoIRfPnf1WdUulcmnyJvMhbHNNUWYsplgRKoZRJ1UjEdR4ouqdz1PejWy00iIM5ucTK',
        PORT: 3001
      }
    }
  ]
}
