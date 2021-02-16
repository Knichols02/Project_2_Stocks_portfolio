import './App.css';
import { useState } from 'react';

const SearchForm = ({searchStock}) => {
  const [searchString, setSearchString] = useState("");


  const handleSearchChange = (ev) => setSearchString(ev.target.value);
  

  const handleSubmit = ev => {
    ev.preventDefault();
    searchStock({
        searchString: searchString,
    });
    setSearchString("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-group">
        <input 
          type="text" 
          id="search_string" 
          name="search_string" 
          placeholder="Enter search string"
          onChange={handleSearchChange}
        />
        
        <input 
            className="btn" 
            type="submit" 
            name="submit" 
            value="search"
        />
      </div>
        
    </form>
  )
};

export default SearchForm;