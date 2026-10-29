import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { LinksPage } from '../pages/LinksPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LinksPage />
  </StrictMode>,
);
