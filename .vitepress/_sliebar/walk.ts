import path from 'path';
import fs from 'fs';
import { isIgnoreName, isNotIgnoreName } from './ignoreDirs.js';
import { typora } from '../_path/index.js'

// TODO Nested siderbar
/* 
sidebar: [
  {
    text: 'Level 1',
    items: [
      {
        text: 'Level 2',
        items: [
          {
            text: 'Level 3',
            items: [
              ...
            ]
          }
        ]
      },
      {text, link}
    ]
  }
]
*/
// 文件 & 目录分区
// 目录优先， 文件排序
export const getItems = (path: string) => {
  const results: string[] = []
  const dir: string[] = []
  const list = fs.readdirSync(path, { withFileTypes: true });
  // console.log('list====>', list)
  list.forEach((file) => {
    if (file.isDirectory() && !isIgnoreName(file.name)) {
      dir.push(file.name)
    } else if (file.isFile() && file.name.endsWith('.md')) {
      results.push(file.name);
    }
  })
  // console.log('results====>', results)
  // if (dir.length > 0) console.log('dir====>', dir)

  // 读取子文件夹
  const dirRes = dir.map(d => {
    return {
      // collapsed:true,
      text: d,
      items: getItems(`${path}/${d}`)
    }
  })
  // if (dir.length > 0) console.log('dirRes', dirRes)

  const items = results.map((item) => {
    const filePath = `${path}/${item}`
    // const link = filePath.slice(dir.length, -3)
    const link = filePath.slice(0, -3)
    return {
      text: item.slice(0, -3),
      // link,
      link: link.replace(typora, '')
    }
  }).sort((a, b) => {
    const index1 = Number(a.text.split('.')[0])
    const index2 = Number(b.text.split('.')[0])
    return index1 - index2
  })

  return [...dirRes, ...(items)]
}

// a regExp to match html files with relative path
const htmlRE = /^\.\/.*\.html$/;
