import { Button, Paper } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginUserData } from 'services/userServiceTypes';
import { useAppDispatch } from 'store/store';
import { signinThunk } from 'store/thunks/userThunk';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm({ defaultValues: { login: '', password: '' } });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: LoginUserData) => {
    await dispatch(signinThunk(data));
    navigate('/board');
  };

  return (
    <Paper style={{ display: 'grid', gridRowGap: '20px', padding: '20px' }}>
      <FormProvider {...methods}>
        <FormInputText name="login" label="Login" type="text" />
        <FormInputText name="password" label="Password" type="password" />
      </FormProvider>
      <Button onClick={handleSubmit(onSubmit)} variant={'contained'} disabled={isSubmitting}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={'outlined'}>
        Reset
      </Button>
    </Paper>
  );
}
