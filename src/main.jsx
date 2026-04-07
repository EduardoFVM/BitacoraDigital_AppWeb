import { createRoot } from 'react-dom/client'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-photo-view/dist/react-photo-view.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
