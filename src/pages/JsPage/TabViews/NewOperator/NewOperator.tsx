import {Button} from "antd";

function NewOperator() {
    function _new(constructor, ...args){
        // 定义空数组,将__proto__指向 prototype
        const instance = Object.create(constructor);
        // 改变this指向
        const result = constructor.apply(instance, args);
        // 如果构造函数返回一个对象,则返回这个对象,否则返回新创建的对象
        return (typeof result === 'object' && result !== null) || typeof result === 'function' ? result : instance;
    }
    function handleNewOperate(){
        console.log('哈哈')
        const hahaBoxElement = document.getElementsByClassName('haha-box');
        console.log('hahaBoxElement', hahaBoxElement);
        const hahaBoxChild = document.createElement('div');
        hahaBoxChild.className = 'haha-box-child';
        hahaBoxChild.innerHTML = '哈哈的子节点'
        hahaBoxElement[0].appendChild(hahaBoxChild);
    }
    return (
        <div className='box'>
            <Button onClick={handleNewOperate}>点击生成new操作符</Button>
            <div className="haha-box">
                哈哈
            </div>
        </div>
    );
}

export default NewOperator;