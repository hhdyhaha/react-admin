// import React, { useState } from 'react';
// import { Button, Space, Card, Typography, Divider } from 'antd';
//
// const { Title, Paragraph, Text } = Typography;
//
// const CallApplyBind = () => {
//     const [result, setResult] = useState('');
//
//     const person = {
//         fullName: function(city, country) {
//             return `${this.firstName} ${this.lastName}, ${city}, ${country}`;
//         }
//     };
//
//     const person1 = {
//         firstName: "张",
//         lastName: "三"
//     };
//
//     const handleCall = () => {
//         const callResult = person.fullName.call(person1, "北京", "中国");
//         setResult(`Call 结果: ${callResult}`);
//     };
//
//     const handleApply = () => {
//         const applyResult = person.fullName.apply(person1, ["上海", "中国"]);
//         setResult(`Apply 结果: ${applyResult}`);
//     };
//
//     const handleBind = () => {
//         const bindFunc = person.fullName.bind(person1, "广州");
//         const bindResult = bindFunc("中国");
//         setResult(`Bind 结果: ${bindResult}`);
//     };
//
//     const buttons = [
//         { type: 'call', handler: handleCall, desc: '使用给定的this值和参数来调用函数' },
//         { type: 'apply', handler: handleApply, desc: '类似call，但参数以数组形式传入' },
//         { type: 'bind', handler: handleBind, desc: '创建一个新函数，this值被绑定到提供的值' }
//     ];
//
//     return (
//         <Card title="Call, Apply, Bind 演示" style={{ width: 500, margin: '20px auto' }}>
//             <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
//                 <Title level={4}>点击按钮查看不同方法的效果:</Title>
//                 {buttons.map(({ type, handler, desc }) => (
//                     <Card key={type} size="small">
//                         <Button onClick={handler} type="primary" style={{ marginBottom: 10 }}>
//                             {type.toUpperCase()}
//                         </Button>
//                         <Paragraph>{desc}</Paragraph>
//                     </Card>
//                 ))}
//                 <Divider />
//                 <Title level={5}>结果展示:</Title>
//                 <Text strong>{result}</Text>
//             </Space>
//         </Card>
//     );
// };
//
// export default CallApplyBind;

import React, { useState } from 'react';

const CallApplyBindDemo = () => {
    const [result, setResult] = useState('');

    const person = {
        fullName: function(city, country) {
            return `${this.firstName} ${this.lastName}, ${city}, ${this.middleName}, ${country}`;
        }
    };

    const person1 = {
        firstName: "John",
        lastName: "Doe",
        middleName: "foooooooooo"
    };

    const person2 = {
        firstName: "Mary",
        lastName: "Doe",
        middleName: "baaaaaaar"
    };

    const demoCall = () => {
        const result = person.fullName.call(person1, "New York", "USA");
        setResult(`Call 结果: ${result}`);
    };

    const demoApply = () => {
        const result = person.fullName.apply(person2, ["London", "UK"]);
        setResult(`Apply 结果: ${result}`);
    };

    const demoBind = () => {
        const boundFunction = person.fullName.bind(person1);
        const result = boundFunction("Berlin", "Germany");
        setResult(`Bind 结果: ${result}`);
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">call、apply 和 bind 方法演示</h2>

            <div className="mb-4">
                <p className="font-semibold">person1:</p>
                <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(person1, null, 2)}
        </pre>
            </div>

            <div className="mb-4">
                <p className="font-semibold">person2:</p>
                <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(person2, null, 2)}
        </pre>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                    onClick={demoCall}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Call
                </button>
                <button
                    onClick={demoApply}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Apply
                </button>
                <button
                    onClick={demoBind}
                    className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                >
                    Bind
                </button>
            </div>

            <div className="mt-4">
                <p className="font-semibold">结果：</p>
                <p className="text-xl">{result}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-bold">说明：</h3>
                <ul className="list-disc list-inside">
                    <li>Call：立即调用函数，第一个参数指定 this，后续参数作为函数参数</li>
                    <li>Apply：立即调用函数，第一个参数指定 this，第二个参数是数组，包含函数参数</li>
                    <li>Bind：返回新函数，第一个参数指定 this，不会立即调用，后续参数作为函数参数</li>
                </ul>
            </div>
        </div>
    );
};

export default CallApplyBindDemo;