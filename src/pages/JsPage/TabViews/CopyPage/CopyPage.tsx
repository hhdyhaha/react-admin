function CopyPage() {
    // 深拷贝
    function deepCopy(obj:object, hash = new WeakMap()) {
        // 将对象放入 WeakMap 之前检查它是否是一个对象
        if (typeof obj !== 'object' || obj === null) return obj
        // 使用 WeakMap 避免无限递归
        /*
            WeakMap:
                只能使用对象作为键
                和map的区别: 垃圾回收时,如果对象作为键,是不会被回收的,所以有了WeakMap
                    map,键被赋值为null,仍然可以使用map.values取出所有值
                        const map = new Map()  
                        const a = {}
                        map.set(a,'你好')
                        map.get(a) // 能获取到值 同一个引用对象
                        map.get({}) // 不能获取到值 相当于新的对象
                    WeakMap会直接清空,不会阻止浏览器垃圾清空
        */
        if (hash.has(obj)) return hash.get(obj)
        let newObj:any = Array.isArray(obj) ? [] : {}
        hash.set(obj, newObj);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = deepCopy(obj[key], hash);
            }
        }
        return newObj;
    }
    const c = deepCopy(a);
    c.classes.clsName = '第三小学'
    console.log('深拷贝c', c);
    console.log('深拷贝a', a);
    return (
        <div>我是拷贝页面</div>
    );
}

export default CopyPage;