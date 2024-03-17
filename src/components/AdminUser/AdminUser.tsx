import { PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";
import TableComponent from '../TableComponent/TableComponent';
import { WrapperHeader } from "./style";

const AdminUser = () => {
    return (
        <div>
            <WrapperHeader>Quan ly nguoi dung</WrapperHeader>
            <div>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent selectionType={'checkbox'} />
            </div>
        </div>
    )
}

export default AdminUser;