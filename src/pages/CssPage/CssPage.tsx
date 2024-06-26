import CommonTabs from "@/components/CommonTabs.tsx";
import {App} from 'antd';
import cssContext from '@/store/cssContext.ts';


function CssPage() {
    const items = new Array(3).fill(null).map((_, i) => {
        const id = String(i);
        return {
            label: `context 标签-${id}`,
            key: id,
            disabled: i === 28,
            // children: `context 标签内容 ${id}`,
        };
    })
    return (
        <div>
            <App>
                <cssContext.Provider value={{'cssPropTabsList': items, cssArgTypes: '2'}}>
                    <CommonTabs/>
                </cssContext.Provider>
            </App>
            我是css页面
        </div>
    );
}

export default CssPage;