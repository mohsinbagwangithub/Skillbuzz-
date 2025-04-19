import { atom } from 'recoil';

type AuthModalState = {
    isOpen: boolean;
    type: 'login' | 'register' | 'forgotPassowrd'
};

const initalAuthMdalState: AuthModalState = {
    isOpen: false,
    type: 'login',
};

export const authModalState = atom<AuthModalState> ({
    key:'auth-modal',
    default :initalAuthMdalState  ,
});