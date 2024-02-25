export enum ErrorCode {
  None = 200,
  BadRequest = 400,
  Exception = 500,
  NotFound = 404,
  AuthFailed = 401,
  AccessDenied = 403,
}

export class ControllerResponse {
  success: boolean;
  data: any;
  errorCode: ErrorCode;
  message: string;

  constructor(
    _success: boolean,
    _data: object | null,
    _message: string = "",
    _errorCode: ErrorCode = ErrorCode.None
  ) {
    this.success = _success;
    this.data = _data;
    this.message = _message;
    this.errorCode = _errorCode;
  }
}

export function successResponse(
  _data: object,
  _message: string = ""
): ControllerResponse {
  return new ControllerResponse(true, _data, _message);
}
export function errorResponse(
  _errorType: ErrorCode,
  _message: string
): ControllerResponse {
  return new ControllerResponse(false, null, _message, _errorType);
}

export function omitObject(
  propName: string,
  { [propName]: _, ...others }
): object {
  return { ...others };
}

export function removeErrorCode(obj: object) {
  return omitObject("errorCode", obj);
}

export function checkObjectKeys(obj: object, keys: string[]) {
  if (!obj) {
    return keys;
  }

  const result: string[] = [];
  keys.forEach((val) => {
    if (!(val in obj)) {
      result.push(val);
    }
  });

  return result;
}
