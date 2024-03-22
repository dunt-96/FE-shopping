import { InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`

export const WrapperLeft = styled.div`
  flex: 6;
`

export const WrapperListOrder = styled.div`
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 16px;
  background: #fff;
  margin-top: 12px;
  border-radius: 10px;
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 100%;
  margin-left: 20px;
  display: flex ;
  flex:2;
  // z-index: 3;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const WrapperInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 30px 40px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%

`

export const WrapperTotal = styled.div`
    display: flex;
    align-items: center; 
    width: 100%;
    justify-content: space-between;
    padding: 30px 40px;
    background: #fff ;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const WrapperInputNumber = styled(InputNumber)`
    width: 50px;
    text-align: center;
    flex: 2;
    align-content:center;
    border-top: none;
    border-bottom: none;
    overflow-wrap: break-word;
    justify-content: center;
    & .ant-input-number-handler-wrap {
        display: none;
    }
`