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
  
  it('reads news without crashing', (done) => {
    const firestoreMock = new FirestoreMock();
    firebase.firestore = firestoreMock;
    firestoreMock.reset();

    firestoreMock.mockGetReturn = { id: 'get-test-id' }
    firebase.firestore.collection('noticias')
      .add({
        autor: 'autor teste',
        corpo: 'corpo teste',
        subtitulo: 'subtitulo teste',
        titulo: 'titulo teste'
      })

    firebase.firestore.collection('noticias')
      .get()
      .then(res => {
        expect(firestoreMock.mockCollection).toBeCalledWith('noticias')
        expect(firestoreMock.mockGet).toBeCalledWith()
        expect(res.id).toEqual('get-test-id')
        done()
      })
      .catch(done)
  })
  
  it('delete news without crashing', (done) => {
    const firestoreMock = new FirestoreMock();
    firebase.firestore = firestoreMock;
    firestoreMock.reset();

    firestoreMock.mockDeleteReturn = { id: 'delete-test-id' }
    firebase.firestore.collection('noticias')
      .add({
        autor: 'autor teste',
        corpo: 'corpo teste',
        subtitulo: 'subtitulo teste',
        titulo: 'titulo teste'
      })

    firebase.firestore.collection('noticias')
      .delete('delete-test-id')
      .then(res => {
        expect(firestoreMock.mockCollection).toBeCalledWith('noticias')
        expect(firestoreMock.mockDelete).toBeCalledWith()
        expect(res.id).toEqual('delete-test-id')
        done()
      })
      .catch(done)
  })
})