const EnvConfig = {
    project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    database_id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collection_id: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    enc_dec_key: String(import.meta.env.VITE_ENC_DEC_KEY),
    api_key: String(import.meta.env.VITE_APPWRITE_API_KEY)
}

export default EnvConfig;