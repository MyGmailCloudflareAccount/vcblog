import { get_database } from '../env/database.js'
const db = get_database()

import { drizzle } from 'drizzle-orm/d1'
export default drizzle(db)
