import mySQL from '../../mySQL';
import { tableNames } from '../../mySQL/config';

const intervalTask = {
    // 清除token表中失效的token
    clearTokenTable () {
        mySQL.removeGroup(tableNames.token, {
            fields: [{
                key: 'expiresTime',
                value: Date.now(),
                condition: '<'
            }]
        })
    },
    runAndSetInterval (progress, minutes) {
        progress();
        setInterval(progress, 1000 * 60 * minutes);
    },
    begin () {
        console.log('开启定时任务')
        this.runAndSetInterval(this.clearTokenTable, 10);
    }
};

export default intervalTask;