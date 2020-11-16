import { runProdServer } from './index';
import intervalTask from './task/intervalTask/intervalTask';

runProdServer();
// 启动定时任务
intervalTask.begin();