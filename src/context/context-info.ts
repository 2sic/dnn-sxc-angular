import { SxcInstance } from '../interfaces/sxc-instance';
// These are the parameters which make up the current context / state of this app.
// It's mainly needed to ensure that the Http Service is correctly set up.

/**
 * The context in which the current app is running.
 * Important to interact with the server
 * or with the DNN around it.
 */
export class ContextInfo {
  /**
   * the DNN module id
   */
  moduleId: number;

  /**
   * the DNN tab id (internal page number)
   */
  tabId: number;

  /**
   * the 2sxc content block ID
   */
  contentBlockId: number;

  /**
   * the security / anti-forgery token for api-requests
   */
  antiForgeryToken: string;

  /**
   * the helper sxc-object to communicate with the server
   */
  sxc: SxcInstance;

  /**
   * If false, does not append any custom headers to DNN requests
   */
  addDnnHeaders: boolean;

  /**
   * Replace app name in path; replaces /app/auto/
  */
  appNameInPath: string;

  /**
   * Overrides the base path for 2sxc requests (used to develop locally and send requests to a remote 2sxc installation)
   * Requires CORS configuration on the target server
   * e.g. http://example.com/app-dnn-sxc-angular-dev/DesktopModules/2sxc/API/
   */
  path: string;

  /**
   * Sets the withCredentials option in HTTP requests (this allows to perform authenticated CORS requests)
   */
  withCredentials: boolean;
}
