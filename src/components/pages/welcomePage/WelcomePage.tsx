import React from 'react';
import { useTranslate } from 'components/languageContext/languageContext';
import welcomeImage from './../../assets/images/welcome.png';
import style from './WelcomePage.module.css';
export default function WelcomePage() {
  const buttonWelcomeText = useTranslate('buttons.welcome');
  const buttonNamingText = useTranslate('buttons.naming').toUpperCase();
  return (
    <div className={style.welcome}>
      <div className="container" data-testid="welcome">
        <div className={style.projectInfo}>
          <div className={style.welcomeText}>
            <span>
              {buttonNamingText}
              <br></br>
              {buttonWelcomeText}
            </span>
          </div>
          <img className={style.welcomeImage} src={welcomeImage} alt="foto" />
        </div>
      </div>
    </div>
  );
}
