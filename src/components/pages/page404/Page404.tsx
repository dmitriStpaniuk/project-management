import React from 'react';
import style from './Page404.module.css';

const Page404 = () => {
  return (
    <div className={style.page404} data-testid="404">
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};
export default Page404;
