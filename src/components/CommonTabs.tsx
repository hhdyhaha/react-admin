import {useState, useEffect, useContext, useRef} from 'react';
import {Tabs, App} from 'antd';
import cssContext from '@/store/cssContext.ts';
import {useSelector, useDispatch} from 'react-redux';
// import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {setItems} from "@/pages/JsPage/jsPageSlice.ts";
// import {setItems} from "@/pages/JsPage/jsPageSlice.ts";

// 定义props传递过来的ts类型
interface CommonTabsProps {
    propTabsList?: {
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
    const {message} = App.useApp();

    // context传参的数据
    const cssCt = useContext(cssContext)
    let cssPropTabsList: CommonTabsProps['propTabsList'] = [];
    if (cssCt.cssPropTabsList) {
        cssPropTabsList = cssCt.cssPropTabsList
    }
    // ref.current 属性访问该 ref 的当前值
    const cssArgTypes = useRef<string>('0')
    if (cssCt.cssArgTypes) {
        cssArgTypes.current = cssCt.cssArgTypes
    }

    // redux传的数据
    const ReduxTabsList = useSelector((state) => state.jsPage.items);
    const reduxArgTypes = useSelector((state) => state.jsPage.argTypes);

    const dispatch = useDispatch();

    // 当前路由
    const location = useLocation();

    useEffect(() => {
        if (argTypes === '1' && location.pathname === '/html-page') {
            /**
             * useState Hook 提供了这两个功能：
             * State 变量 用于保存渲染间的数据。
             * State setter 函数 更新变量并触发 React 再次渲染组件。
             */
            setTabsList([...propTabsList])
            message.success('Props传参')
        }
        if (cssArgTypes.current === '2' && location.pathname === '/css-page') {
            setTabsList([...cssPropTabsList])
            message.success('context传参')
        }
        if (reduxArgTypes === '3' && location.pathname === '/js-page') {
            setTabsList([...ReduxTabsList])
            message.success('Redux传参')
        }
    }, [])

    function handleTab(key: string, event) {
        // console.log('key', key)
        // console.log('event', event)
        dispatch(setItems({'activeTab': key}))
    }

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                style={{height: 220}}
                items={tabsList}
                onTabClick={handleTab}
            />
        </div>
    );
}

export default CommonTabs;