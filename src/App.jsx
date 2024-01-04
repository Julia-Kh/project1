import { useState, useEffect } from 'react';
// import './App.css'
import PrimarySearchAppBar from './components/Header';
import ItemsList from './components/ItemsList';
import the_biggest_collections from './the_biggest_collections';
import CollectionsList from './components/CollectionsList';
import Example from './components/Wordcloud';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log('get session');
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('on auth change');
    });
  }, []);

  useEffect(() => {
    supabase
      .from('Items')
      .select(
        `
    id, author_id, title, Collections (title), img_url
`
      )
      .then((res) => {
        let { data, error } = res;
        console.log(data, error);
        const arrOfItems = [];
        let techObj = {};
        for (let obj of data) {
          techObj.owner = obj.author_id;
          techObj.name = obj.title;
          techObj.collection = obj.Collections.title;
          techObj.poster = obj.img_url;
          techObj.id = obj.id;
          arrOfItems.push(techObj);
          techObj = {};
        }
        setItems(arrOfItems);
      });
  }, []);

  return (
    <>
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
      <PrimarySearchAppBar />
      <ItemsList items={items}></ItemsList>
      <CollectionsList collections={the_biggest_collections}></CollectionsList>
      <Example width={400} height={400}></Example>
    </>
  );
}

export default App;
