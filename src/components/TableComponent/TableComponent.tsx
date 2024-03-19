import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { useState } from 'react';
import { Loading } from "../Loading/Loading";

// const genListProducts = (products) => {
//     // (products.map((product) => {

//     // }))
//     console.log('list products 122', products);
//     return [...products.map((product) => {
//         return {
//             key: product._id,
//             name: product.name,
//             price: product.price,
//             rating: product.rating,
//             selled: product.selled,
//             type: product.type,
//             discount: product.discount,
//             countInStock: product.countInStock,
//             image: product.image

//         }

//     })]
// }



const TableComponent = (props) => {
    const { selectionType, data = [], columns = [], isLoading = false, handleDeleteMany } = props;
    const [rowSelectedKeys, setRowSelectedKey] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setRowSelectedKey(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    }

    const handleExportToExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(columns.filter((col) => col.dataIndex !== 'action'))
            .addDataSource(data, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <p onClick={handleDeleteAll} style={{ color: 'red' }}>
                    Xoá tất cả
                </p>
            ),
            key: '0',
        },
    ];

    return (
        <Loading isLoading={isLoading}>
            <div>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Action
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <Button onClick={handleExportToExcel}>
                Export
            </Button>
            <Table
                id='table-xls'
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent