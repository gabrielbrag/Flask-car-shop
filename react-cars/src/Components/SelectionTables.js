import React from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import { useBreakpoint } from '../hooks/UseBreakpoint';

function SelectionTables({ columns, data, type }) {
  const breakpoint = useBreakpoint()

  // Create an instance of the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex },
    allColumns
  } = useTable({ columns, data }, usePagination);

  React.useEffect(() => {
    if (type !== 'vehicles') return

    if (!allColumns || allColumns.length < 5) {
      console.error('allColumns is not defined or does not have enough elements');
      return;
    }

    if (breakpoint === 'sm') {
      allColumns[0].toggleHidden(true)
      allColumns[2].toggleHidden(true)
      allColumns[4].toggleHidden(true)
    } else {
      allColumns[0].toggleHidden(false)
      allColumns[2].toggleHidden(false)
      allColumns[4].toggleHidden(false)
    }
  }, [breakpoint, allColumns, type])

  // Render the table
  return (
    <div>
      <div className='table-insert'><Link className='ms-auto' to="insert"><button className='btn'>Inserir</button></Link></div>
      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <button className='btn' onClick={() => previousPage()} disabled={!canPreviousPage}>
          Anterior
        </button>
        <div className='page'>
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageCount}
            </strong>{' '}
          </span>
        </div>
        <button className='btn' onClick={() => nextPage()} disabled={!canNextPage}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default SelectionTables;
