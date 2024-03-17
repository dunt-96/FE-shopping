import { Drawer } from "antd";

const DrawerComponent = (props) => {
  const { open = false, onClose, children, title = 'Drawer', placement = 'right', ...rest } = props;
  return (
    <>
      <Drawer title={title} open={open} onClose={onClose} {...rest} placement={placement} >
        {children}
      </Drawer>
    </>
  )
}

export default DrawerComponent