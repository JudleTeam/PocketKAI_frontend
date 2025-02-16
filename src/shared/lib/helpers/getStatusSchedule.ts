import { useSchedule } from "@/entities";

export const getStatusSchedule = () => {
    const { backgroundTask, weekScheduleStatus, isReady } = useSchedule()
    if (backgroundTask) {
        return backgroundTask?.status === 'SUCCESS' &&
            weekScheduleStatus === 'success'
            ? 'success'
            : backgroundTask?.status === 'FAILED' || weekScheduleStatus === 'error'
                ? 'error'
                : 'loading';
    }
    if (!backgroundTask && !isReady && weekScheduleStatus === 'success') {
        return 'error'
    }
    return weekScheduleStatus;
};