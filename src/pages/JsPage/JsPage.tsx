import { useSelector, useDispatch } from 'react-redux';
import CommonTabs from "@/components/CommonTabs.tsx";
import {App} from 'antd';
import {setItems} from "@/pages/JsPage/jsPageSlice.ts";

function JsPage() {
    const items = useSelector((state) => state.jsPage.items);
    const dispatch = useDispatch();
    function handleDispatch() {
        // 传给reducer的action里面的data
        dispatch(setItems({1: '1', 2: '2'}));
    }
    return (
        <div>
            <App>
                <CommonTabs propTabsList={items} argTypes='3'/>
                <button onClick={handleDispatch}>haha</button>
            </App>
            我是js页面
        </div>
    );
}

export default JsPage;