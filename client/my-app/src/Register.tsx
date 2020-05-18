import {Modal, Button, Form, Input, Upload, Select, Radio, Card, Row, Popconfirm, message, Spin} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import {RadioChangeEvent} from "antd/es/radio";
import {optionLayout, tailLayout, uploadProps} from "./FormLayouts";
import {DeleteOutlined, GoogleOutlined, LoadingOutlined, MailOutlined} from "@ant-design/icons/lib";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16, offset: 8},
}

export class RegisterView extends React.Component{

    state = {
        loading: false,
    }

    render() {
        return (
            <Modal
                title={["Register"]}
                visible={true}
                onOk={() => this.setState({popupVisibility: false})}
                onCancel={() => this.setState({popupVisibility: false})}
                footer={[
                ]}
            >

                <Card loading={this.state.loading}>

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={() => this.setState({loading: true})}
            >


                <Form.Item name="mail" label={"E-mail"} rules={[{ required: true,  message: 'E-mail required'},
                    {pattern: new RegExp("^[\\w.+\\-]+@(students.)?mimuw\\.edu\\.pl$"), message: 'Not correct gmail adress' }]}>
                    <Input/>
                </Form.Item>

                <Form.Item {...layout}>
                    <Button type="primary" htmlType="submit" key="submit">
                        <GoogleOutlined/>Register
                    </Button>
                </Form.Item>

                </Form>
                </Card>
            </Modal>
        )
    }
}