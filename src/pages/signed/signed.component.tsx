import {Button, Collapse, DatePicker, Form, FormRule, Input, Select, Skeleton, Table, Tooltip} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSigningsStyles} from '../unsigned/signing.style';
import useLocalization from '../../assets/lang';
import {Active, DeleteIcon, DownloadIcon, LookUpIcon, Pending, Signed} from '../../assets/images/icons/sign';
import {downloadPDF} from '../../core/helpers/downloadPdf';
import {debounce} from '../../core/helpers/debounce';
import SearchComponent from '../../core/shared/search/search.component';
import {useCheckUser} from '../home/actions/queries';
import {useNavigate} from 'react-router-dom';
import {successToast} from '../../core/shared/toast/toast';
import {ArrowCircleDown, ArrowLeft} from '../../assets/images/icons/arrows';
import devizeSize from '../../core/helpers/devize-size';
import {useDeleteSession, useGetSessionPost} from '../signed/actions/mutations';
import moment from 'moment';
import {deleteSession} from '../session/actions/session.service';


function SignedComponent() {
    const navigate = useNavigate();
    const width = devizeSize();

    const [searchField, setSearchField] = useState('');
    const [page, setPage] = useState(1);
    const {list, listItem, bold, panel, title, icons} = useSigningsStyles();
    const translate = useLocalization();
    const {Panel} = Collapse;
    const check = useCheckUser();

    const [sessionData, setSessionData] = useState<any>();
    const [startDate, setStartDate] = useState({date: undefined, dateString: undefined});
    const [endDate, setEndDate] = useState({date: undefined, dateString: undefined});
    const {mutate: getSession} = useGetSessionPost((value) => {
        setSessionData(value);
    });

    const handlegetAll = useCallback(() => {
        getSession({
            searchFin: searchField,
            current: page,
            signed: true,
            startDate: startDate.date,
            endDate: endDate.date

        });
    }, [searchField, page, startDate, endDate]);

    const {mutate: sessionDelete} = useDeleteSession(() => {
        handlegetAll();
    });


    useEffect(() => {
        handlegetAll();
    }, [searchField, page, startDate, endDate]);


    const handleDelete = useCallback((user: any) => {
        const confirmation = prompt(`Silmək üçün şifrəni adını yazın`);
        if (confirmation) {
            const postData = {
                sessionIds: [user.id],
                deleteDocumentPassword: confirmation,
            };
            sessionDelete(postData);
        }
    }, []);


    const handleFromTime = useCallback((date: any, dateString: any) => {
        setPage(1);
        setStartDate({date, dateString});
    }, []);

    const handleToTime = useCallback((date: any, dateString: any) => {
        setPage(1);
        setEndDate({date, dateString});

    }, []);


    const handleSearchChange = debounce(useCallback((value: string) => {
        setSearchField(value);
        setPage(1);
    }, []), 500);


    const handleCopy = useCallback((text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                successToast('Uğurla kopyalandı!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }, []);

    const columns = [
            {
                title: <>
                    <div className={panel} style={{padding: '0 25px'}}>
                        <span>№</span>
                        <span>{translate('session_fullname')}</span>
                        <span>{translate('session_pin')}</span>
                        <span>{translate('session_date')}</span>
                        <span>{translate('session_link')}</span>
                        <span>{translate('session_status')}</span>
                    </div>

                </>,
                dataIndex: 'dynamicLinkPart',
                render: (id: number, signing: any, index: number) => {
                    return <div>
                        <Collapse bordered={false} expandIconPosition="end" ghost>
                            <Panel header={
                                <div className={panel}>
                                    <span className={bold}>{index + (page - 1) * 10 + 1}. </span>
                                    <span className={bold}>{signing.assignedFullName}</span>
                                    <span className={bold}>{signing.assignedPin}</span>
                                    <span
                                        className={bold}>{signing?.created}</span>

                                    <span>
                                        <span
                                            onClick={() => handleCopy(`inexaz.netlify.app/session/${signing.dynamicLinkPart}`)}
                                            className={bold}><ArrowCircleDown/>
                                </span>
                                <span title="Linkə keçid et" style={{cursor: 'pointer', paddingLeft: '10px'}}
                                      onClick={() => {
                                          navigate(`/session/${signing.dynamicLinkPart}`);
                                      }}><ArrowLeft/></span>

                            </span>

                                    <span className={icons}>
                                        {signing.status === 1 ?
                                            <Tooltip placement="left" title={'gözləmədə'}
                                                     overlayInnerStyle={{backgroundColor: '#474975', color: 'white'}}>
                                                <span><Pending/></span>
                                            </Tooltip>
                                            : signing.status === 2 ?
                                                <Tooltip placement="left" title={'aktiv'}>
                                                    <span><Active/></span>
                                                </Tooltip>
                                                :
                                                <Tooltip placement="left" title={'imzalanmış'}>
                                                    <span><Signed/></span>
                                                </Tooltip>}
                                        <span onClick={() => {
                                            handleDelete(signing);
                                        }}><DeleteIcon/></span>

                                    </span>

                                </div>
                            }
                                   key={index}>

                                <div className={list}>
                                    {signing.documents && signing.documents.length && signing.documents.map((item: any, index: number) => {
                                        return (
                                            <div className={listItem}>
                                                <span>{index + 1}. {item.name}</span>
                                                <div>
                                                <span>
                                                <a href={item?.sourceUrl} target="_blank"
                                                   rel="noopener noreferrer">
                                                    <LookUpIcon/>
                                                </a>
                                                </span>
                                                    <span onClick={() => {
                                                        downloadPDF(item.sourceUrl, item.name);
                                                    }}><DownloadIcon/></span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Panel>
                        </Collapse>

                    </div>
                        ;
                },
            },

        ]
    ;

    const mobileColumns = [
        {
            title: (
                <>
                    <div className={panel} style={{padding: '0 25px'}}>
                        <span>№</span>
                        <span>{translate('session_fullname')}</span>
                    </div>
                </>
            ),
            dataIndex: 'id',
            render: (id: number, signing: any, index: number) => {
                return (
                    <div>
                        <Collapse bordered={false} expandIconPosition="end" ghost>
                            <Panel
                                key={index}
                                header={
                                    <div className={panel}>
                                        <span className={bold}>{index + (page - 1) * 10 + 1}. </span>
                                        <span className={bold}>{signing.assignedFullName}</span>
                                        <span className={bold}>
                                        {signing.status === 1 ?
                                            <Tooltip title={'gözləmədə'}
                                                     overlayInnerStyle={{backgroundColor: '#474975', color: 'white'}}>
                                                <span><Pending/></span>
                                            </Tooltip>
                                            : signing.status === 2 ?
                                                <Tooltip title={'aktiv'}>
                                                    <span><Active/></span>
                                                </Tooltip>
                                                :
                                                <Tooltip title={'imzalanmış'}>
                                                    <span><Signed/></span>
                                                </Tooltip>}
                                    </span>

                                    </div>
                                }
                            >
                                <div>
                                    <div>
                                        <div>
                                            <span className={bold}>{translate('session_pin')}: </span>
                                            <span>{signing.assignedPin}</span>
                                        </div>
                                        <div>
                                            <span className={bold}>{translate('session_date')}: </span>
                                            <span>{signing?.created}</span>
                                        </div>
                                        <div className="d-flex justify-between">
                                            <span className={bold}>{translate('session_link')}</span>

                                            <span>
                                        <span
                                            onClick={() => handleCopy(`inexaz.netlify.app/session/${signing.dynamicLinkPart}`)}
                                            className={bold}><ArrowCircleDown/>
                                </span>
                                <span title="Linkə keçid et" style={{cursor: 'pointer', paddingLeft: '10px'}}
                                      onClick={() => {
                                          navigate(`/session/${signing.dynamicLinkPart}`);
                                      }}><ArrowLeft/></span>
                            </span>
                                        </div>


                                    </div>
                                    <div className={list}>
                                        {signing.documents && signing.documents.length && signing.documents.map((item: any, index: number) => {
                                            return (
                                                <div className={listItem}>
                                                    <span>{index + 1}. {item.name}</span>
                                                    <div>
                                                <span>
                                                <a href={item?.sourceUrl} target="_blank"
                                                   rel="noopener noreferrer">
                                                    <LookUpIcon/>
                                                </a>
                                                </span>
                                                        <span onClick={() => {
                                                            downloadPDF(item.sourceUrl, item.name);
                                                        }}><DownloadIcon/></span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="mt-10">
            <h3 className={title}>{translate('signed_title')}</h3>
            <SearchComponent placeholder={translate('session_search')} handleSearch={handleSearchChange}/>
            <div className="d-flex mt-10 mb-25">

                <DatePicker className="mr-15" value={startDate?.date} placeholder={translate('signing_from_date')}
                            onChange={handleFromTime}
                            disabledDate={(current: any) => {
                                return current && current > moment().endOf('day');
                            }}
                />
                <DatePicker placeholder={translate('signing_to_date')}
                            onChange={handleToTime}
                            value={endDate.date}
                            disabledDate={(current: any) => {
                                return current && current < moment(startDate.dateString).endOf('day');
                            }}/>
                {/*                <Button onClick={() => {
                    handleFilterDate();
                }} type="primary">{translate('submit')}</Button>*/}
            </div>


            {
                sessionData ?
                    <>
                        <Table
                            dataSource={sessionData?.data}
                            columns={width > 1024 ? columns : mobileColumns}
                            pagination={{
                                current: page,
                                pageSize: 10,
                                total: sessionData?.count,
                                onChange: (newPage) => setPage(newPage),
                                showSizeChanger: false,
                            }}
                            rowKey={generateGuid}
                        />
                    </>
                    : <Skeleton active/>
            }
        </div>
    );
}

export default SignedComponent;
