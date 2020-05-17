import {Modal, Button, Form, Input, Checkbox, Upload, Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, {ChangeEvent, Context} from 'react';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface overlayProps {

}

const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info : Pick<Readonly<any>, any>) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        } else if (info.file.status === 'error') {
        }
    },
};

export class OverlayVisible extends React.Component {

    state = { visible: true };

    constructor(props : overlayProps) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleOk() {
        this.setState({
            visible: false,
        });
    };

    handleCancel() {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title="Zgłoś czapkę"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
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