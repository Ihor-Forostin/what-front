import React, { useState } from 'react';
import classNames from 'classnames';

const arrow = (
  <svg width='1em' height='1em' viewBox='0 0 16 16' className='bi bi-arrow-left' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'/>
  </svg>
);

export const Tabs2 = ({children, defaultIndex}) => {

  const [tabs, setTabs] = useState({
    activeTabIndex: defaultIndex,
  });

  const toggleActive = (tabIndex) => {
    
    setTabs((prevState) => {
      return {
        ...prevState,
        activeTabIndex: tabIndex == tabs.activeTabIndex ? defaultIndex : tabIndex,
      };
    });
  };

  const renderContent = () => {
    if(children[tabs.activeTabIndex]) {
      return children[tabs.activeTabIndex].props.children
    }
  }

  const renderTabs = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        tabIndex: index,
        isActive: index == tabs.activeTabIndex,
        onClick: toggleActive,
      })
    })
  }

  return (
    <div className='w-75 m-5'>
      <div className='nav nav-tabs'>
        <a className={classNames('nav-item nav-link d-flex align-items-center')}
          href='#arrow'
        >{arrow}</a>
        {renderTabs()}
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};