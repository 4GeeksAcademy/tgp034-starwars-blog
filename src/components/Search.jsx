// src/components/Search.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchPeople, searchPlanets, searchVehicles } from '../api/StarWarsApi';

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);

  async function search(q) {
    if (!q) return [];
    const res = await Promise.all([
      searchPeople(q).then(data => data.result || []),
      searchPlanets(q).then(data => data.result || []),
      searchVehicles(q).then(data => data.result || [])
    ]);
    return res.flat();
  }

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!query) {
      setResults([]);
      return;
    }
    timeoutRef.current = setTimeout(() => {
      search(query).then(setResults);
    }, 300);
    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  useEffect(() => {
    setResults([]);
    setQuery('');
  }, [useLocation().pathname]);

  return (
    <div className="position-relative w-100" style={{ minWidth: 250 }}>
      <input
        type="text"
        className="form-control w-100"
        placeholder="Buscar personas, planetas, vehículos..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul
          className="list-group position-absolute w-100"
          style={{ zIndex: 1000, maxHeight: 300, overflowY: 'auto' }}
        >
          {results.map(item => (
            <li
              key={`${item.properties.name}-${item.uid}`}
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/details/${item.properties.name}`, { state: item.properties });
                setQuery('');
                setResults([]);
              }}
            >
              {item.properties.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
