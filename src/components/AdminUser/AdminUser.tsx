import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, InputRef, Space } from "antd";
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from 'react';
import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/mutationHook';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateCurrentUserId, userState } from '../../redux/slices/userSlice';
import UserService from '../../services/UserService';
import { getBase64 } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import InputComponent from '../InputComponent/InputComponent';
import { Loading } from '../Loading/Loading';
import ModelComponent from '../ModelComponent/ModelComponent';
import TableComponent from '../TableComponent/TableComponent';
import { WrapperFormItem, WrapperHeader, WrapperUploadFile } from "./style";

const AdminUser = () => {
    const user = useAppSelector(userState);
    const dispatch = useAppDispatch()

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [rowSelected, setRowSelected] = useState('');

    const fetchAllUser = async () => {
        const res = await UserService.getAllUser();

        return res?.data;
    }

    const queryProduct = useQuery({
        queryKey: ['users'],
        queryFn: async () => await fetchAllUser(),
        retry: 3,
        retryDelay: 1000
    })

    const { isLoading: isLoading, data: users } = queryProduct;

    const mutationUpdateUser = useMutationHook(
        (data) => {
            const { userId, user, access_token } = data
            console.log('id', userId);
            const res = UserService.updateUser(userId, user, access_token);
            return res
        },
    )

    const mutationCreateUser = useMutationHook(
        async (data) => {
            const res = await UserService.signUp(data);
            return res?.data;
        },
    )

    const mutationDeleteUser = useMutationHook((
        async (data) => {
            const { userId, access_token } = data;
            const res = await UserService.deleteUser(userId, access_token);

            console.log('delete res', res);

            return res;
        }
    ))


    const { data, isSuccess, isPending, isError } = mutationCreateUser;
    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdateUser;
    const { data: deleteData, isPending: isPendingDeleteProd, isSuccess: isSuccessDeleteProd, isError: isErrorDeleteProd } = mutationDeleteUser;
    const [form] = Form.useForm();
    const [formUserDetail] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    //   name: { type: String },
    // email: { type: String, required: true },
    // password: { type: String, required: true },
    // isAdmin: { type: Boolean, default: false, required: true },
    // phone: { type: Number },
    // address: { type: String },
    // avatar: { type: String },
    // city: { type: String },
    // access_token: { type: String, require: true },
    // refresh_token: { type: String, require: true }
    const initial = () => ({
        name: '',
        email: '',
        isAdmin: '',
        phone: '',
        address: '',
        avatar: '',
        password: '',
        confirmPassword: ''
    })

    const [stateUser, setStateUser] = useState(initial())
    const [stateUserDetail, setStateUserDetail] = useState(initial())

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        // setAvatar(file.url || (file.preview as string));
        setStateUser({
            ...stateUser,
            avatar: file.preview
        })
    };

    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        // setAvatar(file.url || (file.preview as string));
        setStateUserDetail({
            ...stateUserDetail,
            avatar: file.preview
        })
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e) => {
        onFinish(e.target.values);

    };

    useEffect(() => {
        if (isSuccess && data.status === "OK") {
            message.success();
            queryProduct.refetch();
            formUserDetail.resetFields();
            setIsModalOpen(false);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess])


    const handleCancel = () => {
        setIsModalOpen(false);
        setStateUser(initial());
        form.resetFields()
    };

    const handleCancelDeleteModal = () => {
        setIsModalOpenDelete(false);
    };



    const onFinish = async (values) => {
        console.log('state', stateUser);
        console.log('tao tai khoan');
        await mutationCreateUser.mutateAsync(stateUser);
        // const params = {
        //     name: stateProduct.name,
        //     type: stateProduct.type,
        //     price: stateProduct.price,
        //     description: stateProduct.description,
        //     rating: stateProduct.rating,
        //     image: stateProduct.image,
        //     countInStock: stateProduct.countInStock,
        //     discount: stateProduct.discount
        // }

        // mutation.mutate({ params });
    };

    const handleOnchange = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetail = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value
        })
    }

    //drawer
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleDetailsProduct = async () => {
        setIsLoadingUpdate(true);
        showDrawer();
        if (rowSelected === user.currentUserId) {
            setIsLoadingUpdate(false);
        }
    }

    const handleCloseDrawer = () => {
        onClose();
        setStateUserDetail(initial());
        form.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])

    useEffect(() => {
        if (isSuccessDeleteProd && deleteData?.status === 'OK') {
            message.success()
            refreshListDataProduct();
            setIsModalOpenDelete(false);
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessDeleteProd])


    const onUpdateUser = async () => {
        // console.log('asdasd');
        setIsLoadingUpdate(true);
        console.log('update user', stateUserDetail);
        await UserService.updateUser(rowSelected, stateUserDetail, user.access_token);
        refreshListDataProduct();
        setIsLoadingUpdate(false);
        onClose();

        // if (rowSelected) {
        //     mutationUpdate.mutate({
        //         id: rowSelected,
        //         product: stateProductDetail,
        //         token: access_token
        //     })
        //     setIsLoadingUpdate(false);
        //     onClose();
        //     if (isSuccessUpdated) {
        //         await refreshListDataProduct();
        //     }
        // }
    }

    const refreshListDataProduct = async () => {
        await queryProduct.refetch();
    }

    useEffect(() => {
        if (rowSelected) {
            getDetailUser(rowSelected);
        }
    }, [rowSelected])

    useEffect(() => {
        // setStateProductDetail(stateProductDetail);
        formUserDetail.setFieldsValue(stateUserDetail);
    }, [formUserDetail, stateUserDetail])

    const getDetailUser = async (userId) => {
        console.log('get detail', userId);
        const res = await UserService.getDetailsUser(userId, user.access_token);
        if (res?.data) {
            console.log('data123', res.data);
            setStateUserDetail({
                name: res.data.data.name,
                email: res.data.data.email,
                isAdmin: res.data.data.isAdmin,
                phone: res.data.data.phone,
                address: res.data.data.address,
                avatar: res.data.data.avatar,
                password: res.data.data.password,
                confirmPassword: '',
            })
        }
        console.log('state user detail', stateUserDetail);
        formUserDetail.setFieldsValue(stateUserDetail);
        setIsLoadingUpdate(false);
    }

    const handleDeleteUser = () => {
        console.log('token from user', user.access_token);
        console.log('product id', rowSelected);
        mutationDeleteUser.mutate({
            userId: rowSelected,
            access_token: user.access_token
        },
            // {
            //     onSettled: () => {
            //         queryProduct.refetch();
            //     }
            // },
        )
    }

    const renderAction = () => {
        return (
            <div style={{ gap: '10px' }}>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex,
    ) => {
        console.log('selected key', selectedKeys, confirm, dataIndex);
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button> */}
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ]
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'Admin' : 'User' }
    })

    return (
        <div>
            <WrapperHeader>Quan ly nguoi dung</WrapperHeader>
            <div>
                <Button onClick={showModal} style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent selectionType={'checkbox'} columns={columns} isLoading={isLoading} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            console.log('on click row', record._id);
                            setRowSelected(record._id);
                            dispatch(updateCurrentUserId({ currentUserId: record._id }))
                        }
                    }
                }} />
            </div>
            <ModelComponent forceRender title="Tạo tai khoan" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}  >
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        form={form}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="Name"
                            name="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateUser.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <InputComponent value={stateUser.email} onChange={handleOnchange} name="email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <InputComponent value={stateUser.password} type="password" onChange={handleOnchange} name="password" />
                        </Form.Item>
                        <Form.Item
                            label="Confirm password"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your confirm password!' }]}
                        >
                            <InputComponent value={stateUser.confirmPassword} type="password" onChange={handleOnchange} name="confirmPassword" />
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="isAdmin"
                            rules={[{ required: true, message: 'Please input your role!' }]}
                        >
                            <InputComponent value={stateUser.isAdmin ? 'Admin' : 'User'} onChange={handleOnchange} name="isAdmin" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <InputComponent value={stateUser.phone} onChange={handleOnchange} name="phone" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <InputComponent value={stateUser.address} onChange={handleOnchange} name="address" />
                        </Form.Item>
                        <WrapperFormItem
                            label="Avatar"
                            name="avatar"
                            rules={[{ required: true, message: 'Please input your avatar!' }]}
                        >
                            <WrapperUploadFile maxCount={1} accept="image/*" onChange={handleOnchangeAvatar} action="/api/user/upload-avatar">
                                <Button icon={<UploadOutlined />}>Image:</Button>
                                {stateUser.avatar && (
                                    <img src={stateUser.avatar} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '15px',
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </WrapperFormItem>
                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }} >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModelComponent>
            <DrawerComponent open={open} onClose={onClose} title="Chi tiết tài khoản" width="500px">
                <Loading isLoading={isLoadingUpdate}>
                    <Form
                        name="update form"
                        form={formUserDetail}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onUpdateUser}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent onChange={handleOnchangeDetail} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <InputComponent value={stateUserDetail.email} onChange={handleOnchangeDetail} name="email" />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="isAdmin"
                            rules={[{ required: true, message: 'Please input your role!' }]}
                        >
                            <InputComponent value={stateUserDetail.isAdmin ? 'Admin' : 'User'} onChange={handleOnchangeDetail} name="isAdmin" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <InputComponent value={stateUserDetail.phone} onChange={handleOnchangeDetail} name="phone" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <InputComponent value={stateUserDetail.address} onChange={handleOnchangeDetail} name="address" />
                        </Form.Item>
                        <WrapperFormItem
                            label="Avatar"
                            name="image"
                            rules={[{ required: true, message: 'Please input your avatar!' }]}
                        >
                            <WrapperUploadFile maxCount={1} accept="image/*" onChange={handleOnchangeAvatarDetail} action="/api/user/upload-avatar">
                                <Button icon={<UploadOutlined />}>Image:</Button>
                                {stateUserDetail.avatar && (
                                    <img src={stateUserDetail.avatar} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '15px',
                                    }} alt='avatar' />
                                )}
                            </WrapperUploadFile>
                        </WrapperFormItem>
                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }} >
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModelComponent forceRender title="Xoá tài khoản" open={isModalOpenDelete} onOk={handleDeleteUser} onCancel={handleCancelDeleteModal}  >
                <Loading isLoading={isPendingDeleteProd}>
                    <div>Bạn có chắc muốn xoá tài khoản này không ?</div>
                </Loading>
            </ModelComponent>
        </div>
    )
}

export default AdminUser;