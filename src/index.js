import { apiHandler } from './api.js'

export default {
    async fetch(request, env, ctx) {
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
