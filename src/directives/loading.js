
const loadingDirective = {
    mounted(el, binding) {
        console.log(el, binding);
        if (binding.value) {
            el.innerHTML = '正在加载中...'
        }
    },
    
    updated(el, binding) {
        if(binding.oldValue !== binding.value) {
            el.innerHTML = ''
        }
    },
}

export default loadingDirective