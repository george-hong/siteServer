import dayjs from 'dayjs';

export const getCurrentTime = () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
};