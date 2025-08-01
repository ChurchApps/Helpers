
export class CommonEnvironmentHelper {
  public static AttendanceApi = "";
  public static DoingApi = "";
  public static GivingApi = "";
  public static MembershipApi = "";
  public static ReportingApi = "";
  public static MessagingApi = "";
  public static MessagingApiSocket = "";
  public static ContentApi = "";
  public static AskApi = "";
  public static GoogleAnalyticsTag = "";

  static ContentRoot = "";
  static B1Root = "";
  static ChumsRoot = "";
  static LessonsRoot = "";

  static init = (stage: string) => {
    switch (stage) {
      case "demo": CommonEnvironmentHelper.initDemo(); break;
      case "staging": CommonEnvironmentHelper.initStaging(); break;
      case "prod": CommonEnvironmentHelper.initProd(); break;
      default: CommonEnvironmentHelper.initDev(); break;
    }
  }

  static initDev = () => {
    this.initStaging(); //Use staging values for anything not provided
    CommonEnvironmentHelper.AttendanceApi = process.env.REACT_APP_ATTENDANCE_API || process.env.NEXT_PUBLIC_ATTENDANCE_API || CommonEnvironmentHelper.AttendanceApi;
    CommonEnvironmentHelper.DoingApi = process.env.REACT_APP_DOING_API || process.env.NEXT_PUBLIC_DOING_API || CommonEnvironmentHelper.DoingApi;
    CommonEnvironmentHelper.GivingApi = process.env.REACT_APP_GIVING_API || process.env.NEXT_PUBLIC_GIVING_API || CommonEnvironmentHelper.GivingApi;
    CommonEnvironmentHelper.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API || process.env.NEXT_PUBLIC_MEMBERSHIP_API || CommonEnvironmentHelper.MembershipApi;
    CommonEnvironmentHelper.ReportingApi = process.env.REACT_APP_REPORTING_API || process.env.NEXT_PUBLIC_REPORTING_API || CommonEnvironmentHelper.ReportingApi;
    CommonEnvironmentHelper.MessagingApi = process.env.REACT_APP_MESSAGING_API || process.env.NEXT_PUBLIC_MESSAGING_API || CommonEnvironmentHelper.MessagingApi;
    CommonEnvironmentHelper.MessagingApiSocket = process.env.REACT_APP_MESSAGING_API_SOCKET || process.env.NEXT_PUBLIC_MESSAGING_API_SOCKET || CommonEnvironmentHelper.MessagingApiSocket;
    CommonEnvironmentHelper.ContentApi = process.env.REACT_APP_CONTENT_API || process.env.NEXT_PUBLIC_CONTENT_API || CommonEnvironmentHelper.ContentApi;
    CommonEnvironmentHelper.AskApi = process.env.REACT_APP_ASK_API || process.env.NEXT_PUBLIC_ASK_API || CommonEnvironmentHelper.AskApi;
    CommonEnvironmentHelper.GoogleAnalyticsTag = process.env.REACT_APP_GOOGLE_ANALYTICS || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || CommonEnvironmentHelper.GoogleAnalyticsTag;

    CommonEnvironmentHelper.ContentRoot = process.env.REACT_APP_CONTENT_ROOT || process.env.NEXT_PUBLIC_CONTENT_ROOT || CommonEnvironmentHelper.ContentRoot;
    CommonEnvironmentHelper.B1Root = process.env.REACT_APP_B1_ROOT || process.env.NEXT_PUBLIC_B1_ROOT || CommonEnvironmentHelper.B1Root;
    CommonEnvironmentHelper.ChumsRoot = process.env.REACT_APP_CHUMS_ROOT || process.env.NEXT_PUBLIC_CHUMS_ROOT || CommonEnvironmentHelper.ChumsRoot;
    CommonEnvironmentHelper.LessonsRoot = process.env.REACT_APP_LESSONS_ROOT || process.env.NEXT_PUBLIC_LESSONS_ROOT || CommonEnvironmentHelper.LessonsRoot;
  }

