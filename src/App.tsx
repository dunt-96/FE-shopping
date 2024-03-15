import { jwtDecode } from 'jwt-decode';
import { Fragment, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { resetUser, updateUser } from './redux/slices/userSlice';
import routes from './routes';
import UserService, { axiosJWT } from './services/UserService';
import { isJsonString } from './utils';

function App() {

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    let { decoded, storageData } = handleDecode();

    if (decoded?.id && storageData) {
      console.log('access-token', storageData);
      getDetailUser(decoded.id, storageData);
    }
  }, [])

  const handleDecode = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded;
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode<Record<string, any>>(storageData ?? '');
    }

    return { decoded, storageData };
  }

  axiosJWT.interceptors.request.use(async function (config) {
    const currentTime = new Date();
    // Do something before request is sent
    const { decoded } = handleDecode();
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken ?? '')
    const decodedRefreshToken = jwtDecode<Record<string, any>>(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      } else {
        dispatch(resetUser())
      }
    }

    return config;
  }, function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  });



  const getDetailUser = async (id: string, access_token: string) => {
    const res = await UserService.getDetailsUser(id, access_token);
    dispatch(updateUser({ ...res?.data, access_token: access_token }));
  }

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
