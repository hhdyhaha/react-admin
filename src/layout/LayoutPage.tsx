import React, {useEffect, useState, useRef} from 'react';
import {Layout, Menu, theme, ConfigProvider} from 'antd';
import {useNavigate, Outlet} from "react-router-dom"
import routersList from "@/router/index.tsx"

const {Header, Content, Footer} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState<{ key: string; label: string }[]>([]);
    // 组件“记住”某些信息，但又不想让这些信息 触发新的渲染 时，你可以使用 ref
    const routersListRef = useRef(routersList.routes);
    useEffect(() => {
        const itemDict: { [key: string]: string } = {
            '/home': '首页',
            '/html-page': 'Html',
            '/css-page': 'Css',
            '/js-page': 'Js',
        }
        const menuData = []
        for (const routeItem of routersList.routes) {
            // 如果/下的children存在
            if (routeItem.children) {
                for (const routeChildItem of routeItem.children) {
                    if (routeChildItem.path) {
                        const isHasPath = routeChildItem.path in itemDict;
                        if (isHasPath) {
                            const menuDataItem = {
                                key: routeChildItem.id,
                                label: itemDict[routeChildItem.path], // 确保有默认的label值
                            };
                            menuData.push(menuDataItem)
                        }
                    }
                }
            }
        }
        navigate('/home');
        setMenuItems([...menuData]);
    }, [routersListRef,navigate]) // [] 为空,只调用一次

    /**
     * 点击菜单,切换路由
     * @param e 菜单的key和路由的children的id进行对比
     */
    const clickMenuItem = (e: { key: string }) => {
        if (routersList.routes[0].children) {
            const route = routersList.routes[0].children.find(route => route.id === e.key);
            if (route && route.path) {
                navigate(route.path);
            } else {
                navigate('/');
            }
        }
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: '#ffffff'
                    }
                },
            }}
        >
            <Layout className="w-full h-full">
                <Header style={{display: 'flex', alignItems: 'center'}} className="bg">
                    <div className="demo-logo"/>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['0-0']}
                        items={menuItems}
                        style={{flex: 1, minWidth: 0}}
                        onClick={clickMenuItem}
                    />
                </Header>
                <Content style={{padding: '0 48px', margin: '16px 0'}} className="h-full">
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}
                        className="h-full"
                    >
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    🙂
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};

export default App;