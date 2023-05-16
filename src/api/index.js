// 自动导入所有的api模块

const files = import.meta.glob('./modules/*.js')

const modules = {}

Object.keys(files).map(item => {
    files[item]().then(res => {
        modules[item.replace(/(\.\/modules\/|\.js)/g, '')] = res.default
    })
})

export default modules;