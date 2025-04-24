import {Form, Upload} from 'antd';
import React, {useCallback, useState} from 'react';
import {useUploadStyles} from './verify.style';
import {CheckedDate, ExpiredDate,  InfoIcon, SignPlusIcon} from '../../assets/images/icons/sign';
import useLocalization from '../../assets/lang';
import {useUpload} from './actions/mutations';
import {errorToast} from '../../core/shared/toast/toast';
import {useQueryClient} from 'react-query';
import {useCheckUser} from './actions/queries';

function VerifyComponent() {
    const {title, titleInfo, chooseButton, upload, list, row, noData} = useUploadStyles();
    const translate = useLocalization();
    const check = useCheckUser();
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any>([]);


    const onUploadSucces = useCallback((value: any) => {
        setFile(value);
    }, []);


    const {mutate} = useUpload((value: any) => {
        onUploadSucces(value);
    });

    const checkProps = {
        multiple: false,
        accept: '.pdf',
        showUploadList: false,
        beforeUpload: (file: any) => {
            if (file.type === 'application/pdf') {
                setFile(file.name);
                mutate(file);
            } else {
                errorToast(translate('file_type_error'));
            }
        },
    };


    return (
        <div>
            <h3 className={title}>{translate('check_title')}</h3>
            <div className={titleInfo}><InfoIcon/>

                <span>Sənədlərin hər birinin həcmi 10 mbdan artıq olmamalı, maksimum sayı isə 5 olmalıdır.</span>
            </div>

            {file ?
                <div className="col-lg-6 col-md-4 col-sm-12 mt-25">
                    <div className={list}>
                        {file && file.length > 0 ?
                            file.map((item: any, index: number) => {
                                return (
                                    <>
                                        {item.center ?
                                            <ol className={row}>
                                                <li>{index + 1}. {item?.name}</li>
                                                {item?.signing_time ?
                                                    <li>{translate('check_sign_time')} {item?.signing_time.substring(0, 10)}</li>
                                                    : null}
                                                <li>{translate('check_sign_country')} {item?.country}</li>
                                                <li>{translate('check_voen')} {item?.voen}</li>
                                                <li>{translate('check_role')} {item?.role}</li>

                                            </ol>
                                            :
                                            <ol className={row}>
                                                <li>{index + 1}. {item.fullname}</li>
                                                <li>{translate('check_pin')} {item?.pin}</li>
                                                {item?.tin ?
                                                    <li>{translate('check_voen')} {item?.tin.substring(4)}</li>
                                                    : null}
                                                <li>{translate('check_role')} {item?.role}</li>
                                                <li>{translate('check_sign_country')} {item?.location}</li>
                                                <li>
                                                <span className="pr-5">{item.isIntegrity ? <CheckedDate/> :
                                                    <ExpiredDate/>}</span>
                                                    {item?.signDate ? item?.signDate.substring(0, 10) : null}
                                                </li>
                                            </ol>

                                        }
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
