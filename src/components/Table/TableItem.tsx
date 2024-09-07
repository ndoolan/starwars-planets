/**
 * **************************************************
 *
 * @module TableItem
 *
 * @description
 * TableItem renders the individual rows in our Table
 * component. Attributes currently only set to handle
 * specific planet properties
 *
 * **************************************************
 */

export interface TableItemProps {
  name: string;
  population: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  surface_water: string;
  // Avoiding Filtering - keeping extra data
}

const TableItem = ({
  name,
  population,
  rotation_period,
  orbital_period,
  diameter,
  climate,
  surface_water,
}: TableItemProps): JSX.Element => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{population}</td>
        <td>{rotation_period}</td>
        <td>{orbital_period}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{surface_water}</td>
      </tr>
    </>
  );
};

export default TableItem;
