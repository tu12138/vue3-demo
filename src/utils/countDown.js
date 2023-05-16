const offWorkTimeDown = (val) => {
    let currentTime = new Date()
    let endTime = new Date(val)
    // 获取时间戳
    let currentStamp = currentTime.getTime()
    let endStamp = endTime.getTime()
    let surplusStamp = (endStamp - currentStamp) / 1000
    let hours = Math.floor(surplusStamp / 3600 % 24) < 10 ? '0' + Math.floor(surplusStamp / 3600 % 24) : Math.floor(surplusStamp / 3600 % 24)
    let minutes = Math.floor(surplusStamp / 60 % 60) < 10 ? '0' + Math.floor(surplusStamp / 60 % 60) : Math.floor(surplusStamp / 60 % 60)
    let seconds = Math.floor(surplusStamp % 60) < 10 ? '0' + Math.floor(surplusStamp % 60) : Math.floor(surplusStamp % 60)
    let fullTime = hours + '时' + minutes + '分' + seconds + '秒'
    return fullTime
}

export default offWorkTimeDown