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

const WalletContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('9')
  const [
    fetchOne,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

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

  const createWalletHandler = async () => {
    const key = new Keyring({ type: 'sr25519', ss58Format: 2 })
    const mnemonic = mnemonicGenerate()

    console.log(mnemonic)
    key.addFromMnemonic(mnemonic)
    console.log(key.getPublicKeys())
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
        <TouchableOpacity
          onPress={createWalletHandler}
          style={[Common.backgroundPrimary, Common.button.rounded]}
        >
          <Text style={Fonts.textRegular}>Create wallet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default WalletContainer
