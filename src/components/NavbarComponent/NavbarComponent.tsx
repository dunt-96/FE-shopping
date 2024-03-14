import React, { Fragment } from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style'
import { type } from 'os'
import { Checkbox, Col, Rate, Row } from 'antd'

const NavbarComponent = () => {
    const renderContent = ({ type, options }: { type: string, options: any[] }) => {
        const onChange = () => { };
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue>{option}</WrapperTextValue>
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
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent({ type: 'text', options: ['Tu Lanh', 'TV', 'Dieu Hoa'] })}
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