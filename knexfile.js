import dotenv from 'dotenv'

dotenv.config()

const commonConfig = {
   client: 'pg',
   connection : process.env.POSTGRES_URL,
   pool: { min: 2, max: 10 },
   migrations: {
      directory: './migrations',
   },
   seeds: {
      directory: './seeds',
   },
}

export default {
   development: commonConfig,
   production: commonConfig,
}