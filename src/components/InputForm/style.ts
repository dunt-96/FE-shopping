import { Input } from "antd";
import { styled } from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border: none;
    border-bottom: 1px solid #efefef;
    outline: none;
    &:focus {
        background-color: rgb(232, 240, 254);
    }
`