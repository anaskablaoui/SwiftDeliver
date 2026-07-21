import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./NewOrder.css"; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {useEffect,useState} from 'react'

function NewOrder() {

  const [listOfLivreur,setListOfLivreur] = useState([])
  useEffect(()=>{
    console.log(sessionStorage.getItem('accesstoken'))
    axios.get("http://localhost:3000/api/livreurs",{
      headers:{
        accessToken:sessionStorage.getItem('accesstoken')
      }
    }) . then((response) =>{
      setListOfLivreur(response.data)
    })
  },[])

    let { id } = useParams();
    
    const [Order,setListOfOrders]= useState({})
   useEffect(() => {
    axios.get(`http://localhost:3000/api/commandes/${id}`,{
      headers:{
        accessToken:sessionStorage.getItem('accesstoken')
      }
    })
        .then((response) => {
            console.log(response.data);
            console.log(Array.isArray(response.data));
            setListOfOrders(response.data);
        });
}, []);
  
  const validationSchema = Yup.object().shape({
    type_commande: Yup.string().required("Obligatoire"),
    nom_retrait: Yup.string().required("Obligatoire"),
    adresse_retrait: Yup.string().required("Obligatoire"),
    telephone_retrait: Yup.string().required("Obligatoire"),
    nom_livraison: Yup.string().required("Obligatoire"),
    adresse_livraison: Yup.string().required("Obligatoire"),
    telephone_livraison: Yup.string().required("Obligatoire"),
    distanceKM: Yup.number().required("Obligatoire").positive("Doit être positive"),
    instructionSpecial: Yup.string().required("Obligatoire")
  });

  const onSubmit = (data) => {
    axios.patch(`http://localhost:3000/api/commandes/${id}/assigner`, data,{
      headers:{
        accessToken:sessionStorage.getItem('accesstoken')
      }
    }).then((response) => {
      console.log('it worked');
      window.location.reload();
    })
  };

  
  return (
    <div className="dashboard-layout">
      
      <Sidebar role="admin" />
      
      <div className="main-window">
        
        
        <main className="NewOrderContent">
          <Formik initialValues={Order} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
            <Form className="order-form">
              <h1>{id}</h1>
              {/* 1. INFORMATION GENERALE */}
              <div className="section-full-width general-info">
                <div className="info-row">
                  <h3>Information general</h3>
                  <div className="inline-field">
                    <label htmlFor="type">type de livraison</label>
                    <div className="input-with-error">
                      <Field as="select" name="type_commande" id="type" >
                        <option value="" disabled>selectionner le type</option>
                        <option value="restaurant">restaurant</option>
                        <option value="pharmacie">pharmacie</option>
                        <option value="colis">colis</option>
                        <option value="courses">courses</option>
                      </Field>
                      <ErrorMessage name="type_commande" component="span" className="error-msg"/>
                    </div>
                  </div>
                  <button type="submit" className="btn-validate">valider</button>
                </div>
              </div>

              {/* 2. GRILLE DE COLONNES (Retrait vs Dépôt) */}
              <div className="form-grid-columns">
                
                {/* Colonne Gauche : Point de retrait + Distance */}
                <div className="grid-column">
                  <div className="container-box">
                    <h3>Point de retrait</h3>
                    
                    <div className="form-group-row">
                      <label htmlFor="nomR">Nom du contact</label>
                      <div className="input-with-error">
                        <Field id="nomR" name="nom_retrait" placeholder="saisir le nom" />
                        <ErrorMessage name="nom_retrait" component="span" className="error-msg"/>
                      </div>
                    </div>
                    
                    <div className="form-group-row">
                      <label htmlFor="adresseR">adresse</label>
                      <div className="input-with-error">
                        <Field as="textarea" id="adresseR" name="adresse_retrait" placeholder="saisir adresse" />
                        <ErrorMessage name="adresse_retrait" component="span" className="error-msg"/>
                      </div>
                    </div>
                    
                    <div className="form-group-row">
                      <label htmlFor="telephoneR">telephone</label>
                      <div className="input-with-error">
                        <Field id="telephoneR" name="telephone_retrait" placeholder="06/07 ********" />
                        <ErrorMessage name="telephone_retrait" component="span" className="error-msg"/>
                      </div>
                    </div>
                  </div>

                  <div className="container-box details-box">
                    <h3>details</h3>
                    <div className="form-group-row">
                      <label htmlFor="distance">Distance</label>
                      <div className="input-with-error">
                        <Field type="number" id="distance" name="distanceKM" placeholder="xx KM" />
                        <ErrorMessage name="distanceKM" component="span" className="error-msg"/>
                      </div>

                      <label htmlFor="livreur">Livreur</label>
                      <div className="livreur">
                        <Field as="select" id="livreur" name="livreur" >
                          <option value="" disabled selected>selectionner livreur</option>
                          {listOfLivreur.map((order,index)=>(
                             <option value={order.id}>{order.User.nom} {order.User.prenom}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="livreur" component="span" className="error-msg"/>
        
                      </div>
                    </div>
                  </div>
                  
                </div>

                {/* Colonne Droite : Point de dépôt + Informations */}
                <div className="grid-column">
                  <div className="container-box">
                    <h3>Point de dépôt</h3>
                    
                    <div className="form-group-row">
                      <label htmlFor="nomL">Nom du contact</label>
                      <div className="input-with-error">
                        <Field id="nomL" name="nom_livraison" placeholder="saisir le nom" />
                        <ErrorMessage name="nom_livraison" component="span" className="error-msg"/>
                      </div>
                    </div>
                    
                    <div className="form-group-row">
                      <label htmlFor="adresseL">adresse</label>
                      <div className="input-with-error">
                        <Field as="textarea" id="adresseL" name="adresse_livraison" placeholder="saisir adresse" />
                        <ErrorMessage name="adresse_livraison" component="span" className="error-msg"/>
                      </div>
                    </div>
                    
                    <div className="form-group-row">
                      <label htmlFor="telephoneL">telephone</label>
                      <div className="input-with-error">
                        <Field id="telephoneL" name="telephone_livraison" placeholder="06/07 ********" />
                        <ErrorMessage name="telephone_livraison" component="span" className="error-msg"/>
                      </div>
                    </div>
                  </div>

                  <div className="container-box details-box">
                    <div className="form-group-row alignment-fix">
                      <label htmlFor="informations">informations</label>
                      <div className="input-with-error">
                        <Field as="textarea" id="informations" name="instructionSpecial" placeholder="saisir des details pour le livreur" />
                        <ErrorMessage name="instructionSpecial" component="span" className="error-msg"/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Form>
          </Formik>
        </main>
      </div>
    </div>
  );
}

export default NewOrder;