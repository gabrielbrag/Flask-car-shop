//@ts-ignore
import tableMounter from "./tableMounter";
import translateKeys from "../translateKeys";
import getBrands from "../Brands/getBrands";
import getModels from "../Models/getModels";
import deleteBrand from "../Brands/deleteBrand";
import deleteModel from "../Models/deleteModel";
import getVehiclesTableValues from "./getVehiclesTableValues";
import deleteVehicle from "../Vehicles/deleteVehicle";

const mountTable = async (fetchFunction, deleteFunction) => {
  try {
    const items = await fetchFunction();
    const translatedItems = items.map(translateKeys);
    let table = tableMounter(translatedItems, deleteFunction);
    return table;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const mountBrandsTable = () => mountTable(getBrands, deleteBrand);
export const mountModelsTable = () => mountTable(getModels, deleteModel);
export const mountVehiclesTable = () => mountTable(getVehiclesTableValues, deleteVehicle);
