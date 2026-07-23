import React, { useEffect, useState } from 'react';
import logo from '../../assets/Gemini_Generated_Image_rrpvi6rrpvi6rrpv.png';
import '../Auth/register.css'; // Importation du CSS
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

function Register() {

    const [client,setClient] = useState({})
    const { id } = useParams()

    useEffect(()=>{
        api.get(`/clients/${id}`).then((response)=>{
            console.log('it worked');
            setClient(response.data)
        })
    }, [id])


  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Obligatoire"),
    email: Yup.string().email("Email invalide").required("Obligatoire"),
    password: Yup.string().required("Obligatoire"),
    prenom: Yup.string().required("Obligatoire"),
    telephone: Yup.string().required("Obligatoire"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], "Les mots de passe ne correspondent pas")
      .required("Obligatoire")
  });

  const onSubmit = (data) => {
    api.post('/auth/register', data).then((response) => {
      console.log('it worked');
      window.location.reload();
    })
  };

  return (
    <div className="registerPage">
      <div className="registerCard">
        {/* En-tête : Logo + Titre */}
        <div className="logo-container">
          <img src={logo} alt="SwiftDelivery" className="register-logo" />
          <h2>Client</h2> {/* Orthographe fidèle à votre maquette */}
        </div>

        <Formik initialValues={client} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
          <Form>
            {/* Conteneur des deux colonnes */}
            <div className="form-columns">
              {/* Colonne Gauche */}
              <div className="form1-side">
                <div className="form-group">
                  <label htmlFor="Nom">Nom :</label>
                  <Field type="text" id="Nom" name="nom" placeholder="Entrez votre nom" />
                  <ErrorMessage name="nom" component="span" className="error-msg" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email :</label>
                  <Field type="email" id="email" name="email" placeholder="Entrez votre email" />
                  <ErrorMessage name="email" component="span" className="error-msg" />
                </div>

                
              </div>

              {/* Colonne Droite */}
              <div className="form2-side">
                <div className="form-group">
                  <label htmlFor="Prenom">Prenom :</label>
                  <Field type="text" id="Prenom" name="prenom" placeholder="Entrez votre prenom" />
                  <ErrorMessage name="prenom" component="span" className="error-msg" />
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Telephone :</label>
                  <Field type="tel" id="telephone" name="telephone" placeholder="Entrez votre telephone" />
                  <ErrorMessage name="telephone" component="span" className="error-msg" />
                </div>

                
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;