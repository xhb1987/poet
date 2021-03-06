import { getType } from 'typesafe-actions';
import { authActions } from './actions';
import { AuthActions } from './types';

type AuthReducer = {
  loading: boolean;
  error: boolean;
  isAuthenticated: boolean;
  accessToken: string;
};

const initAuthState: AuthReducer = {
  accessToken: '',
  loading: false,
  error: false,
  isAuthenticated: false,
};

export const authReducer = (state: AuthReducer = initAuthState, action: AuthActions) => {
  switch (action.type) {
    case getType(authActions.userLogin): {
      return { ...state, loading: true };
    }

    case getType(authActions.userRegisterSuccess):
    case getType(authActions.userLoginSuccess): {
      const { access_token: accessToken } = action.payload;
      return {
        ...state,
        loading: false,
        error: false,
        isAuthenticated: true,
        accessToken,
      };
    }

    case getType(authActions.userLoginError):
    case getType(authActions.userRegisterError): {
      return {
        ...state,
        loading: false,
        error: true,
        isAuthenticated: false,
        accessToken: '',
      };
    }

    case getType(authActions.userLogoutSuccess): {
      return {
        ...state,
        loading: false,
        error: false,
        isAuthenticated: false,
        accessToken: '',
      };
    }

    case getType(authActions.clearError): {
      return {
        ...state,
        error: false,
      };
    }

    default:
      return state;
  }
};
