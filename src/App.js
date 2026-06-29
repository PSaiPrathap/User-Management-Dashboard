import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "./services/api";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";
import FilterPopup from "./components/FilterPopup";
import Pagination from "./components/Pagination";


function App() {

  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // const [sortField, setSortField] = useState("firstName");
  // const [sortOrder, setSortOrder] = useState("asc");
  
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserData, setDeleteUserData] = useState(null);

  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users
  .filter((user) => {
    const query = searchQuery.toLowerCase();

    const searchMatch =
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);

    const filterMatch =
      user.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase()) &&
      user.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase()) &&
      user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase()) &&
      (filters.department === "" ||
        user.department === filters.department);

    return searchMatch && filterMatch;
  })
  .sort((a, b) => {
    if (sortField === "id") {
      return sortOrder === "asc"
        ? a.id - b.id
        : b.id - a.id;
    }

    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();

    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
  // .sort((a, b) => {
  //   const valueA = a[sortField].toLowerCase();
  //   const valueB = b[sortField].toLowerCase();

  //   return sortOrder === "asc"
  //     ? valueA.localeCompare(valueB)
  //     : valueB.localeCompare(valueA);
  // });


  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const visibleUsers = filteredUsers.slice(startIndex, endIndex);


  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleSave = async (userData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, userData);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, ...userData }
              : user
          )
        );
      } else {
        const response = await addUser(userData);

        const newUser = {
          id: users.length + 1,
          ...response.data,
        };

        setUsers([newUser, ...users]);
      }

      setIsFormOpen(false);
      setSelectedUser(null);
    } catch {
      alert("Failed to save user.");
    }
  };

  // const handleEdit = (user) => {
  //   alert(`Edit User: ${user.firstName}`);
  // };

  const handleDelete = (user) => {
    setDeleteUserData(user);
    setDeleteModal(true);
  };

  // const handleDelete = (user) => {
  //   alert(`Delete User: ${user.firstName}`);
  // };

  const confirmDelete = async () => {

    try{
      await deleteUser(deleteUserData.id);
      setUsers((prevUsers)=>
        prevUsers.filter(
          (user)=>user.id!==deleteUserData.id
        )
      );
      setDeleteModal(false);
      setDeleteUserData(null);
    }
    catch{
      alert("Unable to delete user.");
    }
  };


  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers=async()=>{

    try{

      const response=await getUsers();

      const departments=[
      "IT",
      "Engineering",
      "Sales",
      "Finance",
      "HR",
      "Marketing"
      ];

      const mapped=response.data.map((user,index)=>{

        const names=user.name.split(" ");

        return{
          id:user.id,
          firstName:names[0],
          lastName:names.slice(1).join(" "),
          email:user.email,
          department:departments[index%departments.length]
        };

      });

      setUsers(mapped);

    }catch{
      setError("Unable to fetch users.");
    }

    finally{
      setLoading(false);
    }

  };


  return (
    <div>
      <Header
        onAddUser={() => {
          setSelectedUser(null);
          setIsFormOpen(true);
        }}
      />
      {/* <Header onAddUser={() => alert("Add User")} /> */}

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenFilter={() => setFilterOpen(true)}
        // onOpenFilter={() => alert("Filter Popup")}
      />

      {loading && <h2 align="center">Loading...</h2>}

      {error && <h2 align="center">{error}</h2>}

      {!loading && !error && (
        <UserTable
          users={visibleUsers}
          // users={filteredUsers}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        // <pre>{JSON.stringify(filteredUsers, null, 2)}</pre>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
      />

      <UserForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          selectedUser={selectedUser}
      />
      <ConfirmDelete
        isOpen={deleteModal}
        user={deleteUserData}
        onCancel={()=>{
            setDeleteModal(false);
            setDeleteUserData(null);
        }}
        onConfirm={confirmDelete}
      />
      <FilterPopup
        isOpen={filterOpen}
        filters={filters}
        onApply={setFilters}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );

}

export default App;
