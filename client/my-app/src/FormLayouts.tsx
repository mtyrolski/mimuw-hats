export const uploadProps = {
    accept: ".png,.jpg",
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    name: 'file',
    /*onChange(info : Pick<Readonly<any>, any>) {
        let fileList = [...info.fileList];
        fileList.slice(-1);
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        } else if (info.file.status === 'error') {
        }
    },*/
};

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
