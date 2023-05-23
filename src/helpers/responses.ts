import { BaseResponse } from '../routes/types';

export function successResponse<Res extends unknown | null>(data: Res): BaseResponse<Res> {
  return {
    error: null,
    data: data,
  };
}
