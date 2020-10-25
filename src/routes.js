import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import MarketView from 'src/views/market/MarketView';
import GlobalTransactionsView from 'src/views/global_transactions/GlobalTransactionsView';
import OrdersView from 'src/views/orders/OrdersView';
import InventoryView from 'src/views/inventory/InventoryView';
import CheckoutView from 'src/views/checkout/CheckoutView';
import RequestsView from 'src/views/requests/RequestsView';
import CheckoutRequestView from 'src/views/checkoutreq/CheckoutRequestView';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
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
      { path: 'global_transactions', element: <GlobalTransactionsView /> },
      { path: 'inventory', element: <InventoryView /> },
      { path: 'market', element: <MarketView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'checkout', element: <CheckoutView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'requests', element: <RequestsView /> },
      { path: 'checkoutreq', element: <CheckoutRequestView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  
];

export default routes;
