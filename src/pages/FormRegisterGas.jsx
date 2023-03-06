import { Formik, Form } from "formik";
import { useGas } from "../contexto/GasContext";
import { registerGas } from "../api/gas.api";
import { useNavigate } from "react-router-dom";
import "../assets/styles/RegisterCursos.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default function FormRegisterGas() {
  const MySwal = withReactContent(Swal);
  const { gas } = useGas();
 const navigate=useNavigate();

  return (
    <div className="container">
      <Formik
        initialValues={{
          nombre_gasolinera: "",
          ubicacion: "",
          activa: true,
          total_gasolineras:1,
          telefono: ""
        }}
        onSubmit={async (values, actions) => {
          try {
            const response = await registerGas(values);
            console.log(values);
            actions.resetForm();
            let timerInterval
            Swal.fire({
              title: 'Registrando en la base de datos!',
              html: 'registrando en <b></b> milliseconds.',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Agregado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            navigate("/")

          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="container-login">
            <label>Name Gas: </label>
            <input
              type="text"
              name="nombre_gasolinera"
              placeholder="Write a Name"
              onChange={handleChange}
              
            />
            <label>phone: </label>
            <input
              type="text"
              name="telefono"
              placeholder="Write a phone"
              onChange={handleChange}
              
            />

            <label>Active: </label>
            <select name="activa" className="select" onChange={handleChange}>
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
            </select>

            <label>Ubication: </label>
            <input
              type="text"
              name="ubicacion"
              placeholder="Write a Name"
              onChange={handleChange}
             
            />

            <label>total gas: </label>
            <input
              type="text"
              name="total_gasolineras"
              placeholder="Write a total gas"
              onChange={handleChange}
            
            />
              <div className="btn-login">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving.." : "Save"}
            </button>
            </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
