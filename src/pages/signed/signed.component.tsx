import {useGetSession} from './actions/queries';
import {Collapse, Skeleton, Table, Tooltip} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import {useCallback, useState} from 'react';
import {useSigningsStyles} from '../unsigned/signing.style';
import useLocalization from '../../assets/lang';
import {Active, DownloadIcon, LookUpIcon, Pending, Signed} from '../../assets/images/icons/sign';
import {downloadPDF} from '../../core/helpers/downloadPdf';
import SearchComponent from '../../core/shared/search/search.component';
import {debounce} from '../../core/helpers/debounce';
import {useCheckUser} from '../home/actions/queries';
import {useNavigate} from 'react-router-dom';

function SignedComponent() {
    const [searchField, setSearchField] = useState('');
    const [current, setCurrent] = useState<number>(1);
    const {data, isLoading} = useGetSession(searchField, current, true);
    const [page, setPage] = useState(1);
    const {list, listItem, bold, panel, title} = useSigningsStyles();
    const translate = useLocalization();
    const {Panel} = Collapse;
    const check = useCheckUser();
    const navigate = useNavigate();

    const handleSearchChange = debounce(useCallback((value: string) => {
        setSearchField(value);
        setCurrent(1);
    }, []), 500);

    const columns = [
            {
                title: <>
                    <div className={panel}>
                        <span>№</span>
                        <span>{translate('session_fullname')}</span>
                        <span>{translate('session_pin')}</span>
                        <span>{translate('session_date')}</span>
                        <span>{translate('session_link')}</span>

                    </div>

                </>,
                dataIndex: 'dynamicLinkPart',
                render: (id: number, signing: any, index: number) => {
                    return <div>
                        <Collapse bordered={false} expandIconPosition="end" ghost>
                            <Panel header={
                                <div className={panel}>
                                    <span className={bold}>{index + (current - 1) * 15 + 1}. </span>
                                    <span className={bold}>{signing.assignedFullName}</span>
                                    <span className={bold}>{signing.assignedPin}</span>
                                    <span
                                        className={bold}>{signing?.created}</span>
                                    <span onClick={() => {
                                        navigate(`/session/${signing.dynamicLinkPart}`);
                                    }} className={bold}>{`inexaz.netlify.app/session/${signing.dynamicLinkPart}`}</span>                                    <span className={bold} style={{flexBasis: '10%'}}>
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
                                                <a href={item?.sourceUrl} download="document.pdf" target="_blank"
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

    return (
        <div className="mt-10">
            <h3 className={title}>{translate('signed_title')}</h3>
            <SearchComponent placeholder={translate('session_search')} handleSearch={handleSearchChange}/>
            {
                isLoading ? <Skeleton active/> : <Table
                    dataSource={data.data}
                    columns={columns}
                    pagination={{
                        current: page, 
                        pageSize: 10, 
                        total: data.count,
                        onChange: (newPage) => setPage(newPage), 
                        showSizeChanger: false, 
                    }}
                    rowKey={generateGuid}
                />
            }
        </div>
    );
}

export default SignedComponent;
