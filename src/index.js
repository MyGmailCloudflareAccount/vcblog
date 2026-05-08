export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url)

        if (url.pathname.startsWith('/api/')) {
            const { set_config } = await import('./env/config.js')
            set_config(env.vcblog_config)

            const { set_database } = await import('./env/database.js')
            set_database(env.vcblog_database)

            const { default: api } = await import('./api.js')
            return api.fetch(request, env, ctx)
        }

        return env.assets.fetch(request)
    }
}
