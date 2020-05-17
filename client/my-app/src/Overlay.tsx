import {Modal, Button, Form, Input, Upload, Select, Radio} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import {RadioChangeEvent} from "antd/es/radio";
import {layout, optionLayout, tailLayout, uploadProps} from "./FormLayouts";

const { Option } = Select;



interface overlayProps {
    visible: boolean;
    content: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

export class FoundOverlay extends React.Component<overlayProps> {
    render() {
        return (
            <div>
                <Modal
                    title="Zgłoś czapkę"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.props.handleCancel}>
                            Anuluj
                        </Button>,
                    ]}
                >

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        { this.props.content ? <Form.Item
                            label="Content"
                            name="Treść"
                            rules={[{ required: this.props.content, message: 'Dodaj opis czapki!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item> : null}

                        <Form.Item name="segment" label="piętro" rules={[{ required: true,  message: 'Podaj piętro!' }]}>
                            <Select
                                placeholder="Wybierz piętro..."
                                allowClear
                            >
                                <Option value="parter">parter</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="cosmos">baza na księżycu</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item {...tailLayout} name="image" rules={[{ required: true,  message: 'Musisz dodać zdjęcie!' }]}>
                        <Upload {...uploadProps}>
                            <Button>
                                <UploadOutlined /> Wyślij zdjęcie
                            </Button>
                        </Upload>
                            </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>


                    </Form>
                </Modal>
            </div>
        );
    }
}

export class LostOverlay extends React.Component<overlayProps> {

    state = {
        radioValue: "choose"
    };

    constructor(props: overlayProps) {
        super(props);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.state.radioValue = "choose";
    }

    handleRadioChange(event : RadioChangeEvent) {
        this.setState({
            radioValue: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title="Zgłoś zgubienie czapki"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.props.handleCancel}>
                            Anuluj
                        </Button>,
                    ]}
                >

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="Content"
                            name="Treść"
                            rules={[{ required: true, message: 'Dodaj opis czapki!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="radio-options">
                            <Radio.Group onChange={this.handleRadioChange} defaultValue={"choose"}>
                                <Radio value={"choose"}>Wybierz z posiadanych

                                </Radio>

                                <Radio value={"upload"}> Dodaj nowe zdjęcie

                                </Radio>

                            </Radio.Group>
                        </Form.Item>

                        {this.state.radioValue === "choose" ?
                            <Form.Item {...optionLayout} name="hat" rules={[{ required: (this.state.radioValue === "choose"),  message: 'Wybierz czapkę!' }]}>
                                <Select placeholder="Wybierz czapkę..." allowClear>
                                    <Option value="czapka1">czapka1</Option>
                                    <Option value="czapka2">czapka2</Option>
                                </Select>
                            </Form.Item> : null}

                        {this.state.radioValue === "upload" ?
                            <Form.Item {...optionLayout} name="image" rules={[{ required: (this.state.radioValue === "upload"),  message: 'Musisz dodać zdjęcie!' }]}>
                                <Upload {...uploadProps}>
                                    <Button>
                                        <UploadOutlined /> Wyślij zdjęcie
                                    </Button>
                                </Upload>
                            </Form.Item> : null}


                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>


                    </Form>
                </Modal>
            </div>
        );
    }
}