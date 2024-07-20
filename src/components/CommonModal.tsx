import React from 'react';
import { Modal } from 'antd';
import { ProChat } from '@ant-design/pro-chat';

function CommonModal({ isModalOpen, setIsModalOpen, text }) {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function fetchChatResponse(messages='你好') {
        try {
            const params = {
                'model': 'qwen-turbo',
                'input': {
                    'messages': [
                        {
                            'role': 'system',
                            'content': 'You are a helpful assistant.'
                        },
                        {
                            'role': 'user',
                            'content': messages
                        }
                    ]
                },
                'parameters': {
                    'result_format': 'message'
                }
            };

            const response = await fetch('/api/api/v1/services/aigc/text-generation/generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-e7197f1582324f47b7f4fef9f88f533b'  // 使用环境变量或其他安全方法替换
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                const errorData = await response.json();  // 获取API返回的错误信息
                throw new Error(`API error: ${errorData.message || 'Network response was not ok.'}`);
            }
            const jsonData = await response.json(); // 返回JSON数据
            const cont = jsonData.output.choices[0].message.content
            return cont  // 返回JSON数据
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            return { error: error.message };
        }
    }
    return (
        <div>
            <Modal title="你要解答什么？" okText="确定" cancelText="取消" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
                <div className="h-96">
                    <ProChat
                        helloMessage={
                            '欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)'
                        }
                        request={async (messages) => {
                            const mockedData: string = await fetchChatResponse(messages[messages.length - 1].content);
                            return new Response(mockedData);
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default CommonModal;
