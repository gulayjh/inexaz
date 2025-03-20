import {Form, Table, Upload} from "antd";
import {useCallback, useMemo, useState} from "react";
import {useUploadStyles} from "./container.style";
import {SignPlusIcon} from "../../assets/images/icons/sign";
import useLocalization from "../../assets/lang";
import {fileSize} from "../../core/helpers/file-size";
import {generateGuid} from "../../core/helpers/generate-guid";

function HomeComponent() {
    const {

        chooseButton,
        upload,

    } = useUploadStyles();
    const translate = useLocalization();

    const [fileList, setFileList] = useState<any>([]);

    const handleListUpload = useCallback((file: any) => {
        setFileList((prevFileList: any) => [...prevFileList, file].slice(0, 100));
    }, [fileList]);

    const beforeUpload = useCallback((file: any) => {
        handleListUpload(file);

        return false;
    }, []);

    const uploadProps = useMemo(() => ({
        multiple: true,
        accept: '.pdf',

        showUploadList: false,
        beforeUpload,
    }), [beforeUpload]);
    const filecolumns = [
            {
                title: <span>{translate('file_number')}</span>,
                dataIndex: '',
                width: 250,
                render: (id: number, file: any, index: number) => {
                    return <span className='pl-20'>{index + 1}</span>;
                },
            },

            {
                title: translate('file_name'),
                dataIndex: 'name',
                ellipsis: true,
                width: '350px',

            },

            {
                title: <span className='d-flex justify-center'>{translate('file_size')}</span>,
                dataIndex: '',
                render: (id: number, file: any, index: number) => {
                    return <span className='d-flex justify-center'>{fileSize(Number(file.size))}</span>;
                },

            },
        ]
    ;

    return (
        <div>
            <Form name='basic' layout='vertical'>
                <div className={upload}>
                    <Form.Item
                        name='FormFile' valuePropName='name'>
                        <Upload {...uploadProps} maxCount={100} fileList={fileList}
                                disabled={fileList?.length === 100}
                                onChange={(e) => {
                                    handleListUpload(e);
                                }}>
                            <div className={chooseButton}>
                                <span><SignPlusIcon/></span>
                                <span><h3>{translate('add_title')}</h3></span>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>
            </Form>
            <Table
                dataSource={fileList}
                columns={filecolumns}
                rowKey={generateGuid}
                scroll={{y: 400}}
                pagination={false}
                locale={{emptyText: translate('no_data')}}
            />
        </div>
    );
}

export default HomeComponent;
