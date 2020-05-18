import React from 'react';
import {Button} from "antd";
import {RegisterView} from "./Register";
import {logIn} from "./fetcher";

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
        return <div>
            TODO landing here
            <Button type="primary" shape="round" onClick={() => this.toggleRegister(this.state)}>
                Register now
            </Button>
            <Button type="primary" shape="round" onClick={() => logIn()}>
                Log in
            </Button>
            <RegisterView visible={this.state.registerVisible} handleOk={() => this.toggleRegister(this.state)} handleCancel={() => this.toggleRegister(this.state)} />
        </div>;
    }
}
