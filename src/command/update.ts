import ora from "ora"
import chalk from "chalk"
import process from "child_process"

const spinner = ora({
    text: chalk.magentaBright("🔧正在更新中..."),
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blueBright(item))
    }
})

export const update = () => {
    spinner.start();
    process.exec('npm install mzmm-cli@latest -g', (err) => {
        spinner.stop()
        if(!err){
            console.log(`✨${chalk.yellowBright('更新成功')}`)
        }else {
            console.log(`🚨${chalk.redBright('更新失败')}\n${err}`)
        }
    })
}