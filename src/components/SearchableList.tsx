import React, { useState, ChangeEvent } from 'react';

// Define the props interface for the SearchableList component
interface SearchableListProps {
  items: string[];
}

const SearchableList = ({ items }: SearchableListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Type the event parameter for the onChange handler
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchableList;
