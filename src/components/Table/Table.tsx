/**
 * **************************************************
 *
 * @module Table
 *
 * @description
 * Renders a 10 x 7 Table for the selected planet
 * data, update itemsPerPage to adjust rows
 *
 * **************************************************
 */

import { useState } from 'react';
import './Table.scss';
import TableItem from './TableItem';

interface TableProps {
  [key: string]: any;
}

// interface PlanetData {}

const Table = ({ planets }: TableProps): JSX.Element => {
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // slice planets array based off first + last index of current page
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = planets.slice(indexFirstItem, indexLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!planets) return <h1>Not ready</h1>;

  return (
    <div>
      <h1>Table</h1>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Population</td>
            <td>Rotation Period</td>
            <td>Orbital Period</td>
            <td>Diameter</td>
            <td>Climate</td>
            <td>Surface Water</td>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((planet: any) => {
            return (
              <TableItem
                key={planet.name}
                name={planet.name}
                population={planet.population}
                rotation_period={planet.rotation_period}
                orbital_period={planet.orbital_period}
                diameter={planet.diameter}
                climate={planet.climate}
                surface_water={planet.surface_water}
              />
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={indexFirstItem === 0}
        >
          Previous Page
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexLastItem >= planets.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Table;
