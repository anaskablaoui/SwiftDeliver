import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Settings.css'; // Importation du CSS
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import {useEffect,useState} from 'react'

function SystemConfig() {
  const [setting, setSetting] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:3000/api/settings',{
      headers:{
        accessToken:sessionStorage.getItem('accesstoken')
      }
    }).then((response)=>{
      console.log(response.data);
      console.log(Array.isArray(response.data));
      setSetting(response.data)
    })
  }, []);

  const validationSchema = Yup.object().shape({
    prixbase: Yup.number().required("Obligatoire").positive("Doit être positive"),
    tarifKm: Yup.number().required("Obligatoire").positive("Doit être positive")
  });

  const onSubmit = (data) => {
    axios.put('http://localhost:3000/api/settings', data).then((response) => {
      console.log('it worked');
      window.location.reload();
    })
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar configurée pour l'admin */}
      <Sidebar role="admin" />

      <div className="main-window">
        <Header />

        <main className="config-content">
          <div className="config-card">
            <h2>Configuration systeme</h2>

            <Formik initialValues={setting} enableReinitialize onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form>
                <div className="config-form-group">
                  <label htmlFor="base-tariff">tarif de base</label>
                  <Field type="number" id="prixbase" name="prixbase" placeholder="xx DHS" />
                  <ErrorMessage name="prixbase" component="span" className="error-msg" />
                </div>

                <div className="config-form-group">
                  <label htmlFor="km-tariff">tarif par km</label>
                  <Field type="text" id="tarifkm" name="tarifKm" placeholder="xx DHS" />
                  <ErrorMessage name="tarifKm" component="span" className="error-msg" />
                </div>

                <div className="config-form-group">
                  <label htmlFor="fraisLivreur">frais de livreur</label>
                  <Field type="text" id="fraisLivreur" name="fraisLivreur" placeholder="xx DHS" />
                  <ErrorMessage name="fraisLivreur" component="span" className="error-msg" />
                </div>

                <div className="config-btn-container">
                  <button type="submit" className="btn-validate">valider</button>
                </div>
              </Form>
            </Formik>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SystemConfig;