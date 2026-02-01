// src/hooks/useNavigateBack.js
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';

/**
 * Unified navigation back hook with consistent UX
 * @param {string} fallbackRoute - Route to navigate to if no history
 * @param {number} delay - Delay before navigation (ms)
 */
export const useNavigateBack = (fallbackRoute = '/lucid_dev_backup', delay = 200) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleBack = useCallback(() => {
    showNotification('Going Back . . .', 'info');
    
    setTimeout(() => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate(fallbackRoute);
      }
    }, delay);
  }, [navigate, showNotification, fallbackRoute, delay]);

  return handleBack;
};

// Usage example:
// const handleBackClick = useNavigateBack('/dashboard', 800);