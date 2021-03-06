import React, { useState, FC } from 'react';
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { AppTheme } from 'src/common/types/types';
import { useDispatch } from 'react-redux';
import { poetryActions } from 'src/state/poetry/actions';
import { useTheme, useNavigation } from '@react-navigation/native';
import { MyButton } from 'src/common/component/button';
import { routes } from 'src/screen/routes';
import { TextInput } from 'src/common/component/text-input';

export const SearchInput: FC<{ autoFocus?: boolean; searchButton: boolean }> = ({ autoFocus, searchButton = true }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const navigation = useNavigation();
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);
  const onInputChange = (text: string) => {
    setInputValue(text);
  };

  const onSearch = () => {
    dispatch(poetryActions.searchPoetry(inputValue));
    Keyboard.dismiss();
  };

  const onFocus = () => {
    navigation.navigate(routes.searchModal);
  };
  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        onFocus={onFocus}
        onChangeText={onInputChange}
        autoFocus={autoFocus}
        onEndEditing={onSearch}
      />
      {searchButton && <MyButton type="primary" title="搜索" onPress={onSearch} />}
    </View>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      paddingHorizontal: 16,
    },
    input: {
      flex: 5,
      fontSize: 16,
      paddingHorizontal: 12,
    },
    searchButton: {
      fontSize: 16,
    },
  });
