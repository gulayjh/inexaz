import {usePosts} from './actions/queries';
import {Skeleton, Table} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import {successToast} from '../../core/shared/toast/toast';

function SignedComponent() {

    const {data, isLoading} = usePosts();
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '80px',
        },
        {
            title: 'title',
            dataIndex: 'title',
        },
        {
            title: 'body',
            dataIndex: 'body',
            ellipsis: true,
        }
    ];

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

export default SignedComponent;
