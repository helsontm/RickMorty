import './App.css'
import axios from "axios";
import { useState, useEffect } from "react";
import Location from './Components/Location';

/*
- Traer una ubicación 
  Consumir el endpoint de las ubicaciones de Rick and Morty, hacer la funcionalidad para que al cargar la página, traiga una ubicación aleatoria, y mostrar el nombre de dicha ubicación

- Añadir un input que permita que el usuario pueda buscar el id de una ubicación en específico

-Iterar sobre el arreglo de url de los personajes que pertenecen a la ubicación mostrada

*/

function App() {
 
 
  
  return (
    <>
      {/*<InputControlled/>*/}
     <Location/>
    </>
  );
}

export default App;

/*
  Hacer el mismo ejercicio anterior, pero a través de otro componente.

  Crear un componente llamado “Character”, que reciba la url del personaje por props y la muestre.

  Remover del map la url, y en su lugar mostrar dicho componente. Pasarle la url por props.

  
  -> Consumir la url en el componente Character, y mostrar el nombre y la imagen del mismo
*/
