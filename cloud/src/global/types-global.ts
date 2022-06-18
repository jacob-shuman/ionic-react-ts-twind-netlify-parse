import * as Parse from 'parse';

export type CloudCodeProps<T = {}> = Parse.Cloud.FunctionRequest<
  Parse.Cloud.Params & T
>;

export type CloudJobProps<T = {}> = Parse.Cloud.JobRequest<T>;
