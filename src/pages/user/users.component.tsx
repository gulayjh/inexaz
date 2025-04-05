import {useGetUser} from './actions/queries';
import {Button, Collapse, Form, FormRule, Input, Skeleton, Table} from 'antd';
import {generateGuid} from '../../core/helpers/generate-guid';
import React, {useCallback, useMemo, useState} from 'react';
import useLocalization from '../../assets/lang';
import {DeleteIcon, EditIcon, UserIcon} from '../../assets/images/icons/sign';
import ModalComponent from '../../core/shared/modal/modal.component';
import {useCreateUser, useDeleteUser, useEditPassword, useEditUser} from './actions/mutations';
import {useQueryClient} from 'react-query';
import {useUserStyles} from './user.style';

function UsersComponent() {
    const [searchField, setSearchField] = useState('');
    const [current, setCurrent] = useState<number>(1);
    const {data, isLoading} = useGetUser(searchField, current);
    const {list, title} = useUserStyles();
    const translate = useLocalization();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<number>();

    const [editForm] = Form.useForm();
    const [createForm] = Form.useForm();
    const [passwordChange] = Form.useForm();

    const {mutate: createUser} = useCreateUser(() => {
        setShowModal(false);
        createForm.resetFields();
        queryClient.invalidateQueries(['getUsers']);
    });
    const {mutate: editUser} = useEditUser(() => {
        setShowEditModal(false);
        editForm.resetFields();
        queryClient.invalidateQueries(['getUsers']);
    });
    const {mutate: editPassword} = useEditPassword(() => {
        setShowEditModal(false);
        passwordChange.resetFields();
        queryClient.invalidateQueries(['getUsers']);
    });
    const {mutate: deleteUser} = useDeleteUser(() => {
        queryClient.invalidateQueries(['getUsers']);
    });

    const queryClient = useQueryClient();

    const handleEdit = useCallback((user: any) => {
        setShowEditModal(!showEditModal);
        editForm.setFieldsValue({
            username: user.userName,
            password: user.password,
            deleteDocumentPassword: user.deleteDocumentPassword,
        });
        setSelectedUser(user.id);

    }, [showEditModal, selectedUser]);

    const handleDelete = useCallback((user: any) => {
        if (confirm('Əminsiniz?')) {
            const postData = {
                id: user.id,
                userName: user.username,
                password: user.password,
                roles: user.roles,
            };
            deleteUser(postData);
        }
    }, [selectedUser]);

    const handleEditPassword = useCallback((user: any) => {
        passwordChange.setFieldsValue({
            oldPassword: user.password,
        });
        setShowPasswordModal(true);
    }, [showPasswordModal]);


    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            width: '80px',
        },
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
            title: '',
            width: '200px',
            render: (user: any) => {
                return (
                    <div className={list}>
                        <span onClick={() => {
                            handleEdit(user);
                        }}> <UserIcon/></span>
                        <span onClick={() => {
                            handleEditPassword(user);
                        }}> <EditIcon/></span>
                        <span onClick={() => {
                            handleDelete(user);
                        }}> <DeleteIcon/></span>

                    </div>
                );
            }
        }
    ];
    const initialValues: any = {
        username: '',
        password: '',
        deleteDocumentPassword: '',
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

    }), [translate]);

    const onSubmit = useCallback((values: any) => {
        const postData = {
            'userName': values.username,
            'password': values.password,
            'deleteDocumentPassword': values.deleteDocumentPassword,
            'roles': [
                1
            ]
        };
        createUser(postData);
    }, [showModal]);

    const onChange = useCallback((values: any) => {
        const postData = {
            'id': selectedUser,
            'userName': values.username,
            'password': values.password,
            'deleteDocumentPassword': values.deleteDocumentPassword,
            'roles': [
                1
            ]
        };
        editUser(postData);
    }, [selectedUser]);

    const onPasswordChange = useCallback((values: any) => {
        const postData = {
            'oldPassword': values.oldPassword,
            'newPassword': values.newPassword,
        };
        editPassword(postData);

    }, []);
    return (
        <div>
            <div className="d-flex justify-between align-center mb-25">
                <h3 className={title}>{translate('users')}</h3>
                <Button type="primary" onClick={() => {
                    setShowModal(true);
                }}>{translate('users_new')}</Button>
            </div>
            {
                isLoading ? <Skeleton active/> : <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    rowKey={generateGuid}
                />
            }
            <ModalComponent showModal={showModal} handleClose={() => {
                setShowModal(false);
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
                        label="Username">
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.password}
                        name="password" label="Password">
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.password}
                        name="deleteDocumentPassword" label="Delete Document Password">
                        <Input maxLength={50}/>
                    </Form.Item>
                    <div>
                        <Button loading={isLoading} className="w-100" type="primary" htmlType="submit">
                            {translate('users_create')}
                        </Button>
                    </div>
                </Form>
            </ModalComponent>

            <ModalComponent showModal={showEditModal} handleClose={() => {
                setShowEditModal(false);
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
                        label="Username">
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.password}
                        name="password" label="Password">
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.password}
                        name="deleteDocumentPassword" label="Delete Document Password">
                        <Input maxLength={50}/>
                    </Form.Item>
                    <div>
                        <Button loading={isLoading} className="w-100" type="primary" htmlType="submit">
                            {translate('users_edit')}
                        </Button>
                    </div>
                </Form>
            </ModalComponent>

            <ModalComponent showModal={showPasswordModal} handleClose={() => {
                setShowPasswordModal(false);
                passwordChange.resetFields();
            }}>
                <Form
                    form={passwordChange}
                    name="PasswordChange"
                    onFinish={onPasswordChange}
                    layout="vertical"
                >
                    <Form.Item
                        rules={rules.password}
                        name="oldPassword"
                        label={translate('users_old_password')}>
                        <Input maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        rules={rules.password}
                        name="newPassword"
                        label={translate('users_new_password')}>
                        <Input maxLength={50}/>
                    </Form.Item>
                    <div>
                        <Button loading={isLoading} className="w-100" type="primary" htmlType="submit">
                            {translate('users_edit')}
                        </Button>
                    </div>
                </Form>
            </ModalComponent>
        </div>
    );
}

export default UsersComponent;
