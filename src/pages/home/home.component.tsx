import {Button, Form, FormRule, Input, Table, Upload} from 'antd';
import React, {useCallback, useMemo, useState} from 'react';
import {useUploadStyles} from './container.style';
import {FileIcon, SignPlusIcon} from '../../assets/images/icons/sign';
import useLocalization from '../../assets/lang';
import {fileSize} from '../../core/helpers/file-size';
import {generateGuid} from '../../core/helpers/generate-guid';
import QRComponent from '../../core/shared/qr/qr.component';
import {useNavigate} from 'react-router-dom';
import {getToken, setToken} from '../../core/helpers/get-token';
import {useUpload} from './actions/mutations';
import {useLogin} from '../login/actions/mutations';
import {useSelector} from 'react-redux';
import {IState} from '../../store/store';

function HomeComponent() {
    const {chooseButton, upload, list, listItem, form} = useUploadStyles();
    const translate = useLocalization();
    const {mutate} = useUpload();
    const [fileList, setFileList] = useState<any>([]);
    const operationId = useSelector((state: IState) => state.operationId);

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
            formData.append(`Documents`, item);
        });
        mutate(formData);
    }, [fileList]);
    console.log(operationId);
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
            {fileList && fileList.length ?
                <>
                    <div className={list}>
                        {fileList.map((file: any, index: number) => {
                            return (
                                <div className={`col-lg-3 col-md-4 col-sm-6 ${listItem}`} key={index}>
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
                            className={form}
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
                                    {translate('upload')}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </>
                : null}
            {operationId ?
                <div className={form}>
                    <Input value={operationId} readOnly/>
                </div>
                : null}

        </div>
    );
}

export default HomeComponent;
