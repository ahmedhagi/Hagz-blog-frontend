import { UrlProvider } from "./UrlProvider"
/**
 * The url provider singleton instance manager. It simply provides only 1 instance for all the
 * application.
 */
export class UrlProviderInstanceManager {
    static getInstance() {
      if (!UrlProviderInstanceManager._instance)
        UrlProviderInstanceManager._instance = new UrlProvider()
      return UrlProviderInstanceManager._instance
    }
  }
  // Create an instance and assign it to a unique ad simple variable
  export const urlProvider = UrlProviderInstanceManager.getInstance()