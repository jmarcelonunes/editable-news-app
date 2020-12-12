export default class FirestoreMock {
  constructor () {
    const authObjectMock = {
      createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
      signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
      sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
      signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
      fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
      signOut: jest.fn(() => {
        Promise.resolve(true);
      }),
      onAuthStateChanged: jest.fn(),
      currentUser: {
        sendEmailVerification: jest.fn(() => Promise.resolve(true)),
      },
    };
    // mocked methods that return the class
    this.mockCollection = jest.fn(() => this)
    this.mockWhere = jest.fn(() => this)
    this.mockOrderBy = jest.fn(() => this)

    // methods that return promises
    this.mockAdd = jest.fn(() => Promise.resolve(this._mockAddReturn))
    this.mockGet = jest.fn(() => Promise.resolve(this._mockGetReturn))
    this.mockDelete = jest.fn(() => Promise.resolve(this._mockDeleteReturn))
    this.mockAuth = jest.fn(() => authObjectMock);

    // methods that accepts callbacks
    this.mockOnSnaptshot = jest.fn((success, error) => success(this._mockOnSnaptshotSuccess))

    // return values
    this._mockAddReturn = null
    this._mockGetReturn = null
    this._mockDeleteReturn = null
    this._mockAuthReturn = null
    this._mockOnSnaptshotSuccess = null
  }

  collection (c) {
    return this.mockCollection(c)
  }

  where (...args) {
    return this.mockWhere(...args)
  }

  orderBy (...args) {
    return this.mockOrderBy(...args)
  }

  add (a) {
    return this.mockAdd(a)
  }

  get () {
    return this.mockGet()
  }

  onSnapshot (success, error) {
    return this.mockOnSnaptshot(success, error)
  }

  delete () {
    return this.mockDelete()
  }

  auth () {
    return this.mockAuth()
  }

  set mockAddReturn (val) {
    this._mockAddReturn = val
  }

  set mockGetReturn (val) {
    this._mockGetReturn = val
  }

  set mockDeleteReturn (val) {
    this._mockDeleteReturn = val
  }

  set mockAuthReturn (val) {
    this._mockAuthReturn = val
  }

  set mockOnSnaptshotSuccess (val) {
    this._mockOnSnaptshotSuccess = val
  }

  reset () {
    // reset all the mocked returns
    this._mockAddReturn = null
    this._mockGetReturn = null
    this._mockDeleteReturn = null
    this._mockAuthReturn = null
    this._mockOnSnaptshotSuccess = null

    // reset all the mocked functions
    this.mockCollection.mockClear()
    this.mockWhere.mockClear()
    this.mockOrderBy.mockClear()
    this.mockAdd.mockClear()
    this.mockGet.mockClear()
    this.mockDelete.mockClear()
    this.mockAuth.mockClear()
  }
}