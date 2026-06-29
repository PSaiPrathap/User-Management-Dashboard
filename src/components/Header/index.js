import "./index.css";

const Header = ({ onAddUser }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">UM</div>

        <div>
          <h1>User Management Dashboard</h1>
          <p>Manage users efficiently</p>
        </div>
      </div>

      <button
        className="add-user-btn"
        onClick={onAddUser}
      >
        + Add User
      </button>
    </header>
  );
};

export default Header;