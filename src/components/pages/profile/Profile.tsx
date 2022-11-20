import { Button, Paper } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { loginRegExp, passwordRegExp } from 'components/utils/constants';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DecodedToken, SignupUserData } from 'services/userServiceTypes';
import { useAppDispatch } from 'store/store';
import { updateUserThunk } from 'store/thunks/userThunk';
import styles from './../registration/Registration.module.scss';
import Typography from '@mui/material/Typography';
import { getTokenLocalStorage } from 'services/apiConstants';
import jwt_decode from 'jwt-decode';

export default function Board() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addAlert = useAlerts();

  const nameLabel = useTranslate('form.name');
  const loginLabel = useTranslate('form.login');
  const passwordLabel = useTranslate('form.password');
  const submitLabel = useTranslate('buttons.submit');
  const resetLabel = useTranslate('buttons.reset');
  const SuccessUpdateUserData = useTranslate('alerts.successUpdateUserData');
  const TitleUpdateUserData = useTranslate('profile.title');

  const errorLoginMessage = useTranslate('alerts.errorLogin');
  const token = getTokenLocalStorage();
  const decodedToken = jwt_decode<DecodedToken>(token);

  useEffect(() => {
    if (!token) {
      addAlert({ type: 'error', message: errorLoginMessage });
      navigate('/login');
    }
  }, []);

  const onSubmit = async (data: SignupUserData) => {
    await dispatch(updateUserThunk(decodedToken.userId, data));
    addAlert({ type: 'success', message: SuccessUpdateUserData });
    navigate('/boards');
  };

  const methods = useForm({
    defaultValues: { name: '', login: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  return (
    <div className={styles.registration}>
      <div className="container">
        <div className={styles.wrapper}>
          <Paper
            style={{
              width: '100%',
              padding: '20px',
              display: 'grid',
              gridRowGap: '20px',
              justifyItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>
              {TitleUpdateUserData}
            </Typography>
            <FormProvider {...methods}>
              <FormInputText
                name="name"
                label={nameLabel}
                type="text"
                required={true}
                minLength={2}
                maxLength={15}
                pattern={loginRegExp}
              />
              <FormInputText
                name="login"
                label={loginLabel}
                type="text"
                required={true}
                minLength={2}
                maxLength={15}
                pattern={loginRegExp}
              />
              <FormInputText
                name="password"
                label={passwordLabel}
                type="password"
                required={true}
                minLength={2}
                maxLength={15}
                pattern={passwordRegExp}
              />
            </FormProvider>
            <Button
              className={styles.formButton}
              color="info"
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={isSubmitting}
            >
              {submitLabel}
            </Button>
            <Button
              onClick={() => reset()}
              variant={'outlined'}
              className={styles.formButton}
              color="error"
            >
              {resetLabel}
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
}
