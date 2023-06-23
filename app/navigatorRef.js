import React from 'react';
import { CommonActions } from '@react-navigation/native';

let navigator;

export const setNavigator = nav => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  CommonActions.dispatch(
    CommonActions.navigate({
      routeName,
      params
    })
  );
};