// import {Button} from "antd";
//
// function NewOperator() {
//     function _new(constructor, ...args){
//         // 定义空数组,将__proto__指向 prototype
//         const instance = Object.create(constructor);
//         // 改变this指向
//         const result = constructor.apply(instance, args);
//         // 如果构造函数返回一个对象,则返回这个对象,否则返回新创建的对象
//         return (typeof result === 'object' && result !== null) || typeof result === 'function' ? result : instance;
//     }
//     function handleNewOperate(){
//         console.log('哈哈')
//         const hahaBoxElement = document.getElementsByClassName('haha-box');
//         console.log('hahaBoxElement', hahaBoxElement);
//         const hahaBoxChild = document.createElement('div');
//         hahaBoxChild.className = 'haha-box-child';
//         hahaBoxChild.innerHTML = '哈哈的子节点'
//         hahaBoxElement[0].appendChild(hahaBoxChild);
//     }
//     return (
//         <div className='box'>
//             <Button onClick={handleNewOperate}>点击生成new操作符</Button>
//             <div className="haha-box">
//                 哈哈
//             </div>
//         </div>
//     );
// }
//
// export default NewOperator;

import React, { useState } from 'react';

const NewOperator = () => {
    const [result, setResult] = useState('');

    const clearResult = () => {
        setResult('');
    };

    const appendResult = (text) => {
        setResult(prev => prev + text + '\n');
    };

    const runBasicExample = () => {
        clearResult();

        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        Person.prototype.sayHello = function() {
            return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
        };

        const john = new Person("John", 30);

        appendResult("Basic Example:");
        appendResult(JSON.stringify(john, null, 2));
        appendResult(john.sayHello());
        appendResult("Is john an instance of Person? " + (john instanceof Person));
    };

    const runWithoutNew = () => {
        clearResult();

        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        const john = Person("John", 30);

        appendResult("Without New:");
        appendResult("john: " + john);
        appendResult("Window.name: " + window.name);
        appendResult("Window.age: " + window.age);
    };

    const runInheritanceExample = () => {
        clearResult();

        function Animal(name) {
            this.name = name;
        }

        Animal.prototype.speak = function() {
            return `${this.name} makes a sound.`;
        };

        function Dog(name) {
            Animal.call(this, name);
        }

        Dog.prototype = Object.create(Animal.prototype);
        Dog.prototype.constructor = Dog;

        Dog.prototype.bark = function() {
            return `${this.name} barks.`;
        };

        const dog = new Dog("Buddy");

        appendResult("Inheritance Example:");
        appendResult(JSON.stringify(dog, null, 2));
        appendResult(dog.speak());
        appendResult(dog.bark());
        appendResult("Is dog an instance of Dog? " + (dog instanceof Dog));
        appendResult("Is dog an instance of Animal? " + (dog instanceof Animal));
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">new 操作符演示</h2>

            <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                    onClick={runBasicExample}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    基本示例
                </button>
                <button
                    onClick={runWithoutNew}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    不使用 new
                </button>
                <button
                    onClick={runInheritanceExample}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    继承示例
                </button>
            </div>

            <div className="mt-4">
                <h3 className="font-bold mb-2">结果：</h3>
                <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
          {result || '点击按钮运行示例'}
        </pre>
            </div>

            <div className="mt-4">
                <h3 className="font-bold">说明：</h3>
                <ul className="list-disc list-inside">
                    <li>基本示例：展示 new 操作符如何创建对象和使用原型</li>
                    <li>不使用 new：展示不使用 new 时会发生什么（在浏览器环境中）</li>
                    <li>继承示例：展示如何使用 new 和原型链实现继承</li>
                </ul>
            </div>
        </div>
    );
};

export default NewOperator;