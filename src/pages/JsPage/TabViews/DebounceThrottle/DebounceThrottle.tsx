import {Image, Input, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import debounceThrottleImage from '@/assets/DebounceThrottle.png';

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
            {/*三个Input垂直靠左*/}
            <div className='flex flex-col items-start'>
                <Input className='w-1/2 mt-6 mb-6' placeholder={'我是未防抖节流的输入框'} onChange={() => {
                    console.log('未防抖节流');
                }}></Input>
                <Input className='w-1/2 mb-6' placeholder={'我是防抖的输入框'} onChange={debounce(() => {
                    console.log('防抖');
                }, 1000)}
                       suffix={
                           <Tooltip title="这是一个防抖输入框，连续的事件，只需触发一次回调">
                               <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                           </Tooltip>
                       }
                ></Input>
                <Input className='w-1/2 mb-6' placeholder={'我是节流的输入框'} onChange={throttle(() => {
                    console.log('节流');
                }, 1000)}
                       suffix={
                           <Tooltip
                               title="这是一个节流输入框，像水流经过闸门，无论上游水压多大，下游流量都被控制在一定范围内，适用于如实时搜索、滚动加载等场景">
                               <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                           </Tooltip>
                       }
                ></Input>
            </div>

            <div className="w-full max-w-lg overflow-auto flex">
                <Image
                    src={debounceThrottleImage}
                    alt="Debounce and Throttle illustration"
                    width={430}
                />
            </div>
        </>
    );
}

export default DebounceThrottle;