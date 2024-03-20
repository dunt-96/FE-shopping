import { Spin } from "antd"

export const Loading = ({ children, isLoading = false, deday = 200, ...rest }) => {
    return (
        <div style={
            { ...rest }
        }>
            <Spin spinning={isLoading}>
                {children}
            </Spin>
        </div>
    )

}