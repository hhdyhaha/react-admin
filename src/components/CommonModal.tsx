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
    console.log('text',text)
    return (
        <div>
            <Modal title="你要解答什么？" okText="确定" cancelText="取消" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
                <div className="h-96">
                    <ProChat
                        helloMessage="欢迎使用！！"
                        request={async (messages) => {
                            const mockedData = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
                            return new Response(mockedData);
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default CommonModal;
