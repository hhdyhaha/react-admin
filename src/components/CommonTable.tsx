import axios from "axios";
import {useState,useEffect} from "react";

function CommonTable() {
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

        axios.get('/api/api/exercise/list', {params}).then(res => {
            console.log(res.data);
        })
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>我是公共Table</div>
    );
}

export default CommonTable;