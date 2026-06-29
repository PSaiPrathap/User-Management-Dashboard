import { useEffect, useState } from "react";
import "./index.css";

const FilterPopup = ({
  isOpen,
  filters,
  onApply,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    const resetFilters = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

    setLocalFilters(resetFilters);
    onApply(resetFilters);
  };

  return (
    <div className="filter-overlay">
      <div className="filter-modal">

        <h2>Filter Users</h2>

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={localFilters.firstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={localFilters.lastName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={localFilters.email}
          onChange={handleChange}
        />

        <label>Department</label>
        <select
          name="department"
          value={localFilters.department}
          onChange={handleChange}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
        </select>

        <div className="filter-buttons">
          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="apply-btn"
            onClick={() => {
              onApply(localFilters);
              onClose();
            }}
          >
            Apply
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterPopup;