// import { useSelector, useDispatch } from 'react-redux';
import CommonTabs from "@/components/CommonTabs.tsx";
import {App} from 'antd';
// import {setItems} from "@/pages/JsPage/jsPageSlice.ts";
import {useSelector} from 'react-redux';
import AntiShake from '@/pages/JsPage/TabViews/AntiShake/AntiShake'
import CopyPage from "@/pages/JsPage/TabViews/CopyPage/CopyPage.tsx";
import JsControl from "@/pages/JsPage/TabViews/JsControl/JsControl.tsx";
import React from "react";
/**
 * 根据reduxActiveTab的值来判断不同的页面
 * @constructor
 */
function ActiveItem() {
    const tabsDict:{ [key: string]: React.JSX.Element } = {
        '0': <JsControl/>,
        '1': <AntiShake/>,
        '2': <CopyPage/>
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