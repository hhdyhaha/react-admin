import {useState, useEffect} from 'react';
import {Tabs, App} from 'antd';

// 定义props传递过来的ts类型
interface CommonTabsProps {
    propTabsList: {
        label: string;
        key: string;
        disabled?: boolean;
        children: string;
    }[];
    argTypes?: string;
}

/**
 * 公共标签页
 * @param propTabsList 传递过来的tabs的数组数据
 * @param argTypes 判断是什么方式传递的参数
 */
function CommonTabs({propTabsList = [], argTypes = '0'}: CommonTabsProps) {
    const [tabsList, setTabsList] = useState<CommonTabsProps['propTabsList']>([]);
    const { message } = App.useApp();

    useEffect(() => {
        if (argTypes === '1') {
            setTabsList([...propTabsList])
            message.success('Props传参')
        }else if(argTypes === '2'){
            setTabsList([...propTabsList])
            message.success('context传参')
        }else if(argTypes === '3'){
            setTabsList([...propTabsList])
            message.success('Redux传参')
        }
    }, [propTabsList, argTypes,message])

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                style={{height: 220}}
                items={tabsList}
            />
        </div>
    );
}

export default CommonTabs;