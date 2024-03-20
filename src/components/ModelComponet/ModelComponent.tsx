import { Modal } from 'antd'

const ModelComponent = ({ title = 'Modal', isOpen = false, children, ...rests }) => {
    return (
        <Modal title={title} open={isOpen} {...rests}>
            {children}
        </Modal>
    )
}

export default ModelComponent