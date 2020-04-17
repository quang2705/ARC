import React from 'react';

const config = {
  googleClientId: '903588499024-e233icds29no0o6h89n01tgvdv7u5dv4.apps.googleusercontent.com',
  dbClientId: 'YM2tI4j4PKkB2tTQcvS7mOiFyOmq5urKvybXCvAG',
  scope: 'email',
};

const AuthContext = React.createContext();

export default config;
export { AuthContext };
