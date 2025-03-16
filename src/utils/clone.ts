import simpleGit,{SimpleGitOptions} from 'simple-git'
import createLogger from "progress-estimator";
import chalk from 'chalk'

// 初始化进度条
const logger = createLogger({
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.green(item))
    }
})


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
            estimate: 7000, // 预计耗时，单位毫秒
        })

        console.log()
        console.log(chalk.blueBright(`==================================`))
        console.log(chalk.blueBright(`==== 欢迎使用 mzmm-cli 脚手架 ====`))
        console.log(chalk.blueBright(`==================================`))
        console.log()
        console.log(chalk.greenBright('代码下载成功🚀'))
        console.log(`执行以下命令启动项目⚙️：`)
        console.log(`🥇${chalk.yellowBright('cd')} ${chalk.blueBright(projectName)}`)
        console.log(`🥈${chalk.greenBright('pnpm')} ${chalk.yellowBright('install')}`)
        console.log(`🥉${chalk.greenBright('pnpm')} ${chalk.yellowBright('run')} ${chalk.blueBright('dev')}`)
    }catch (err){
        console.log(chalk.red('❌️代码下载失败'))
        console.log(chalk.red('🚨下载失败原因：String(err)'))
    }
} 