
export const uploadApi = () => process.env.NODE_ENV === 'production' ? '/resource/upload/file' : '/api/resource/upload/file'
