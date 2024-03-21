import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, InputRef, Select, Space } from "antd";
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/mutationHook';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { productState, updateCurrentIdProduct } from '../../redux/slices/productSlice';
import { userState } from '../../redux/slices/userSlice';
import ProductService from '../../services/ProductService';
import { getBase64, renderOptions } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import InputComponent from '../InputComponent/InputComponent';
import { Loading } from '../Loading/Loading';
import ModelComponent from '../ModelComponet/ModelComponent';
import TableComponent from '../TableComponent/TableComponent';
import { WrapperFormItem, WrapperHeader, WrapperUploadFile } from "./style";

type FieldType = {
    name?: string;
    password?: string;
    remember?: string;
};

let index = 0;

const AdminProduct = () => {
    const product = useAppSelector((productState));
    const dispatch = useAppDispatch()
    const user = useSelector(userState);
    const inputRef = useRef<InputRef>(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [rowSelected, setRowSelected] = useState('');
    const [isDeleteManyProducts, setIsDeleteManyProduct] = useState(false);
    const [listIdsDelete, setListIdsDelete] = useState([]);
    const [selectedType, setSelectType] = useState('');


    const fetchAllProduct = async () => {
        const res = await ProductService.getAllProduct('', 100);

        return res?.data;
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        // setSelectType(res?.data[0]);
        // setAllTypeProductState(res?.data);

        return res?.data;
    }

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: async () => await fetchAllProduct(),
        retry: 3,
        retryDelay: 1000
    })

    const { data: allTypeProduct, isLoading, isSuccess: isSuccessAllType } = useQuery({
        queryKey: ['type_products'],
        queryFn: async () => await fetchAllTypeProduct(),
        retry: 3,
        retryDelay: 1000
    })

    const { isLoading: isLoadingProducts, data: products } = queryProduct;

    const mutation = useMutationHook(
        (data) => ProductService.createProduct(data)
    );
    const mutationDeleteManyProducts = useMutationHook(
        async (data) => {
            const { ids, access_token } = data;
            const res = await ProductService.deleteManyProducts(ids, access_token);

            return res;
        }
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

    const mutationDeleteProduct = useMutationHook((
        async (data) => {
            const { productId, access_token } = data;
            const res = await ProductService.deleteProduct(productId, access_token);

            console.log('delete res', res);

            return res;
        }
    ))


    const { data, isSuccess, isPending, isError } = mutation;
    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: deleteData, isPending: isPendingDeleteProd, isSuccess: isSuccessDeleteProd, isError: isErrorDeleteProd } = mutationDeleteProduct;
    const { data: deleteManyData, isPending: isPendingDeleteMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany } = mutationDeleteManyProducts;
    const [form] = Form.useForm();
    const [formDetail] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const initial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        discount: '',
        newType: ''
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

    const handleDeleteManyProducts = () => {
        console.log('list id delete', listIdsDelete);
        // handleClickDelete();
        // setIsDeleteManyProduct(true);
        // console.log('ids', ids);
        mutationDeleteManyProducts.mutate({
            ids: listIdsDelete,
            access_token: user.access_token
        })
    }


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
            message.success();
            queryProduct.refetch();
            // form.resetFields();
            handleCancel()
        } else if (isError) {
            message.error();
        }
    }, [isSuccess])


    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct(initial());
        form.resetFields()
    };

    const handleCancelDeleteModal = () => {
        setIsModalOpenDelete(false);
    };



    const onFinish = async (values) => {
        console.log('state', stateProduct);
        await mutation.mutateAsync({ ...stateProduct, type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type });
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
        setIsDeleteManyProduct(false);
        setIsLoadingUpdate(true);
        showDrawer();
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
            discount: '',
            newType: ''
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

    useEffect(() => {
        if (isSuccessDeleteProd && deleteData?.status === 'OK') {
            message.success()
            refreshListDataProduct();
            setIsModalOpenDelete(false);
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessDeleteProd])

    useEffect(() => {
        if (isSuccessDeleteMany && deleteManyData?.status === 'OK') {
            message.success()
            refreshListDataProduct();
            setIsModalOpenDelete(false);
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessDeleteMany])

    const onUpdateProduct = async () => {
        setIsLoadingUpdate(true);
        const access_token = localStorage.getItem('access_token');
        await ProductService.updateProduct(rowSelected, stateProductDetail, access_token);
        console.log('onFinish update', stateProductDetail);
        refreshListDataProduct();
        setIsLoadingUpdate(false);
        onClose();
    }

    const refreshListDataProduct = async () => {
        await queryProduct.refetch();
    }

    useEffect(() => {
        if (rowSelected) {
            getDetailProduct(rowSelected);
        }
    }, [rowSelected])

    useEffect(() => {
        // setStateProductDetail(stateProductDetail);
        formDetail.setFieldsValue(stateProductDetail);
    }, [formDetail, stateProductDetail])

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
                discount: res.data.discount,
                newType: ''
            })
        }
        setIsLoadingUpdate(false);
    }

    const handleDeleteAll = (ids) => {
        console.log(ids);
        setIsDeleteManyProduct(true);
        setListIdsDelete(ids);
        handleClickDelete();
    }

    const handleClickOkDeleteProduct = () => {
        return isDeleteManyProducts ? handleDeleteManyProducts() : handleDeleteProduct();
    }

    const handleDeleteProduct = () => {
        console.log('token from user', user.access_token);
        console.log('product id', rowSelected);
        mutationDeleteProduct.mutate({
            productId: rowSelected,
            access_token: user.access_token
        },
            // {
            //     onSettled: () => {
            //         queryProduct.refetch();
            //     }
            // },
        )
    }
    const handleClickDelete = () => {
        setIsModalOpenDelete(true);
    }

    const renderAction = () => {
        return (
            <div style={{ gap: '10px' }}>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={handleClickDelete} />
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

    const handleChangeSelect = (val) => {
        setSelectType(val);
        console.log('add more type', val);
        setStateProduct({
            ...stateProduct,
            type: val
        })
    }

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
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
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
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
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

    console.log('allTypeProduct', allTypeProduct);

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div>
                <Button onClick={showModal} style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteMany={handleDeleteAll} selectionType={'checkbox'} columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            console.log('on click row', record._id);
                            setRowSelected(record._id);
                            dispatch(updateCurrentIdProduct({ currentIdProduct: record._id }))
                        }
                    }
                }} />
            </div>
            <ModelComponent title="Tạo sản phẩm" forceRender open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}  >
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
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <Select
                                // name="type"
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(allTypeProduct)}
                            />
                        </Form.Item>
                        {stateProduct?.type === 'add_type' && (
                            <Form.Item
                                label='New type'
                                name="newType"
                                rules={[{ required: true, message: 'Please input your new type!' }]}
                            >
                                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
                            </Form.Item>
                        )}

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
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount!' }]}
                        >
                            <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
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
                            <WrapperUploadFile maxCount={1} accept="image/*" onChange={handleOnchangeAvatar} action="/api/user/upload-avatar">
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
            </ModelComponent>
            <DrawerComponent open={open} onClose={onClose} title="Chi tiết sản phẩm" width="500px">
                <Loading isLoading={isLoadingUpdate}>
                    <Form
                        name="update form"
                        form={formDetail}
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
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount!' }]}
                        >
                            <InputComponent value={stateProductDetail.discount} onChange={handleOnchangeDetail} name="discount" />
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
            <ModelComponent forceRender title="Xoá sản phẩm" open={isModalOpenDelete} onOk={handleClickOkDeleteProduct} onCancel={handleCancelDeleteModal}  >
                <Loading isLoading={isDeleteManyProducts ? isPendingDeleteMany : isPendingDeleteProd}>
                    <div>Bạn có chắc muốn xoá {isDeleteManyProducts ? "những" : ''} sản phẩm này không ?</div>
                </Loading>
            </ModelComponent>
        </div>
    )
}

export default AdminProduct;