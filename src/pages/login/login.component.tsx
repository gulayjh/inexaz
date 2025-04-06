import {Button, Card, Form, Input} from 'antd';
import {useLoginStyles} from './login.style';
import React, {useCallback, useMemo} from 'react';
import {ILoginFormValues} from './login.component.d';
import useLocalization from '../../assets/lang';
import {FormRule} from 'antd';
import {useLogin} from './actions/mutations';
import {setToken} from '../../core/helpers/get-token';
import {Routes, useNavigate} from 'react-router-dom';
import {Checkbox} from 'antd/lib';

const LoginComponent = () => {
    const translate = useLocalization();

    const {mutate, isLoading} = useLogin();

    const {title, page, panel, subtitle} = useLoginStyles();
    const initialValues: ILoginFormValues = {
        username: '',
        password: '',
        remember: false,
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
    const navigate = useNavigate();

    const onSubmit = useCallback((values: ILoginFormValues) => {
        const postData = {
            'userName': values.username,
            'password': values.password,
            'rememberMe': values.remember
        };

        mutate(postData);
    }, [mutate]);

    return (
        <div className={`${page} py-50 px-20 w-100 d-flex justify-center align-center`}>
            <div className={panel}>
                <Card>
                    <div className=''>
                        <div className=' mb-35 text-center'>
                            <h1 className={title}>
                                {translate('login_title')}
                            </h1>
                            <p className={subtitle}>
                                {translate('login_subtitle')}
                            </p>
                        </div>
                    </div>
                    <Form
                        name='login'
                        initialValues={initialValues}
                        onFinish={onSubmit}
                        layout='vertical'
                    >
                        <Form.Item
                            rules={rules.username}
                            name='username'
                            label='Username'>
                            <Input maxLength={50}/>
                        </Form.Item>
                        <Form.Item
                            rules={rules.password}
                            name='password' label='Password'>
                            <Input type='password' maxLength={50}/>
                        </Form.Item>
                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                        >
                            <Checkbox>{translate('login_remember')}</Checkbox>
                        </Form.Item>
                        <div>
                            <Button loading={isLoading} className='w-100' type='primary' htmlType='submit'>
                                {translate('login_sign_in_button')}
                            </Button>
                        </div>
                    </Form>
                </Card>

            </div>

        </div>
    );
};

export default LoginComponent;

