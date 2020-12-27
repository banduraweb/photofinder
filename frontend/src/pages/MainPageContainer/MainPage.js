import React from 'react';

export const MainPage = ({ logout }) => {
  return (
    <div>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};
