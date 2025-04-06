import avatar from '../../../../../assets/images/statics/user.png';
import {LogoutIcon} from '../../../../../assets/images/icons/logout';
import {useHeaderRightStyles} from './header-right.style';
import {removeToken} from '../../../../helpers/get-token';
import {useNavigate} from 'react-router-dom';
import {LeftMenuToggle} from '../../../../../assets/images/icons/left-menu-toggle';
import React, {useCallback, useMemo, useState} from 'react';
import {setUser, toggleLeftMenu} from '../../../../../store/store.reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Dropdown, Form, FormRule, Input} from 'antd';
import {UserIcon} from '../../../../../assets/images/icons/sign';
import ModalComponent from '../../../../shared/modal/modal.component';
import {useEditPassword} from '../../../../../pages/user/actions/mutations';
import useLocalization from '../../../../../assets/lang';
import {useLogout} from '../../../../../pages/login/actions/mutations';
import {store} from '../../../../../store/store.config';
import {Routes} from '../../../../../router/routes';
import {IState} from '../../../../../store/store';

const HeaderRightComponent = () => {
    const classes = useHeaderRightStyles();
    const user = useSelector((state: IState) => state.user);
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        store.dispatch(setUser(null));
        removeToken();
        window.location.href = 'auth/login';
    }, []);
    const {mutate: logout} = useLogout(() => {
        onLogout();
    });

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        dispatch(toggleLeftMenu());
    };
    const translate = useLocalization();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordChange] = Form.useForm();
    const {mutate: editPassword} = useEditPassword(() => {
        setShowPasswordModal(false);
        passwordChange.resetFields();
    });

    const onPasswordChange = useCallback((values: any) => {
        const postData = {
            'oldPassword': values.oldPassword,
            'newPassword': values.newPassword,
        };
        editPassword(postData);

    }, []);


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
    const items = [
        {
            label: (
                <span className="custom-dropdown-btn" onClick={() => {
                    setShowPasswordModal(true);
                }}>
                    {translate('users_change_password')}
                </span>
            ),
            key: '0',
        },
        {
            label: (
                <span className="custom-dropdown-btn" onClick={() => {
                    handleLogout();
                }}>
                    {translate('users_logout')}
                </span>
            ),
            key: '1',
        },

    ];

    console.log(user);
    return (
        <>
            <ul className={classes.items}>
                <li className='pr-10'>
                    {user && user.UserName}
                </li>
                <li className={classes.avatar}>
                    <Dropdown menu={{items}} trigger={['click']} placement="bottomCenter">
                        <a onClick={(e) => e.preventDefault()}>
                            <>
                                <UserIcon/>                        </>
                        </a>
                    </Dropdown>
                </li>
                <li className={classes.subItem} onClick={toggleMenu}>
                    <LeftMenuToggle/>
                </li>
            </ul>
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
                        <Button className="w-100" type="primary" htmlType="submit">
                            {translate('users_edit')}
                        </Button>
                    </div>
                </Form>
            </ModalComponent>
        </>
    );
};

export default HeaderRightComponent;
