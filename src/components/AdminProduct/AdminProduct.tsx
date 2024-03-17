import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from 'react';
import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/mutationHook';
import ProductService from '../../services/ProductService';
import { getBase64 } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import InputComponent from '../InputComponent/InputComponent';
import { Loading } from '../Loading/Loading';
import TableComponent from '../TableComponent/TableComponent';
import { WrapperFormItem, WrapperHeader, WrapperUploadFile } from "./style";

type FieldType = {
    name?: string;
    password?: string;
    remember?: string;
};

const AdminProduct = () => {
    const [rowSelected, setRowSelected] = useState('');
    const fetchAllProduct = async () => {
        const res = await ProductService.getAllProduct();

        return res?.data;
    }

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: async () => await fetchAllProduct(),
        retry: 3,
        retryDelay: 1000
    })

    const { isLoading: isLoadingProducts, data: products } = queryProduct;


    const mutation = useMutationHook(
        (data) => ProductService.createProduct(data)
    );

    const mutationUpdate = useMutationHook(
        (data) => {
            const { id,
                token,
                product
            } = data
            console.log('id', id);
            const res = ProductService.updateProduct(
                id,
                product,
                token
            )
            return res
        },
    )


    const { data, isSuccess, isPending, isError } = mutation;
    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const initial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        discount: '',
    })
    const [stateProduct, setStateProduct] = useState(initial())
    const [stateProductDetail, setStateProductDetail] = useState(initial())

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        // setAvatar(file.url || (file.preview as string));
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    };

    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        // setAvatar(file.url || (file.preview as string));
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview
        })
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e) => {
        onFinish(e.target.values);
        await mutation.mutateAsync(stateProduct);
    };

    useEffect(() => {
        if (isSuccess && data.status === "OK") {
            // setIsModalOpen(false);
            handleCancel()
            message.success();
            form.resetFields();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess])


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {

    };

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
        console.log('onchange name', e.target.value);
    }
    const handleOnchangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value
        })
        console.log('onchange name detail: ', e.target.name, e.target.value);
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
        if (rowSelected) {
            setIsLoadingUpdate(true);
            await getDetailProduct(rowSelected);
            showDrawer();
        }
    }

    const handleCloseDrawer = () => {
        onClose();
        setStateProductDetail({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: ''
        })
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


    const onUpdateProduct = async () => {
        setIsLoadingUpdate(true);
        const access_token = localStorage.getItem('access_token');
        await ProductService.updateProduct(rowSelected, stateProductDetail, access_token);
        console.log('onFinish update', stateProductDetail);
        setIsLoadingUpdate(false);
        onClose();
        refreshListDataProduct();

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
        const res = await queryProduct.refetch();
        console.log('refresh', res);
    }

    useEffect(() => {
        if (rowSelected) {
            getDetailProduct(rowSelected);
        }
    }, [rowSelected])

    useEffect(() => {
        // setStateProductDetail(stateProductDetail);
        form.setFieldsValue(stateProductDetail);
    }, [form, stateProductDetail])

    const getDetailProduct = async (productId) => {
        const res = await ProductService.getDetailProduct(productId);
        if (res.data) {
            setStateProductDetail({
                name: res.data.name,
                price: res.data.price,
                description: res.data.description,
                rating: res.data.rating,
                image: res.data.image,
                type: res.data.type,
                countInStock: res.data.countInStock,
                discount: res.data.discount
            })
        }
        setIsLoadingUpdate(false);
    }

    const renderAction = () => {
        return (
            <div style={{ gap: '10px' }}>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            // sorter: (a, b) => a.name.length - b.name.length,
            // ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            // sorter: (a, b) => a.price - b.price,
            // filters: [
            //     {
            //         text: '>= 50',
            //         value: '>=',
            //     },
            //     {
            //         text: '<= 50',
            //         value: '<=',
            //     }
            // ],
            // onFilter: (value, record) => {
            //     if (value === '>=') {
            //         return record.price >= 50
            //     }
            //     return record.price <= 50
            // },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            // sorter: (a, b) => a.rating - b.rating,
            // filters: [
            //     {
            //         text: '>= 3',
            //         value: '>=',
            //     },
            //     {
            //         text: '<= 3',
            //         value: '<=',
            //     }
            // ],
            // onFilter: (value, record) => {
            //     if (value === '>=') {
            //         return Number(record.rating) >= 3
            //     }
            //     return Number(record.rating) <= 3
            // },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div>
                <Button onClick={showModal} style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent selectionType={'checkbox'} columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id);
                        }
                    }
                }} />
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}  >
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="Name"
                            name="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="Type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count in stock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count in stock!' }]}
                        >
                            <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your rating!' }]}
                        >
                            <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                        </Form.Item>
                        <WrapperFormItem
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <WrapperUploadFile maxCount={1} onChange={handleOnchangeAvatar} action="/api/user/upload-avatar">
                                <Button icon={<UploadOutlined />}>Image:</Button>
                                {stateProduct.image && (
                                    <img src={stateProduct.image} style={{
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
            </Modal>
            <DrawerComponent open={open} onClose={onClose} title="Chi tiết sản phẩm" width="500px">
                <Loading isLoading={isLoadingUpdate}>
                    <Form
                        name="basic"
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onUpdateProduct}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateProductDetail.name} onChange={handleOnchangeDetail} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateProductDetail.type} onChange={handleOnchangeDetail} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count in stock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count in stock!' }]}
                        >
                            <InputComponent value={stateProductDetail.countInStock} onChange={handleOnchangeDetail} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <InputComponent value={stateProductDetail.price} onChange={handleOnchangeDetail} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your rating!' }]}
                        >
                            <InputComponent value={stateProductDetail.rating} onChange={handleOnchangeDetail} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <InputComponent value={stateProductDetail.description} onChange={handleOnchangeDetail} name="description" />
                        </Form.Item>
                        <WrapperFormItem
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <WrapperUploadFile maxCount={1} accept="image/*" onChange={handleOnchangeAvatarDetail} action="/api/user/upload-avatar">
                                <Button icon={<UploadOutlined />}>Image:</Button>
                                {stateProductDetail.image && (
                                    <img src={stateProductDetail.image} style={{
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
        </div>
    )
}

export default AdminProduct;