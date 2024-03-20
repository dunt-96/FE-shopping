import { useNavigate } from "react-router-dom";

const TypeProduct = ({ name }: { name: string }) => {
    const navigate = useNavigate();
    const handleNavigate = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }

    return (
        <div style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleNavigate(name)}>{name}</div>
    )
}

export default TypeProduct