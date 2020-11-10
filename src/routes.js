import React from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'react-loadable'
import Loading from 'src/app/common/components/Loading';
const DashboardLayout = Loadable({
	loader: () => import("src/app/layouts/DashboardLayout"),
	loading:Loading
})
const RequestsView = Loadable({
	loader: () => import('src/views/requests/RequestsView'),
	loading: Loading
});
const CheckoutRequestView = Loadable({
	loader: () => import('src/views/checkoutreq/CheckoutRequestView'),
	loading: Loading
});
const CheckoutView = Loadable({
	loader: () => import('src/views/checkout/CheckoutView'),
	loading: Loading
});
const InventoryView = Loadable({
	loader: () => import('src/views/inventory/InventoryView'),
	loading: Loading
});
const OrdersView = Loadable({
	loader: () => import('src/views/orders/OrdersView'),
	loading: Loading
});
const MarketView = Loadable({
	loader: () => import('src/views/market/MarketView'),
	loading: Loading
});
const SettingsView = Loadable({
	loader: () => import('src/views/settings/SettingsView'),
	loading: Loading
});
const RegisterView = Loadable({
	loader: () => import('src/views/auth/RegisterView'),
	loading: Loading
});
const AccountView = Loadable({
	loader: () => import('src/views/account/AccountView'),
	loading: Loading
});
const DashboardView = Loadable({
	loader: () => import('src/views/reports/DashboardView'),
	loading: Loading
});
const ProductListView = Loadable({
	loader: () => import('src/views/product/ProductListView'),
	loading: Loading
});
const NotFoundView = Loadable({
	loader: () => import('src/views/errors/NotFoundView'),
	loading: Loading
});
const LoginView = Loadable({
	loader: () => import('src/views/auth/LoginView'),
	loading: Loading
});
const MainLayout = Loadable({
	loader: () => import('src/app/layouts/MainLayout'),
	loading: Loading
});




const routes = [
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: 'login', element: <LoginView /> },
			{ path: 'register', element: <RegisterView /> },
			{
				path: '404',
				element: <NotFoundView />
			},
			{ path: '/', element: <Navigate to="/login" /> },
			{ path: '*', element: <Navigate to="/404" /> }
		]
	},
	{
		path: 'app',
		element: <DashboardLayout />,
		children: [
			{ path: 'account', element: <AccountView /> },
			{ path: 'orders', element: <OrdersView /> },
			{ path: 'inventory', element: <InventoryView /> },
			{ path: 'market', element: <MarketView /> },
			{ path: 'dashboard', element: <DashboardView /> },
			{ path: 'checkout', element: <CheckoutView /> },
			{ path: 'products', element: <ProductListView /> },
			{ path: 'settings', element: <SettingsView /> },
			{ path: 'requests', element: <RequestsView /> },
			{
				path: 'checkoutreq/:requestId',
				element: <CheckoutRequestView />
			},
			{ path: '*', element: <Navigate to="/404" /> }
		]
	}
];

export default routes;
