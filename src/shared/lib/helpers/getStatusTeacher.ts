import { useTeachers } from "@/entities";

export const getStatusTeacher = () => {
    const { backgroundTask, teacherScheduleStatus, isReady } = useTeachers()
    if (backgroundTask) {
        return backgroundTask?.status === 'SUCCESS' &&
            teacherScheduleStatus === 'success'
            ? 'success'
            : backgroundTask?.status === 'FAILED' || teacherScheduleStatus === 'error'
                ? 'error'
                : 'loading';
    }
    if (!backgroundTask && !isReady && teacherScheduleStatus === 'success') {
        return 'error'
    }
    return teacherScheduleStatus;
};