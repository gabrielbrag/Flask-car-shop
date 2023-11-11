import { Link } from 'react-router-dom';

export const Sidebar = ({ open }) => {
  return (
    <nav className="sidebar" data-state={open ? 'open' : 'closed'}>

      <div className="items-container ms-1">
        <Link to="/admin/brands"><i className="fas fa-flag"></i> Marcas</Link><hr />
        <Link to="/admin/models"><i className="fas fa-car"></i> Modelos</Link><hr />
        <Link to="/admin/vehicles"><i className="fas fa-check-circle"></i> Estoque</Link><hr />
      </div>

    </nav>
  )
}
