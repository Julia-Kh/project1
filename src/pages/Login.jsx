import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Login = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // попробовать получить текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log('get session');
    });

    // добавить подписку на изменение состояния сессии
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('on auth change');
    });
  }, []);

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
