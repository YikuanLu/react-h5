
import { clientEnv } from '@/components/common/openAppBtn'

const URL = 'https://app.daishutiyu.com/#/download'

export const openIOSApp = (cb:()=>void):void => {
  const envInfor = clientEnv()
  if (envInfor.isWeibo || envInfor.isQQ) {
    cb()
    return
  }
  window.location.href = URL
}
