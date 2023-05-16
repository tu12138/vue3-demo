import { ElMessage } from "element-plus";

const successMsg = (value) => {
    ElMessage({
        message: value,
        type: 'success'
    })
}

const errorMsg = (value) => {
    ElMessage({
        message: value,
        type: 'error'
    })
}

const infoMsg = (value) => {
    ElMessage({
        message: value,
        type: 'info'
    })
}

export {
    successMsg,
    errorMsg,
    infoMsg
}