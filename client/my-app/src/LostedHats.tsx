import * as React from "react";
import {apiFetchAuth} from "./fetcher";
import {SliderValue} from "antd/es/slider";
import {Alert, Button, Divider, message, Modal, Popconfirm, Slider} from "antd";
import {AlertOutlined, DeleteOutlined, HeartOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons/lib";
import {AddHat, HatView} from "./HatView";
import {Hat} from "./Hat";
import Line from "antd/es/progress/Line";
import {PostView} from "./PostView";
import {LostOverlay} from "./Overlay";
import {User} from "./User";
import {Post} from "./Post";

interface LostedHatsProps {
    user: User;
}

interface LostHatViewProps {
    postHat: Post;
}

export class LostHatView extends React.Component<LostHatViewProps> {

    state = {
        popupVisibility: false,
        posts: [],
        visibility: true,
    }

    async getPosts() {
        await apiFetchAuth(true, `posts?page=1&perPage=3`, {method: 'GET'})
            .then(response => response.json())
            .then(json => this.setState({posts: [...json]}));
    }

    handleSearch() {
        this.getPosts();
        this.setState({popupVisibility: true,});
    }

    async markFound() {
        await apiFetchAuth(true, `posts/${this.props.postHat.id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then();
        this.setState({visibility: false});
    }

    render() {
        return (

            (this.state.visibility ? <div className="site-layout-background">

            <div style={{width: "100%", height: "100px"}} >

                <Divider style={{width: "200px", fontSize: "20px"}}  type="vertical"> {this.props.postHat.hat.name} </Divider>

                <Divider style={{width: "60px"}}  type="vertical" />

                <img  style={{height: "100%", marginTop: "20px"}} alt={this.props.postHat.hat.imageUrl} src={this.props.postHat.hat.imageUrl} />

                <Button style={{float: "inline-start", marginLeft: "20px", width: "200px", marginTop: "30px"}} onClick={() => this.handleSearch()}> <SearchOutlined/> Search for this hat </Button>

                <Popconfirm placement="topLeft" title={"Are you sure you found " + this.props.postHat.hat.name + "?"}
                            onConfirm={() => {this.markFound(); message.info("Hat marked found")}} okText="Yes" cancelText="No">
                    <Button style={{float: "left", marginLeft: "20px", width: "200px", marginBottom: "30px"}} type={"primary"}> <HeartOutlined/>Mark as found </Button>
                </Popconfirm>

            </div>

                <Divider/>

                <Modal
                    title={[this.props.postHat.hat.name]}
                    visible={this.state.popupVisibility}
                    onCancel={() => this.setState({popupVisibility: false})}

                    footer={[
                        <Button onClick={() => this.setState({popupVisibility: false})}> Cancel </Button>
                    ]}
                >

                    {this.state.posts.map(post => <PostView post={post} />)}

                </Modal>

            </div> : null)
        );
    }
}

export class LostedHats extends React.Component<LostedHatsProps> {
    state = {
        size: 20,
        addVisible: false,
        postHats: new Array<Post>(0),
        lostVisible: false,
    }

    async getHats() {
        await apiFetchAuth(true, `posts/lost`, {method: 'GET'})
            .then(response => response.json())
            .then(json => this.setState({
                postHats: [...json],
            }));
    }

    constructor(props: LostedHatsProps) {
        super(props);
        this.getHats();
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>

                {this.state.postHats.map(hat => <LostHatView postHat={hat}/>)}

                <Divider />

                <Button onClick={() => this.setState({lostVisible: true})}> <AlertOutlined/> Report a lost hat </Button>

                <LostOverlay visible={this.state.lostVisible}
                             handleCancel={() => this.setState({lostVisible: false})}
                             handleOk={() => this.setState({lostVisible: false})}
                             content={true}
                             user={this.props.user}/>

            </div>
        )
    }
}
