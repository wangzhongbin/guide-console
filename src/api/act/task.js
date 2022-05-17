
import { get } from '@/config/http'

const basePath = '/act/task'

export const loadTaskLogs = (taskId) => get(basePath + '/logs', { taskId })

export const loadWaitCount = () => get(basePath + '/count')
