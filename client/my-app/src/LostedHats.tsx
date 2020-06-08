import * as React from "react";
import {apiFetchAuth} from "./fetcher";
import {SliderValue} from "antd/es/slider";
import {Button, Divider, message, Modal, Popconfirm, Slider} from "antd";
import {DeleteOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons/lib";
import {AddHat, HatView} from "./HatView";
import {Hat} from "./Hat";
import Line from "antd/es/progress/Line";
import {PostView} from "./PostView";

interface LostedHatsProps {

}

interface LostHatViewProps {
    hat: Hat;
}

export class LostHatView extends React.Component<LostHatViewProps> {

    state = {
        popupVisibility: false,
        posts: [],
    }

    async getPosts() {

    }

    handleSearch() {
        this.getPosts();
        this.setState({popupVisibility: true,});
    }

    render() {
        return (

            <div className="site-layout-background">

            <div style={{width: "100%", height: "100px"}} >

                <Divider style={{width: "200px"}}  type="vertical"> {this.props.hat.name} </Divider>

                <img  style={{height: "96px", marginTop: "12px"}} alt={this.props.hat.imageUrl} src={this.props.hat.imageUrl} />

                <Divider style={{width: "120px"}}  type="vertical" />

                <Button onClick={() => this.setState({popupVisibility: true,})}> <SearchOutlined/> Search for this hat </Button>

            </div>

                <Divider/>

                <Modal
                    title={[this.props.hat.name]}
                    visible={this.state.popupVisibility}
                    onCancel={() => this.setState({popupVisibility: false})}

                    footer={[
                        <Button onClick={() => this.setState({popupVisibility: false})}> Cancel </Button>
                    ]}
                >

                    {this.state.posts.map(post => <PostView post={post} />)}

                </Modal>

            </div>
        );
    }
}

export class LostedHats extends React.Component<LostedHatsProps> {
    state = {
        size: 20,
        addVisible: false,
        hats: [],
    }

    async getHats() {
        await apiFetchAuth(true, `hats`, {method: 'GET'})
            .then(response => response.json())
            .then(json => this.setState({
                hats: [...json],
            }));
    }

    constructor(props: LostedHatsProps) {
        super(props);
        this.getHats();
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>

                {this.state.hats.map(hat => <LostHatView hat={hat} />)}

                <Divider />

            </div>
        )
    }
}
