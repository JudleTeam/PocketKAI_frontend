import { Nullable } from "./common";

export type UserStudent = {
    id: string;
    created_at: string;
    kai_id: Nullable<number>;
    position: Nullable<number>;
    login: Nullable<string>;
    full_name: string;
    is_leader: boolean;
    group_id: Nullable<string>;
    user_id: Nullable<string>;
}

export type UserPocket = {
    telegram_id: Nullable<number>;
    phone: Nullable<string>;
    is_blocked: boolean;
    id: string;
    created_at: string;
}

export type UserGroupMember = {
    id: string;
    kai_id: Nullable<number>;
    position: Nullable<number>;
    is_leader: boolean;
    full_name: string;
}