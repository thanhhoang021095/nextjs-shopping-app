import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

export default publicRuntimeConfig.BASE_API_URL;