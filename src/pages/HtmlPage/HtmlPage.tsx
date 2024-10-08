import CommonTabs from "@/components/CommonTabs.tsx";
import CommonTable from "@/components/CommonTable.tsx";
import {App} from 'antd';

function HtmlPage() {
    const items = new Array(3).fill(null).map((_, i) => {
        const id = String(i);
        return {
            label: `Props 标签-${id}`,
            key: id,
            disabled: i === 28,
            // children: `Props 标签内容 ${id}`,
        };
    })
    return (
        <div className={"h-full"}>
            <CommonTable tagId={12} />
        </div>
    )
}

export default HtmlPage
