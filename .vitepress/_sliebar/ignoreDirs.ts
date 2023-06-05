const dirs =
  [
    { name: ".git", },
    { name: ".vitepress", },
    { name: 'imgs' },
    { name: 'files' },
    { name: 'demos' },
  ]
const files =
  [
    { name: ".DS_Store", },
    { name: ".gitignore", },
  ]
const isIgnoreDirs = dir => dirs.find(i => dir === i.name);
const isIgnoreFiles = file => files.find(i => file === i.name);
export const isIgnoreName = (name) => isIgnoreDirs(name) || isIgnoreFiles(name)
export const isNotIgnoreName = (name) => !isIgnoreName(name)
export default dirs
