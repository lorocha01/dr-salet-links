import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { FacePage } from '../pages/FacePage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FacePage />
  </StrictMode>,
);
