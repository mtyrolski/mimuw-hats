import * as React from 'react';
import {Popconfirm, message, Button, Divider, Form, Input, Modal, Select, Slider, Tooltip, Upload} from "antd";
import {Hat} from "./Hat";
import {User} from "./User";
import {SliderValue} from "antd/es/slider";
import {layout, tailLayout, uploadProps} from "./FormLayouts";
import {
    DeleteOutlined,
    MailOutlined,
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons/lib";

interface HatViewProps {
    hat: Hat;
    size: number;
}

interface MineViewProps {
    user: User;
}

interface HatAddProps {
    visible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

class HatView extends React.Component<HatViewProps> {

    state = {
        popupVisibility: false,
    }

    render() {
        return (
            <div>
            <div onClick={() => {this.setState({popupVisibility: true})}}
                 className="site-layout-background" style={{ width: this.props.size.toString() + "%",
                float: "left", border: "3px solid", borderColor: "dark-blue"}}
                >
                <b style={{fontSize: this.props.size}}>{this.props.hat.name}
                </b>
                <img style={{width: '100%'}} alt={this.props.hat.imageID} src={"/images/" + this.props.hat.imageID} />
            </div>

                <Modal
                    title={[this.props.hat.name]}
                    visible={this.state.popupVisibility}
                    onOk={() => this.setState({popupVisibility: false})}
                    onCancel={() => this.setState({popupVisibility: false})}
                    footer={[
                        <Popconfirm placement="topLeft" title={"Are you sure you want to delete " + this.props.hat.name + "?"}
                                    onConfirm={() => {message.info("Hat deleted succesfully")}} okText="Yes" cancelText="No">
                        <Button type={"primary"} danger style={{paddingLeft: 5}}> <DeleteOutlined/>Delete </Button>
                            </Popconfirm>
                    ]}
                >
                    <img style={{width: '100%', height: '100%'}} alt={this.props.hat.imageID} src={"/images/" + this.props.hat.imageID} />
                </Modal>

            </div>
        )
    }
}

export class AddHat extends React.Component<HatAddProps> {

    render() { return(
        <Modal
            title="Add new hat"
            visible={this.props.visible}
            onOk={this.props.handleOk}
            onCancel={this.props.handleCancel}
            footer={[
                <Button key="back" onClick={this.props.handleOk}>
                    Cancel
                </Button>,
            ]}
        >

            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
            >
                <Form.Item name="name" label={"hat name"} rules={[{ required: true,  message: 'Name is required' }]}>
                    <Input/>
                </Form.Item>

                <Form.Item {...tailLayout} name="image" rules={[{ required: true,  message: 'Image is required' }]}>
                    <Upload {...uploadProps}>
                        <Button>
                            <UploadOutlined /> Send image
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        <MailOutlined/>Submit
                    </Button>
                </Form.Item>
            </Form>

        </Modal>)
    }
}

export class MineView extends React.Component<MineViewProps> {
    state = {
        size: 20,
        addVisible: false,
    }

    constructor(props : MineViewProps) {
        super(props);
        this.onSliderChange = this.onSliderChange.bind(this);
    }

    onSliderChange(value: SliderValue) {
        this.setState( {
            size: value
        });
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <Slider defaultValue={20} onChange={this.onSliderChange} min={5}
                    marks={{
                        5: 'small',
                        20: 'medium',
                        50: 'large',
                        100: 'very large',
                    }}
                />

                {this.props.user.hats.map(hat => <HatView hat={hat} size={this.state.size}/>)}

                <Divider />

                <button onClick={() => this.setState({addVisible: true})}> <PlusOutlined/> Add new hat </button>
                <AddHat visible={this.state.addVisible} handleOk={() => {this.setState({addVisible: false})}}
                        handleCancel={() => {this.setState({addVisible: false})}}/>

            </div>
        )
    }
}
