
import { get } from '@/config/http'

const basePath = '/act/node'

export const loadNextNodes = (nodeId) => get(basePath + '/options', { nodeId })
