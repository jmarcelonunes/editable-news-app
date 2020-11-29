import React, {
  useState, useContext, createContext, useCallback,
} from 'react';
import firebase from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // const token = localStorage.getItem('@editable-news-app:token');
    const user = localStorage.getItem('@editable-news-app:user');

    if (/* token && */ user) {
      // api.defaults.headers.authorization = `Bearer ${token}`;

      return { /* token, */ user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        const doc = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        const snap = await firebase
          .firestore()
          .collection('usuarios')
          .doc(doc.user.uid)
          .get();

        // set UID
        const user = snap.data();

        // set state
        setData({ user });

        localStorage.setItem('@editable-news-app:user', JSON.stringify(user));
      } catch (err) {
        console.log(err);
      }
    },
    [setData],
  );

  const signOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
      setData({});
      localStorage.removeItem('@editable-news-app:user');
    } catch (e) {
      console.log('Erro ao sair!');
    }
  }, [setData]);

  const updateUser = useCallback(
    async (user) => {
      localStorage.setItem('@editable-news-app:user', JSON.stringify(user));
      setData({
        user,
      });
    },
    [setData],
  );

  const signUp = useCallback(
    async (inputData) => {
      const signUpData = inputData;
      try {
        const login = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            signUpData.email,
            signUpData.password,
          );

        // remove user password information
        delete signUpData.password;

        // Add user to database
        await firebase
          .firestore()
          .collection('usuarios')
          .doc(login.user.uid)
          .set({ ...signUpData, uid: login.user.uid });

        // set UID to data
        signUpData.uid = login.user.uid;

        // set data state
        setData({ user: signUpData });

        // set internal storage
        localStorage.setItem(
          '@editable-news-app:user',
          JSON.stringify(signUpData),
        );
      } catch (error) {
        // Handle error
        console.log(error.message);
      }
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user, signIn, signOut, updateUser, signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
