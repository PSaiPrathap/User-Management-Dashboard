import "./index.css";
import UserRow from "../UserRow";

const UserTable = ({
  users,
  sortField,
  sortOrder,
  handleSort,
  onEdit,
  onDelete,
}) => {
  const getSortIcon = (field) => {
    if (sortField !== field) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>

            <th onClick={() => handleSort("firstName")}>
              First Name{getSortIcon("firstName")}
            </th>

            <th onClick={() => handleSort("lastName")}>
              Last Name{getSortIcon("lastName")}
            </th>

            <th onClick={() => handleSort("email")}>
              Email{getSortIcon("email")}
            </th>

            <th onClick={() => handleSort("department")}>
              Department{getSortIcon("department")}
            </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No Users Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;