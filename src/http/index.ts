import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer
} from 'axios';
import type {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig
} from './types.d';
// import { stringify } from 'qs';
// import { getToken, formatToken } from '@/utils/auth';
// import { useUserStoreHook } from '@/store/modules/user';
import { ElMessageBox, ElMessage } from 'element-plus';
import prefixUrlConfig from './prefixUrl';

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    // 所有接口都加上这个token
    Authorization:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic2RuIiwic2VydmljZSI6InNkbiIsIm1ldGhvZCI6WyJHRVQiLCJQT1NUIiwiUFVUIiwiREVMRVRFIl0sInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJwcmVmaXgiOlsiLyoqIl19.4iL9SgAAnht5mlne5V5uK-LF25-WtBdrYjEqDDxTkVg',
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  // paramsSerializer: {
  //   serialize: stringify as unknown as CustomParamsSerializer
  // }
};

// const postReloadMessage = () => {
//   const postData = {
//     from: 'auth',
//     event: 'reload'
//   };
//   ElMessageBox.alert('登录超时, 请刷新页面', '登录超时', {
//     confirmButtonText: '确定',
//     callback: action => {
//       if (action !== 'confirm') {
//         return;
//       }
//       // location.reload();
//       window.parent.postMessage(JSON.stringify(postData), '*');
//     }
//   });
// };

class PureHttp {
  constructor(config = {}) {
    this.axiosInstance = Axios.create({ ...defaultConfig, ...config });
    // this.httpInterceptorsResponse()
  }

  /** token过期后，暂存待执行的请求 */
  private requests = [];

  /** 防止重复刷新token */
  private isRefreshing = false;

  /** 初始化配置对象 */
  private initConfig: PureHttpRequestConfig = {};

  /** 保存当前Axios实例对象 */
  private axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  // private retryOriginalRequest(config: PureHttpRequestConfig) {
  //   return new Promise(resolve => {
  //     this.requests.push((token: string) => {
  //       config.headers["Authorization"] = formatToken(token);
  //       resolve(config);
  //     });
  //   });
  // }

  /** 请求拦截 */

  /** 响应拦截 */
  // private httpInterceptorsResponse(): void {
  //   const instance = this.axiosInstance;
  //   instance.interceptors.response.use(
  //     (response: PureHttpResponse) => {
  //       const $config = response.config;
  //       // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
  //       if (typeof $config.beforeResponseCallback === 'function') {
  //         $config.beforeResponseCallback(response);
  //         return response.data;
  //       }
  //       if (this.initConfig.beforeResponseCallback) {
  //         this.initConfig.beforeResponseCallback(response);
  //         return response.data;
  //       }
  //       return response.data;
  //     },
  //     (error: PureHttpError) => {
  //       const $error = error;
  //       $error.isCancelRequest = Axios.isCancel($error);
  //       // 关闭进度条动画
  //       // 所有的响应异常 区分来源为取消请求/非取消请求
  //       return Promise.reject($error);
  //     }
  //   );
  // }
  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as PureHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T> & {
      ignoreMessage?: boolean;
      ignoreError?: boolean;
    },
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, config)
      .then(res => {
        if (res.code !== 0 && !params.ignoreError) {
          return Promise.reject(res);
        }
        return res;
      })
      .catch(err => {
        if (!params.ignoreMessage) {
          ElMessage.error(err.message || err || '请求失败');
        }
        return Promise.reject(err);
      });
  }
  public delete<T, P>(
    url: string,
    params?: AxiosRequestConfig<T> & { ignoreMessage?: boolean },
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('delete', url, params, config)
      .then(res => {
        if (res.code !== 0) {
          return Promise.reject(res);
        }
        return res;
      })
      .catch(err => {
        if (!params.ignoreMessage) {
          ElMessage.error(err.message || err || '请求失败');
        }
        return Promise.reject(err);
      });
  }
  public put<T, P>(
    url: string,
    params?: AxiosRequestConfig<T> & { ignoreMessage?: boolean },
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('put', url, params, config)
      .then(res => {
        if (res.code !== 0) {
          return Promise.reject(res);
        }
        return res;
      })
      .catch(err => {
        if (!params.ignoreMessage) {
          ElMessage.error(err.message || err || '请求失败');
        }
        return Promise.reject(err);
      });
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    data?: Record<string, any>,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    let _params = params || {};
    return this.request<P>('get', url, { params: data, ..._params }, config)
      .then(res => {
        console.log(' res =========> ', res)
        if (res.code !== 0) {
          return Promise.reject(res);
        }
        return res;
      })
      .catch(err => {
        console.log(' err =========> ', err)
        ElMessage.error(err.message || err || '请求失败');
        return Promise.reject(err);
      });
  }
}

export const http = new PureHttp();

export const plmhttp = new PureHttp({
  baseURL: prefixUrlConfig.plmUrl
});

export const changeHttp = new PureHttp({
  baseURL: prefixUrlConfig.changeUrl
});

export const GeneralHttp = new PureHttp({
  baseURL: prefixUrlConfig.generalTask
});
export const lilouHttp = new PureHttp({
  headers: {
    'X-lilou-authorization': 'ST-1060140068819111937-2Q0fJkQetIEf8mognJw4-beta'
  },
  baseURL: 'http://10.138.26.138:8723/'
});
