import React from 'react';

const config = {
  googleClientId: '903588499024-e233icds29no0o6h89n01tgvdv7u5dv4.apps.googleusercontent.com',
  dbClientId: 'IzW5nvTbN0KLY9rTHJ0ZTb11tInqU7KVt5pWedNc',
  scope: 'https://www.googleapis.com/auth/gmail.send',
};

const AuthContext = React.createContext();

export default config;
export { AuthContext };
