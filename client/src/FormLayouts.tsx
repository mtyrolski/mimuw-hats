import React from "react";
import {UploadChangeParam} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

function getBase64(file : Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export function uploadProps(component : React.Component, list : UploadFile[]) {
    return {
        accept: ".png,.jpg,.jpeg",
        action: "dummy",
        name : 'file',
        fileList : list,
        onChange : async (info : UploadChangeParam<UploadFile<any>>) => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            let base64 = await getBase64(fileList[0].originFileObj!);
            component.setState({fileList: fileList, image: base64});},
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
