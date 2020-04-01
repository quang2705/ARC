import React from 'react';

const config = {
  googleClientId: '903588499024-e233icds29no0o6h89n01tgvdv7u5dv4.apps.googleusercontent.com',
  dbClientId: 'Jl7M0t2pKV0Wlo35PfANlEChnAIkUefbWlbxJTn2',
  scope: 'email',
};

const AuthContext = React.createContext();

export default config;
export { AuthContext };
