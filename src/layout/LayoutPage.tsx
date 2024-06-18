import React from 'react';
import {Layout, Menu, theme, ConfigProvider} from 'antd';
import {RouterProvider, useNavigate} from "react-router-dom"
import routersList from "@/router/index.tsx"

const {Header, Content, Footer} = Layout;

const items = routersList.routes.map((routeItem, index: number) => {
    const itemDict: { [key: string]: string } = {
        '/': '首页'
    }
    if (routeItem.path && routeItem.path !== '*') {
        const menuDataItem = {
            key: routeItem.id,
            label: itemDict[routeItem.path],
        }
        return menuDataItem
    }

})

const App: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    // const navigate = useNavigate();
    const clickMenuItem = (e) => {
        console.log('e', e)
        // navigate('/')
    }
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
                        defaultSelectedKeys={['0']}
                        items={items}
                        style={{flex: 1, minWidth: 0}}
                        onClick={clickMenuItem}
                    />
                </Header>
                <Content style={{padding: '0 48px', margin: '16px 0'}}>
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <RouterProvider router={routersList}/>
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