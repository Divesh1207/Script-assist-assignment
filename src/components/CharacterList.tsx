import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, Loader, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { fetchCharacters } from '../services/resourceService';
import '../styles/styling/CharacterList.scss';

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  url: string;
}

type SortKey = 'name' | 'height' | 'mass' | 'birth_year';
type SortOrder = 'asc' | 'desc';

const CharacterList = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const { data, isLoading, error } = useQuery(
    ['characters', page],
    () => fetchCharacters(page),
    { keepPreviousData: true }
  );
  console.log('data in',data)
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortByNumericValue = (a: Character, b: Character) => {
    const aValue = parseFloat(a[sortKey] || '0');
    const bValue = parseFloat(b[sortKey] || '0');
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  };

  const sortedCharacters = [...(data?.results || [])]
    .filter((character: Character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === 'name') {
        // Sorting alphabetically by name
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      // Sorting numerically for height, mass, birth_year
      return sortByNumericValue(a, b);
    });

  if (error) {
    return (
      <div className="character-list__error">
        <div className="error-container">
          <h3>Oops! Something went wrong</h3>
          <p>Failed to load characters. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="character-list">
      <div className="character-list__header">
        <h1>Star Wars Characters</h1>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="character-list__content">
        {isLoading ? (
          <div className="loading-container">
            <Loader className="spinner" size={40} />
            <p>Loading characters...</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="character-table">
                <thead>
                  <tr>
                    {['name', 'height', 'mass', 'birth_year'].map((key) => (
                      <th key={key} onClick={() => handleSort(key as SortKey)}>
                        {key[0].toUpperCase() + key.slice(1)}
                        <span className="sort-icons">
                          <ChevronUp
                            size={16}
                            className={sortKey === key && sortOrder === 'asc' ? 'active' : ''}
                          />
                          <ChevronDown
                            size={16}
                            className={sortKey === key && sortOrder === 'desc' ? 'active' : ''}
                          />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCharacters.map((character: Character) => (
                    <tr key={character.name} className="character-row">
                      <td>
                        <Link
                          to={`/character/${character.url.split('/').slice(-2, -1)[0]}`}
                          className="character-link"
                        >
                          {character.name}
                        </Link>
                      </td>
                      <td>{character.height} cm</td>
                      <td>{character.mass} kg</td>
                      <td>{character.birth_year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                className="pagination__button"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={!data?.previous}
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
              <span className="pagination__page">Page {page}</span>
              <button
                className="pagination__button"
                onClick={() => setPage((p) => p + 1)}
                disabled={!data?.next}
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
