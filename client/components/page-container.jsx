import React from 'react';

const styles = {
  page: {
    width: '240px',
    height: '250px',
    padding: '0 10px'
  }
};

export default function PageContainer({ children }) {
  return (
    <>
      <div className='overlay'></div>
      <div className="bg-light">
        <div className="sign-up-container" style={styles.page}>
          {children}
        </div>
      </div>
    </>

  );
}
