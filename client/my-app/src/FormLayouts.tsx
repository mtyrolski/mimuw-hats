export const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info : Pick<Readonly<any>, any>) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        } else if (info.file.status === 'error') {
        }
    },
};

export const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const optionLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16, offset: 4 },
};