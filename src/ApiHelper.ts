import { ApiConfig, RolePermissionInterface, ApiListType } from "./interfaces";
import { ErrorHelper } from "./ErrorHelper";

export class ApiHelper {

  static apiConfigs: ApiConfig[] = [];
  static isAuthenticated = false;
  static onRequest: (url:string, requestOptions:any) => void;
  static onError: (url:string, requestOptions:any, error: any) => void;

  static getConfig(keyName: string) {
    let result: ApiConfig = null;
    this.apiConfigs.forEach(config => { if (config.keyName === keyName) result = config });
    //if (result === null) throw new Error("Unconfigured API: " + keyName);
    return result;
  }

  static setDefaultPermissions(jwt: string) {
    this.apiConfigs.forEach(config => {
      config.jwt = jwt;
      config.permissions = [];
    });
    this.isAuthenticated = true;
  }

  static setPermissions(keyName: string, jwt: string, permissions: RolePermissionInterface[]) {
    this.apiConfigs.forEach(config => {
      if (config.keyName === keyName) {
        config.jwt = jwt;
        config.permissions = permissions;
      }
    });
    this.isAuthenticated = true;
  }

  static clearPermissions() {
    this.apiConfigs.forEach(config => { config.jwt = ""; config.permissions = []; });
    this.isAuthenticated = false;
  }

  static async get(path: string, apiName: ApiListType) {
    const config = this.getConfig(apiName);
    if (!config) throw new Error(`API configuration not found: ${apiName}`);
    const requestOptions = { method: "GET", headers: { Authorization: "Bearer " + config.jwt } };
    return await this.fetchWithErrorHandling(config.url + path, requestOptions);
  }

  static async getAnonymous(path: string, apiName: ApiListType) {
    const config = this.getConfig(apiName);
    const requestOptions = { method: "GET" };
    return await this.fetchWithErrorHandling(config.url + path, requestOptions);
  }

  static async post(path: string, data: any[] | {}, apiName: ApiListType) {
    const config = this.getConfig(apiName);
    if (!config) throw new Error(`API configuration not found: ${apiName}`);
    const requestOptions = {
      method: "POST",
      headers: { Authorization: "Bearer " + config.jwt, "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return await this.fetchWithErrorHandling(config.url + path, requestOptions);
  }

  static async patch(path: string, data: any[] | {}, apiName: ApiListType) {
    const config = this.getConfig(apiName);
    if (!config) throw new Error(`API configuration not found: ${apiName}`);
    const requestOptions = {
      method: "PATCH",
      headers: { Authorization: "Bearer " + config.jwt, "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return await this.fetchWithErrorHandling(config.url + path, requestOptions);
  }

  static async delete(path: string, apiName: ApiListType) {
    const config = this.getConfig(apiName);
    if (!config) throw new Error(`API configuration not found: ${apiName}`);
    const requestOptions = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + config.jwt }
    };
    if (this.onRequest) this.onRequest(config.url + path, requestOptions);
    try {
      const response = await fetch(config.url + path, requestOptions);
      if (!response.ok) await this.throwApiError(response);
    } catch (e) {
      console.log(e);
      if (this.onError) this.onError(config.url + path, requestOptions, e);
      throw (e);
    }
  }

  static async postAnonymous(path: string, data: any[] | {}, apiName: ApiListType) {
    const config = this.getConfig(apiName);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return await this.fetchWithErrorHandling(config.url + path, requestOptions);
  }

  static async fetchWithErrorHandling(url: string, requestOptions: any) {
    if (this.onRequest) this.onRequest(url, requestOptions);
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) await this.throwApiError(response);
      else {
        if (response.status !== 204 ) {
          return response.json();
        }
      }
    } catch (e) {
      console.log("Error loading url: " + url);
      console.log(e)
      throw (e);
    }
  }

  private static async throwApiError(response: Response) {
    let msg = response.statusText;
    try {
      msg = await response.text();
    } catch {}
    try {
      const json = await response.json();
      msg = json.errors[0];
    } catch { }
    console.log("RESPONSE", response)
    ErrorHelper.logError(response.status.toString(), response.url, msg);
    throw new Error(msg || "Error");
  }

}
