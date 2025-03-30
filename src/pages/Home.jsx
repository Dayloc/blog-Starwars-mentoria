import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Characters from "./Characters.jsx";
import Planets from "./Planets.jsx";
import Vehicles from "./Vehicles.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();


  return (
    <div className="text-center mt-5">
      <h1>Star-Wars</h1>
      <div>
        <Characters />
      </div>
      <div>
        <Planets />
      </div>
      <div>
        <Vehicles />
      </div>
    </div>
  );
};
