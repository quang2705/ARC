import React from 'react';

const config = {
  googleClientId: '903588499024-e233icds29no0o6h89n01tgvdv7u5dv4.apps.googleusercontent.com',
  dbClientId: 'oZxw2vxl226wozJRAzCB4DKU4YxX8fcBvX2fq6s7',
  scope: 'email',
};

const AuthContext = React.createContext();

export default config;
export { AuthContext };
