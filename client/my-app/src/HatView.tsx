import * as React from 'react';
import {Button, Divider, Form, Input, Modal, Slider, Upload} from "antd";
import {Hat} from "./Hat";
import {User} from "./User";
import {SliderValue} from "antd/es/slider";
import {layout, tailLayout, uploadProps} from "./FormLayouts";
import {UploadOutlined} from "@ant-design/icons/lib";

interface HatViewProps {
    hat: Hat;
    size: number;
}

interface MineViewProps {
    user: User;
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
                padding: 5, margin: 5, float: "left"}}
                >
                <b style={{fontSize: this.props.size.toString()}}>{this.props.hat.name}</b>
                <img style={{width: '100%'}} alt={this.props.hat.imageID} src={"/images/" + this.props.hat.imageID} />
            </div>

                <Modal
                    title={this.props.hat.name}
                    visible={this.state.popupVisibility}
                    onOk={() => this.setState({popupVisibility: false})}
                    onCancel={() => this.setState({popupVisibility: false})}
                    footer={[
                        <button> Usuń </button>
                    ]}
                >
                    <img style={{width: '100%', height: '100%'}} alt={this.props.hat.imageID} src={"/images/" + this.props.hat.imageID} />
                </Modal>

            </div>
        )
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

                <button onClick={() => this.setState({addVisible: true})}> Dodaj czapkę </button>

                <Modal
                    title="Dodaj czapkę"
                    visible={this.state.addVisible}
                    onOk={() => this.setState({addVisible: false})}
                    onCancel={() => this.setState({addVisible: false})}
                    footer={[
                        <Button key="back" onClick={() => this.setState({addVisible: false})}>
                            Anuluj
                        </Button>,
                    ]}
                >

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item name="name" label={"hat name"} rules={[{ required: true,  message: 'Podaj nazwę!' }]}>
                            <Input/>
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
        )
    }
}
