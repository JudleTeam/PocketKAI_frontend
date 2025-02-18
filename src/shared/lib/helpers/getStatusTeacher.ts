import { BackgroundTaskStatus, FetchStatus } from "@/shared/types";

type StoreBackgroundTasks = {
    id: string;
    status: BackgroundTaskStatus;
};

export const getStatusTeacher = (
    backgroundTask: StoreBackgroundTasks | null,
    teacherScheduleStatus: FetchStatus,
    isReady: boolean
): FetchStatus => {
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