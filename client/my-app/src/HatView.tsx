import * as React from 'react';
import {Popconfirm, message, Button, Divider, Form, Input, Modal, Select, Slider, Tooltip, Upload} from "antd";
import {Hat} from "./Hat";
import {User} from "./User";
import {SliderValue} from "antd/es/slider";
import {layout, tailLayout, uploadProps} from "./FormLayouts";
import 'react-image-crop/dist/ReactCrop.css';
import {
    DeleteOutlined,
    MailOutlined,
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons/lib";
import {apiFetchAuth} from "./fetcher";
import {BoundingBox} from "./BoundingBox";
import {UploadFile} from "antd/es/upload/interface";
import getCroppedImg from "./cropImage";

interface HatViewProps {
    hat: Hat;
    size: number;
    footerVisibility: boolean;
}

interface MineViewProps {
    user: User;
}

interface HatAddProps {
    visible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    handleUpdate: () => void;
}

export class HatView extends React.Component<HatViewProps> {

    state = {
        popupVisibility: false,
        hatVisibility: true,
    }

    async deleteHat() {
        await apiFetchAuth(true, `hats/${this.props.hat.id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(json => {this.setState({hatVisibility: false})});
    }

    render() {
        // TODO ugly switches with footerVisibility
        return (
            <div style={{display: this.state.hatVisibility ? "inline" : "none"}}>
                <div onClick={() => {this.setState({popupVisibility: true})}}
                 className="site-layout-background" style={{ width: this.props.size.toString() + "%",
                float: "left", border: this.props.footerVisibility ? "3px solid" : "none", borderColor: "dark-blue"}}
                >
                    {this.props.footerVisibility && <b style={{fontSize: this.props.size}}>{this.props.hat.name}</b>}
                    <img style={this.props.footerVisibility ? {width: '100%'} : {width: '100%', height: '40em', objectFit: 'cover'}} alt={this.props.hat.imageUrl} src={this.props.hat.imageUrl} />
                </div>

                <Modal
                    title={[this.props.hat.name]}
                    visible={this.state.popupVisibility}
                    onOk={() => this.setState({popupVisibility: false})}
                    onCancel={() => this.setState({popupVisibility: false})}
                    footer={[
                        <Popconfirm style={{display: this.props.footerVisibility ? "inline" : "none"}} placement="topLeft" title={"Are you sure you want to delete " + this.props.hat.name + "?"}
                                    onConfirm={() => {this.deleteHat(); this.setState({popupVisibility: false}); message.info("Hat deleted succesfully")}} okText="Yes" cancelText="No">
                        <Button style={{display: this.props.footerVisibility ? "inline" : "none", paddingLeft: 5}} type={"primary"} danger> <DeleteOutlined/>Delete </Button>
                            </Popconfirm>
                    ]}
                >
                    <img style={{width: '100%', height: '100%'}} alt={this.props.hat.imageUrl} src={this.props.hat.imageUrl} />

                </Modal>
            </div>
        );
    }
}

export class AddHat extends React.Component<HatAddProps> {

    state : {fileList: UploadFile[], image: string | undefined, crop: any, rotation: number} = {
        fileList: [],
        image: undefined,
        crop: null,
        rotation: 0
    }

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
                onFinish = {async values => {
                    this.props.handleCancel();

                    let metadata = values.name;
                    let formData = new FormData();

                    formData.append('metadata', metadata);
                    formData.append('image', await getCroppedImg(this.state.image, this.state.crop, this.state.rotation));

                    await apiFetchAuth(true, 'hats', {
                            method: 'POST',
                            body: formData
                        }).then(response => {
                            switch (response.status) {
                                case 200:
                                    message.info('Your hat was uploaded successfully.');
                                    this.props.handleUpdate();
                                    break;
                                case 400:
                                    message.error('Error while uploading hat: no image found.');
                                    break;
                                case 408:
                                    message.error('Error while uploading hat: timed out.');
                                    break;
                                case 422:
                                    message.warning('The image you uploaded has been classified as not containing a hat.');
                                    break;
                            }
                    });
                }
            }
            >
                <Form.Item name="name" label={"hat name"} rules={[{ required: true,  message: 'Name is required' }, {max: 20, message: 'Maximum 20 characters'}]}>
                    <Input/>
                </Form.Item>

                <Form.Item {...tailLayout} name="image" rules={[{ required: true,  message: 'Image is required' }]}>
                    <Upload {...uploadProps(this, this.state.fileList)}>
                        <Button>
                            <UploadOutlined /> Send image
                        </Button>
                    </Upload>
                </Form.Item>

                { this.state.fileList[0] ? <BoundingBox imageUrl={this.state.image!}
                            onUpdate={(area, rotation) => {this.setState({crop: area, rotation: rotation})}} /> : null }

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
        hats: [],
    }

    async getHats() {
        await apiFetchAuth(true, `hats`, {method: 'GET'})
            .then(response => response.json())
            .then(json => this.setState({
                hats: [...json],
            }));
    }

    constructor(props: MineViewProps) {
        super(props);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.getHats();
    }

    onSliderChange(value: SliderValue) {
        this.setState( {
            size: value
        });
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <Slider defaultValue={20} onChange={this.onSliderChange} min={5} style={{marginBottom: '4em'}}
                    marks={{
                        5: 'small',
                        20: 'medium',
                        50: 'large',
                        100: 'very large',
                    }}
                />

                {this.state.hats.map(hat => <HatView hat={hat} size={this.state.size} footerVisibility={true}/>)}

                <Divider />

                <button onClick={() => this.setState({addVisible: true})}> <PlusOutlined/> Add new hat </button>
                <AddHat visible={this.state.addVisible} handleOk={() => {this.setState({addVisible: false})}}
                        handleCancel={() => {this.setState({addVisible: false})}}
                        handleUpdate={() => this.getHats()}/>

            </div>
        )
    }
}
