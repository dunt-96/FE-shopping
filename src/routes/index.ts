import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductsPage/ProductPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SystemAminPage from "../pages/SystemAdminPage/SystemAminPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isPrivate: false,
    },

    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/products',
        page: ProductPage,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
        isPrivate: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
        isPrivate: false,
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailPage,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/system/admin',
        page: SystemAminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage,
        isPrivate: false,
    },
]

export default routes;