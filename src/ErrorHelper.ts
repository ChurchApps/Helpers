import { ErrorLogInterface, ErrrorAppDataInterface } from "./interfaces/Error";
import { ApiHelper } from "./ApiHelper";


export class ErrorHelper {

  static getAppData:() => { churchId: string, userId: string, originUrl: string, application: string};
  static customErrorHandler:(errorLog:ErrorLogInterface) => void;

  static init = (getAppData:() => ErrrorAppDataInterface, customErrorHandler:(errorLog:ErrorLogInterface) => void) => {
    ErrorHelper.getAppData = getAppData;
    ErrorHelper.customErrorHandler = customErrorHandler;
  }

  static logError = (errorType:string, message:string, details:string) => {
    if (this.getAppData)
    {
      const data = this.getAppData();
      const log:ErrorLogInterface = {
        application: data.application,
        errorTime: new Date(),
        userId: data.userId,
        churchId: data.churchId,
        originUrl: data.originUrl,
        errorType: errorType,
        message: message,
        details: details
      }

      if (log.errorType==="401" && log.message.indexOf("/users/login")>-1) return;
      ApiHelper.postAnonymous("/errors", [log], "MembershipApi");
      if (ErrorHelper.customErrorHandler) ErrorHelper.customErrorHandler(log);
    }
  }

}
