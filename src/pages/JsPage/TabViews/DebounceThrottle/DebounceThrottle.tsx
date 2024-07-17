import {Input} from "antd";

function DebounceThrottle() {
    /**
     * 防抖
     * @param func 函数
     * @param wait 延迟时间
     */
    function debounce(func, wait) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    /**
     *  节流
     * @param func 函数
     * @param limit 延迟时间
     */
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            if (!inThrottle) {
                func();
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    return (
        <>
            <div>我是防抖节流页面</div>
            <Input placeholder={'我是未防抖节流的输入框'} onChange={() => {
                console.log('未防抖节流');
            }}></Input>
            <Input placeholder={'我是防抖的输入框'} onChange={debounce(() => {
                console.log('防抖');
            }, 1000)}></Input>
            <Input placeholder={'我是节流的输入框'} onChange={throttle(() => {
                console.log('节流');
            }, 1000)}></Input>
        </>
    );
}

export default DebounceThrottle;