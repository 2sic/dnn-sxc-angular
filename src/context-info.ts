
// These are the parameters which make up the current context / state of this app
// It's mainly needed to ensure that the Http Service is correctly set up

import { SxcInstance } from "./interfaces/sxc-instance";

/**
 * the context in which the current app is running
 * important to interact with the server
 * or with the DNN around it
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
}
