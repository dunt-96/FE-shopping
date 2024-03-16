import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from "../../components/InputForm/InputForm";
import { Loading } from '../../components/Loading/Loading';
import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/mutationHook';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser, userState } from '../../redux/slices/userSlice';
import UserService from '../../services/UserService';
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from "./style";

export const ProfilePage = () => {
    const user = useSelector(userState);
    const dispatch = useAppDispatch();

    const mutation = useMutationHook(
        (data: Record<string, any>) => {
            const { id, access_token, ...rest } = data;
            UserService.updateUser(id, rest, access_token);
        }
    )

    const { data, isSuccess, isPending, isError } = mutation;

    const [email, setEmail] = useState(user.email);
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUpdateEmail = () => { };

    const [name, setName] = useState(user.name);
    const handleOnchangeName = (e) => {
        setName(e.target.value);
    };
    const handleUpdateName = (e) => {
        setName(e.target.value);
    };

    const [phone, setPhone] = useState(user.phone);
    const handleOnchangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleUpdatePhone = () => { };

    const [address, setAddress] = useState(user.address);
    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleUpdateAddress = () => { };

    const [avatar, setAvatar] = useState(user.avatar);
    const handleOnchangeAvatar = (e) => {
        setAvatar(e.target.value);
    };
    const handleUpdateAvatar = () => { };

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage ?? '')
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
    }

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetDetailsUser(user.id, user.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError])



    const handleUpdate = () => {
        // UserService.updateUser(user.id, {
        //     name, email, phone, address, avatar
        // });
        mutation.mutate({
            id: user.id,
            name,
            email,
            phone,
            address,
            avatar,
            access_token: user.access_token,
        })
        if (isSuccess) {
            message.success();
        } else if (isError) {
            message.error();
        }
    }

    console.log('data', data);

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
        setPhone(user.phone);
        setAddress(user.address);
        setAvatar(user.avatar);
    }, [user])

    return (
        <div style={{ width: '2150px', margin: '0 auto' }}>
            <WrapperHeader>Thong tin nguoi dung</WrapperHeader>
            <Loading isLoading={isPending}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Name:</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                        <ButtonComponent
                            size={40}
                            onClick={handleUpdate}
                            textBtn='Cap nhat'
                            styleTextBtn={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                            styleBtn={{
                                height: '30px',
                                width: '100px',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                        >
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email:</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            size={40}
                            onClick={handleUpdate}
                            textBtn='Cap nhat'
                            styleTextBtn={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                            styleBtn={{
                                height: '30px',
                                width: '100px',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                        >
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Phone:</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                        <ButtonComponent
                            size={40}
                            onClick={handleUpdate}
                            textBtn='Cap nhat'
                            styleTextBtn={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                            styleBtn={{
                                height: '30px',
                                width: '100px',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                        >
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Address:</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                        <ButtonComponent
                            size={40}
                            onClick={handleUpdate}
                            textBtn='Cap nhat'
                            styleTextBtn={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                            styleBtn={{
                                height: '30px',
                                width: '100px',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                        >
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar'>Avatar:</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} />
                        <ButtonComponent
                            size={40}
                            onClick={handleUpdate}
                            textBtn='Cap nhat'
                            styleTextBtn={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                            styleBtn={{
                                height: '30px',
                                width: '100px',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                        >
                        </ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}