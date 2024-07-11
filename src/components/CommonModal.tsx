import {useState} from 'react';
import {FloatButton, Modal} from 'antd';
import {RobotOutlined} from "@ant-design/icons";
import {ProChat} from '@ant-design/pro-chat';

function CommonModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="h-full">
            <FloatButton
                className="mb-16 mr-12"
                icon={<RobotOutlined/>}
                onClick={showModal}/>
            <Modal title="你要解答什么？" okText={'确定'} cancelText={'取消'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
                <div className="h-96">
                    <ProChat
                        helloMessage={
                            '欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)'
                        }
                        request={async (messages) => {
                            const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
                            return new Response(mockedData);
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default CommonModal;