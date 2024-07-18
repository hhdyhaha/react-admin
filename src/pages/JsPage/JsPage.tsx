// import { useSelector, useDispatch } from 'react-redux';
import CommonTabs from "@/components/CommonTabs.tsx";
import {App} from 'antd';
// import {setItems} from "@/pages/JsPage/jsPageSlice.ts";
import {useSelector} from 'react-redux';
import DebounceThrottle from '@/pages/JsPage/TabViews/DebounceThrottle/DebounceThrottle.tsx'
import CopyPage from "@/pages/JsPage/TabViews/CopyPage/CopyPage.tsx";
import JsControl from "@/pages/JsPage/TabViews/JsControl/JsControl.tsx";
import PromiseControl from "@/pages/JsPage/TabViews/PromiseControl/PromiseControl.tsx";
import NewOperator from "@/pages/JsPage/TabViews/NewOperator/NewOperator.tsx";
import React from "react";
/**
 * 根据reduxActiveTab的值来判断不同的页面
 * @constructor
 */
function ActiveItem() {
    const tabsDict:{ [key: string]: React.JSX.Element } = {
        '0': <JsControl/>,
        '1': <DebounceThrottle/>,
        '2': <CopyPage/>,
        '3': <PromiseControl/>,
        '5': <NewOperator/>
    }
    const reduxActiveTab = useSelector((state) => state.jsPage.activeTab);
    // 添加默认值处理或错误边界
    return tabsDict[reduxActiveTab] || <div>没有对应组件!!</div>;
}

function JsPage() {
    // const items = useSelector((state) => state.jsPage.items);
    // const dispatch = useDispatch();
    // function handleDispatch() {
    //     // 传给reducer的action里面的data
    //     dispatch(setItems({1: '1', 2: '2'}));
    // }
    return (
        <div className='h-full'>
            <App>
                <CommonTabs/>
            </App>
            <ActiveItem/>
        </div>
    );
}

export default JsPage;