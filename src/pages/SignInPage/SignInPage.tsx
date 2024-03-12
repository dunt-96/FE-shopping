import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import InputForm from '../../components/InputForm/InputForm'

const SignInPage = () => {
  return (
    <div>
      <div>
        <WrapperContainerLeft>
          <h1>Xin chao</h1>
          <p>Dang nhap hoac tao tai khoan</p>
          <InputForm props={{ placeholder: 'Nhap text' }} />
        </WrapperContainerLeft>

        <WrapperContainerRight>

        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage