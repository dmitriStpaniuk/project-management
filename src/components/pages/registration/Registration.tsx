import { Button, Paper } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SignupUserData } from 'services/userServiceTypes';
import { useAppDispatch } from 'store/store';
import { createNewUserThunk } from 'store/thunks/userThunk';

export default function Registration() {
  const dispatch = useAppDispatch();
  const methods = useForm({ defaultValues: { name: '', login: '', password: '' } });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = (data: SignupUserData) => {
    dispatch(createNewUserThunk(data));
  };

  return (
    <Paper style={{ marginTop: '65px', display: 'grid', gridRowGap: '20px', padding: '20px' }}>
      <FormProvider {...methods}>
        <FormInputText name="name" label="name" type="text" />
        <FormInputText name="login" label="login" type="text" />
        <FormInputText name="password" label="password" type="password" />
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
