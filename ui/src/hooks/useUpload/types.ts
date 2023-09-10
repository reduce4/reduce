/**
 * 服务器上传接口要求:
 *  requestHeader:
 *
 */
export interface uploadOption {
  serverUploadApi: ServerUploadApi; //服务器上传接口
  multipleSelect?: boolean; //是否允许多选
  sliceOption?: SliceOptoin; //分片选项
  changeUploadOptions?: boolean; //是否允许运行时动态改变uploadOptions
}

interface ServerUploadApi {
  apiAddress: string; //api地址
  apiHttpMethod: 'POST' | 'PUT'; //api http请求方法
  serverSupportedUploadContentType:
    | 'multipart/form-data'
    | 'application/octet-stream'
    | 'application/x-www-form-urlencoded'
    | 'custome'; //自定义Content-type上传
  //服务器支持的上传文件的方式
  customeContentType?: string; //自定义Content-Type
  requestHeaders?: { [key: string]: any }; //自定义请求体
  customeFileHandlerStratage?: Function; //自定义文件处理策略回调
}

interface SliceOptoin {
  open: boolean; //是否开启分片上传
  sliceSizeMB?: number; //分片上传大小(MB)
  resumableTransfer?: boolean; //是否开启断点续传
  concurrencyNumber?: number; //并发上传数量
  percentageTransferProgression?: (percentage: number) => void; //上传进度百分比回调
  stopUpload?: boolean; //是否允许中断上传
  stopReUploadTime?: number; //失败重传次数
}
