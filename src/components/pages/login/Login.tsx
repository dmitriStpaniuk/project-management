import { Button, Paper } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { loginRegExp, passwordRegExp } from 'components/utils/constants';
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
  const loginLabel = useTranslate('form.login');
  const passwordLabel = useTranslate('form.password');
  const submitLabel = useTranslate('buttons.submit');
  const resetLabel = useTranslate('buttons.reset');
  const methods = useForm({
    defaultValues: { login: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
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
    <Paper
      style={{
        maxWidth: '600px',
        margin: '65px auto',
        padding: '20px',
        display: 'grid',
        gridRowGap: '20px',
        justifyItems: 'center',
      }}
    >
      <FormProvider {...methods}>
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
      <Button onClick={handleSubmit(onSubmit)} variant={'contained'} disabled={isSubmitting}>
        {submitLabel}
      </Button>
      <Button
        onClick={() => {
          reset();
        }}
        variant={'outlined'}
      >
        {resetLabel}
      </Button>
    </Paper>
  );
}
