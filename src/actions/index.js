export const addNum = () => {
    return {
        type: 'ADD'
    }
}

export const decNum = () => {
    return {
        type: 'DEC'
    }
}

function fakeAxios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve('success')
            } else {
                reject('error')
            }
        }, 1000)
    })
}

export const asyncAddCurrentNum = (num) => {
    return dispatch => {
        dispatch({type: 'RECEIVE_STATE', networkState: true})
        fakeAxios('http://www.baidu.com?wd=react')
            .then(
                (res) => {
                    console.log(res)
                    dispatch({type: 'ADD_CURRENT_NUM', num})  // 给num添加指定的值
                    dispatch({type: 'RECEIVE_STATE', networkState: false})  // 网络请求完毕
                },
                (err) => {
                    console.log(err)
                    dispatch({type: 'RECEIVE_STATE', networkState: false})// 网络请求完毕
                })
    }
}