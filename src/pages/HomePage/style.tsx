import { styled } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`
export const WrapperBtnMore = styled(ButtonComponent)`
  &:hover {
    background-color:${(props) => props.disabled ? '#ccc' : 'rgb(11, 116, 229)'} ;
    span {
      color: #fff
    }
  }
  width: 100%;
  text-align: center;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`


export const WrapperProducts = styled.div`
  display: flex;
  // justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: start;
`
