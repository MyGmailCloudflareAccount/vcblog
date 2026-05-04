import { apiHandler } from './api.js'
import { set_config } from './env/config.js'
import { set_database } from './env/database.js'

export default {
    async fetch(request, env, ctx) {
        set_config(env.vcblog_config)
        set_database(env.vcblog_database)

        const url = new URL(request.url)

        if (url.pathname.startsWith('/api/')) {
            return apiHandler.fetch(request, env, ctx)
        }

        const assetResponse = await env.ASSETS.fetch(request)
        if (assetResponse.status !== 404) {
            return assetResponse
        }

        if (!url.pathname.includes('.') || url.pathname.endsWith('/')) {
            return env.ASSETS.fetch(new Request(url.origin + '/index.html', request))
        }

        return assetResponse
    }
}
