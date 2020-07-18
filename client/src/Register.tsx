import {Modal, Button, Form, Input, Card} from 'antd';
import React from 'react';
import {GoogleOutlined} from "@ant-design/icons/lib";
import {apiFetch} from "./fetcher";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16, offset: 8},
}

interface OverlayProps {
    visible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

export class RegisterView extends React.Component<OverlayProps> {

    state = {
        loading: false,
        message: null
    }

    render() {
        return (
            <Modal
                title={["Register"]}
                visible={this.props.visible}
                onOk={() => {
                    this.setState({message: null});
                    this.props.handleOk();
                }}
                onCancel={() => {
                    this.setState({message: null});
                    this.props.handleCancel();
                }}
                footer={[
                ]}
            >

                <Card loading={this.state.loading}>

                    {this.state.message ||
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={values => {
                            this.setState({loading: true});
                            apiFetch('user/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: values.mail
                                })
                            }).then(response => {
                                this.setState({loading: false});
                                switch (response.status) {
                                    case 200:
                                        this.setState({message: 'Email successfully sent.'});
                                        break;
                                    case 409:
                                        this.setState({message: 'User already exists.'});
                                        break;
                                    case 422:
                                        this.setState({message: 'Incorrect email.'});
                                        break;
                                    case 503:
                                        this.setState({message: 'An error occured while sending email.'});
                                        break;
                                }

                                this.setState({loading: false});
                            })
                        }
                        }
                    >


                        <Form.Item name="mail" label={"E-mail"} rules={[{required: true, message: 'E-mail required'},
                            {
                                pattern: new RegExp("^[\\w.+\\-]+@(students.)?mimuw\\.edu\\.pl$"),
                                message: 'Not correct MIMUW adress'
                            }]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item {...layout}>
                            <Button type="primary" htmlType="submit" key="submit">
                                <GoogleOutlined/>Register
                            </Button>
                        </Form.Item>
                    </Form>}
                </Card>
            </Modal>
        )
    }
}
