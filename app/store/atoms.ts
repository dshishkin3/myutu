import { atom } from 'recoil';
import { cookie } from 'app/utils/helpers/cookies.helpers';

export const categoryID = atom({
  key: 'categoryID',
  default: 0
})

export const showAuthModal = atom<boolean>({
  key: 'showAuthModal',
  default: false
})

export const showPassword = atom<boolean>({
  key: 'showPassword',
  default: false
})

export const showRegForm = atom<boolean>({
  key: 'showRegForm',
  default: false
})

export const logged = atom<boolean>({
  key: 'logged',
  default: false
})

export const loggedUserID = atom<string | number | null>({
  key: 'loggedUserID',
  default: ""
})

export const categoryPageID = atom<string | number>({
  key: 'categoryPageID',
  default: 4
})