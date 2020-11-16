import { runDevServer } from './index';
import intervalTask from './task/intervalTask/intervalTask';

runDevServer()
// 启动定时任务
intervalTask.begin();