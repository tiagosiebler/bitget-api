import { API_ERROR_CODE } from '../src/index.js';

const SUCCESS_MSG_REGEX = /success/gim;

export function successResponseString() {
  return {
    data: expect.any(String),
    ...sucessEmptyResponseObject(),
  };
}

export function sucessEmptyResponseObject() {
  return {
    code: API_ERROR_CODE.SUCCESS,
    msg: expect.stringMatching(SUCCESS_MSG_REGEX),
  };
}

export function errorResponseObject(
  result: null | any = null,
  ret_code: number,
  ret_msg: string,
) {
  return {
    result,
    ret_code,
    ret_msg,
  };
}

export function errorResponseObjectV3(code: string, statusCode: number = 400) {
  return {
    body: {
      code,
      data: null,
      msg: expect.any(String),
      requestTime: expect.any(Number),
    },
    code: statusCode,
    headers: expect.any(Object),
    message: expect.any(String),
    requestOptions: expect.any(Object),
  };
}

export function notAuthenticatedError() {
  return new Error('Private endpoints require api and private keys set');
}
