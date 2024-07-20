import React, { useState, useCallback } from 'react';
import { Button, Typography, Input, Space, Card } from 'antd';

const { Title, Paragraph } = Typography;

const CallApplyBind = () => {
    const [person, setPerson] = useState({
        firstName: "张",
        lastName: "三",
        fullName: function() {
            return `${this.firstName} ${this.lastName}`;
        }
    });

    const [newPerson, setNewPerson] = useState({
        firstName: "",
        lastName: ""
    });

    const [result, setResult] = useState("");

    const handleInputChange = useCallback((field, value) => {
        setNewPerson(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleMethod = useCallback((method) => {
        let fullName;
        switch(method) {
            case 'call':
            case 'apply':
                fullName = person.fullName[method](newPerson);
                break;
            case 'bind':
                fullName = person.fullName.bind(newPerson)();
                break;
            default:
                fullName = person.fullName();
        }
        setResult(`${method.charAt(0).toUpperCase() + method.slice(1)} 结果: ${fullName}`);
    }, [person, newPerson]);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <Card title="Call, Apply, Bind 演示">
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={5}>原始对象</Title>
                        <Paragraph>
                            名: {person.firstName}, 姓: {person.lastName}
                        </Paragraph>
                        <Paragraph>
                            原始结果: {person.fullName()}
                        </Paragraph>
                    </div>

                    <div>
                        <Title level={5}>新对象</Title>
                        <Space>
                            <Input
                                placeholder="名"
                                value={newPerson.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                            />
                            <Input
                                placeholder="姓"
                                value={newPerson.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                            />
                        </Space>
                    </div>

                    <Space>
                        <Button onClick={() => handleMethod('call')}>Call</Button>
                        <Button onClick={() => handleMethod('apply')}>Apply</Button>
                        <Button onClick={() => handleMethod('bind')}>Bind</Button>
                    </Space>

                    <Paragraph strong>{result}</Paragraph>
                </Space>
            </Card>
        </div>
    );
};

export default CallApplyBind;