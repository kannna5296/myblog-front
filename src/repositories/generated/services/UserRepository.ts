/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterUserRequest } from '../models/RegisterUserRequest';
import type { RegisterUserResponse } from '../models/RegisterUserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserRepository {
  /**
   * ユーザ登録
   * ユーザを登録する
   * @returns RegisterUserResponse OK
   * @throws ApiError
   */
  public static register({
    requestBody,
  }: {
    requestBody: RegisterUserRequest,
  }): CancelablePromise<RegisterUserResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
      },
    });
  }
}
