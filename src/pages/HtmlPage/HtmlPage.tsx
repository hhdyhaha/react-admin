import CommonTabs from "@/components/CommonTabs.tsx";
import {App} from 'antd';

function HtmlPage() {
    const items = new Array(3).fill(null).map((_, i) => {
        const id = String(i);
        return {
            label: `标签-${id}`,
            key: id,
            disabled: i === 28,
            children: `标签内容 ${id}`,
        };
    })
    return (
        <div>
            <App>
                <CommonTabs propTabsList={items} argTypes='1'/>
            </App>
            我是html页面
        </div>
    )
}

export default HtmlPage
