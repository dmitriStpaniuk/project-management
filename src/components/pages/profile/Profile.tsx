import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateWrapper } from 'routes/PrivateWrapper';
import { getTokenLocalStorage } from 'services/apiConstants';

export default function Profile() {
  const addAlert = useAlerts();
  const navigate = useNavigate();
  const errorLoginMessage = useTranslate('alerts.errorLogin');
  const token = getTokenLocalStorage();
  useEffect(() => {
    if (!token) {
      addAlert({ type: 'error', message: errorLoginMessage });
      navigate('/login');
    }
  }, []);
  return (
    <PrivateWrapper>
      <div className="container" data-testid="profile">
        Profile
      </div>
    </PrivateWrapper>
  );
}
