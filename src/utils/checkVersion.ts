import axios,{AxiosResponse} from 'axios'
import { gt } from "lodash"
import chalk from 'chalk'

export const getNpmInfo = async (name:string) => {
    const npmUrl = `https://registry.npmjs.org/${name}`
    let res = {}
    try {
        res = await axios.get(npmUrl)
    }catch (err){   
        console.error(`❌发生错误:${err}`)
    }
    return res
}

export const getNpmLatestVesrion = async (name:string) => {
    const { data } = (await getNpmInfo(name)) as AxiosResponse
    return data['dist-tags'].latest
}


export const checkVersion = async (name:string,version:string) => {
    const lastestVersion = await getNpmLatestVesrion(name)
    const need = gt(lastestVersion,version)
    if(need){
        console.warn(`✨检测到mzmm-cli最新版本为:${chalk.greenBright(lastestVersion)},当前版本是:${chalk.redBright(version)},请更新版本!`)
        console.log(`✨可使用: ${chalk.yellowBright(`npm install mzmm-cli@latest`)},或者使用: ${chalk.yellowBright(`mzmm-cli update`)}更新版本!`)
    }
    return need
}