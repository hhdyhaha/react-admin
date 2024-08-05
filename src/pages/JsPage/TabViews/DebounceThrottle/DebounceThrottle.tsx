// import {Image, Input, Tooltip} from "antd";
// import {InfoCircleOutlined} from "@ant-design/icons";
// import debounceThrottleImage from '@/assets/DebounceThrottle.png';
//
// function DebounceThrottle() {
//     /**
//      * 防抖
//      * @param func 函数
//      * @param wait 延迟时间
//      */
//     function debounce(func, wait) {
//         let timeout;
//         return function () {
//             clearTimeout(timeout);
//             timeout = setTimeout(func, wait);
//         };
//     }
//
//     /**
//      *  节流
//      * @param func 函数
//      * @param limit 延迟时间
//      */
//     function throttle(func, limit) {
//         let inThrottle;
//         return function () {
//             if (!inThrottle) {
//                 func();
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
//
//     return (
//         <>
//             <div>我是防抖节流页面</div>
//             {/*三个Input垂直靠左*/}
//             <div className='flex flex-col items-start'>
//                 <Input className='w-1/2 mt-6 mb-6' placeholder={'我是未防抖节流的输入框'} onChange={() => {
//                     console.log('未防抖节流');
//                 }}></Input>
//                 <Input className='w-1/2 mb-6' placeholder={'我是防抖的输入框'} onChange={debounce(() => {
//                     console.log('防抖');
//                 }, 1000)}
//                        suffix={
//                            <Tooltip title="这是一个防抖输入框，连续的事件，只需触发一次回调">
//                                <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
//                            </Tooltip>
//                        }
//                 ></Input>
//                 <Input className='w-1/2 mb-6' placeholder={'我是节流的输入框'} onChange={throttle(() => {
//                     console.log('节流');
//                 }, 1000)}
//                        suffix={
//                            <Tooltip
//                                title="这是一个节流输入框，像水流经过闸门，无论上游水压多大，下游流量都被控制在一定范围内，适用于如实时搜索、滚动加载等场景">
//                                <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
//                            </Tooltip>
//                        }
//                 ></Input>
//             </div>
//
//             <div className="w-full max-w-lg overflow-auto flex">
//                 <Image
//                     src={debounceThrottleImage}
//                     alt="Debounce and Throttle illustration"
//                     width={430}
//                 />
//             </div>
//         </>
//     );
// }
//
// export default DebounceThrottle;

import React, { useState, useEffect, useCallback } from 'react';

const DebounceThrottle = () => {
    const [normalCount, setNormalCount] = useState(0);
    const [debounceCount, setDebounceCount] = useState(0);
    const [throttleCount, setThrottleCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const normalIncrement = () => {
        setNormalCount(prev => prev + 1);
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const throttle = (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };

    const debouncedIncrement = useCallback(
        debounce(() => setDebounceCount(prev => prev + 1), 300),
        []
    );

    const throttledIncrement = useCallback(
        throttle(() => setThrottleCount(prev => prev + 1), 300),
        []
    );

    useEffect(() => {
        let interval;
        if (isAnimating) {
            interval = setInterval(() => {
                normalIncrement();
                debouncedIncrement();
                throttledIncrement();
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAnimating, debouncedIncrement, throttledIncrement]);

    const toggleAnimation = () => {
        setIsAnimating(!isAnimating);
    };

    const resetCounts = () => {
        setNormalCount(0);
        setDebounceCount(0);
        setThrottleCount(0);
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">防抖与节流演示</h2>

            <div className="mb-4">
                <button
                    className={`px-4 py-2 rounded ${isAnimating ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                    onClick={toggleAnimation}
                >
                    {isAnimating ? '停止' : '开始'}动画
                </button>
                <button
                    className="ml-2 px-4 py-2 rounded bg-gray-500 text-white"
                    onClick={resetCounts}
                >
                    重置计数
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 border rounded">
                    <h3 className="font-semibold mb-2">普通</h3>
                    <p className="text-3xl">{normalCount}</p>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-semibold mb-2">防抖</h3>
                    <p className="text-3xl">{debounceCount}</p>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-semibold mb-2">节流</h3>
                    <p className="text-3xl">{throttleCount}</p>
                </div>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                <div className="flex">
                    <div className="py-1">
                        <svg className="h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold">说明</p>
                        <p>防抖：连续触发事件时，只执行最后一次。</p>
                        <p>节流：在一定时间内，只执行一次事件。</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebounceThrottle;