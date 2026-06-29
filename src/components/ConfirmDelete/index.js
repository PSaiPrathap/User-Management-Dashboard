import "./index.css";

const ConfirmDelete = ({
  isOpen,
  user,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete
          <strong> {user?.firstName} {user?.lastName}</strong>?
        </p>

        <div className="delete-buttons">

          <button
            className="cancel-delete"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmDelete;