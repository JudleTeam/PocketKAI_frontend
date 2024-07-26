import {GroupsIcon} from '../assets/chakraIcons/GroupsIcon'
import { GraduationCapIcon } from "../assets/chakraIcons/GraduationCapIcon";
import { AccountIcon } from "../assets/chakraIcons/AccountIcon";

export const USER_ACTIONS = [
    {
        label: 'Ваш профиль',
        path: 'profile',
        icon: AccountIcon
    },
    {
        label: 'Ваша специальность',
        path: 'speciality',
        icon: GraduationCapIcon
    },
    {
        label: 'Ваша группа',
        path: 'group',
        icon: GroupsIcon
    },
]