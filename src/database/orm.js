import { drizzle } from 'drizzle-orm/d1'
import { get_database } from '../env/database.js'
export default () => drizzle(get_database())
