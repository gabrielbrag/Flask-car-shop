import getVehicles from "../Vehicles/getVehicles";



const getVehiclesTableValues = async () => {
    let columns_to_return_in_table = ["id",
                                "fuel_type_formatted", 
                                "mileage_formatted", 
                                "model_name", 
                                "model_year", 
                                "sale_value",
                                "sale_value_formatted",
                                "transmission_formatted"]

    const vehicles = await getVehicles();

    //remove from vehicles properties that are not in the array columns_to_return_in_table
    vehicles.forEach(vehicle => {
        for (const property in vehicle) {
            if (!columns_to_return_in_table.includes(property)) {
                delete vehicle[property];
            }
        }
    });

    return vehicles;
}

export default getVehiclesTableValues;