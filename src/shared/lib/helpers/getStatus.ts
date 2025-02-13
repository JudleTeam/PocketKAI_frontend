import { useSchedule } from "@/entities";

export const getStatus = () => {
    const { backgroundTask, weekScheduleStatus } = useSchedule()
    if (backgroundTask) {
        return backgroundTask?.status === 'SUCCESS' &&
            weekScheduleStatus === 'success'
            ? 'success'
            : backgroundTask?.status === 'FAILED' || weekScheduleStatus === 'error'
                ? 'error'
                : 'loading';
    }
    return weekScheduleStatus;
};