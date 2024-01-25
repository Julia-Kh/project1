import { useContext } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import AuthContext from '../context/AuthContext';
import Welcome from '../components/Welcome';

const Login = ({ currentTheme }) => {
  const { supabase, session } = useContext(AuthContext);
  return !session ? (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        theme={currentTheme}
      />
    </div>
  ) : (
    <Welcome
      email={session.user.email}
      logout={() => supabase.auth.signOut()}
    />
  );
};

export default Login;
