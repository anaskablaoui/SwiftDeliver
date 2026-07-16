import React from 'react';
import loginImg from '../../assets/E-commerce.jpeg';
import logo from '../../assets/Gemini_Generated_Image_rrpvi6rrpvi6rrpv.png';
import './Login.css'; // Importation du fichier CSS
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Obligatoire"),
    password: Yup.string().required("Obligatoire")
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:3000/api/auth/login', data).then((response) => {
      const { token, user } = response.data;
      sessionStorage.setItem('accesstoken', token);

      if (user.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (user.role === 'livreur') {
        window.location.href = '/livreur/dashboard';
      } else {
        window.location.href = '/client/dashboard';
      }
    }).catch((error) => {
      alert(error.response?.data?.message || "Erreur lors de la connexion");
    })
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Côté Gauche - Image */}
        <div className="login-image-side">
          <img src={loginImg} alt="Shopping Cart Glow" />
        </div>

        {/* Côté Droit - Formulaire */}
        <div className="login-form-side">
          <div className="logo-container">
            <img src={logo} alt="SwiftDelivery" className="login-logo" />
          </div>

          <h2>Connexion</h2>

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email :</label>
                <Field type="email" id="email" name="email" placeholder="Entrez votre email" />
                <ErrorMessage name="email" component="span" className="error-msg" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mots de passe :</label>
                <Field type="password" id="password" name="password" placeholder="Entrez votre mot de passe" />
                <ErrorMessage name="password" component="span" className="error-msg" />
              </div>

              <button type="submit" className="btn-login">Log In</button>
            </Form>
          </Formik>

          <p className="signup-text">
            vous n’avez pas de compte ? <a href="/signup">sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;