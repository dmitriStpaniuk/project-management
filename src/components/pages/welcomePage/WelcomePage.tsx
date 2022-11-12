import React from 'react';
import { useTranslate } from 'components/languageContext/languageContext';

export default function WelcomePage() {
  const buttonSubmitText = useTranslate('buttons.submit');
  return (
    <div className="container" data-testid="welcome">
      {buttonSubmitText}
    </div>
  );
}
