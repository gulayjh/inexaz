import {Button, Form, FormRule, Input, Table, Upload} from "antd";
import React, {useCallback, useMemo, useState} from "react";
import {useUploadStyles} from "./container.style";
import {FileIcon, SignPlusIcon} from "../../assets/images/icons/sign";
import useLocalization from "../../assets/lang";
import {fileSize} from "../../core/helpers/file-size";
import {generateGuid} from "../../core/helpers/generate-guid";
import QRComponent from "../../core/shared/qr/qr.component";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../core/helpers/get-token";
import {useUpload} from "./actions/mutations";
import {useLogin} from "../login/actions/mutations";

function HomeComponent() {
    const {chooseButton, upload, list, listItem} = useUploadStyles();
    const translate = useLocalization();
    const {mutate} = useUpload();
    const [fileList, setFileList] = useState<any>([]);

    const handleListUpload = useCallback((file: any) => {
        setFileList((prevFileList: any) => [...prevFileList, file].slice(0, 100));
    }, [fileList]);

    const beforeUpload = useCallback((file: any) => {
        handleListUpload(file);

        return false;
    }, []);

    const uploadProps = useMemo(() => ({
        multiple: true,
        accept: '.pdf',
        showUploadList: false,
        beforeUpload,
    }), [beforeUpload]);


    const initialValues: any = {
        fullname: '',
        pin: '',
    };
    const rules: { [key: string]: FormRule[] } = useMemo(() => ({
        fullname: [
            {
                required: true,
                message: translate('input_required'),
            },
        ],
        pin: [
            {
                required: true,
                message: translate('input_required'),
            },
            {
                min: 7,
                message: translate('pin_min_length'),
            }
        ],

    }), [translate]);
    const navigate = useNavigate();

    const onSubmit = useCallback((values: any) => {

        const formData: any = new FormData();
        formData.append(`AssignedFullName`, values.fullname);
        formData.append(`AssignedPin`, values.pin);
        fileList.map((item: any) => {
            formData.append(`Document`, item);
        });
        mutate(formData);
    }, [fileList]);

    return (
        <div>
            <Form name='basic' layout='vertical'>
                <div className={upload}>
                    <Form.Item
                        name='FormFile' valuePropName='name'>
                        <Upload {...uploadProps} maxCount={100} fileList={fileList}
                                disabled={fileList?.length === 100}
                        >
                            <div className={chooseButton}>
                                <span><SignPlusIcon/></span>
                                <span><h3>{translate('add_title')}</h3></span>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>
            </Form>
            <div className={list}>
                {fileList && fileList.length && fileList.map((file: any, index: number) => {
                    return (
                        <div className={`col-lg-3 col-md-4 col-sm-6 ${listItem}`}>
                            <FileIcon/>
                            {file.name}
                        </div>
                    );
                })}

            </div>
            <div>
                <Form
                    name='login'
                    initialValues={initialValues}
                    onFinish={onSubmit}
                    layout='vertical'
                >
                    <Form.Item
                        rules={rules.fullname}
                        name='fullname'
                        label='Ad Soyad'>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.pin}
                        name='pin' label='FIN'>
                        <Input maxLength={7}/>
                    </Form.Item>
                    <div>
                        <Button className='w-100' type='primary' htmlType='submit'>
                            {translate('login_sign_in_button')}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default HomeComponent;
