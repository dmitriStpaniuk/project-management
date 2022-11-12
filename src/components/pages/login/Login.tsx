import { useTranslate } from 'components/languageContext/languageContext';
import React from 'react';

export default function Login() {
  const buttonSubmitText = useTranslate('buttons.submit');
  return <div className="container">{buttonSubmitText}</div>;
}
