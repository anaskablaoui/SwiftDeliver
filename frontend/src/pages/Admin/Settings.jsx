import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Settings.css'; // Importation du CSS
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function SystemConfig() {
  const initialValues = {
    tarifBase: "",
    tarifKm: ""
  };

  const validationSchema = Yup.object().shape({
    tarifBase: Yup.number().required("Obligatoire").positive("Doit être positive"),
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

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form>
                <div className="config-form-group">
                  <label htmlFor="base-tariff">tarif de base</label>
                  <Field type="text" id="base-tariff" name="tarifBase" placeholder="xx DHS" />
                  <ErrorMessage name="tarifBase" component="span" className="error-msg" />
                </div>

                <div className="config-form-group">
                  <label htmlFor="km-tariff">tarif par km</label>
                  <Field type="text" id="km-tariff" name="tarifKm" placeholder="xx DHS" />
                  <ErrorMessage name="tarifKm" component="span" className="error-msg" />
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