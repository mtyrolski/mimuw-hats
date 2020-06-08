import React from "react";
import {Switch} from "antd";

export class Preferences extends React.Component {
    render() {
        return(
            <div style={{textAlign: "center"}}>
                <div>
                Enable notifications
                <Switch checkedChildren={"ON"} unCheckedChildren={"OFF"} defaultChecked style={{marginLeft: "50px"}}/>
                </div>

                <div>
                    Send diagnostic
                    <Switch checkedChildren={"ON"} unCheckedChildren={"OFF"} defaultChecked style={{marginLeft: "50px"}} />
                </div>

                <div>
                    Enable Kubica
                    <Switch checkedChildren={"ON"} unCheckedChildren={"OFF"} style={{marginLeft: "50px"}} />
                </div>
            </div>
        );
    }
}
