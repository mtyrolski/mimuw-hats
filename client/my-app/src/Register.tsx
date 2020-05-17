import {Modal, Button, Form, Input, Upload, Select, Radio, Card, Row} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import {RadioChangeEvent} from "antd/es/radio";
import {optionLayout, tailLayout, uploadProps} from "./FormLayouts";
import {GoogleOutlined, MailOutlined} from "@ant-design/icons/lib";

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
            <Row justify="center">
            <Card title="Register" style={{ width: 300, objectPosition: "center"}} loading={this.state.loading} >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={() => this.setState({loading: true})}
            >

                <Form.Item name="mail" label={"E-mail"} rules={[{ required: true,  message: 'E-mail required'},
                    {pattern: new RegExp("^[\\w.+\\-]+@gmail\\.com$"), message: 'Not correct gmail adress' }]}>
                    <Input/>
                </Form.Item>

                <Form.Item {...layout}>
                    <Button type="primary" htmlType="submit" key="submit">
                        <GoogleOutlined/>Register
                    </Button>
                </Form.Item>

                </Form>
            </Card>
            </Row>
        )
    }
}