import {useGetRoles} from './actions/queries';
import {Skeleton, Table} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import React from 'react';
import useLocalization from '../../assets/lang';
import {useUserStyles} from './roles.style';

import {useCheckUser} from '../home/actions/queries';

function RolesComponent() {
    const {data, isLoading} = useGetRoles();
    const { title} = useUserStyles();
    const translate = useLocalization();
    const check = useCheckUser();


    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            width: '80px',
        },
        {
            title: translate('roles_title'),
            dataIndex: 'userName',
        },
        {
            title: translate('roles_description'),
            dataIndex: 'password',
            ellipsis: true,
        },

    ];


    return (
        <div>
            <div className="d-flex justify-between align-center mb-25">
                <h3 className={title}>{translate('roles')}</h3>

            </div>
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

export default RolesComponent;
