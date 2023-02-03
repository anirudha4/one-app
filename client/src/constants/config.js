const VERSION = import.meta.env.REACT_APP_VERSION;

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const BASE_PATH = BASE_URL.replace(/^.*\/\/[^/]*(.*)[^?#]*.*$/, '$1');


const SERVER_BASE_URL = BASE_URL;

const SERVER_HOST_NAME = SERVER_BASE_URL.replace(/^(.*\/\/[^/?#]*).*$/, '$1');

const ACCESS_TOKEN_KEY = 'accessToken';
const ACCESS_TOKEN_VERSION_KEY = 'accessTokenVersion';
const ACCESS_TOKEN_VERSION = '1';

const POSITION_GAP = 65535;
const ACTIVITIES_LIMIT = 50;

export const INTEGRATIONS = [
    {
        id: 1,
        name: 'Splitwise',
        icon: '/integrations/splitwise.png',
        description: 'Splitwise Integration offers a hassle-free solution for keeping track of shared expenses. With this integration, users can easily sync all their expenses.',
        connect: '/app/integrations/splitwise/connect'
    },
    {
        id: 2,
        name: 'Notion',
        icon: '/integrations/notion.png',
        description: 'Notion Integration offers a comprehensive solution for tracking and managing expenses. With this integration, users can easily add and track expenses in Notion.'
    },
]

export default {
    VERSION,
    BASE_PATH,
    SERVER_BASE_URL,
    SERVER_HOST_NAME,
    ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_VERSION_KEY,
    ACCESS_TOKEN_VERSION,
    POSITION_GAP,
    ACTIVITIES_LIMIT,
};