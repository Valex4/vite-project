import { getGases,deleteGas } from "../api/gas.api"
import { useGas } from "../contexto/GasContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Table.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function TableDataGas() {
  const MySwal = withReactContent(Swal);
  const {gas,setGas}=useGas();
  const navigate = useNavigate();
  
  const handleDirection = () => {
    navigate("/registro")
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteGas(id);
      navigate("/")
      console.log("Lo esta eliminando")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    async function loadData(){
      const response= await getGases()
      setGas(response.data)
      console.log(response.data);
      let hola = JSON.stringify(response.data);
      console.log("data " + hola.split("/activa"))
    }
   
    loadData();
  }, [gas]);
  

  const renderMain = () => {
    return gas.map((g) => (
      <>
     
        <tbody>
          <tr key={g.id}>
            <td>{g.id}</td>
            <td>{g.nombre_gasolinera}</td>
            <td>{g.ubicacion}</td>
            <td>{g.activa.toString()}</td>
            <td>{g.total_gasolineras}</td>
            <td>{g.telefono}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(g.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
     
      </>
    ));
  };

if(gas.length === 0){
  return  (
<>
<h1>Gas station: </h1>
<a href="/registro" className="link">No gas stations find, Click here to create new</a>
</>  
  )
}else{
  return (
    
    <>
      <h1>Gas stations: </h1>
      <button className="registro" onClick={handleDirection}>Register New</button>
      <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>nombre_gasolinera</th>
            <th>ubicacion</th>
            <th>activa</th>
            <th>total_gasolineras</th>
            <th>telefono</th>
            <th>actions</th>
          </tr>
        </thead>
        {renderMain()}
       
      </table>
      </div>
    </>
  );
}
  
}
