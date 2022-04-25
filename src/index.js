/*
 * @Author: Liusong He
 * @Date: 2022-04-25 22:00:17
 * @LastEditTime: 2022-04-25 22:27:48
 * @FilePath: \coursework\coursework\src\index.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
