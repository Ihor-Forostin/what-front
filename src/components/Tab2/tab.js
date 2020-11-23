import React from 'react';
import classNames from 'classnames';
import styles from './tab.scss';

export const Tab2 = ({title, tabIndex, isActive, onClick}) => {
  return (
    <a className={classNames('nav-item nav-link', styles.tab, {[`${styles.active}`]: isActive})} 
      onClick={(event) => {
        event.preventDefault();
        onClick(tabIndex);
      }}
    >{title}</a>
  );
};