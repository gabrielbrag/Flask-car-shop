import { Link } from 'react-router-dom';

const tableMounter = (data, deleteFunction) => {
  const handleDelete = (value, deleteFunction) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      deleteFunction(value).then(() => {
        window.location.reload();
      });
    }
  }

  if (!data || data.length === 0) {
    return { columns: [], data: [] };
  }

  //Don't create columns for id
  const columns = Object.keys(data[0]).filter(key => (key !== 'id' && !key.includes("_id")))
                          .map(key => ({
                            Header: key.charAt(0).toUpperCase() + key.slice(1),
                            accessor: key,
  }));

  if(columns.length > 0) {
    columns.push({
      Header: 'Ações',
      accessor: 'id',
      Cell: ({ value }) => (
        <div className='ms-auto'>
          <Link to={`update/${value}`}><i className="fas fa-edit me-3"></i></Link>
          <i style={{ cursor: 'pointer' }} className="fas fa-trash" onClick={() => handleDelete(value, deleteFunction)}></i>
        </div>
      ),
    });
  }


  return { columns, data };
}

export default tableMounter;