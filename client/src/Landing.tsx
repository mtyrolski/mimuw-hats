import React from 'react';
import {Button, Col, Row} from "antd";
import {RegisterView} from "./Register";
import {logIn} from "./fetcher";
import {BoundingBox} from "./BoundingBox";

interface State {
    registerVisible: boolean
}

export default class Landing extends React.Component {
    state: State = {
        registerVisible: false
    }

    toggleRegister(state: State) {
        this.setState({registerVisible: !state.registerVisible});
    }

    render() {
        return <div style={{height: '100vh'}}>
            <Row justify='center' align='middle' style={{paddingTop: '10em'}}>
                <Col>
                    <img src='images/hat.svg' style={{margin: '0 3em 2em 0', height: '40vh'}} alt="hat" />
                </Col>
                <Col>
                <h1 style={{color: '#13a9cf'}}>Hats. Redefined.</h1>
                <h2>No more hat spam on your social media.</h2>
                <p>Experience the most elite platform for reporting lost hats ever.</p>
                    <div>
                        <Button style={{margin: '1em'}} type="primary" shape="round" onClick={() => this.toggleRegister(this.state)}>
                            Register now
                        </Button>
                        <Button style={{margin: '1em'}} type="default" shape="round" onClick={() => logIn()}>
                            Log in
                        </Button>
                    </div>
                </Col>
            </Row>
            <RegisterView visible={this.state.registerVisible} handleOk={() => this.toggleRegister(this.state)} handleCancel={() => this.toggleRegister(this.state)} />
        </div>;
    }
}
