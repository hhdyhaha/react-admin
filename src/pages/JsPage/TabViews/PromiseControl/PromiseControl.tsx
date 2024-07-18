import {Button} from "antd";

function PromiseControl() {
    function handlePromise(isSuccess: boolean) {
        return new Promise<any>((resolve, reject) => {
            // 异步操作
            setTimeout(() => {
                if (isSuccess) {
                    resolve('成功')
                } else {
                    reject('失败')
                }
            }, 100);
        })
    }
    function handlePromiseSuc() {
        handlePromise(true).then((res) => {
            console.log('res','成功')
        })
    }

    function handlePromiseFail() {
        handlePromise(false).catch((err)=>{
            console.log('err',err)
        })
    }

    return (
        <>
            <div>我是Promise页面</div>
            <Button onClick={handlePromiseSuc}>点击promise成功</Button>
            <Button onClick={handlePromiseFail}>点击promise失败</Button>
        </>

    );
}

export default PromiseControl;