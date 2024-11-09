
const urlFallback = require("./url-fallback.json")
/**
 Provider to allow access to configuration urls
 */
export class UrlProvider {
  constructor() {
    this._defaultDomainUrl = ""
    // Init variables
    this.init()
  }
  init() {
  
    //Default domain url 
    this._defaultDomainUrl = process.env.REACT_APP_API_URL

    if (!this._defaultDomainUrl) {
      console.error(
        "ERROR: Unable to load default domain url . Fallback urls will be used"
      )
      // Load fallback urls
      this._defaultDomainUrl = urlFallback.domain
    }
    
  }
  /**
   * Returns the url to use for reaching the domain server.
   * If there is an override set, it will return the override value
   */
  getDomainUrl() {
    return this._overrideDomainUrl || this._defaultDomainUrl
  }
  /**
   * Sets an override value for the domain url
   * @param value
   */
  overrideDomainUrl(value) {
    this._overrideDomainUrl = value
  }
  

}
