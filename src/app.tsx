import { StoreValue } from '@/global'
import 'lib-flexible/flexible'

export function onRouteChange(arg: StoreValue): void {
  document.title = '袋鼠体育·DAIJI'
  if (
    arg.matchedRoutes.length > 0
    && arg.matchedRoutes[0].match.path === '/article/:type'
  ) {
    const { type } = arg.matchedRoutes[0].match.params
    if (type === 'picture' || type === 'video') {
      document.title = '袋鼠体育社区'
    }
  }
}
