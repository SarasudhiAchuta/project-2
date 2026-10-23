import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// highlight.js syntax-highlighting stylesheet
import 'highlight.js/styles/github-dark-dimmed.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
