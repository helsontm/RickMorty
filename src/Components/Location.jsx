import axios from "axios";
import { useState, useEffect } from "react";
import ResidentInfo from "./ResidentInfo";

const Location=()=>{
    const [rickLocation, setrickLocation] = useState({});
    const [searchId, setSearchId] = useState("");
    
  
    useEffect(() => {
      //numero random 
      const randomId = Math.floor(Math.random() * 126 + 1);
  
      axios
        .get(`https://rickandmortyapi.com/api/location/${randomId}`)
        .then((resp) => {
          setrickLocation(resp.data);
        })
        .catch((error) => console.error(error));
    }, []);
  
    
  
    const submit = (e) => {
      //Un metodo que impide el comportamiento predeterminado del evento
      e.preventDefault();
  
      axios
        .get(`https://rickandmortyapi.com/api/location/${searchId}`)
        .then((resp) => {
          console.log(resp.data);
          setrickLocation(resp.data);
        })
        .catch((error) => console.error(error));
    };
  
   
  //paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const rickPerPage = 8;
    
  
  
    const lastIndex = rickPerPage * currentPage; //uno mas
    const firstIndex = lastIndex - rickPerPage;
  
    const rickPaginated = rickLocation.residents?.slice(firstIndex, lastIndex);
  
    const totalPages = Math.ceil(rickLocation.residents?.length / rickPerPage);
   
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    
    let counter=0;
    for (let clave in rickLocation.residents){
     counter=Number(clave)+1;
    }     





    return(
<>

<section className='header'>
      <img src='/logo.svg' className='logo'></img>
      <div className="location">
      <h1>Nombre: {rickLocation.name}</h1>
      <h1>Tipo: {rickLocation.type}</h1>
      <h1> Dimension: {rickLocation.dimension}</h1>
      <h1>Poblacion:{counter} </h1>
      </div>
     </section >
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          placeholder="Ingresa el id del tipo"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar 🔍</button>
      </form>
      {/*
              <button
              onClick={searchType}
              >
              Buscar
              </button>
              */}

   
      <section>
      <ul>
        {rickPaginated?.map((rick) => (
          
          <ResidentInfo key={rick
          } url={rick
          } />
            
        )) }
       
      </ul>
        </section>

        <section>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {pages.map((num) => (
        <button key={num} onClick={() => setCurrentPage(num)}>
          {num}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
      </section>

</>


    )


}
export default Location;