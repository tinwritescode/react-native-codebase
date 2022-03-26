import { createSlice } from '@reduxjs/toolkit'
import { Keyring } from '@polkadot/api'

const slice = createSlice({
  name: 'auth',
  initialState: { keyPairs: null } as AuthState,
  reducers: {
    loginWithPassphrase: (state, { payload: { passphrase } }: AuthPayload) => {
      try {
        const key = new Keyring({ type: 'sr25519' })
        key.addFromMnemonic(passphrase)

        const alice = key.addFromUri('//Alice')

        alice.unlock()
        state.keyPairs = {
          ...state.keyPairs,
          publicKey: alice.publicKey,
        }
      } catch (e) {
        console.log('Error from loginWithPassphrase: ', e)
      }
    },
    logout: state => {
      state.keyPairs = null
    },
  },
})

export const { loginWithPassphrase, logout } = slice.actions

export default slice.reducer

export type AuthState = {
  keyPairs: LoginData | null | undefined
}

type AuthPayload = {
  payload: {
    passphrase: string
  }
}

type LoginData = {
  publicKey: Uint8Array
  //   privateKey: string
}
