/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentRegisterForm } from '../models/CommentRegisterForm';
import type { CommentRegisterResponse } from '../models/CommentRegisterResponse';
import type { PostDetailResponse } from '../models/PostDetailResponse';
import type { PostEditForm } from '../models/PostEditForm';
import type { PostIndexResponse } from '../models/PostIndexResponse';
import type { PostRegisterForm } from '../models/PostRegisterForm';
import type { PostRegisterResponse } from '../models/PostRegisterResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostRepository {
  /**
   * ポスト詳細
   * 投稿内容の詳細を取得する
   * @returns PostDetailResponse OK
   * @throws ApiError
   */
  public static detail({
    id,
  }: {
    id: string,
  }): CancelablePromise<PostDetailResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/post/{id}',
      path: {
        'id': id,
      },
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * ポスト更新
   * 投稿内容を更新する
   * @returns any OK
   * @throws ApiError
   */
  public static edit({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: PostEditForm,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/post/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * ポスト一覧
   * 投稿内容の一覧を取得する
   * @returns PostIndexResponse OK
   * @throws ApiError
   */
  public static index(): CancelablePromise<Array<PostIndexResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/post',
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * ポスト投稿
   * 投稿する
   * @returns PostRegisterResponse OK
   * @throws ApiError
   */
  public static post({
    requestBody,
  }: {
    requestBody: PostRegisterForm,
  }): CancelablePromise<PostRegisterResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/post',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * ポストに対するコメント投稿
   * ポストに対するコメントを投稿する
   * @returns CommentRegisterResponse OK
   * @throws ApiError
   */
  public static post1({
    requestBody,
  }: {
    requestBody: CommentRegisterForm,
  }): CancelablePromise<CommentRegisterResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/post/{id}/comment',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
      },
    });
  }
}
