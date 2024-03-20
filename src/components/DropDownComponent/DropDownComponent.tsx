import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ContainerDropdown } from './style';

const DropDownComponent = () => {
    const [showUp, setShowUp] = useState(true);

    const handleShowUp = () => {
        setShowUp((prev) => !prev);
    }

    return (
        <div onClick={handleShowUp} style={{ display: 'flex', position: 'relative' }}>
            <ContainerDropdown></ContainerDropdown>
            <div style={{ display: "flex", position: 'absolute', top: '7px', right: '5px' }}>
                {showUp ? <UpOutlined style={{ height: '20px', width: '20px', color: '#cecece' }} /> : <DownOutlined style={{ color: '#cfcfcf', height: '20px', width: '20px' }} />}
                {/* <UpOutlined /> */}
            </div>

        </div>
    )
}

export default DropDownComponent