/**
 * user
 *
 * {\"userId\":0,\"userName\":\"admin1\",\"userType\":0,\"distCode\":\"string\",\"realName\":\"string\",\"duty\":0,\"sex\":0,\"contactTel\":\"string\",\"emall\":\"string\",\"headImgUrl\":\"string\",\"lastLoginTime\":\"2021-04-24T00:54:26.872Z\"}"
 */
export class User {

  constructor(userId, userName, userType, distCode, realName, duty, sex, contactTel, emall, headImgUrl) {
    this.userId = userId;
    this.userName = userName;
    this.userType = userType;
    this.distCode = distCode;
    this.realName = realName;
    this.duty = duty;
    this.sex = sex;
    this.contactTel = contactTel;
    this.emall = emall;
    this.headImgUrl = headImgUrl;
  }
}