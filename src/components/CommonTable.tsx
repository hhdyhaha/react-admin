import { Modal, Button } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import CommonModal from "@/components/CommonModal.tsx";

function CommonTable(props) {
    const [dataSource, setDataSource] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const { tagId } = props;
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState({});  // 使用一个对象来跟踪每行的模态对话框状态

    const showModal = (key) => {
        setModalVisible(prev => ({ ...prev, [key]: true }));
    };

    const handleOk = (key) => {
        setModalVisible(prev => ({ ...prev, [key]: false }));
    };

    const handleCancel = (key) => {
        setModalVisible(prev => ({ ...prev, [key]: false }));
    };

    const columns = [
        {
            title: '题号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                // 根据当前页和页大小计算序号
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '难度等级',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: '更新时间',
            dataIndex: 'updateAt',
            key: 'updateAt',
            // 如果日期格式不是你想要的，可以使用render方法进行格式化
            render: (text) => {
                // 假设日期是ISO格式，这里使用toLocaleString()进行格式化，也可以用moment.js等库
                return new Date(text).toLocaleString();
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button type="primary" onClick={() => showModal(record.exerciseKey)}>
                        点击查询答案
                    </Button>
                    {modalVisible[record.exerciseKey] && (
                        <CommonModal
                            isModalOpen={modalVisible[record.exerciseKey]}
                            setIsModalOpen={() => handleOk(record.exerciseKey)}
                            handleCancel={() => handleCancel(record.exerciseKey)}
                            text={record}
                        />
                    )}
                </div>
            ),
        },
    ];

    // 发送ajax请求获取数据
    function getData(page = 1, pageSize = 10) {
        setLoading(true); // 请求开始前设置loading状态
        const params = {
            vid: 9,
            tagId: tagId,
            pageNum: page,
            pageSize: pageSize,
            orderBy: 'updateTime',
            order: 'desc',
        };

        axios.get('https://mock.apipark.cn/m2/4741023-4393839-default/188965246', { params }).then(res => {
            // 题目列表
            const questionlist = res.data.data.list;
            const totalCount = res.data.data.totalCount;
            setTotalCount(totalCount);
            setDataSource(questionlist);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: totalCount,
            });
        }).finally(() => {
            setLoading(false); // 请求结束后设置loading状态
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleTableChange = (pagination) => {
        getData(pagination.current, pagination.pageSize);
    };

    return (
        <div>
            <Spin spinning={loading}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="exerciseKey"
                    pagination={{
                        ...pagination,
                        position: ["bottomCenter"], // 中心位置
                    }}
                    onChange={handleTableChange}
                    size='middle'
                />
            </Spin>
        </div>
    );
}

export default CommonTable;
