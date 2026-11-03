import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { CorporalPage } from '../pages/CorporalPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CorporalPage />
  </StrictMode>,
);
