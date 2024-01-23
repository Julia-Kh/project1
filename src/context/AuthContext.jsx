import { createContext } from 'react';

const AuthContext = createContext({ supabase: null, session: null });

export default AuthContext;
