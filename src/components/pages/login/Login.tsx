import { Button, Paper } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginUserData } from 'services/userServiceTypes';
import { useAppDispatch } from 'store/store';
import { signinThunk } from 'store/thunks/userThunk';
import styles from './Login.module.scss';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginSuccessMessage = useTranslate('alerts.successfullLogin');
  const methods = useForm({ defaultValues: { login: '', password: '' } });
  const addAlert = useAlerts();
  const loginLabel = useTranslate('form.login');
  const passwordLabel = useTranslate('form.password');
  const submitLabel = useTranslate('buttons.submit');
  const resetLabel = useTranslate('buttons.reset');

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: LoginUserData) => {
    await dispatch(signinThunk(data));
    addAlert({ type: 'success', message: loginSuccessMessage });
    navigate('/board');
  };

  return (
    <div className={styles.login}>
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
            <FormProvider {...methods}>
              <FormInputText name="login" label={loginLabel} type="text" />
              <FormInputText name="password" label={passwordLabel} type="password" />
            </FormProvider>
            <Button
              className={styles.formButton}
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={isSubmitting}
              color="info"
            >
              {submitLabel}
            </Button>
            <Button
              className={styles.formButton}
              onClick={() => {
                reset();
              }}
              variant={'outlined'}
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
