import {Collapse, Skeleton, Table} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import {ReactNode, useState} from 'react';
import {useGetSession} from '../signed/actions/queries';
import {useSigningsStyles} from './signing.style';
import useLocalization from '../../assets/lang';


function UnsignedComponent() {

    const [searchField, setSearchField] = useState('');
    const [current, setCurrent] = useState<number>(1);
    const {data, isLoading} = useGetSession(searchField, current, false);
    const {list, listItem, bold, panel} = useSigningsStyles();
    const translate = useLocalization();
    const {Panel} = Collapse;

    const columns = [
            {
                title: <>
                    <div className={panel}>
                        <span>№</span>
                        <span>{translate('file_number')}</span>
                        <span>{translate('file_name')}</span>
                        <span>{translate('file_size')}</span>
                    </div>

                </>,
                dataIndex: 'dynamicLinkPart',
                render: (id: number, signing: any, index: number) => {
                    console.log(signing);
                    return <div>
                        <Collapse bordered={false} expandIconPosition='end' ghost>
                            <Panel header={
                                <div className={panel}>
                                    <span className={bold}>{index + (current - 1) * 15 + 1}. </span>
                                    <span className={bold}>{signing.assignedFullName}</span>
                                    <span className={bold}>{signing.assignedPin}</span>
                                    <span className={bold}>{signing.created}</span>
                                    <span className={bold}>{signing.dynamicLinkPart}</span>
                                </div>
                            }
                                   key='1'>

                                <div className={list}>
                                    {signing.documents && signing.documents.length && signing.documents.map((item: any, index: number) => {
                                        return (
                                            <div className={listItem}>
                                                <span>{index + 1}. {item.name}</span>

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
        <div>
            {
                isLoading ? <Skeleton active/> : <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    rowKey={generateGuid}
                />
            }
        </div>
    );
}

export default UnsignedComponent;
