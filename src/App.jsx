import { useState, useEffect } from 'react';
// import './App.css'
import PrimarySearchAppBar from './components/Header';
import ItemsList from './components/ItemsList';
// import the_biggest_collections from './the_biggest_collections';
import CollectionsList from './components/CollectionsList';
import Example from './components/Wordcloud';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);
  const [collections, setCollections] = useState([]);

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

  useEffect(() => {
    // get last 5 items
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title), created_at, owner:author_id, poster:img_url'
      )
      .order('created_at', { ascending: false }) // сортировка
      .limit(5)
      .then((res) => {
        let { data, error } = res;
        console.log(data, error);
        const data2 = data.map((value) => ({
          ...value,
          collection: value.Collections.title,
        }));
        setItems(data2);
      });

    // get 5 biggest collections
    supabase
      .from('Collections')
      .select(`id, name:title, owner:author_id, poster:img_url, Items(count)`)
      .then((res) => {
        let { data, error } = res;
        let arrOfData = data.map((value, key) => {
          value.countOfItems = value.Items[0].count;
          return value;
        });
        arrOfData.sort((a, b) => b.countOfItems - a.countOfItems);
        arrOfData = arrOfData.slice(0, 5);

        // set collections
        setCollections(arrOfData);
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
      <CollectionsList collections={collections}></CollectionsList>
      <Example width={400} height={400}></Example>
    </>
  );
}

export default App;
