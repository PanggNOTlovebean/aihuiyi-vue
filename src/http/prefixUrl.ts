const { VITE_PAGE_MODE } = import.meta.env;

const IS_PRODUCT = VITE_PAGE_MODE === 'production';

type PrefixUrlConfig = {
  plmUrl?: string;
  changeUrl?: string;
  commandsUrl?: string;
  generalTask?: string;
};
let prefixUrlConfig: PrefixUrlConfig = {};
if (IS_PRODUCT) {
  prefixUrlConfig = {
    ...prefixUrlConfig,
    commandsUrl: '/cmd-service',
    plmUrl: '/wuyou-apiserver/plm/v1',
    changeUrl: '/api/change',
    generalTask: '/bne-general-task/general-task/v1'
  };
} else {
  prefixUrlConfig = {
    ...prefixUrlConfig,
    plmUrl: '/plm/v1',
    commandsUrl: '',
    changeUrl: '/change/api/change',
    generalTask: '/bne-general-task/general-task/v1'
  };
}
export default prefixUrlConfig;
