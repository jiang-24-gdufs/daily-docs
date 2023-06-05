import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// 需要跟vitepress开启的server目录统一， typora 目录为服务器根目录
export const typora = path.resolve(__dirname, '../../') 
// export const typora = path.resolve(__dirname, '../../_Cesium/')
debugger;
