import {
    EyeFilled,
    EyeInvisibleFilled,
} from '@ant-design/icons'
import { Image } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imgLogoLogin from '../../assets/images/logo-login.png'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsConfirmShowPassword] = useState(false);
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
                    <InputForm placeholder='abc@gmail.com' style={{ marginBottom: '10px' }} />
                    <div style={{ position: 'relative' }}>
                        <span onClick={() => setIsShowPassword(!isShowPassword)} style={{ position: 'absolute', top: '4px', right: '8px', zIndex: 10 }}>
                            {
                                isShowPassword ? (<EyeFilled></EyeFilled>) : (<EyeInvisibleFilled></EyeInvisibleFilled>)
                            }
                        </span>
                        <InputForm placeholder='password' type={isShowPassword ? "text" : 'password'} style={{ marginBottom: '10px' }} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span onClick={() => setIsConfirmShowPassword(!isShowConfirmPassword)} style={{ position: 'absolute', top: '4px', right: '8px', zIndex: 10 }}>
                            {
                                isShowConfirmPassword ? (<EyeFilled></EyeFilled>) : (<EyeInvisibleFilled></EyeInvisibleFilled>)
                            }
                        </span>
                        <InputForm placeholder='confirm password' type={isShowConfirmPassword ? "text" : 'password'} />
                    </div>
                    <ButtonComponent
                        size={40}
                        textBtn='Chon mua'
                        styleTextBtn={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        styleBtn={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: '26px 0 10px'
                        }}
                    >
                    </ButtonComponent>
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