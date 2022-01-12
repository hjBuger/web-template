const routers = []
const routerRequire = require.context(
    '../pages',
    true,
    /router-auto\.js/
)

const files = routerRequire.keys()

for (let file of files) {
    const fileConfig = routerRequire(file)
    const router = fileConfig.default || fileConfig
    routers.push(router)
}

export default routers