import simpleGit,{SimpleGitOptions} from 'simple-git'
import createLogger from "progress-estimator";
import chalk from 'chalk'
import log from './log'
// const figlet = require('figlet')


// 初始化进度条
const logger = createLogger({
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.green(item))
    }
})

// const printerLogo = async () => {
//     const data = await figlet('mzmm-cli')
//     console.log(chalk.rgb(248, 203, 200).visible(data))
// };

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false
}

export const clone = async (url:string, projectName: string, options: string[]) => {
    const git = simpleGit()
    try {
        await logger(git.clone(url, projectName, options),'代码下载中...',{
            estimate: 9000, // 预计耗时，单位毫秒
        })

        // printerLogo()
        console.log()
        console.log(chalk.blueBright(`==================================`))
        console.log(chalk.blueBright(`==== 欢迎使用 mzmm-cli 脚手架 ====`))
        console.log(chalk.blueBright(`==================================`))
        console.log()
        log.success(chalk.greenBright('代码下载成功🚀'))
        log.success(`执行以下命令启动项目⚙️：`)
        log.info(`🥇 ${chalk.yellowBright('cd')} ${chalk.blueBright(projectName)}`)
        log.info(`🥈 ${chalk.greenBright('pnpm')} ${chalk.yellowBright('install')}`)
        log.info(`🥉 ${chalk.greenBright('pnpm')} ${chalk.yellowBright('run')} ${chalk.blueBright('dev')}`)
    }catch (err){
        log.error(chalk.red('❌️代码下载失败'))
        log.error(chalk.red('🚨下载失败原因：String(err)'))
    }
} 