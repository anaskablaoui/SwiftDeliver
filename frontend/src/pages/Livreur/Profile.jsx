import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Profile.css'; // Importation du CSS
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function Profile() {
  const passwordInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };

  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Obligatoire"),
    newPassword: Yup.string().required("Obligatoire"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], "Les mots de passe ne correspondent pas")
      .required("Obligatoire")
  });

  const onPasswordSubmit = (data) => {
    axios.put('http://localhost:3000/api/auth/password', data).then((response) => {
      console.log('it worked');
      window.location.reload();
    })
  };

  const infoInitialValues = {
    telephone: "",
    email: "",
    photo: null
  };

  const infoValidationSchema = Yup.object().shape({
    telephone: Yup.string().required("Obligatoire"),
    email: Yup.string().email("Email invalide").required("Obligatoire")
  });

  const onInfoSubmit = (data) => {
    axios.put('http://localhost:3000/api/auth/me', data).then((response) => {
      console.log('it worked');
      window.location.reload();
    })
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar & Header intégrés globalement */}
      <Header />
      <Sidebar role="livreur" />
      
      <div className="main-window">
        
        
        <main className="profile-content">
          
          {/* CARD SUPÉRIEURE : INFOS UTILISATEUR */}
          <div className="user-info-card">
            <div className="avatar-section">
              {/* Icône SVG Utilisateur en noir comme sur la maquette */}
              <svg viewBox="0 0 24 24" className="profile-avatar-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <div className="user-details">
                <h2>Nom Prenom</h2>
                <div className="user-sub-details">
                  <span className="user-email">nomPrenom@gmail.com</span>
                  <span className="user-phone">0600606060</span>
                </div>
              </div>
            </div>
            <div className="role-badge">
              role: <span className="role-name">client</span>
            </div>
          </div>

          {/* GRILLE INFÉRIEURE : LES DEUX FORMULAIRES */}
          <div className="profile-forms-grid">
            
            {/* FORMULAIRE GAUCHE : MOT DE PASSE */}
            <div className="profile-card-form">
              <h3>Changer le mots de passe</h3>
              <Formik initialValues={passwordInitialValues} onSubmit={onPasswordSubmit} validationSchema={passwordValidationSchema}>
                <Form>
                  <div className="profile-form-group">
                    <label htmlFor="old-password">ancien mots de passe:</label>
                    <Field type="password" id="old-password" name="oldPassword" />
                    <ErrorMessage name="oldPassword" component="span" className="error-msg" />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="new-password">nouveau mots de passe:</label>
                    <Field type="password" id="new-password" name="newPassword" />
                    <ErrorMessage name="newPassword" component="span" className="error-msg" />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="confirm-password">confirmer mots de passe:</label>
                    <Field type="password" id="confirm-password" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="span" className="error-msg" />
                  </div>

                  <button type="submit" className="btn-save">valider</button>
                </Form>
              </Formik>
            </div>

            {/* FORMULAIRE DROITE : INFOS GÉNÉRALES */}
            <div className="profile-card-form">
              <h3>Modifier les informations</h3>
              <Formik initialValues={infoInitialValues} onSubmit={onInfoSubmit} validationSchema={infoValidationSchema}>
                {({ setFieldValue }) => (
                  <Form>
                    <div className="profile-form-group">
                      <label htmlFor="edit-phone">telephone</label>
                      <Field type="tel" id="edit-phone" name="telephone" />
                      <ErrorMessage name="telephone" component="span" className="error-msg" />
                    </div>

                    <div className="profile-form-group">
                      <label htmlFor="edit-email">email</label>
                      <Field type="email" id="edit-email" name="email" />
                      <ErrorMessage name="email" component="span" className="error-msg" />
                    </div>

                    <div className="profile-form-group">
                      <label>photo</label>
                      <label htmlFor="file-upload" className="custom-file-upload">
                        import img
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={(event) => setFieldValue("photo", event.currentTarget.files[0])}
                      />
                    </div>

                    <button type="submit" className="btn-save">valider</button>
                  </Form>
                )}
              </Formik>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;