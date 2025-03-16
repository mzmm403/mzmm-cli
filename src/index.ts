import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'


const program = new Command('mzmm-cli')
program.version(version, '-v, --version')


program
.command("create")
.description("创建一个新项目")
.argument("[project-name]","项目名称")
.action(async (dirName) => {
    create(dirName)
})

program.parse()