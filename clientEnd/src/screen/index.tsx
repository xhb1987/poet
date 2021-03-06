import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { HomeTab } from './home';
import { RootRouteParamProps } from './routes';
import { AppTheme as Theme } from 'src/common/types/types';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchModal } from './home/modal/search-modal';
import { SearchInput } from './home/component/search-input';
import { CollectionPoetryPage } from './home/pages/recite-page/collection-poetry';
import { navigationRef } from 'src/common/navigation/root-navigation';
import { RegisterButton } from './home/pages/profile-page/component/register-button';
import { LoginPage } from './home/pages/auth/login-page';
import { RegisterPage } from './home/pages/auth/register-page';
import { SearchButton } from './home/component/search-button';
import { RecitePoetryDetail } from './home/pages/recite-page/recite-poetry-detail';
import { CollectionListPage } from './home/pages/recommendation/component/collection-list-page';

const Stack = createStackNavigator<RootRouteParamProps>();

export const Screen: FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerStyle: { shadowColor: 'transparent' },
        }}
      >
        <Stack.Screen options={{ headerShown: false }} name="Home">
          {() => <HomeTab theme={theme} />}
        </Stack.Screen>
        <Stack.Screen
          name="CollectionPoetry"
          component={CollectionPoetryPage}
          options={({ route }) => ({
            headerTransparent: false,
            headerTitle: route.params.collectionName,
            headerBackTitle: '返回',
            headerRight: () => <SearchButton />,
          })}
        />
        <Stack.Screen
          name="RecitePoetryDetail"
          component={RecitePoetryDetail}
          options={({ route }) => ({
            headerTitle: route.params.collectionName,
            headerTransparent: false,
            headerBackTitle: '返回',
          })}
        />
        <Stack.Screen
          name="CollectionList"
          component={CollectionListPage}
          options={{
            headerTitle: '添加到我的诗单',
            headerTransparent: false,
            headerBackTitle: '返回',
          }}
        />
        <Stack.Screen
          name="SearchModal"
          component={SearchModal}
          options={{
            headerTransparent: false,
            headerTitle: () => <SearchInput autoFocus searchButton />,
            headerLeft: () => undefined,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => undefined,
            headerRight: () => <RegisterButton />,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerLeft: () => undefined,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
