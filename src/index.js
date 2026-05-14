export default {
    async fetch(req, env, ctx) {
        const url = new URL(req.url)

        if (url.pathname.startsWith('/api/')) {
            const { set_config } = await import('./env/config.js')
            set_config(env.vcblog_config)

            const { set_database } = await import('./env/database.js')
            set_database(env.vcblog_database)

            const { default: api } = await import('./api.js')
            return api.fetch(req, env, ctx)
        }

        const asset = await env.assets.fetch(req)
        if (asset.status === 404 && !url.pathname.includes('.')) {
            const spa = new Request(new URL('/', req.url), req)
            return env.assets.fetch(spa)
        }

        return asset
    }
}
