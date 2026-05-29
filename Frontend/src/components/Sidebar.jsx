import { NAV_ITEMS } from "../constants";

export default function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">▶</div>
        <span>CineStream</span>
      </div>

      <nav className="nav-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item${activeView === item.id ? " active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">M</div>
        <div className="user-info">
          <div className="user-name">Movie Lover</div>
          <div className="user-sub">Discover. Watch. Enjoy.</div>
        </div>
      </div>
    </aside>
  );
}
