/**
 * gets the root of the html and populates it with the App component and its Child components
 */
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
