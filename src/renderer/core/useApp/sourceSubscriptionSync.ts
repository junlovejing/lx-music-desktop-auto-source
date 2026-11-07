import { userApi } from '@renderer/store'
import { appSetting } from '@renderer/store/setting'
import { refreshUserApiSources } from '@renderer/utils/ipc'
import {
  activateAutoUserApi,
  isAutoUserApiSource,
  loadImportedUserApi,
  setExpectedLoadId,
  setLoadedUserApiId,
} from '@renderer/core/userApiFailover'
import { isImportedUserApiId } from '@common/sources/user/ids'

let pending: Promise<boolean> | null = null

const syncNow = async() => {
  const url = (appSetting['common.sourceListUrl'] ?? '').trim()
  if (!url) return false
  const result = await refreshUserApiSources(url)
  if (!result.updated) return false

  userApi.list = result.list
  setLoadedUserApiId(null)
  setExpectedLoadId(null)
  userApi.status = false
  userApi.apis = {}

  const selected = appSetting['common.apiSource']
  try {
    if (isAutoUserApiSource(selected)) {
      await activateAutoUserApi()
    } else if (isImportedUserApiId(selected) && result.list.some(item => item.id === selected)) {
      await loadImportedUserApi(selected)
    }
  } catch (err) {
    console.log('[userApi subscription] startup reload failed', err)
  }
  return true
}

/** Check the saved source subscription once after application data is ready. */
export const syncSourceSubscriptionOnStartup = async() => {
  if (!pending) {
    pending = syncNow().catch(err => {
      console.log('[userApi subscription] startup sync failed', err)
      return false
    }).finally(() => {
      pending = null
    })
  }
  return await pending
}

