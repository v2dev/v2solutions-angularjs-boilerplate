import { PrimeIcons } from 'primeng/api';

export const AppSettings = {
  isUserSignupEnable: true,
  isFooterEnable: false,
  menuPosition: 'side',
};

export const AppRoutes = {
  login: 'login',
  register: 'register',
  resetPassword: 'reset-password',
  dashboard: 'dashboard',
  home: 'home',
  employee: 'employee',
};

export const AppKeys = {
  encrypt: 'v2_encrypt',
  authToken: 'auth_token',
};

export const AppIcons = [
  {
    label: 'View',
    icon: PrimeIcons.EYE,
    action: 'view_action',
  },
  {
    label: 'Delete',
    icon: PrimeIcons.TRASH,
    action: 'delete_action',
  },
  {
    label: 'Edit',
    icon: PrimeIcons.PENCIL,
    action: 'update_action',
  },
];
