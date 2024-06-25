// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
const tabsContent:string[] = ['防抖节流','深拷贝,浅拷贝']

interface initItem{
    items:{label:string,key:string}[],
    argTypes:string,
    activeTab:string
}
const initialState:initItem = {
    items: new Array(tabsContent.length).fill(null).map((_, i) => {
        const id = String(i);
        return {
            label: `${tabsContent[i]}`,
            key: id,
            // children: 'haha', // 选项卡头显示内容
        };
    }),
    argTypes:'3',
    activeTab: '0'
};

export const jsPageSlice = createSlice({
    name: 'jsPage', // dispatch的时候自动拼接的type值
    initialState,
    reducers: {
        // state 初始化的值是initialState action 的值是 type 和 data
        /**
         * @param state createSlice 还需要我们为 reducer 传入初始状态值，以便在第一次调用时就有一个 state。在这种情况下，我们提供了一个对象，它有一个从 0 开始的 value 字段。
         * @param action Redux Toolkit 有一个名为 createSlice 的函数，它负责生成 action 类型字符串、action creator 函数和 action 对象的工作。
         * 你所要做的就是为这个 slice 定义一个名称，编写一个包含 reducer 函数的对象，它会自动生成相应的 action 代码。name 选项的字符串用作每个 action 类型的第一部分，每个 reducer 函数的键名用作第二部分。
         * 因此，"counter" 名称 + "increment" reducer 函数生成了一个 action 类型 {type: "counter/increment"}。（毕竟，如果计算机可以为我们做，为什么要手写！）
         */
        setItems: (state, action) => {
            state.activeTab = action.payload.activeTab
        },
    },
});

export const { setItems } = jsPageSlice.actions;
export default jsPageSlice.reducer;