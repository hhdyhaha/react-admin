import axios from "axios";
import {useState, useEffect} from "react";
import {Table} from "antd";

function CommonTable() {
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
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
    ];


    // 发送ajax请求获取数据
    function getData() {
        const params = {
            vid: 9,
            tagId: 12,
            pageNum: 1,
            pageSize: 10,
            orderBy: 'updateTime',
            order: 'desc',
        };

        axios.get('https://mock.apipark.cn/m2/4741023-4393839-default/188965246', {params}).then(res => {
            // 题目列表
            const questionlist = res.data.data.list
            console.log('questionlist', questionlist)
            setDataSource(questionlist)
        })
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey="exerciseKey"/>;
        </div>


    );
}

export default CommonTable;