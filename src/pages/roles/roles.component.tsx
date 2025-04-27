import {useGetRoles} from './actions/queries';
import {Skeleton, Table} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import React from 'react';
import useLocalization from '../../assets/lang';
import {useUserStyles} from './roles.style';

import {useCheckUser} from '../home/actions/queries';
import {InfoIcon} from '../../assets/images/icons/sign';

function RolesComponent() {
    const {data, isLoading} = useGetRoles();
    const { title, titleInfo} = useUserStyles();
    const translate = useLocalization();
    const check = useCheckUser();


    const columns = [

        {
            title: translate('roles_title'),
            dataIndex: 'name',
        },
        {
            title: translate('roles_description'),
            dataIndex: 'description',
            ellipsis: true,
        },

    ];


    return (
        <div>
            <div className="d-flex justify-between align-center">
                <h3 className={title}>{translate('roles')}</h3>
            </div>
            <div className={titleInfo}><InfoIcon/>

                <span>Rollar haqqında məlumat</span>
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
