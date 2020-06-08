import {Modal, Button, Form, Input, Upload, Select, Radio, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import {RadioChangeEvent} from "antd/es/radio";
import {layout, optionLayout, tailLayout, uploadProps} from "./FormLayouts";
import {MailOutlined} from "@ant-design/icons/lib";
import {UploadFile} from "antd/es/upload/interface";
import {apiFetchAuth} from "./fetcher";
import {User} from "./User";
import {Hat} from "./Hat";
import {BoundingBox} from "./BoundingBox";
import getCroppedImg from "./cropImage";
import {Post} from "./Post";

const { Option } = Select;

interface overlayProps {
    visible: boolean;
    content: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    user: User;
}

export class FoundOverlay extends React.Component<overlayProps> {

state : {fileList: UploadFile[], image?: string, crop?: any, rotation: number} = {
    fileList: [],
    image: undefined,
    crop: null,
    rotation: 0
}

    render() {
    return (
        <div>
            <Modal
                title="Found hat"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>
                        Cancel
                    </Button>,
                ]}
            >

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={async (values) => {
                        this.props.handleCancel();

                        let metadata = 'Floor ' + values['floor'] + ' ' + values['content'];
                        let hat: Hat;
                        let formData = new FormData();

                        formData.append('metadata', metadata);
                        formData.append('image', await getCroppedImg(this.state.image, this.state.crop, this.state.rotation));
                        hat = await apiFetchAuth(true, 'hats?lost=true', {
                                method: 'POST',
                                body: formData
                            }).then(response => {
                                return response.ok ? response.json() : null;
                            });

                        if (hat) {
                            await apiFetchAuth(true, 'posts', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    poster: this.props.user.id,
                                    hat: hat.id,
                                    textContent: metadata,
                                    eventType: 'found'
                                })
                            }).then(response => {
                                if (!response.ok) {
                                    message.error('Error while posting.');
                                } else {
                                    message.info('Posted successfully.');
                                }
                            })
                        } else {
                            message.error('Error while posting.');
                        }
                    }}
                    >
                        { this.props.content ? <Form.Item
                            label="description"
                            name="content"
                            rules={[{ required: this.props.content, message: 'Description is required' }]}
                        >
                            <Input.TextArea allowClear />
                        </Form.Item> : null}

                        <Form.Item name="floor" label="floor" rules={[{ required: true,  message: 'Floor is required' }]}>
                            <Select
                                placeholder="Choose a floor..."
                                allowClear
                            >
                                <Option value="0">ground floor</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                            </Select>
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
                </Modal>
            </div>
        );
    }
}

export class LostOverlay extends React.Component<overlayProps> {

    state: {radioValue: string, fileList: UploadFile[], image: string | undefined, hatList: Hat[], crop?: any, rotation: number} = {
        radioValue: "choose",
        fileList: [],
        hatList: [],
        image: undefined,
        crop: null,
        rotation: 0,
    };

    constructor(props: overlayProps) {
        super(props);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.state.radioValue = "choose";
    }

    async handleRadioChange(event : RadioChangeEvent) {
        this.setState({radioValue: event.target.value});

        let hats: Hat[] = await apiFetchAuth(true, `hats`, {method: 'GET'}).then(response => response.json());
        let lostHats: Hat[] = await apiFetchAuth(true, `posts/lost`, {method: 'GET'})
            .then(response => response.json())
            .then(json => json.forEach((post: Post) => post.hat));
        hats = hats.filter((el: Hat) => !lostHats.includes(el));

        this.setState({hatList: hats});
    };

    render() {
        return (
            <div>
                <Modal
                    title="Lost hat"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.props.handleCancel}>
                            Cancel
                        </Button>,
                    ]}
                >

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={async (values) => {
                            this.props.handleCancel();

                            let metadata = values['content'];

                            let hat: Hat;
                            if (this.state.radioValue == 'upload') {

                                let formData = new FormData();

                                formData.append('metadata', metadata);
                                formData.append('image', await getCroppedImg(this.state.image, this.state.crop, this.state.rotation));
                                hat = await apiFetchAuth(true, 'hats?lost=true', {
                                    method: 'POST',
                                    body: formData
                                }).then(response => {
                                    return response.ok ? response.json() : null;
                                });
                            } else {
                                hat = {id: values['hat'], imageUrl: '', name: ''};
                            }

                            await apiFetchAuth(true, 'posts', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    poster: this.props.user.id,
                                    hat: hat.id,
                                    textContent: metadata,
                                    eventType: 'lost'
                                })
                            }).then(response => {
                                if (!response.ok) {
                                    message.error('Error while posting.');
                                } else {
                                    message.info('Posted successfully.');
                                }
                            })
                        }}
                    >
                        <Form.Item
                            label="description"
                            name="content"
                            rules={[{ required: true, message: 'Description is required' }]}
                        >
                            <Input.TextArea allowClear/>
                        </Form.Item>

                        <Form.Item {...tailLayout} name="radio-options">
                            <Radio.Group onChange={this.handleRadioChange} defaultValue={"choose"}>
                                <Radio value={"choose"}>Choose from registered hats

                                </Radio>

                                <Radio value={"upload"}> Add new image

                                </Radio>

                            </Radio.Group>
                        </Form.Item>

                        {this.state.radioValue === "choose" ?
                            <Form.Item {...optionLayout} name="hat" rules={[{ required: (this.state.radioValue === "choose"),  message: 'Hat is required' }]}>
                                <Select placeholder="Choose a hat..." allowClear>
                                    {this.state.hatList.map(hat => <Option value={hat.id}>{hat.name}</Option>)}
                                </Select>
                            </Form.Item> : null}

                        {this.state.radioValue === "upload" ?

                            <div>

                            <Form.Item {...optionLayout} name="image" rules={[{ required: (this.state.radioValue === "upload"),  message: 'Image is required' }]}>
                                <Upload {...uploadProps(this, this.state.fileList)}>
                                    <Button>
                                        <UploadOutlined /> Send image
                                    </Button>
                                </Upload>
                            </Form.Item>

                            { this.state.fileList[0] ? <BoundingBox imageUrl={this.state.image!}
                                                                    onUpdate={(area, rotation) => {this.setState({crop: area, rotation: rotation})}} /> : null }
                            </div>
                            : null}

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                <MailOutlined/>Submit
                            </Button>
                        </Form.Item>


                    </Form>
                </Modal>
            </div>
        );
    }
}
