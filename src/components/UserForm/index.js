import { useEffect, useState } from "react";
import "./index.css";

const UserForm = ({
  isOpen,
  onClose,
  onSave,
  selectedUser,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "IT",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "IT",
      });
    }

    setErrors({});
  }, [selectedUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let validationErrors = {};

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      validationErrors.email = "Invalid Email";
    }

    if (!formData.department.trim()) {
      validationErrors.department = "Department is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {selectedUser ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          {errors.firstName && (
            <small>{errors.firstName}</small>
          )}

          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          {errors.lastName && (
            <small>{errors.lastName}</small>
          )}

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <small>{errors.email}</small>
          )}

          <label>Department</label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option>IT</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>Finance</option>
            <option>HR</option>
            <option>Marketing</option>
          </select>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default UserForm;