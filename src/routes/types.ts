export interface BaseResponse<Data> {
  error: Error | null;
  data: Data | null;
}
