import { configureStore } from '@reduxjs/toolkit';
import jsPageReducer from '@/pages/JsPage/jsPageSlice.ts';

export const store = configureStore({
    reducer: {
        jsPage: jsPageReducer,
    },
});
