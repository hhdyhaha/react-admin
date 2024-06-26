import {useState} from 'react'
import { Input, Tag } from 'antd';
function ChangeArray() {
    return (
        <div className='h-1/3 mt-5 mb-5'>
            <h2 className='text-left'>改变数组操作的方法</h2>
            <div className="h-1.5">
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

function CopyPage() {
    const [oldArr,setOldArr] = useState<(number|string)[]>([])
    const [newArr,setNewArr] = useState<(number|string)[]>([])
    function handleInput(e){
        const oldArrStr = e.target.value
        const oldArrList = oldArrStr.split(',')
        setOldArr(oldArrList)
        setNewArr(oldArrList)

    }
    return (
        <>
            <div className="text-3xl flex justify-center items-center mb-5">
                {/*react渲染的时候会自动调用tostring,并且转换的字符串没有逗号*/}
                原数组：<Tag className="text-3xl leading-10" color="processing">[{oldArr.join(',')}]</Tag>
                新数组：<Tag className="text-3xl leading-10" color="success">[{newArr.join(',')}]</Tag>
            </div>
            <Input placeholder="请输入数组的内容,逗号分隔" onChange={handleInput} />
            <ChangeArray/>
            <NoChangeArray/>
        </>
    );
}

export default CopyPage;