import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import {PostView} from "./PostView";
import {FoundOverlay, LostOverlay} from "./Overlay"
import  {Layout, Menu} from 'antd';
import {
    UserOutlined,
    SearchOutlined,
    GlobalOutlined,
    PlusOutlined,
    LogoutOutlined,
    LoadingOutlined, SettingOutlined, AlertOutlined
} from "@ant-design/icons/lib";
import {AddHat, MineView} from "./HatView";

const { Content, Footer, Sider } = Layout;

class App extends React.Component {
    state = {
        user: {
                name: "Jan Paweł",
                hats: [
                    {
                        id: 1,
                        name: "czapka",
                        imageID: "hamt.png"
                    },

                    {
                        id: 2,
                        name: "czapka",
                        imageID: "hamt.png"
                    },

                    {
                        id: 3,
                        name: "czapka",
                        imageID: "hamt.png"
                    },

                    {
                        id: 4,
                        name: "czapka",
                        imageID: "hamt.png"
                    }
                ]
        },
        posts: [],
        error: null,
        lostVisible: false,
        foundVisible: false,
        addVisible: false
    };

    // TODO change localhost:2137, handle error in fetch
    componentDidMount() {
        fetch('http://localhost:2137/posts', {method: 'GET'})
            .then(res => res.json())
            .then(json => this.setState({posts: json}));
    }

    render() {
        return <Router>
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >

                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<GlobalOutlined />}>
                            <NavLink to="/feed" style={{color: 'rgba(255, 255, 255, 0.65)'}}>All hats</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                            <NavLink to="/mine" style={{color: 'rgba(255, 255, 255, 0.65)'}}>My hats</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<AlertOutlined />}>
                            <a onClick={(e) => {
                                e.stopPropagation();
                                this.setState({lostVisible: true});
                            }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Report a lost hat</a>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<SearchOutlined />}>
                            <a onClick={(e) => {
                                e.stopPropagation();
                                this.setState({foundVisible: true});
                            }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Report a found hat</a>
                        </Menu.Item>

                        <Menu.Item key="5" icon={<PlusOutlined />}>
                            <a onClick={(e) => {
                                e.stopPropagation();
                                this.setState({addVisible: true});
                            }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Add new hat</a>
                        </Menu.Item>

                        <Menu.Item key="6" icon={<SettingOutlined />}>

                            <NavLink to="/" style={{color: 'rgba(255, 255, 255, 0.65)'}}>Preferences</NavLink>
                        </Menu.Item>

                        <Menu.Item key="7" icon={<LogoutOutlined />}>

                            <NavLink to="/" style={{color: 'rgba(255, 255, 255, 0.65)'}}>Logout</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh'}}>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Switch>
                            <Route path="/feed">
                                {this.state.posts.map(post => <PostView post={post} />)}
                            </Route>
                            <Route path="/mine">
                                <MineView user={this.state.user}></MineView>
                            </Route>
                        </Switch>
                        <LostOverlay visible={this.state.lostVisible}
                                     handleCancel={() => this.setState({lostVisible: false})}
                                     handleOk={() => this.setState({lostVisible: false})}
                                     content={true}/>
                        <FoundOverlay visible={this.state.foundVisible}
                                      handleCancel={() => this.setState({foundVisible: false})}
                                      handleOk={() => this.setState({foundVisible: false})}
                                      content={true}/>
                        <AddHat visible={this.state.addVisible}
                                      handleCancel={() => this.setState({addVisible: false})}
                                      handleOk={() => this.setState({addVisible: false})}/>
                    </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Router>;
    }
}

export default App;