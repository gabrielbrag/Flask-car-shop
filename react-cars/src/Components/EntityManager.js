import React, { useState, useEffect } from 'react';
import AdminMasterPage from './AdminMasterPage';
import SelectionTables from './SelectionTables';
import { mountBrandsTable, mountModelsTable, mountVehiclesTable } from '../Controllers/Tables/entityTable';

const EntityManager = (mountTableFunction, type) => {
  return function TableComponent() {
    const [table, setTable] = useState(null);

    useEffect(() => {
      mountTableFunction().then(table => {
        setTable(table);
      }).catch(error => {
        console.error(error);
      });
    }, []);

    if (!table) {
      return null;
    }

    const { columns, data } = table;

    return (
      <AdminMasterPage>
        <SelectionTables columns={columns} data={data} type={type} />
      </AdminMasterPage>
    );
  }
}

export const BrandList = EntityManager(mountBrandsTable, "brands");
export const ModelList = EntityManager(mountModelsTable, "models");
export const VehiclesList = EntityManager(mountVehiclesTable, "vehicles");
