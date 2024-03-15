import { Spin } from "antd"

export const Loading = ({ children, isLoading = false, deday = 200 }) => {
    return <Spin spinning={isLoading}>
        {children}
    </Spin>
}