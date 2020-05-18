import React from "react";
import {UploadChangeParam} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

export function uploadProps(component : React.Component, list : UploadFile[]) {
    return {
        accept: ".png,.jpg,.jpeg",
        action: "dummy",
        name : 'file',
        fileList : list,
        onChange : (info : UploadChangeParam<UploadFile<any>>) => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            component.setState({fileList: fileList});},
        beforeUpload : () => false,
    };
}

export const layout = {
    textAlign: "center",
};

export const tailLayout = {
    wrapperCol: { span: 16},
};

export const optionLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16},
};
