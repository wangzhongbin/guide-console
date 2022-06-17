
export const uploadApi = () => process.env.NODE_ENV === 'production' ? '/api/resource/upload/file' : '/api/resource/upload/file'
