import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// RENDERIZADO DE LA APP
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// REGISTRO DEL SERVICE WORKER (PWA LOGIC)
// Esto permite que Jorge vea el cartel de "Instalar App" en su celular
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('PWA: Service Worker registrado con éxito');
      })
      .catch(error => {
        console.error('PWA: Error al registrar el Service Worker:', error);
      });
  });
}
