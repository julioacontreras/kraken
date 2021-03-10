module.exports = () => {
  const fs = require('fs')
  const path = require('path')
  const mkdirp = require('mkdirp')
  const directoryExists = require('directory-exists')
 
  const execShellCommand = (cmd) => {
    const exec = require('child_process').exec
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.warn(error)
        }
        resolve(stdout || stderr)
      })
    })
  }

  const loadFile = (basePath, filename) => {
    const p = path.join(basePath, filename)
    return fs.readFileSync(p, 'utf8')
  }

  const createPath = (basePath, dir) => {
    return path.join(basePath, dir)
  }

  const createDir = (dir) => {
    const p = path.join(dir)
    try {
      return mkdirp.sync(p)
    } catch (e) {
      console.error(e)
    }
  }

  const dirExist = async (basePath, dir) => {
    const p = path.join(basePath, dir)
    const result = await directoryExists(p)
    return result
  }

  const createFile = (filename, content) => {
    return fs.writeFileSync(filename, content)
  }

  return {
    loadFile,
    createFile,
    dirExist,
    createDir,
    createPath,
    execShellCommand
  }
}
