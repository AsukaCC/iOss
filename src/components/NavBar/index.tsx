import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import styles from './index.module.css';

// 导航栏组件
const NavBar = () => {
  const navItems = [
    {
      icon: '#icon-shouye',
      label: '仪表盘',
      path: '/dashboard',
    },
    {
      icon: '#icon-weibiaoti--',
      label: '文件管理',
      path: '/file-manage',
    },
    {
      icon: '#icon-cunchu',
      label: '存储管理',
      path: '/storage-manage',
    },
  ];

  return (
    <aside className={styles['left-sidebar']}>
      {/* <div className={styles['logo-container']}>
        <span>IOSS</span>
      </div> */}

      <nav className={styles['nav-menu']} aria-label="主导航">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `${styles['nav-item']} ${
                isActive ? styles['nav-item-active'] : ''
              }`
            }
            aria-label={item.label}
            title={item.label}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={item.icon}></use>
            </svg>
          </NavLink>
        ))}
      </nav>

      <div className={styles['bottom-menu']}>
        {/* 主题切换 */}
        <ThemeToggle variant="nav-item" className={styles['nav-item']} />
        {/* 设置 */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles['nav-item']} ${isActive ? styles['nav-item-active'] : ''}`
          }
          aria-label="设置"
          title="设置">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-shezhi"></use>
          </svg>
        </NavLink>
        {/* <div
          className={styles['user-avatar']}
          aria-label="用户头像"
          title="用户"
          role="button"
          tabIndex={0}>
          U
        </div> */}
      </div>
    </aside>
  );
};

export default NavBar;
