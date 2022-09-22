import React from 'react';

const styles = {
  page: {
    width: '240px',
    height: '300px',
    padding: '0 10px'
  }
};

export default function PageContainer({ children }) {
  return (
    <div className="bg-light">
      <div className="container" style={styles.page}>
        {children}
      </div>
    </div>
  );
}
