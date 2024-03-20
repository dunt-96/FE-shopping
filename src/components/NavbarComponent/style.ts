import { styled } from "styled-components";

export const WrapperLabelText = styled.h4`
    color: #000;
    font-size: 18px;
    font-weight: 900;
    margin-left: 10px;
    
`

export const WrapperTextValue = styled.div`
    border-top: 1px solid #cfcfcf;
    padding: 15px 10px;
    color: rgb(56, 56, 61);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: rgb(26, 148, 255);
        color: #fff
    }
`
export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    // height: 100%;
`

export const WrapperTextPrice = styled.div`
    border-radius: 8px;
    background-color: #ccc;
    width: fit-content;
    padding: 5px 10px;
    margin-top: 10px;
`