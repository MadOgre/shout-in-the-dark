module.exports = {
  database: {
    url: {
      development: 'mongodb://localhost/shout',
      production: process.env.MONGO_URL			
    },
    credentials: {
      development: {},
      production: {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        auth: {
          authdb: 'admin'
        }					
      }
    }
  }
}