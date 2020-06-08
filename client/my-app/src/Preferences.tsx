import React from "react";
import {Divider, Switch} from "antd";

export class Preferences extends React.Component {
    render() {
        return(
            <div style={{textAlign: "center"}}>
                <div>
                Enable notifications
                <Switch checkedChildren={"ON"} unCheckedChildren={"OFF"} defaultChecked style={{marginLeft: "50px"}}/>
                </div>

                <Divider />

                <div>
                    Send diagnostic
                    <Switch checkedChildren={"ON"} unCheckedChildren={"OFF"} defaultChecked style={{marginLeft: "50px"}} />
                </div>

                <Divider />

                <div>
                    Remove Kebab
                    <Switch checkedChildren={"ON"} unCheckedChildren={"OFF"} style={{marginLeft: "50px"}} />
                </div>
            </div>
        );
    }
}
