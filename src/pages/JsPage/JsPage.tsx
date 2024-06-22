import CommonTabs from "@/components/CommonTabs.tsx";
import {App} from 'antd';

function JsPage() {
    const items = new Array(3).fill(null).map((_, i) => {
        const id = String(i);
        return {
            label: `Redux 标签-${id}`,
            key: id,
            disabled: i === 28,
            children: `Redux 标签内容 ${id}`,
        };
    })
    return (
        <div>
            <App>
                <CommonTabs propTabsList={items} argTypes='3'/>
            </App>
            我是js页面
        </div>
    );
}

export default JsPage;