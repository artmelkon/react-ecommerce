import { router } from '../routes';

export function routerApi(app: any) {
  app.use('/api', router)
}
