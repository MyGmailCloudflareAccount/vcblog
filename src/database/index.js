import { database } from './env.js'
import { drizzle } from 'drizzle-orm/d1'
export default drizzle(database)
