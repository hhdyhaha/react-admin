import {createContext} from 'react';

interface CommonTabsProps {
    cssPropTabsList?: {
        label: string;
        key: string;
        disabled?: boolean;
        children?: string;
    }[];
    cssArgTypes?: string;
}

const cssContext = createContext<CommonTabsProps>({});
export default cssContext