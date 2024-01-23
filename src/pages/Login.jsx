import { useContext } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const { supabase, session } = useContext(AuthContext);
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      ) : (
        <>
          <div>
            <div>{session.user.email}!</div>
            <button onClick={() => supabase.auth.signOut()}>Sign out</button>
          </div>
          {/* <Main key={session.user.id} supabase={supabase} session={session} /> */}
        </>
      )}
    </div>
  );
};

export default Login;
