import {useGetUser} from './actions/queries';
import {Button, Collapse, Form, FormRule, Input, Select, Skeleton, Table} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useLocalization from '../../assets/lang';
import {DeleteIcon, EditIcon, UserIcon} from '../../assets/images/icons/sign';
import ModalComponent from '../../core/shared/modal/modal.component';
import {useCreateUser, useDeleteUser, useEditPassword, useEditUser} from './actions/mutations';
import {useQueryClient} from 'react-query';
import {useUserStyles} from './user.style';
import {useSelector} from 'react-redux';
import {IState} from '../../store/store';
import {errorToast} from '../../core/shared/toast/toast';
import {useCheckUser} from '../home/actions/queries';
import devizeSize from '../../core/helpers/devize-size';

function UsersComponent() {
    const [searchField, setSearchField] = useState('');
    const [current, setCurrent] = useState<number>(1);
    const {data, isLoading} = useGetUser(searchField, current);
    const {list, title, listItem, bold, panel} = useUserStyles();
    const translate = useLocalization();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<number>();
    const [rolesList, setRolesList] = useState<number>(0);
    const userMain = useSelector((state: IState) => state.user);

    const [editForm] = Form.useForm();
    const [createForm] = Form.useForm();

    const check = useCheckUser();
    const {mutate: createUser} = useCreateUser(() => {
        setShowModal(false);
        createForm.resetFields();
        setRolesList(0);
        queryClient.invalidateQueries(['getUsers']);
    });
    const {mutate: editUser} = useEditUser(() => {
        setShowEditModal(false);
        editForm.resetFields();
        setRolesList(0);
        queryClient.invalidateQueries(['getUsers']);
    });

    const {mutate: deleteUser} = useDeleteUser(() => {
        queryClient.invalidateQueries(['getUsers']);
    });

    const options = [
        {label: translate('users_admin'), value: 2},
        {label: translate('users_user'), value: 3},

    ];

    const handleChange = useCallback((e: any) => {
        setRolesList(e);
    }, [rolesList]);

    const queryClient = useQueryClient();

    const handleEdit = useCallback((user: any) => {
        setShowEditModal(!showEditModal);
        editForm.setFieldsValue({
            username: user.userName,
            password: user.password,
            deleteDocumentPassword: user.deleteDocumentPassword,
            roles: user.role
        });
        setRolesList(user.role);
        setSelectedUser(user.id);

    }, [showEditModal, selectedUser]);

    const handleDelete = useCallback((user: any) => {
        if (confirm('Əminsiniz?')) {
            const postData = {
                id: user.id,
                userName: user.username,
                password: user.password,
                role: user.role,
            };
            deleteUser(postData);
        }
    }, [selectedUser]);
    const width = devizeSize();
    const columns = [
        {
            title: translate('users_users'),
            dataIndex: 'userName',
        },
        {
            title: translate('users_password'),
            dataIndex: 'password',
            ellipsis: true,
        },
        {
            title: translate('users_password_delete'),
            dataIndex: 'deleteDocumentPassword',
        },
        {
            title: translate('users_roles'),
            render: (user: any) => {
                return (
                        <span> {user?.role === 1 ? translate('users_super') : user?.role === 2 ? translate('users_admin') : translate('users_user')}</span>

                );
            }
        },
        {
            title: '',
            width: '150px',
            render: (user: any) => {
                return (
                    <div className={list}>
                        {userMain?.UserName === user?.userName || (user?.role === 1 && !(userMain.Roles === 'SuperAdmin'))
                            ? <span></span>
                            :
                            <span onClick={() => {
                                handleEdit(user);
                            }}> <EditIcon/></span>
                        }

                        {(userMain?.UserName === user?.userName) || (user?.role === 1 && !(userMain.Roles === 'SuperAdmin')) ?
                            <span> </span> :
                            <span onClick={() => {
                                handleDelete(user);
                            }}> <DeleteIcon/></span>
                        }

                    </div>
                );
            }
        }
    ];
    const {Panel} = Collapse;
    const mobileColumns = [
        {
            title: (
                <>
                    <div className={panel} style={{padding: '0 25px'}}>
                        <span>{translate('users_username')}</span>
                    </div>
                </>
            ),
            dataIndex: 'id',
            render: (id: number, user: any, index: number) => {
                return (
                    <div>
                        <Collapse bordered={false} expandIconPosition="end" ghost>
                            <Panel
                                key={index}
                                header={
                                    <div className={panel}>
                                        <span className={bold}>{user?.userName}</span>
                                    </div>
                                }
                            >
                                <div>
                                    <div>
                                        <span className={bold}>{translate('users_password')}: </span>
                                        <span>{user?.password}</span>
                                    </div>
                                    <div>
                                        <span className={bold}>{translate('users_password_delete')}: </span>
                                        <span>{user?.deleteDocumentPassword}</span>
                                    </div>

                                    <div>
                                        <span className={bold}>{translate('users_roles')}: </span>
                                        <span> {user?.role === 1 ? translate('users_super') : user?.role === 2 ? translate('users_admin') : translate('users_user')}</span>
                                    </div>
                                    <div className={list}>
                                        {userMain?.UserName === user?.userName || (user?.role === 1 && !(userMain.Roles === 'SuperAdmin'))
                                            ? <span></span>
                                            :
                                            <span onClick={() => {
                                                handleEdit(user);
                                            }}> <EditIcon/></span>
                                        }

                                        {(userMain?.UserName === user?.userName) || (user?.role === 1 && !(userMain.Roles === 'SuperAdmin')) ?
                                            <span> </span> :
                                            <span onClick={() => {
                                                handleDelete(user);
                                            }}> <DeleteIcon/></span>
                                        }

                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                );
            },
        },
    ];


    useEffect(() => {
        if (showModal) {
            createForm.setFieldsValue(initialValues);
        }
    }, [showModal]);

    const initialValues: any = {
        username: '',
        password: '',
        deleteDocumentPassword: '',
        roles: []
    };
    const rules: { [key: string]: FormRule[] } = useMemo(() => ({
        username: [
            {
                required: true,
                message: translate('input_required'),
            },
            {
                min: 5,
                message: translate('input_min_length', {min: 5}),
            }
        ],
        password: [
            {
                required: true,
                message: translate('input_required'),
            },
            {
                min: 8,
                message: translate('input_min_length', {min: 8}),
            }
        ],
        passwordDelete: [
            {
                required: true,
                message: translate('input_required'),
            },
            {
                min: 3,
                message: translate('input_min_length', {min: 3}),
            }
        ],
        roles: [
            {
                required: true,
                message: translate('input_required'),
            },
        ],
        confirmPassword: [
            {
                required: true,
                message: translate('input_required'),
            },
            {
                min: 8,
                message: translate('input_min_length', {min: 8}),
            },
            {
                validator: (_, value) => {
                    if (!value || value === createForm.getFieldValue('password')) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error(translate('input_password_mismatch')));
                }
            }
        ],

    }), [translate]);

    const onSubmit = useCallback((values: any) => {
        const postData = {
            'userName': values.username,
            'password': values.password,
            'deleteDocumentPassword': values.deleteDocumentPassword,
            'role': rolesList
        };
        createUser(postData);
    }, [showModal, rolesList]);

    const onChange = useCallback((values: any) => {
        const postData = {
            'id': selectedUser,
            'userName': values.username,
            'password': values.password,
            'deleteDocumentPassword': values.deleteDocumentPassword,
            'role': rolesList
        };
        editUser(postData);

    }, [selectedUser, rolesList]);

    return (
        <div>
            <div className="d-flex justify-between align-center mb-25">
                <h3 className={title}>{translate('users')}</h3>
                <Button type="primary" onClick={() => {
                    setShowModal(true);
                    setRolesList(0);
                }}>{translate('users_new')}</Button>
            </div>
            {
                isLoading ? <Skeleton active/> : <Table
                    dataSource={data}
                    columns={width > 1024 ? columns : mobileColumns}
                    pagination={false}
                    rowKey={generateGuid}
                />
            }
            <ModalComponent showModal={showModal} handleClose={() => {
                setShowModal(false);
                setRolesList(0);
                createForm.resetFields();
            }}>
                <Form
                    form={createForm}
                    name="create"
                    initialValues={initialValues}
                    onFinish={onSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        rules={rules.username}
                        name="username"
                        label={translate('users_username')}>
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.password}
                        name="password" label={translate('users_password')}>
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.confirmPassword}
                        name="confirmPassword" label={translate('users_confirm_password')}>
                        <Input maxLength={50}/>
                    </Form.Item>

                    {rolesList === 3 ? null :
                        < Form.Item
                            rules={rules.passwordDelete}
                            name="deleteDocumentPassword" label={translate('users_password_delete')}>
                            <Input maxLength={50}/>
                        </Form.Item>
                    }
                    <Form.Item
                        name="roles"
                        label="Rol"
                        rules={rules.roles}>
                        <Select
                            allowClear
                            style={{width: '100%'}}
                            placeholder="Rol seçin..."
                            options={options}
                            onChange={(e) => {
                                setRolesList(e);
                            }}
                        />
                    </Form.Item>
                    <div>
                        <Button loading={isLoading} className="w-100 mt-10" type="primary" htmlType="submit">
                            {translate('users_create')}
                        </Button>
                    </div>
                </Form>
            </ModalComponent>

            <ModalComponent showModal={showEditModal} handleClose={() => {
                setShowEditModal(false);
                setRolesList(0);
                editForm.resetFields();
            }}>
                <Form
                    form={editForm}
                    initialValues={initialValues}
                    onFinish={onChange}
                    layout="vertical"
                >
                    <Form.Item
                        rules={rules.username}
                        name="username"
                        label={translate('users_username')}>
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.password}
                        name="password"
                        label={translate('users_password')}>

                        <Input maxLength={50}/>
                    </Form.Item>
                    {rolesList === 3 ? null :
                        <Form.Item
                            rules={rules.passwordDelete}
                            name="deleteDocumentPassword" label={translate('users_password_delete')}>
                            <Input maxLength={50}/>
                        </Form.Item>
                    }
                    <Form.Item
                        name="roles"
                        label="Rol"
                        rules={rules.roles}>
                        <Select
                            allowClear
                            style={{width: '100%'}}
                            placeholder="Rol seçin..."
                            options={options}
                            value={rolesList}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                    </Form.Item>
                    <div>
                        <Button loading={isLoading} className="w-100 mt-10" type="primary" htmlType="submit">
                            {translate('users_edit')}
                        </Button>
                    </div>
                </Form>
            </ModalComponent>


        </div>
    );
}

export default UsersComponent;
