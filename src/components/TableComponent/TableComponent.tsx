import { Table } from "antd";
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
    const { selectionType, data = [], columns = [], isLoading = false } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <Loading isLoading={isLoading}>
            <Table
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