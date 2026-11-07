declare namespace LX {
  namespace UserApi {
    type UserApiSourceInfoType = 'music'
    type UserApiSourceInfoActions = 'musicUrl' | 'lyric' | 'pic'

    interface UserApiSourceInfo {
      name: string
      type: UserApiSourceInfoType
      actions: UserApiSourceInfoActions[]
      qualitys: LX.Quality[]
    }

    type UserApiSources = Record<LX.Source, UserApiSourceInfo>


    interface UserApiInfoFull {
      id: string
      name: string
      description: string
      script: string
      allowShowUpdateAlert: boolean
      author?: string
      homepage?: string
      version?: string
      sources?: UserApiSources
      /** 脚本远程地址。只在全部失败后的兜底里用来对比，平时播放不请求它。 */
      scriptUrl?: string
      /** 订阅清单中的原始 ID。允许订阅认领内容相同的手动导入项而不改变其本地 ID。 */
      subscriptionSourceId?: string
      /** 该订阅项原本由用户手动导入；清单删除它时恢复为手动项，不删除用户数据。 */
      subscriptionClaimedManual?: boolean
    }

    type UserApiInfo = Omit<UserApiInfoFull, 'script'>

    interface RefreshUserApiResult {
      updated: boolean
      list: UserApiInfo[]
    }

    interface UserApiStatus {
      status: boolean
      message?: string
      apiInfo?: UserApiInfo
    }

    interface UserApiUpdateInfo {
      name: string
      description: string
      log: string
      updateUrl?: string
    }

    interface UserApiRequestParams {
      requestKey: string
      data: any
    }
    type UserApiRequestCancelParams = string
    type UserApiSetApiParams = string

    interface UserApiSetAllowUpdateAlertParams {
      id: string
      enable: boolean
    }

    interface ImportUserApi {
      apiInfo: UserApiInfo
      apiList: UserApiInfo[]
    }

  }
}
