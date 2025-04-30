import {Button, Form, Upload} from 'antd';
import React, {useCallback, useState} from 'react';
import {useUploadStyles} from './verify.style';
import {CheckedDate, ExpiredDate, InfoIcon, SignPlusIcon} from '../../assets/images/icons/sign';
import useLocalization from '../../assets/lang';
import {useUpload} from './actions/mutations';
import {errorToast} from '../../core/shared/toast/toast';
import {useCheckUser} from './actions/queries';
import {store} from '../../store/store.config';
import {setLoader} from '../../store/store.reducer';

function VerifyComponent() {
    const {title, titleInfo, chooseButton, upload, list, row, noData} = useUploadStyles();
    const translate = useLocalization();
    // const check = useCheckUser();
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any>([]);


    const onUploadSucces = useCallback((value: any) => {
        setFile(value);
    }, [file]);

    const handleReset = useCallback(() => {
        setFile('');
        setFileName('');
    }, [file, fileName]);


    const {mutate} = useUpload((value: any) => {
        onUploadSucces(value);
    });

    const checkProps = {
        multiple: false,
        accept: '.pdf',
        showUploadList: false,
        beforeUpload: (file: any) => {
            if (file.type === 'application/pdf') {
                setFileName(file.name);
                store.dispatch(setLoader(true));
                const formData: any = new FormData();

                formData.append(`File`, file);
                mutate(formData);
            } else {
                errorToast(translate('file_type_error'));
            }
        },
    };


    return (
        <div>
            <h3 className={title}>{translate('check_title')}</h3>

            {fileName ?
                <div className="col-lg-6 col-md-4 col-sm-12 mt-25">
                    <div className={list}>
                        <h3>{fileName}</h3>
                        {file?.signedPdfVerifierDtos && file?.signedPdfVerifierDtos.length > 0 ?
                            file.signedPdfVerifierDtos.map((item: any, index: number) => {
                                return (
                                    <>
                                        <ol className={row}>
                                            <li>{index + 1}. {item.fullname}</li>
                                            <li>{translate('check_pin')} {item?.pin}</li>
                                            {item?.tin ?
                                                <li>{translate('check_voen')} {item?.tin.substring(4)}</li>
                                                : null}
                                            <li>{translate('check_sign_country')} {item?.location}</li>
                                            <li>
                                                <span className="pr-5">{item.isIntegrity ? <CheckedDate/> :
                                                    <ExpiredDate/>}</span>
                                                {item?.signDate ? item?.signDate.substring(0, 10) : null}
                                            </li>
                                        </ol>
                                    </>

                                );
                            })
                            :
                            <div className={noData}>
                                <h5>{translate('check_no_signed')}</h5>
                                <span>{translate('no_data')}</span>
                            </div>
                        }
                    </div>
                    <div className='mt-15'>
                    <Button type='primary' onClick={()=>{handleReset();}}>{translate('reset')}</Button>
                    </div>
                </div>
                :
                <>
                    <Form name="basic" layout="vertical">

                        <div className={upload}>
                            <Form.Item
                                name="FormFile" valuePropName="name">
                                <Upload {...checkProps} maxCount={1}>
                                    <div className={chooseButton}>
                                        <span className="pr-5"><SignPlusIcon/></span>
                                        <span><h3>{translate('add')}</h3></span>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </div>
                    </Form>
                </>}


        </div>
    );
}

export default VerifyComponent;
