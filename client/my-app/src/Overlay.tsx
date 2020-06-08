import {Modal, Button, Form, Input, Upload, Select, Radio} from 'antd';
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

const { Option } = Select;

interface overlayProps {
    visible: boolean;
    content: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    user: User;
}

export class FoundOverlay extends React.Component<overlayProps> {

    state = {
        fileList: [],
        image: undefined,
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

    state: {radioValue: string, fileList: UploadFile[], image: string | undefined, hatList: Hat[]} = {
        radioValue: "choose",
        fileList: [],
        hatList: [],
        image: undefined,
    };

    constructor(props: overlayProps) {
        super(props);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.state.radioValue = "choose";
    }

    async handleRadioChange(event : RadioChangeEvent) {
        let hats = await apiFetchAuth(true, `hats`, {method: 'GET'}).then(response => response.json());

        this.setState({
            radioValue: event.target.value,
            hatList: hats
        });
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

                                // TODO metadata
                                // TODO select registered hat
                                formData.append('metadata', metadata);
                                formData.append('image', this.state.fileList[0].originFileObj!);
                                hat = await apiFetchAuth(true, 'hats?lost=true', {
                                    method: 'POST',
                                    body: formData
                                }).then(response => {
                                    // TODO error
                                    if (response.status != 200) {
                                        console.log('Coś się popsuło');
                                    }

                                    return response.json();
                                });
                            } else {
                                hat = {id: values['hat'], imageUrl: '', name: ''};
                            }

                            // TODO error handling
                            await apiFetchAuth(true, 'posts', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    poster: this.props.user,
                                    hat: hat,
                                    metadata: metadata
                                })
                            });
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
