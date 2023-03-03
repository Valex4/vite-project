import { Formik, Form } from "formik";
import { useGas } from "../contexto/GasContext";
import { registerGas } from "../api/gas.api";
import { useNavigate } from "react-router-dom";

export default function FormRegisterGas() {
  const { gas } = useGas();
 const navigate=useNavigate();

  return (
    <div>
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
            navigate("/")

          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="activa"
              placeholder="Write a active"
              onChange={handleChange}
             
            />

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

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving.." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
