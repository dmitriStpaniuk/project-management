import React from 'react';
import style from './Footer.module.css';
import rs from './../../../assets/svg/rs.svg';
export default function Footer() {
  return (
    <div className={style.footer}>
      <a href="https://rs.school">
        <img className={style.rs} src={rs} />
      </a>
      <p>2022</p>
      <div className={style.git}>
        <a href="https://github.com/VladimirKukolovich/VPK">Git</a>
        {/* <a href="https://github.com/VladimirKukolovich/VPK">Git</a>
        <a href="https://github.com/VladimirKukolovich/VPK">Git</a> */}
      </div>
    </div>
  );
}
