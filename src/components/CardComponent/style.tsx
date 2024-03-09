import { Card } from "antd";
import { styled } from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
`

export const StyleNameProduct = styled.div`
     font-weight: 400;
     font-size: 12px;
     line-height: 16xp;
     color: rgb(56, 56, 61);
`

export const WrapperReportText = styled.div`
    display: flex;
    font-size: 11px;
    color: rgb(128, 128, 137);
    align-items: center
`
export const WrapperPriceText = styled.div`
    font-size: 16px;
    color: rgb(255, 66, 78);
    font-weight: 500;
    margin: 8px 0;
`
export const WrapperDiscountPriceText = styled.span`
    font-size: 12px;
    color: rgb(255, 66, 78);
    font-weight: 400;
`

export const WrapperStyleTextSell = styled.h1`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`