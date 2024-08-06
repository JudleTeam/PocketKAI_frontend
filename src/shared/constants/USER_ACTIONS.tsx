import {GroupsIcon} from '../assets/chakraIcons/GroupsIcon'
import { GraduationCapIcon } from "../assets/chakraIcons/GraduationCapIcon";
import { ProfileIcon } from "../assets/chakraIcons/ProfileIcon";

export const USER_ACTIONS = [
    {
        label: 'Ваш профиль',
        path: 'profile',
        icon: ProfileIcon
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