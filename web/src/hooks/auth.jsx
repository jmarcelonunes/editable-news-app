import React, {
  useState, useContext, createContext, useCallback,
} from 'react';
import firebase from '../firebase';

const AuthContext = createContext();
/**
 * Hook responsável pela comunicação com o firebase para a autenticação de usuários
 * @hook
 *
 */
export const AuthProvider = ({ children }) => {
  /**
   * Funcionalidade responsável por adquirir os dados do usuário que se encontram em localstorage
   *
   * Assertivas de entrada
   * Não há parametros de entreda
   *
   * Assertivas de saída
   *
   * Ao final da execução o retorno deve ser nulo em caso de não haver usuário logado
   * ou o objeto com os dados do usuário caso haja algum usuário logado
   */
  const [data, setData] = useState(() => {
    // const token = localStorage.getItem('@editable-news-app:token');
    const user = localStorage.getItem('@editable-news-app:user');
    /**
     * User é atribuido ao valor adquirido em localStorage
     */

    if (/* token && */ user) {
      // api.defaults.headers.authorization = `Bearer ${token}`;
      /**
       * Caso user esteja logado, retorna os dados do usuário
       */
      return { /* token, */ user: JSON.parse(user) };
    }

    return {};
  });

  /**
   * signIn - Função responsável pelo envio dos dados
   * do usuário ao firebase para efetuar a validação e login.
   *
   * Assertivas de entrada
   * @param {string, string} data dados do usuário (email e senha)
   * email != null
   * password != null
   *
   * Assertivas de saída
   * Ao final da execução, o localStorage deve estar populado com os dados do usuário
   */
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
  /**
   * signOut - Função responsável pelo logout do usuário, é feita a
   * comunicação com o firebase para realizar a autenticação do logout
   *
   * Assertiva de entrada
   * Não recebe parâmetros
   *
   * Assertiva de saída
   * É esperado que ao final da execução da função, os usuário seja deslogado e
   * o localStorage seja limpo, ou seja, fique sem os dados do usuário.
   */
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
  /**
  * signUp - Função responsável pelo envio de dados de um novo usuário ao firebase
  *
  * Assertivas de entrada
  * @param {object} inputData Dados do novo usuário
  * inputData != null
  *
  * Assertivas de saída
  * Ao final da execução o usuário deve possuir um novo cadastro.
  * Deve ser redirecionado para a página de noticias
  * Deve possuir seus dados não privados salvos em localStorage
  *
  *
  */
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
        alert(error.message);
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
