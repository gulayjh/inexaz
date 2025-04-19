import {Collapse, Pagination, Skeleton, Table, Tooltip} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import React, {ReactNode, useCallback, useState} from 'react';
import {useGetSession} from '../signed/actions/queries';
import {useSigningsStyles} from './signing.style';
import useLocalization from '../../assets/lang';
import {Active, DeleteIcon, DownloadIcon, EditIcon, LookUpIcon, Pending, Signed} from '../../assets/images/icons/sign';
import {downloadPDF} from '../../core/helpers/downloadPdf';
import {debounce} from '../../core/helpers/debounce';
import SearchComponent from '../../core/shared/search/search.component';
import {useCheckUser} from '../home/actions/queries';
import {useNavigate} from 'react-router-dom';
import {successToast} from '../../core/shared/toast/toast';
import {ArrowCircleDown, ArrowLeft} from '../../assets/images/icons/arrows';
import devizeSize from '../../core/helpers/devize-size';


function UnsignedComponent() {
    const navigate = useNavigate();
    const width = devizeSize();

    const [searchField, setSearchField] = useState('');
    const [page, setPage] = useState(1);
    const {data, isLoading} = useGetSession(searchField, page, false);
    const {list, listItem, bold, panel, title} = useSigningsStyles();
    const translate = useLocalization();
    const {Panel} = Collapse;
    const check = useCheckUser();


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
                                            <span className={bold}>{translate('session_pin')}</span>
                                            <span>{signing.assignedPin}</span>
                                        </div>
                                        <div>
                                            <span className={bold}>{translate('session_date')}</span>
                                            <span>{signing?.created}</span>
                                        </div>
                                        <div>
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
            <h3 className={title}>{translate('unsigned_title')}</h3>
            <SearchComponent placeholder={translate('session_search')} handleSearch={handleSearchChange}/>
            {
                isLoading ? <Skeleton active/> :
                    <>
                        <Table
                            dataSource={data?.data}
                            columns={width > 1024 ? columns : mobileColumns}
                            pagination={{
                                current: page,
                                pageSize: 10,
                                total: data?.count,
                                onChange: (newPage) => setPage(newPage),
                                showSizeChanger: false,
                            }}
                            rowKey={generateGuid}
                        />

                    </>
            }
        </div>
    );
}

export default UnsignedComponent;
