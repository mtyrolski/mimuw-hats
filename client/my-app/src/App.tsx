import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import {PostView} from "./PostView";
import {Boro} from "./Boro";
import {OverlayVisible} from "./Overlay"
import  {Layout, Menu} from 'antd';
import {UserOutlined, SearchOutlined, GlobalOutlined, PlusOutlined} from "@ant-design/icons/lib";

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
    state = {
        posts: [],
        error: null,
        popupVisible: false
    };

    componentDidMount() {
        fetch('http://localhost:2137/posts' )
            .then(res => res.json())
            .then(json => this.setState({posts: json}),
                error => this.setState({error: "error"}));
    }

    // TODO set selected to current route
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
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<GlobalOutlined />}>
                            <Link to="/feed" style={{color: 'rgba(255, 255, 255, 0.65)'}}>All hats</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                            <Link to="/mine" style={{color: 'rgba(255, 255, 255, 0.65)'}}>My hats</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<PlusOutlined />}>
                            <a onClick={() => {
                                console.log(this.state);
                                this.setState({popupVisible: true});
                                console.log(this.state);
                            }} style={{color: 'rgba(255, 255, 255, 0.65)'}}>Report a lost haterino</a>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<SearchOutlined />}>
                            <Link to="/found" style={{color: 'rgba(255, 255, 255, 0.65)'}}>Report a found hat</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Switch>
                            <Route path="/feed">
                                {this.state.posts.map(post => <PostView post={post} />)}
                            </Route>
                            <Route path="/mine">
                                <Boro/>
                            </Route>
                            <Route path="/lost">
                                TODO
                            </Route>
                            <Route path="/found">
                                TODO
                            </Route>
                        </Switch>
                        <OverlayVisible visible={this.state.popupVisible}
                        handleCancel={() => this.setState({popupVisible: false})}
                        handleOk={() => this.setState({popupVisible: false})}/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Router>;
    }
}

export default App;