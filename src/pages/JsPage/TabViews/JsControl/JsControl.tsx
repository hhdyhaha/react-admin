import {useState, useEffect} from 'react'
import {Input, Tag, Table, Space, Button} from 'antd';
import type {TableProps} from 'antd';

function ChangeArray({oldArr, updateOldArr}) {
    interface DataType {
        key: string;
        methods: string;
        info: string;
        isReturn: string;
    }

    const [tableData, setTableData] = useState<DataType[]>([])

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '方法',
            dataIndex: 'methods',
            key: 'methods',
            width: '30%',
            render: (_, text) => (
                <Space size="middle">
                    <span>{text.methods}</span>
                    <Button type="primary" size="small" onClick={() => handleMethod(text)}>点~</Button>
                </Space>
            )
        },
        {
            title: '操作',
            dataIndex: 'info',
            key: 'age',
            width: '30%',
        },
        {
            title: '是否返回值',
            dataIndex: 'isReturn',
            key: 'address',
            width: '30%',
        }
    ];

    const data: DataType[] = [
        {
            key: '1',
            methods: 'push(1)',
            info: '添加到尾部,直接修改原数组,不返回值',
            isReturn: '返回新数组的长度'
        },
        {
            key: '2',
            methods: 'pop()',
            info: '删除数组的最后一个元素,返回删除的值',
            isReturn: '返回删除的值'
        },
        {
            key: '3',
            methods: 'shift()',
            info: '数组的第一个元素从其中删除，并返回第一个元素的值,',
            isReturn: '返回删除的值'
        },
    ];
    useEffect(() => {
        setTableData([...data])
    }, [])

    function handleMethod(text) {
        const newArr = [...oldArr]
        // eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
        const resData = eval('newArr.' + text.methods)
        // 点击方法之后,将返回值resData更新到对应preTableData数组元素中
        setTableData(preTableData => preTableData.map(item => {
            const newIsReturn = item.isReturn
            const newIsReturnArr = newIsReturn.split('：')
            if (newIsReturnArr.length !== 0 && item.key === text.key) {
                newIsReturnArr[1] = resData
                return {
                    ...item,
                    isReturn: newIsReturnArr.join('：')
                }
            } else if(newIsReturnArr.length === 0 ){
                console.log('newIsReturnArr',newIsReturnArr)
                return {
                    ...item
                }
            }else{
                return {
                    ...item
                }
            }
        }))
        updateOldArr(newArr)
    }

    return (
        <div className='h-1/3 mt-5 mb-5'>
            <h2 className='text-left'>改变数组操作的方法</h2>
            <div className="h-1.5">
                <Table columns={columns} dataSource={tableData} scroll={{x:'90vw',y:'16vh'}}/>
            </div>
        </div>
    )
}

function NoChangeArray() {
    return (
        <div className='h-1/3'>
            <h2 className='text-left'>不改变数组操作的方法</h2>
        </div>
    )
}

function JsControl() {
    const [oldArr, setOldArr] = useState<(number | string)[]>([])
    const [newArr, setNewArr] = useState<(number | string)[]>([])

    function handleInput(e) {
        const oldArrStr = e.target.value
        const oldArrList = oldArrStr.split(',')
        setOldArr(oldArrList)
        updateOld(oldArrList)
    }

    function updateOld(updateArrList: (number | string)[]) {
        setNewArr(updateArrList)
    }

    return (
        <>
            <div className="text-3xl flex justify-center items-center mb-5">
                {/*react渲染的时候会自动调用tostring,并且转换的字符串没有逗号*/}
                原数组：<Tag className="text-3xl leading-10" color="processing">[{oldArr.join(',')}]</Tag>
                新数组：<Tag className="text-3xl leading-10" color="success">[{newArr.join(',')}]</Tag>
            </div>
            <Input placeholder="请输入数组的内容,逗号分隔" onChange={handleInput}/>
            <ChangeArray oldArr={newArr} updateOldArr={updateOld}/>
            {/*<NoChangeArray/>*/}
        </>
    );
}

export default JsControl;