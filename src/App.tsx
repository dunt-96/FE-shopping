import React, { Fragment } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Button, Flex } from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import OrderPage from './pages/OrderPage/OrderPage';
import routes from './routes'
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';

function App() {
  const Button1 = styled.button({
    backgroundColor: 'red'
  });

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = (route.isShowHeader ? DefaultComponent : Fragment);
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>} />
            );
          })}
          {/* <Route path='/' element={<HomePage />}></Route>
          <Route path='/order' element={<OrderPage />}></Route> */}
        </Routes>
      </Router>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <Button1>
    //       Test add style
    //     </Button1>
    //     <Flex gap="small" wrap="wrap">
    //       <Button type="primary">Primary Button</Button>
    //       <Button>Default Button</Button>
    //       <Button type="dashed">Dashed Button</Button>
    //       <Button type="text">Text Button</Button>
    //       <Button type="link">Link Button</Button>
    //     </Flex>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

export default App;
