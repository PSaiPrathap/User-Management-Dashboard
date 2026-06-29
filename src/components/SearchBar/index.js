import "./index.css";
import { FaSearch, FaFilter } from "react-icons/fa";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onOpenFilter,
}) => {
  return (
    <div className="search-container">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by First Name, Last Name or Email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        className="filter-btn"
        onClick={onOpenFilter}
      >
        <FaFilter />
        Filter
      </button>
    </div>
  );
};

export default SearchBar;