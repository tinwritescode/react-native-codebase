import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import BookmarkNavigator from './Bookmark'
import WalletNavigator from './Wallet'
import UserNavigator from './User'
import PeopleNearbyNavigator from './PeopleNearbyNavigator'
import { useTranslation } from 'react-i18next'
const Tab = createMaterialBottomTabNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { t } = useTranslation()
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Tab.Navigator>
          {/* <Tab.Screen name="Startup" component={StartupContainer} /> */}
          <Tab.Screen
            name={t('tabNavigator.home')}
            component={MainNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <Octicons name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name={t('tabNavigator.bookmarks')}
            component={BookmarkNavigator}
            options={{
              tabBarIcon: ({ color }) => {
                return <Octicons name="bookmark" size={24} color={color} />
              },
            }}
          />
          <Tab.Screen
            name={t('tabNavigator.peopleNearby')}
            component={PeopleNearbyNavigator}
            options={{
              tabBarIcon: ({ color }) => {
                return <Ionicons name="ios-people" size={24} color={color} />
              },
            }}
          />
          <Tab.Screen
            name={t('tabNavigator.wallet')}
            component={WalletNavigator}
            options={{
              tabBarIcon: ({ color }) => {
                return <Ionicons name="ios-wallet" color={color} size={24} />
              },
            }}
          />
          <Tab.Screen
            name={t('tabNavigator.user')}
            component={UserNavigator}
            options={{
              tabBarIcon: ({ color }) => {
                return <Ionicons name="ios-person" color={color} size={24} />
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
