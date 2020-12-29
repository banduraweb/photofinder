import React from 'react';
import JWTDecode from 'jwt-decode';
import { Profile } from './Profile';
import { Layout } from '../Layout/Layout';

export const ProfileContainer = () => {
  const token = localStorage.getItem('token');
  const user = JWTDecode(token);
  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  );
};
