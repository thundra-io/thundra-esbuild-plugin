import * as Fs from 'fs';
import * as Path from 'path';

const TRACE_DEF_SEPERATOR = '.';

export const getFileExtension = (path: string) => {
    if (!path){
        return;
    }

    return Path.extname(path);
};

export const getFileContent = async (path: string) => {
    if (!path){
        return;
    }

    return (await Fs.promises.readFile(path, 'utf8'));
};

export const getTraceRelativePath = (path: string) => {
    if (!path){
        return;
    }
    
    const relPath = Path.relative(process.cwd(), path);
    const relPathWithDots = relPath.replace(/\//g, TRACE_DEF_SEPERATOR).replace(getFileExtension(path), '');

    return relPathWithDots;
};

export const getTraceFilePath = (pattern: string): string => {
    const lidx = pattern.lastIndexOf('.');
    if (lidx < 0) {
        return pattern;
    }

    const substr = pattern.substring(0, lidx); 
    return `${substr}.*`;
};