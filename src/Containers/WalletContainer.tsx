import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme, ThemeState } from '@/Store/Theme'

import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto'
import { KeyringPair } from '@polkadot/keyring/types'

const WalletContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const [passPhrase, setPassPhrase] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    // cryptoWaitReady().then(() => {
    //   const keyring = new Keyring({ type: 'sr25519' })
    //   const mnemonic = mnemonicGenerate()
    //   keyring.addFromMnemonic(mnemonic)
    //   console.log(keyring.getPair('Alice').address)
    // })
  }, [])

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  const generateSeedPhrase = async () => {
    new Promise<string>(resolve => {
      const key = new Keyring({ type: 'sr25519' })
      const mnemonic = mnemonicGenerate()

      resolve(mnemonic)
    })
      .then(mnemonic => {
        setPassPhrase(mnemonic)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      {/*Text  */}
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        {/* Mnemonickey */}
        <View style={[Layout.row, Gutters.smallVPadding]}>
          <Text style={[Fonts.textRegular, Fonts.bold]}>
            {t('wallet.createOrImportExistingWallet')}
          </Text>
        </View>
        <View style={[]}>
          <View style={[{ minHeight: 150 }]}>
            <TouchableOpacity
              onPress={generateSeedPhrase}
              style={[
                Common.backgroundPrimary,
                Common.button.outlineRounded,
                { marginVertical: 4 },
              ]}
            >
              <Text style={Fonts.textRegular}>Generate passphrase</Text>
            </TouchableOpacity>
            <Text style={[Fonts.textRegular, Fonts.bold]}>{passPhrase}</Text>
          </View>

          {/* Restore wallet */}
          <RestorePassphrase />
        </View>
      </View>
    </ScrollView>
  )
}

function RestorePassphrase() {
  const { t } = useTranslation()
  const { Common, Fonts } = useTheme()
  const [passPhrase, setPassPhrase] = useState(
    'eternal wing cement gift enlist glide crash ripple cute material moon exotic',
  )
  const [user, setUser] = useState<KeyringPair | null>(null)

  const [
    fetchOne,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(passPhrase)
  }, [fetchOne, passPhrase])

  const restoreWallet = async () => {
    new Promise<KeyringPair>(resolve => {
      const key = new Keyring({ type: 'sr25519' })

      const user = key.addFromUri(passPhrase)

      resolve(user)
    })
      .then(user => {
        setUser(user)
      })
      .catch(err => {
        console.log('Error from keyring: ', err)
      })
  }

  return (
    <View style={[{ minHeight: 150 }]}>
      <Text style={[Fonts.textRegular, Fonts.bold]}>
        {t('wallet.enterPassphrase')}
      </Text>
      <TextInput
        onChangeText={setPassPhrase}
        editable={!isLoading}
        keyboardType={'default'}
        value={passPhrase}
        selectTextOnFocus
        style={[Common.textInput]}
      />
      <TouchableOpacity
        onPress={restoreWallet}
        style={[Common.backgroundPrimary, Common.button.outlineRounded]}
      >
        <Text style={Fonts.textRegular}>Import existing</Text>
      </TouchableOpacity>

      <Text style={[Fonts.textRegular, Fonts.bold]}>Address</Text>
      <Text style={[Fonts.textRegular, Fonts.bold]}>{user?.address}</Text>
      <Text style={[Fonts.textRegular, Fonts.bold]}>Public key</Text>
      <Text style={[Fonts.textRegular, Fonts.bold]}>{user?.publicKey}</Text>
    </View>
  )
}

export default WalletContainer
