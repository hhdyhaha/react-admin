// function CopyPage() {
//     const a = {
//         name: '张三',
//         age: 18,
//         classes: {
//             clsName: '第一小学',
//             clsId: 1
//         }
//     }
//
//     // 浅拷贝
//     function shallowCopy(obj) {
//         const newObj = {};
//         for (var key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 newObj[key] = obj[key];
//             }
//         }
//         return newObj;
//     }
//
//     const b = shallowCopy(a);
//     b.classes.clsName = '第二小学';
//     console.log('浅拷贝', b);
//     console.log('浅拷贝', a);
//
//     // 深拷贝
//     function deepCopy(obj:object, hash = new WeakMap()) {
//         // 将对象放入 WeakMap 之前检查它是否是一个对象
//         if (typeof obj !== 'object' || obj === null) return obj
//         // 使用 WeakMap 避免无限递归
//         /*
//             WeakMap:
//                 只能使用对象作为键
//                 和map的区别: 垃圾回收时,如果对象作为键,是不会被回收的,所以有了WeakMap
//                     map,键被赋值为null,仍然可以使用map.values取出所有值
//                         const map = new Map()
//                         const a = {}
//                         map.set(a,'你好')
//                         map.get(a) // 能获取到值 同一个引用对象
//                         map.get({}) // 不能获取到值 相当于新的对象
//                     WeakMap会直接清空,不会阻止浏览器垃圾清空
//         */
//         if (hash.has(obj)) return hash.get(obj)
//         let newObj:any = Array.isArray(obj) ? [] : {}
//         hash.set(obj, newObj);
//         for (let key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 newObj[key] = deepCopy(obj[key], hash);
//             }
//         }
//         return newObj;
//     }
//     const c = deepCopy(a);
//     c.classes.clsName = '第三小学'
//     console.log('深拷贝c', c);
//     console.log('深拷贝a', a);
//     return (
//         <div>我是拷贝页面</div>
//     );
// }
//
// export default CopyPage;

import React, { useState } from 'react';

const CopyPage = () => {
    const [originalObject, setOriginalObject] = useState({
        name: "John",
        age: 30,
        address: {
            city: "New York",
            country: "USA"
        },
        hobbies: ["reading", "swimming"]
    });

    const [shallowCopy, setShallowCopy] = useState(null);
    const [deepCopy, setDeepCopy] = useState(null);

    const performShallowCopy = () => {
        const newShallowCopy = { ...originalObject };
        setShallowCopy(newShallowCopy);
    };

    const performDeepCopy = () => {
        const newDeepCopy = JSON.parse(JSON.stringify(originalObject));
        setDeepCopy(newDeepCopy);
    };

    const modifyShallowCopy = () => {
        if (shallowCopy) {
            shallowCopy.name = "Jane";
            shallowCopy.address.city = "Los Angeles";
            shallowCopy.hobbies.push("painting");
            setShallowCopy({ ...shallowCopy });
        }
    };

    const modifyDeepCopy = () => {
        if (deepCopy) {
            deepCopy.name = "Bob";
            deepCopy.address.city = "Chicago";
            deepCopy.hobbies.push("cooking");
            setDeepCopy({ ...deepCopy });
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">深拷贝和浅拷贝演示</h2>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <h3 className="font-bold mb-2">原始对象</h3>
                    <pre className="bg-gray-100 p-2 rounded text-sm">
            {JSON.stringify(originalObject, null, 2)}
          </pre>
                </div>
                <div>
                    <h3 className="font-bold mb-2">浅拷贝</h3>
                    <pre className="bg-gray-100 p-2 rounded text-sm">
            {shallowCopy ? JSON.stringify(shallowCopy, null, 2) : "尚未创建"}
          </pre>
                </div>
                <div>
                    <h3 className="font-bold mb-2">深拷贝</h3>
                    <pre className="bg-gray-100 p-2 rounded text-sm">
            {deepCopy ? JSON.stringify(deepCopy, null, 2) : "尚未创建"}
          </pre>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <button
                        onClick={performShallowCopy}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full mb-2"
                    >
                        执行浅拷贝
                    </button>
                    <button
                        onClick={modifyShallowCopy}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
                        disabled={!shallowCopy}
                    >
                        修改浅拷贝
                    </button>
                </div>
                <div>
                    <button
                        onClick={performDeepCopy}
                        className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 w-full mb-2"
                    >
                        执行深拷贝
                    </button>
                    <button
                        onClick={modifyDeepCopy}
                        className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 w-full"
                        disabled={!deepCopy}
                    >
                        修改深拷贝
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="font-bold">说明：</h3>
                <ul className="list-disc list-inside">
                    <li>浅拷贝：只复制对象的第一层属性，嵌套对象仍然共享引用</li>
                    <li>深拷贝：递归复制对象的所有层级，创建完全独立的副本</li>
                    <li>修改拷贝后，观察原始对象和拷贝对象的变化，以理解两种拷贝的区别</li>
                </ul>
            </div>
        </div>
    );
};

export default CopyPage;