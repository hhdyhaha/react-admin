// import {Button} from "antd";
//
// function PromiseControl() {
//     function handlePromise(isSuccess: boolean) {
//         return new Promise<any>((resolve, reject) => {
//             // 异步操作
//             setTimeout(() => {
//                 if (isSuccess) {
//                     resolve('成功')
//                 } else {
//                     reject('失败')
//                 }
//             }, 100);
//         })
//     }
//     function handlePromiseSuc() {
//         handlePromise(true).then((res) => {
//             console.log('res','成功')
//         })
//     }
//
//     function handlePromiseFail() {
//         handlePromise(false).catch((err)=>{
//             console.log('err',err)
//         })
//     }
//
//     return (
//         <>
//             <div>我是Promise页面</div>
//             <Button onClick={handlePromiseSuc}>点击promise成功</Button>
//             <Button onClick={handlePromiseFail}>点击promise失败</Button>
//         </>
//
//     );
// }
//
// export default PromiseControl;

import React, { useState } from 'react';

const PromiseControl = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const simulateAsyncOperation = (value, delay) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.2) {  // 80% 成功率
                    resolve(value);
                } else {
                    reject(new Error('操作失败'));
                }
            }, delay);
        });
    };

    const runBasicPromise = () => {
        setLoading(true);
        setResult('');
        simulateAsyncOperation('基本 Promise 成功', 1000)
            .then(result => setResult(result))
            .catch(error => setResult(error.message))
            .finally(() => setLoading(false));
    };

    const runChainedPromises = () => {
        setLoading(true);
        setResult('');
        simulateAsyncOperation('第一步', 1000)
            .then(result => {
                setResult(prevResult => prevResult + result + ' -> ');
                return simulateAsyncOperation('第二步', 1000);
            })
            .then(result => {
                setResult(prevResult => prevResult + result + ' -> ');
                return simulateAsyncOperation('第三步', 1000);
            })
            .then(result => {
                setResult(prevResult => prevResult + result);
            })
            .catch(error => setResult(error.message))
            .finally(() => setLoading(false));
    };

    const runPromiseAll = () => {
        setLoading(true);
        setResult('');
        Promise.all([
            simulateAsyncOperation('操作 1', 1000),
            simulateAsyncOperation('操作 2', 1500),
            simulateAsyncOperation('操作 3', 2000)
        ])
            .then(results => setResult('所有操作完成: ' + results.join(', ')))
            .catch(error => setResult(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Promise 演示</h2>

            <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                    onClick={runBasicPromise}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    基本 Promise
                </button>
                <button
                    onClick={runChainedPromises}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    disabled={loading}
                >
                    Promise 链
                </button>
                <button
                    onClick={runPromiseAll}
                    className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                    disabled={loading}
                >
                    Promise.all
                </button>
            </div>

            <div className="mt-4">
                <p className="font-semibold">结果：</p>
                {loading ? (
                    <p className="text-xl">加载中...</p>
                ) : (
                    <p className="text-xl">{result || '点击按钮运行示例'}</p>
                )}
            </div>

            <div className="mt-4">
                <h3 className="font-bold">说明：</h3>
                <ul className="list-disc list-inside">
                    <li>基本 Promise：演示单个 Promise 的使用</li>
                    <li>Promise 链：演示多个 Promise 的链式调用</li>
                    <li>Promise.all：演示并行执行多个 Promise</li>
                    <li>每个操作有 20% 的失败率，以展示错误处理</li>
                </ul>
            </div>
        </div>
    );
};

export default PromiseControl;