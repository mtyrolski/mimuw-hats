import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
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
import {FeedView} from "./FeedView";
import Landing from "./Landing";
import {User} from "./User";
import {apiFetchAuth, logIn, logOut} from "./fetcher";

const { Content, Footer, Sider } = Layout;

interface AppState {
    user?: User,
    lostVisible: boolean
    foundVisible: boolean,
    addVisible: boolean
}

class App extends React.Component {
    state: AppState = {
        lostVisible: false,
        foundVisible: false,
        addVisible: false
    };

    componentDidMount() {
        apiFetchAuth(false, 'user/login')
            .then((json: User) => this.setState({user: json}))
            .catch(error => this.setState({user: undefined}));
    }

    render() {
        if (!this.state.user) return <Landing />;

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

                <div style={{display: 'flex'}}>
                    <img src='/images/hamt.png' className='logo' style={{ height: '64px' }} alt='logo' />
                </div>
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
                        <a onClick={(e) => {
                            e.stopPropagation();
                            logOut();
                        }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Log out</a>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh'}}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Switch>
                        <Route path="/feed">
                            <FeedView />
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