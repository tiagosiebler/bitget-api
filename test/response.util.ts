import { API_ERROR_CODE } from '../src';

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

export function errorResponseObjectV3(
  result: null | any = null,
  retCode: number,
) {
  return {
    result,
    retCode: retCode,
  };
}

export function notAuthenticatedError() {
  return new Error('Private endpoints require api and private keys set');
}
