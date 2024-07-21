import React, { useEffect } from 'react';
import { Modal, message } from 'antd';
import { ProChat } from '@ant-design/pro-chat';

function CommonModal({ isModalOpen, setIsModalOpen, text }) {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Function to copy text to clipboard and show a message
    const copyToClipboard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            message.success('复制题目成功!');
        } catch (err) {
            message.error('复制失败，请重试!');
        }
    };

    // Use effect to copy text.title when the modal opens
    useEffect(() => {
        if (isModalOpen) {
            copyToClipboard(text.title);
        }
    }, [isModalOpen, text.title]);

    async function fetchChatResponse(messages = '你好') {
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

            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/services/aigc/text-generation/generation`, {
                method: 'POST',
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
            <Modal
                title="你要解答什么？"
                okText="确定"
                cancelText="取消"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <div className="h-96">
                    <ProChat
                        helloMessage={
                            '欢迎使用!'
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
