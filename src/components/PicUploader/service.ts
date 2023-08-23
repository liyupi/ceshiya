interface fileUploadRes {
  fileURL: any;
}

export function uploadFile(file: File): fileUploadRes {
  console.log('start uploadFile', file);
  return {
    fileURL: file
  }
}
