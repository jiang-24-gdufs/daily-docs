import { getItems } from './walk';
import fs from 'fs';
import { typora } from '../_path/index.js'
import { isNotIgnoreName } from './ignoreDirs.js';

const contentDirs = fs.readdirSync(typora, { withFileTypes: true });
// console.log(contentDirs.filter(
//   ds => ds.isDirectory() && isNotIgnoreName(ds.name)
// ))
export const sidebar = contentDirs.filter(
  ds => ds.isDirectory() && isNotIgnoreName(ds.name)
).map(dir => ({
  text: dir.name,
  collapsable: true,
  // collapsed: true,
  items: getItems(`${typora}/${dir.name}`)
}))
// console.log(sidebar[0])
