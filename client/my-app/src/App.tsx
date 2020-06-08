import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import {FoundOverlay, LostOverlay} from "./Overlay"
import  {Layout, Menu, Spin} from 'antd';
import DocumentTitle from 'react-document-title';
import {
    UserOutlined,
    SearchOutlined,
    GlobalOutlined,
    PlusOutlined,
    LogoutOutlined,
    LoadingOutlined, SettingOutlined, AlertOutlined, FrownOutlined
} from "@ant-design/icons/lib";
import {AddHat, MineView} from "./HatView";
import {FeedView} from "./FeedView";
import Landing from "./Landing";
import {User} from "./User";
import {apiFetchAuth, logIn, logOut} from "./fetcher";
import {Preferences} from "./Preferences";
import {LostedHats} from "./LostedHats";

const { Content, Footer, Sider } = Layout;

interface AppState {
    user?: User,
    lostVisible: boolean
    foundVisible: boolean,
    addVisible: boolean,
    loading: boolean,
    broken: boolean
}

class App extends React.Component {
    state: AppState = {
        lostVisible: false,
        foundVisible: false,
        addVisible: false,
        loading: true,
        broken: false
    };

    componentDidMount() {
        apiFetchAuth(false, 'user/login')
            .then(response => response.ok ? response : Promise.reject(response))
            .then(response => response.json())
            .then((json: User) => this.setState({user: json}))
            .catch(error => this.setState({user: undefined}))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        if (this.state.loading)
            return <div style={{margin: 'auto auto'}}><Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} /></div>;

        if (!this.state.user) return <Landing />;

        return <Router>
            <DocumentTitle title='MIMUW-hats' />
            <Layout>
            <Sider
                style={{
                        height: '100vh',
                        position: 'fixed',
                        zIndex: 99
                }}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => this.setState({broken: broken})}
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
                    <Menu.Item key="3" icon={<FrownOutlined />}>
                        <NavLink to="/losted" style={{color: 'rgba(255, 255, 255, 0.65)'}}>My lost hats</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<AlertOutlined />}>
                        <a onClick={(e) => {
                            e.stopPropagation();
                            this.setState({lostVisible: true});
                        }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Report a lost hat</a>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<SearchOutlined />}>
                        <a onClick={(e) => {
                            e.stopPropagation();
                            this.setState({foundVisible: true});
                        }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Report a found hat</a>
                    </Menu.Item>

                    <Menu.Item key="6" icon={<PlusOutlined />}>
                        <a onClick={(e) => {
                            e.stopPropagation();
                            this.setState({addVisible: true});
                        }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Add new hat</a>
                    </Menu.Item>

                    <Menu.Item key="7" icon={<SettingOutlined />}>
                        <NavLink to="/preferences" style={{color: 'rgba(255, 255, 255, 0.65)'}}>Preferences</NavLink>
                    </Menu.Item>

                    <Menu.Item key="8" icon={<LogoutOutlined />}>
                        <a onClick={(e) => {
                            e.stopPropagation();
                            logOut();
                        }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Log out</a>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ minHeight: '100vh'}}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', width: 'min(50em, 100%)', marginLeft: 'auto',
                                    marginRight: 'auto', left: this.state.broken ? '0' : '100px', position: 'relative'}}>
                    <Switch>
                        <Route path="/feed">
                            <FeedView />
                        </Route>
                        <Route path="/" exact={true}>
                            <FeedView />
                        </Route>
                        <Route path="/mine">
                            <MineView user={this.state.user}></MineView>
                        </Route>
                        <Route path="/losted">
                            <LostedHats></LostedHats>
                        </Route>
                        <Route path="/preferences">
                            <Preferences />
                        </Route>
                    </Switch>
                    <LostOverlay visible={this.state.lostVisible}
                                 handleCancel={() => this.setState({lostVisible: false})}
                                 handleOk={() => this.setState({lostVisible: false})}
                                 content={true}
                                 user={this.state.user}/>
                    <FoundOverlay visible={this.state.foundVisible}
                                  handleCancel={() => this.setState({foundVisible: false})}
                                  handleOk={() => this.setState({foundVisible: false})}
                                  content={true}
                                  user={this.state.user}/>
                    <AddHat visible={this.state.addVisible}
                            handleCancel={() => this.setState({addVisible: false})}
                            handleOk={() => this.setState({addVisible: false})}
                            handleUpdate={()=>{}}/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
        </Router>;
    }
}

export default App;
