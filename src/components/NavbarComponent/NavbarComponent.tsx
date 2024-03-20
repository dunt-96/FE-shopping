import { WrapperContent, WrapperLabelText, WrapperTextValue } from './style';

const NavbarComponent = (props) => {
    const { arr = ['test1', 'test2'], onClick, currentSelectedType } = props;
    const renderContent = ({ type, options }: { type: string, options: any[] }) => {
        switch (type) {
            case 'text':
                return options.map((val) => {
                    return <WrapperTextValue
                        style={{
                            background: `${currentSelectedType === val ? "rgb(26, 148, 255)" : "#fff"}`,
                            color: `${currentSelectedType === val ? "#fff" : "rgb(26, 148, 255)"}`
                        }}
                        onClick={(_) => {
                            onClick(val)
                        }}
                        key={val}>{val}</WrapperTextValue>
                });
            // case 'checkbox':
            //     return (
            //         <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange} >
            //             {options.map((val) => {
            //                 return (<Checkbox value={val.value}>{val.label}</Checkbox>)
            //             })}
            //         </Checkbox.Group>
            //     )
            // case 'star':
            //     return options.map((val, idx) => {
            //         return (
            //             <div style={{ display: 'flex', gap: '4px' }}>
            //                 <Rate disabled defaultValue={options[idx]} />
            //                 <span>{`tu ${val} sao`}</span>
            //             </div>
            //         )
            //     })
            // case 'price':
            //     return options.map((val, idx) => {
            //         return (
            //             <WrapperTextPrice>
            //                 {val}
            //             </WrapperTextPrice>
            //         )
            //     })

            default:
                return null;
        }
    }
    return (
        <div>
            <WrapperLabelText>Danh mục sản phẩm </WrapperLabelText>
            <WrapperContent>
                {renderContent({ type: 'text', options: arr })}
            </WrapperContent>

            <WrapperContent>
                {renderContent({
                    type: 'checkbox', options: [
                        {
                            value: 'a',
                            label: 'A'
                        },
                        {
                            value: 'b',
                            label: 'B'
                        },
                    ]
                })}
            </WrapperContent>

            <WrapperContent>
                {renderContent({
                    type: 'star', options: [
                        1, 2, 3, 2
                    ]
                })}
            </WrapperContent>
            <WrapperContent>
                {renderContent({
                    type: 'price', options: [
                        'duoi',
                        '100,000 vnd',
                    ]
                })}
            </WrapperContent>

        </div>
    )
}

export default NavbarComponent