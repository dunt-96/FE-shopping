import {
    EyeFilled,
    EyeInvisibleFilled,
} from '@ant-design/icons'
import { Image } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imgLogoLogin from '../../assets/images/logo-login.png'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { Loading } from '../../components/Loading/Loading'
import * as message from '../../components/Message/Message'
import { useMutationHook } from '../../hooks/mutationHook'
import UserService from '../../services/UserService'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'


const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsConfirmShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const mutation = useMutationHook(
        (data: {}) => UserService.signUp(data)
    )

    const { isPending, isSuccess, data } = mutation;

    useEffect(() => {
        console.log('data.stt', data?.data.status);
        if (isSuccess && !(data.data.status === "ERR")) {
            message.success()
            handleNavigateSignIn()

        }
    }, [isSuccess, isPending])

    const handleOnchangeEmail = (val: any) => {
        console.log('e', val.target.value);
        setEmail(val.target.value);
        isSetDisableBtnSignIn(!val.target.value || !confirmPassword || !password)
    }
    const handleOnchangePassword = (val: any) => {
        console.log('pw', val.target.value);
        setPassword(val.target.value)
        isSetDisableBtnSignIn(!val.target.value || !email || !confirmPassword)
    }
    const handleOnchangeConfirmPassword = (val: any) => {
        console.log('confirm pw', val.target.value);
        setConfirmPassword(val.target.value);
        isSetDisableBtnSignIn(!val.target.value || !email || !password)
    }
    const handleSignUp = () => {
        mutation.mutate({
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
    }
    const [disabledBtnSignIn, isSetDisableBtnSignIn] = useState(!email || !password || !confirmPassword);

    const navigate = useNavigate();
    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', display: 'flex', height: '445px', borderRadius: '6px', background: '#fff' }}>
                <WrapperContainerLeft>
                    <h1>Xin chao</h1>
                    <p>Dang nhap hoac tao tai khoan</p>
                    <InputForm placeholder='abc@gmail.com' style={{ marginBottom: '10px' }} value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span onClick={() => setIsShowPassword(!isShowPassword)} style={{ position: 'absolute', top: '4px', right: '8px', zIndex: 10 }}>
                            {
                                isShowPassword ? (<EyeFilled></EyeFilled>) : (<EyeInvisibleFilled></EyeInvisibleFilled>)
                            }
                        </span>
                        <InputForm placeholder='password' type={isShowPassword ? "text" : 'password'} style={{ marginBottom: '10px' }} value={password} onChange={handleOnchangePassword} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span onClick={() => setIsConfirmShowPassword(!isShowConfirmPassword)} style={{ position: 'absolute', top: '4px', right: '8px', zIndex: 10 }}>
                            {
                                isShowConfirmPassword ? (<EyeFilled></EyeFilled>) : (<EyeInvisibleFilled></EyeInvisibleFilled>)
                            }
                        </span>
                        <InputForm placeholder='confirm password' type={isShowConfirmPassword ? "text" : 'password'} value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
                    </div>
                    {data?.data.status === "ERR" && <span style={{ color: 'red' }}>{data.data.message}</span>}
                    <Loading isLoading={isPending}>
                        <ButtonComponent
                            size={40}
                            onClick={handleSignUp}
                            disabled={disabledBtnSignIn}
                            textBtn='Dang ky'
                            styleTextBtn={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            styleBtn={{
                                background: disabledBtnSignIn ? '#cecece' : 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                        >
                        </ButtonComponent>
                    </Loading>
                    <p>Ban da co tai khoan ? <WrapperTextLight onClick={handleNavigateSignIn}>Dang nhap</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imgLogoLogin} preview={false} alt='image-logo' height='203px' width='203px' />
                    <h4>Mua sam tai PubCorn</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage