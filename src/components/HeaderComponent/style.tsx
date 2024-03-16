import { Row } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: rgb(26, 148, 255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    display: flex;
    width: 100%;
    padding: 20px;
    justify-content: center;
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    display: flex;
    text-align: center;
    justify-content: center;
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-item: center;
    color: #fff;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.div`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`