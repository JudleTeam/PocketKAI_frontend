import { userService } from "./user.service"
import { create } from 'zustand';
import { AuthParams } from "./types";
import { persist } from 'zustand/middleware';
import { UserStudent } from "@/shared";
import { Nullable } from "@/shared";
type UserType = {
    user: Nullable<UserStudent>,
    token: string,
    postAuthLogin: (params:AuthParams) => void,
    getMeStudent: () => void,
    logOutOfAccount: () => void
}

export const useUser = create<UserType>()(
    persist(
        (set) => ({
            user: null,
            token: '',
            postAuthLogin: async (params:AuthParams) => {
                const response = await userService.postAuth(params);
                set({token: response.data})
            },
            getMeStudent: async () => {
                const response = await userService.getMeStudent();
                set({user: response.data});
            },
            logOutOfAccount: () => {
                set({user: null, token: ''})
            }
        }),
        {
            name: 'user-token',
            partialize: (state) => ({
                token: state.token,
                user: state.user
            }),
        }
    )
);