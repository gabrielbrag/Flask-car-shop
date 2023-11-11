import { mountBrandsTable, mountModelsTable, mountVehiclesTable } from '../../../Controllers/Tables/entityTable';
import getBrands from '../../../Controllers/Brands/getBrands';
import getModels from '../../../Controllers/Models/getModels';
import getVehicles from '../../../Controllers/Vehicles/getVehicles';
import deleteBrand from '../../../Controllers/Brands/deleteBrand';
import deleteModel from '../../../Controllers/Models/deleteModel';
import deleteVehicle from '../../../Controllers/Vehicles/deleteVehicle';

jest.mock('../../../Controllers/Brands/getBrands');
jest.mock('../../../Controllers/Models/getModels');
jest.mock('../../../Controllers/Vehicles/getVehicles');
jest.mock('../../../Controllers/Brands/deleteBrand');
jest.mock('../../../Controllers/Models/deleteModel');
jest.mock('../../../Controllers/Vehicles/deleteVehicle');

const generateTest = (mountTableFunction, fetchFunction, deleteFunction, entityName) => {
    it(`should mount ${entityName} table`, async () => {
      fetchFunction.mockResolvedValue([{ id: 1, name: `${entityName}1` }]);
      deleteFunction.mockResolvedValue(true);
  
      const result = await mountTableFunction();

        expect(result.columns).toEqual(expect.arrayContaining([
            expect.objectContaining({ Header: 'Nome', accessor: 'nome' }),
            expect.objectContaining({ Header: 'Ações', accessor: 'id' })
        ]));

        expect(result.data).toEqual([{ id: 1, nome: `${entityName}1` }]);
    });
  };
  
  describe('EntityTable', () => {
    generateTest(mountBrandsTable, getBrands, deleteBrand, 'brands');
    generateTest(mountModelsTable, getModels, deleteModel, 'models');
    generateTest(mountVehiclesTable, getVehicles, deleteVehicle, 'vehicles');
  });