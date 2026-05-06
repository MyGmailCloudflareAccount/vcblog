import { apiHandler } from './api.js'
import { set_config } from './env/config.js'
import { set_database } from './env/database.js'

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url)

        if (url.pathname.startsWith('/api/')) {
            set_config(env.vcblog_config)
            set_database(env.vcblog_database)
            return apiHandler.fetch(request, env, ctx)
        }

        return env.assets.fetch(request)
    }
}
