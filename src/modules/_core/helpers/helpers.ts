import * as mime from 'mime-types';
import * as path from 'path';

export const getMediaExtension = (
  logicalName: string,
  contentType: string,
): string => {
  const fileNameExtension = path
    .extname(logicalName)
    .replace('.', '')
    .toLowerCase();
  const mimeExtension = mime.extension(contentType);

  return fileNameExtension || mimeExtension || 'bin';
};
