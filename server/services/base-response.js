/*
=============================================================
 Title: base-response.js
 Author: Professor Krasso
 Date:   30 September 2020
 Modified By: Janet Blohn
 Description: nodebucket project
 Sends the data needed on a good response back to the requestor
=============================================================
*/
class BaseResponse {
  // Use the sent http, message, and data for the response
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      // Return it with and include the timestamp
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}
module.exports = BaseResponse;
