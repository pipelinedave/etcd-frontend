import React from 'react';

type SearchBarProps = {
    onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
