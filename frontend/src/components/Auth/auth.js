import React from 'react';

const config = {
  googleClientId: '903588499024-e233icds29no0o6h89n01tgvdv7u5dv4.apps.googleusercontent.com',
  dbClientId: 'VyssITdS6SdRuAz0RYKYWbpIjpfiWvnELU1swdH7',
  scope: 'https://www.googleapis.com/auth/gmail.send',
};

const AuthContext = React.createContext();

export default config;
export { AuthContext };
