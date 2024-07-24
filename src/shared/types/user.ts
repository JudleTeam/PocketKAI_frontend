import { Nullable } from "./common";

export type UserStudent = {
    id: string;
    created_at: string;
    kai_id: Nullable<number>;
    position: Nullable<number>;
    login: Nullable<string>;
    full_name: string;
    phone: Nullable<string>;
    email: string;
    sex: Nullable<string>;
    birthday: Nullable<string>;
    is_leader: boolean;
    zach_number: Nullable<string>;
    competition_type: Nullable<string>;
    contract_number: Nullable<string>;
    edu_level: Nullable<string>;
    edu_cycle: Nullable<string>;
    edu_qualification: Nullable<string>;
    program_form: Nullable<string>;
    status: Nullable<string>;
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
