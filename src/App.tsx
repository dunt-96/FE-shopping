import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import routes from './routes';

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);
  console.log('api', process.env.REACT_APP_API_URL);
  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
    console.log('res', res);
    return res.data;
  }

  const query = useQuery({ queryKey: ['todo'], queryFn: fetchApi });

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
