import { successMsg, errorMsg } from './message'

export default function copy(value) {
    
    window.navigator.clipboard.writeText(value)
        .then(() => {
            successMsg(`复制成功：${value}`)
        })
        .catch((err) => {
            errorMsg(`复制失败：${err}`)
        })
}
