export enum AnalyticsEvent {
  mainClickGroupPopover = 'main_click_group_popover',
  mainSearchGroup = 'main_search_group',
  mainChangeGroup = 'main_change_group',
  mainModalOpen = 'main_modal_open',
  mainSwitchTheme = 'main_switch_theme',

  scheduleSwitchFull = 'schedule_switch_full',
  scheduleSwitchTimeline = 'schedule_switch_timeline',

  scheduleOpenContextDay = 'schedule_open_context_day',
  scheduleCopyDay = 'schedule_copy_day',
  scheduleCopyWeek = 'schedule_copy_week',
  scheduleView2WeeksBack = 'schedule_view_2_weeks_back',
  scheduleView2WeeksForward = 'schedule_view_2_weeks_forward',
  scheduleViewToday = 'schedule_view_today',
  scheduleClickDate = 'schedule_click_date',

  lessonOpenContext = 'lesson_open_context',
  lessonHide = 'lesson_hide',
  lessonOpenDrawer = 'lesson_open_drawer',
  lessonViewBuildingInfo = 'lesson_view_building_info',
  lessonViewHidden = 'lesson_view_hidden',
  lessonDeleteHidden = 'lesson_delete_hidden',
  lessonReport = 'lesson_report',

  teacherOpenDrawer = 'teacher_open_drawer',
  teacherSwitchToSearch = 'teacher_switch_to_search',
  teacherSearch = 'teacher_search',
  teacherCopyName = 'teacher_copy_name',

  feedbackGoToTg = 'feedback_go_to_tg',
}

export enum ClickSource {
  groupPopover = 'Поповер',
  mainButton = 'Кнопка на главной',
  settingsDrawer = 'Дравер',
  settingsPage = 'Настройки',
  TodayDate = 'Сегодняшнее число',
  GoUpButton = 'Кнопка "вверх"',
  groupTeachers = 'Преподы группы',
  foundTeachers = 'Найденные преподы',
  lessonDrawer = 'Дравер пары',
  feedbackForm = 'Форма обратной связи',
  aboutUs = 'О нас',
  faq = 'Частые вопросы',
}

export enum HideType {
  today = 'На сегодня',
  week = 'На неделю'
}