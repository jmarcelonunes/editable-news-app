import FirestoreMock from '../testHelpers/firestore.js';
import firebase from 'firebase/app';
import 'firebase/firestore';

describe('Firebase test suite', () => {
  it('adds news without crashing', (done) => {
    const firestoreMock = new FirestoreMock();
    firebase.firestore = firestoreMock;
    firestoreMock.reset();

    firestoreMock.mockAddReturn = { id: 'test-id' }
    firebase.firestore.collection('noticias')
      .add({
        autor: 'autor teste',
        corpo: 'corpo teste',
        subtitulo: 'subtitulo teste',
        titulo: 'titulo teste'
      })
      .then(res => {
        expect(firestoreMock.mockCollection).toBeCalledWith('noticias')
        expect(firestoreMock.mockAdd).toBeCalledWith({
          autor: 'autor teste',
          corpo: 'corpo teste',
          subtitulo: 'subtitulo teste',
          titulo: 'titulo teste'
        })
        expect(res.id).toEqual('test-id')
        done()
      })
      .catch(done)
  })
})