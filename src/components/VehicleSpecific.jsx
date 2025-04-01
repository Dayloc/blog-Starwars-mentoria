import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

function VehicleSpecific() {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();

  const { vehicle } = store;
  console.log("vehicle :", vehicle);

  useEffect(() => {
    if (id) {
      getSpecificVehicle(dispatch, id);
    }
    return () => {
      // Limpiar al desmontar
      dispatch({ type: "RESET_SPECIFIC_VEHICLE" });
    };
  }, [dispatch, id]);

  console.log("id :", id);
  return <div>especifico de vehiculo</div>;
}

export default VehicleSpecific;
