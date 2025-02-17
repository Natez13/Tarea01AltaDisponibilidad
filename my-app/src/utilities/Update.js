import React, { useState, useEffect } from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import {useAuth0} from "@auth0/auth0-react";


export default function Update(props) {
  console.log(props.data[0]);
  const [Reload, setReload] = useState(1)
  const { isAuthenticated,user} = useAuth0();
  const [message, setMessage] = useState('');

  console.log(user);

  const  UpdateReview = async (user, correo, id, texto) => {
    const Data = JSON.stringify({
      user: user,
      correo: correo,
      idProd: id,
      texto:texto,
      calificacion:0
    })
    console.log(Data);
    if (texto == '') {
      alert('Reseña no puede estar vacio');
    }
    else
    {
      await fetch('http://localhost:5000/updatereseneas', {
        method: 'PUT',
        body: Data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        
        })
        .then((response) => response.json())
      .then((data) => {
          console.log(data);
      })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload(false);
    }
    
      
  }
  

  const handleChange = event => {
    setMessage(event.target.value);
  }
  return (
    <>
    <section>
      <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8" xl="6">
            <MDBCard>
              <MDBCardBody className="p-4">
                <div className="d-flex flex-start w-100">

                  <div className="w-100">
                    <MDBTypography tag="h5">Actualizar Reseña</MDBTypography>
                    <div>
                    </div>
                    <MDBTextArea label="Cual es tu reseña?" rows={4} id='TextReview' type='text' onChange={handleChange} value={message}/>

                    <div className="d-flex justify-content-between mt-3">
                      <MDBBtn color="success" onClick={() => {UpdateReview(user.name,user.email,props.data[0].idProd,message)}}>
                        Actualizar <MDBIcon fas icon="long-arrow-alt-right ms-1" />
                      </MDBBtn>       
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}