import {
    UploadOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
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
import { getBase64 } from '../../utils';
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";

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

    const [email, setEmail] = useState('');
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const [name, setName] = useState('');
    const handleOnchangeName = (e) => {
        setName(e.target.value);
    };

    const [phone, setPhone] = useState('');
    const handleOnchangePhone = (e) => {
        setPhone(e.target.value);
    };

    const [address, setAddress] = useState('');
    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value);
    };

    const [avatar, setAvatar] = useState('');

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        console.log('file', file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setAvatar(file.url || (file.preview as string));
    };

    const handleGetDetailsUser = async (id, token) => {

        const storage = localStorage.getItem('refresh_token');
        const refreshToken = JSON.parse(storage ?? '');
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
    }


    const handleUpdate = async () => {
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
            console.log(isSuccess);
        } else if (isError) {
            message.error();
        }
    }

    useEffect(() => {
        console.log('111');
        if (isSuccess) {
            message.success();
            console.log('updata ava success');
            handleGetDetailsUser(user.id, user.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError])

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
                        {/* <InputForm style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
                        <WrapperUploadFile maxCount={1} onChange={handleOnchangeAvatar} action="/api/user/upload-avatar">
                            <Button icon={<UploadOutlined />}>Select file</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt='avatar' />
                        )}
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