import { Button, Paper } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import { loginRegExp, passwordRegExp } from 'components/utils/constants';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignupUserData } from 'services/userServiceTypes';
import { useAppDispatch } from 'store/store';
import { createNewUserThunk } from 'store/thunks/userThunk';
import { useTranslate } from '../../languageContext/languageContext';

export default function Registration() {
  const nameLabel = useTranslate('form.name');
  const loginLabel = useTranslate('form.login');
  const passwordLabel = useTranslate('form.password');
  const submitLabel = useTranslate('buttons.submit');
  const resetLabel = useTranslate('buttons.reset');

  const dispatch = useAppDispatch();
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

  const onSubmit = (data: SignupUserData) => {
    dispatch(createNewUserThunk(data));
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
      <Button onClick={handleSubmit(onSubmit)} variant={'contained'} disabled={isSubmitting}>
        {submitLabel}
      </Button>
      <Button onClick={() => reset()} variant={'outlined'}>
        {resetLabel}
      </Button>
    </Paper>
  );
}
