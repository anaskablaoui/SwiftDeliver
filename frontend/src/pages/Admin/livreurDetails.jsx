import React, { useEffect, useState } from 'react';
import logo from '../../assets/Gemini_Generated_Image_rrpvi6rrpvi6rrpv.png';
import './newLivreur.css'; // Importation du CSS
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

function Register() {

  const {id} = useParams();

  const [livreur,setLivreur] = useState({})

  useEffect(()=>{
    api.get(`livreurs/${id}`).then((response)=>{
        const data = response.data;
        setLivreur({
          nom: data.User?.nom || '',
          prenom: data.User?.prenom || '',
          email: data.User?.email || '',
          telephone: data.User?.telephone || '',
          type_vehicule: data.type_vehicule || '',
          password: '',
          passwordConfirm: ''
        })
    })
  },[id])
  

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Obligatoire"),
    email: Yup.string().email("Email invalide").required("Obligatoire"),
    password: Yup.string(),
    prenom: Yup.string().required("Obligatoire"),
    telephone: Yup.string().required("Obligatoire"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], "Les mots de passe ne correspondent pas")
  });

  const onSubmit = (data) => {
    api.put(`/livreurs/${id}`, data).then((response) => {
      console.log('it worked');
      window.location.reload()
    })
  };

  return (
    <div className="registerPage">
      <div className="registerCard">
        {/* En-tête : Logo + Titre */}
        <div className="logo-container">
          <img src={logo} alt="SwiftDelivery" className="register-logo" />
          <h2>Livreur</h2> {/* Orthographe fidèle à votre maquette */}
        </div>

        <Formik initialValues={livreur} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
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
                
                <div className="form-group">
                  <label htmlFor="type_vehicule">Type de vehicule :</label>
                  <Field as="select" name="type_vehicule" id="type_vehicule">
                    <option value="" disabled>selectionner le type</option>
                    <option value="moto">Moto</option>
                    <option value="voiture">Voiture</option>
                    <option value="velo">Velo</option>
                  </Field>
                  <ErrorMessage name="type_vehicule" component="span" className="error-msg"/>
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

            {/* Bouton centré en bas */}
            <button type="submit" id="inscrire">s'inscrire</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;