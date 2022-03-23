import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { Svg, Path } from 'react-native-svg'

const HomeContainer = () => {
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

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  // variables
  const { width, height } = Dimensions.get('window')

  return (
    <>
      <Svg
        viewBox={`44 130 100 60`}
        width="100%"
        height="200"
        style={{ position: 'absolute' }}
      >
        <Path
          fill="#FF0066"
          d="M39.3,-60.2C47.2,-56.1,47.2,-38.8,53.1,-24.7C58.9,-10.5,70.5,0.7,74,14.1C77.5,27.6,72.9,43.4,63.5,56.1C54.1,68.8,40,78.4,25.3,79.8C10.7,81.1,-4.5,74.1,-18.2,67.6C-31.8,61,-43.9,54.8,-51.3,45.1C-58.6,35.4,-61.1,22.3,-56.9,11.9C-52.7,1.4,-41.6,-6.3,-35.9,-15.4C-30.2,-24.6,-29.9,-35.2,-24.8,-40.6C-19.7,-46,-9.8,-46,2.9,-50.6C15.7,-55.2,31.4,-64.3,39.3,-60.2Z"
          transform="translate(100 100)"
        />
      </Svg>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[
          Layout.fill,
          Layout.colCenter,
          Gutters.smallHPadding,
        ]}
      >
        <View style={[[]]}>
          {(isLoading || isFetching) && <ActivityIndicator />}
          {!isSuccess ? (
            <Text style={Fonts.textRegular}>{error}</Text>
          ) : (
            <Text style={Fonts.textRegular}>
              {t('example.helloUser', { name: data?.name })}
            </Text>
          )}
        </View>
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
            Common.backgroundPrimary,
          ]}
        >
          <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall]}>
            {t('example.labels.userId')}
          </Text>
          <TextInput
            onChangeText={setUserId}
            editable={!isLoading}
            keyboardType={'number-pad'}
            maxLength={1}
            value={userId}
            selectTextOnFocus
            style={[Layout.fill, Common.textInput]}
          />
        </View>
        <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>
          DarkMode :
        </Text>

        <TouchableOpacity
          style={[Common.button.rounded, Gutters.regularBMargin]}
          onPress={() => onChangeTheme({ darkMode: null })}
        >
          <Text style={Fonts.textRegular}>Auto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Common.button.outlineRounded, Gutters.regularBMargin]}
          onPress={() => onChangeTheme({ darkMode: true })}
        >
          <Text style={Fonts.textRegular}>Dark</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Common.button.outline, Gutters.regularBMargin]}
          onPress={() => onChangeTheme({ darkMode: false })}
        >
          <Text style={Fonts.textRegular}>Light</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

export default HomeContainer
