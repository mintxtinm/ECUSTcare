import basicService from "./BasicService";
import store from "../store";
class careService {
  static async getRouteList() {
    var today = new Date();
    var year = today.getFullYear();
    const rsp = await basicService.getRequest("/api/travel/" + year);
    await store.dispatch("getRouteList", rsp.routeList);
    return rsp;
  }

  static async enroll(routeId, groupId) {
    const rsp = await basicService.postRequest("/api/travel-applicant/pc", {
      username: store.getters.userInfo.username,
      groupId: groupId
    });
    if (rsp.message == "报名成功") {
      var enrollInfo = {};
      enrollInfo.routeId = routeId;
      enrollInfo.groupId = groupId;
      await store.dispatch("enroll", enrollInfo);
    }
    return rsp;
  }

  static async cancel() {
    const rsp = await basicService.deleteRequest("/api/travel-applicant/pc", {
      username: store.getters.userInfo.username
    });
    if (rsp.message == "取消成功") {
      var enrollInfo = {};
      enrollInfo.routeId = null;
      enrollInfo.groupId = null;
      await store.dispatch("enroll", enrollInfo);
    }
    return rsp;
  }
}

export default careService;
