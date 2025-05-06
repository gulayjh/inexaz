import {Button, Form, FormRule, Input, Table, Upload} from 'antd';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useUploadStyles} from './container.style';
import {DeleteIcon, FileIcon, InfoIcon, SignPlusIcon} from '../../assets/images/icons/sign';
import useLocalization from '../../assets/lang';
import {useUpload} from './actions/mutations';
import {useSelector} from 'react-redux';
import {IState} from '../../store/store';
import {errorToast, successToast} from '../../core/shared/toast/toast';
import {store} from '../../store/store.config';
import {setOperationId} from '../../store/store.reducer';
import {ArrowCircleDown, ArrowLeft, ArrowRight} from '../../assets/images/icons/arrows';
import {useQueryClient} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {useCheckUser} from './actions/queries';
import {environment} from '../../core/configs/app.config';

function HomeComponent() {
    const {title, titleInfo, chooseButton, upload, list, listItem, deleteButton, form} = useUploadStyles();
    const translate = useLocalization();
    const check = useCheckUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const onUploadSucces = useCallback(() => {
        successToast('Uğurlu əməliyyat!');
        queryClient.invalidateQueries(['getSession']);

    }, []);


    const {mutate} = useUpload(() => {
        onUploadSucces();
    });
    const [fileList, setFileList] = useState<any>([]);
    const operationId = useSelector((state: IState) => state.operationId);

    useEffect(() => {
        store.dispatch(setOperationId(null));

    }, []);


    const handleListUpload = useCallback((file: any) => {
        setFileList((prevFileList: any) => [...prevFileList, file].slice(0, 5));
    }, [fileList]);

    const handleRemove = useCallback((id: any, fileSize: number) => {
        setTimeout(() => {
            setFileList((prevFileList: any) => prevFileList.filter((item: any) => item.uid !== id));
        }, 300);
    }, [fileList]);

    const beforeUpload = useCallback((file: any) => {
        if (file.size < 10485760) {
            handleListUpload(file);
        } else {
            errorToast(translate('file_size_error'));

        }
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


    const onSubmit = useCallback((values: any) => {

        const formData: any = new FormData();
        formData.append(`AssignedFullName`, values.fullname);
        formData.append(`AssignedPin`, values.pin);
        fileList.map((item: any) => {
            formData.append(`Documents`, item);
        });
        mutate(formData);
    }, [fileList]);
    const handleCopy = useCallback((text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                successToast('Uğurla kopyalandı!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }, [operationId]);
    const linkAddres= `${environment?.applicationDomain}/session/`;

    return (
        <div>
            <h3 className={title}>{translate('add_title')}</h3>
            <div className={titleInfo}><InfoIcon/>

                <span>Sənədlərin hər birinin həcmi 10 mbdan artıq olmamalı, maksimum sayı isə 5 olmalıdır.</span>
            </div>

            {operationId ?
                <div className='col-lg-6 col-md-4 col-sm-12 mt-25'>
                    <h3 className={title}>{translate('session_link')}</h3>
                    <div className='d-flex align-center'>
                        <Input onClick={() => handleCopy(`${environment?.applicationDomain}/${operationId}`)}
                               value={`${linkAddres}${operationId}`} readOnly/>
                        <span title='Linki kopyala' style={{cursor: 'pointer', paddingLeft: '10px'}} onClick={() => {
                            handleCopy(`${linkAddres}${operationId}`);
                        }}><ArrowCircleDown/></span>
                        <span title='Linkə keçid et' style={{cursor: 'pointer', paddingLeft: '10px'}} onClick={() => {
                            navigate(`/session/${operationId}`);
                        }}><ArrowLeft/></span>
                    </div>
                </div>
                :
                <>
                    <Form name='basic' layout='vertical'>

                        <div className={upload}>
                            <Form.Item
                                name='FormFile' valuePropName='name'>
                                <Upload {...uploadProps} maxCount={100} fileList={fileList}
                                        disabled={fileList?.length === 100}
                                >
                                    <div className={chooseButton}>
                                        <span className='pr-5'><SignPlusIcon/></span>
                                        <span><h3>{translate('add')}</h3></span>
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
                                        <div className='col-lg-2 col-md-2 col-sm-6' key={index}>
                                            <div className={listItem} title={file.name}>
                                                <span><FileIcon/></span>
                                                <h5>{file.name}</h5>
                                                <span className={deleteButton} onClick={() => {
                                                    handleRemove(file.uid, file.size);
                                                }}>
                                        <DeleteIcon/>
                                    </span>

                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-12'>
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
                                            {translate('upload')}
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </>
                        : null}
                </>}


        </div>
    );
}

export default HomeComponent;
