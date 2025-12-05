import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import StorageManage from './pages/StorageManage';
import FileManage from './pages/FileManage';
import FileDetail from './pages/FileManage/FileDetail';

// 布局组件
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content-wrapper">{children}</div>
    </div>
  );
};

// 应用主组件
function App() {
  const routes = [
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/file-manage',
      element: <FileManage />,
    },
    {
      path: '/file-manage/detail/:id',
      element: <FileDetail />,
    },
    {
      path: '/storage-manage',
      element: <StorageManage />,
    },
  ];

  routes.forEach((route) => {
    <Route path={route.path} element={<Layout>{route.element}</Layout>} />;
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
