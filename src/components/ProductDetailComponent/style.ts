import { Col, Image, InputNumber } from "antd";
import { styled } from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`
export const WrapperStyleImageSmallCol = styled(Col)`
    // flex-basis: unset;
    // display: flex
`

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
    margin: 0;
`
export const WrapperStyleTextSell = styled.h1`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    margin-left: 5px;
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    margin-top:10px;
`
export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 50px;
    margin-right: 8px;
    font-weight: 500;
    margin-top:0px;
`
export const WrapperAddressProduct = styled.div`
    span.address {
        font-size: 18px;
        line-height: 24px;
        font-weight: 500;
        text-decoration: underline;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 5px 0 5px
    }
    .change-address {
        color: rgb(11,116,229);
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;

    }
`
export const WrapperQualityProduct = styled.h1`
    display: flex;
    gap: 5px;
    margin: 0;
    align-item: center;
    width: 100px;
    margin-top: 10px;
`
export const WrapperBtnQualityProduct = styled.span`
`
export const WrapperInputNumber = styled(InputNumber)`
    width: 50px;
    text-align: center;
    // flex: 2;
    align-content:center;
    // border-top: none;
    // border-bottom: none;
    overflow-wrap: break-word;
    justify-content: center;
    & .ant-input-number-handler-wrap {
        display: none;
    }
`