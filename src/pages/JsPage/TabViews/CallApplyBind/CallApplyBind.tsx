import React, { useState } from 'react';
import { Button, Space, Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const CallApplyBind = () => {

    const handleCall = () => {
        console.log('call');
    };

    const handleApply = () => {
        console.log('apply');
    };

    const handleBind = () => {
        console.log('bind');
    };
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-1/3 mb-8'>
                我是call、apply、bind页面
            </div>
            {/*设置button的间隔*/}
            <div className='flex flex-col w-1/3 space-y-4'>
                <Button onClick={handleCall}>Call</Button>
                <Button onClick={handleApply}>Apply</Button>
                <Button onClick={handleBind}>Bind</Button>
            </div>
        </div>
    );
};

export default CallApplyBind;