  //NOTE: None of these values are secret.
  static initDemo = () => {
    CommonEnvironmentHelper.AttendanceApi = "https://attendanceapi.demo.churchapps.org";
    CommonEnvironmentHelper.DoingApi = "https://doingapi.demo.churchapps.org";
    CommonEnvironmentHelper.GivingApi = "https://givingapi.demo.churchapps.org";
    CommonEnvironmentHelper.MembershipApi = "https://membershipapi.demo.churchapps.org";
    CommonEnvironmentHelper.ReportingApi = "https://reportingapi.demo.churchapps.org";
    CommonEnvironmentHelper.MessagingApi = "https://messagingapi.demo.churchapps.org";
    CommonEnvironmentHelper.MessagingApiSocket = "wss://socket.demo.churchapps.org";
    CommonEnvironmentHelper.ContentApi = "https://contentapi.demo.churchapps.org";
    CommonEnvironmentHelper.AskApi = "https://askapi.demo.churchapps.org";
    CommonEnvironmentHelper.GoogleAnalyticsTag = "";

    CommonEnvironmentHelper.ContentRoot = "https://content.demo.churchapps.org";
    CommonEnvironmentHelper.B1Root = "https://{key}.demo.b1.church";
    CommonEnvironmentHelper.ChumsRoot = "https://app.demo.chums.org";
    CommonEnvironmentHelper.LessonsRoot = "https://demo.lessons.church";
  }

  //NOTE: None of these values are secret.
  static initStaging = () => {
    CommonEnvironmentHelper.AttendanceApi = "https://attendanceapi.staging.churchapps.org";
    CommonEnvironmentHelper.DoingApi = "https://doingapi.staging.churchapps.org";
    CommonEnvironmentHelper.GivingApi = "https://givingapi.staging.churchapps.org";
    CommonEnvironmentHelper.MembershipApi = "https://membershipapi.staging.churchapps.org";
    CommonEnvironmentHelper.ReportingApi = "https://reportingapi.staging.churchapps.org";
    CommonEnvironmentHelper.MessagingApi = "https://messagingapi.staging.churchapps.org";
    CommonEnvironmentHelper.MessagingApiSocket = "wss://socket.staging.churchapps.org";
    CommonEnvironmentHelper.ContentApi = "https://contentapi.staging.churchapps.org";
    CommonEnvironmentHelper.AskApi = "https://askapi.staging.churchapps.org";
    CommonEnvironmentHelper.GoogleAnalyticsTag = "";

    CommonEnvironmentHelper.ContentRoot = "https://content.staging.churchapps.org";
    CommonEnvironmentHelper.B1Root = "https://{key}.staging.b1.church";
    CommonEnvironmentHelper.ChumsRoot = "https://app.staging.chums.org";
    CommonEnvironmentHelper.LessonsRoot = "https://staging.lessons.church";
  }

  //NOTE: None of these values are secret.
  static initProd = () => {
    CommonEnvironmentHelper.AttendanceApi = "https://attendanceapi.churchapps.org";
    CommonEnvironmentHelper.DoingApi = "https://doingapi.churchapps.org";
    CommonEnvironmentHelper.GivingApi = "https://givingapi.churchapps.org";
    CommonEnvironmentHelper.MembershipApi = "https://membershipapi.churchapps.org";
    CommonEnvironmentHelper.ReportingApi = "https://reportingapi.churchapps.org";
    CommonEnvironmentHelper.MessagingApi = "https://messagingapi.churchapps.org";
    CommonEnvironmentHelper.MessagingApiSocket = "wss://socket.churchapps.org";
    CommonEnvironmentHelper.ContentApi = "https://contentapi.churchapps.org";
    CommonEnvironmentHelper.AskApi = "https://askapi.churchapps.org";

    CommonEnvironmentHelper.ContentRoot = "https://content.churchapps.org";
    CommonEnvironmentHelper.B1Root = "https://{key}.b1.church";
    CommonEnvironmentHelper.ChumsRoot = "https://app.chums.org";
    CommonEnvironmentHelper.LessonsRoot = "https://lessons.church";
  }

}

