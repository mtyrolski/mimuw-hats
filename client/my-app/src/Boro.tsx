import React, {ChangeEvent, FormEvent} from "react";
interface formProps {
}

export class Boro extends React.Component {

    helper = "Tu wpisz tekst ogłoszenia...";
    state = {value: this.helper};

    constructor(props : formProps) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleClick() {
        if(this.state.value === this.helper) {
            this.setState({value: ""});
        }
    }

    handleBlur() {
        if(this.state.value === "") {
            this.setState({value: this.helper});
        }
    }

    handleTextChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event : FormEvent) {
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id="found">
                <label>
                    <input type="text" id="area" value={this.state.value} onClick={this.handleClick} onChange={this.handleTextChange} onBlur={this.handleBlur}/>
                    <br/>
                    <input type="image" value={"Obrazek"}/>
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}