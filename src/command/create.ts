import path from "path"
import fs from "fs-extra"
import { input,select } from "@inquirer/prompts"
import { clone } from "../utils/clone"
import { isOverwrite } from "../utils/overWrite"

export interface TemplateInfo {
    // 模板名称
    name: string;
    // 模板对应的url
    downloadUrl: string;
    // 关于模板的描述
    description: string;
    // 模板对应的分支名称
    branch: string;
}

export const templates: Map<string,TemplateInfo> = new Map([
    ['⚽vue-ts工程规范',{
        name: "⚽vue-ts工程规范",
        downloadUrl: "https://gitee.com/sohucw/admin-pro.git",
        description: "以vite为基础的ts的完整工程规范的vue项目",
        branch: "dev3"
    }],
    ['🏀vue-js',{
        name: "🏀vue-js",
        downloadUrl: "https://gitee.com/old-tol/vue-js.git",
        description: "以vite为基础的vue-js项目",
        branch: "master"
    }],
    ['🏐vue-ts',{
        name: "🏐vue-ts",
        downloadUrl: "https://gitee.com/old-tol/vue-ts.git",
        description: "以vite为基础的vue-ts项目",
        branch: "master"
    }]
])

export async function create(projectName?: string) {
    // 初始化模板列表
    const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
        const [name, info] = item;
        return {
            name,
            value: name,
            description: info.description,
        }
    })
    if(!projectName) {
        projectName = await input({message:"🧱请输入项目名称:"})
    }

    // 如果文件夹已存在，提示覆盖
    const filePath = path.resolve(process.cwd(), projectName)
    if(fs.existsSync(filePath)) {
        const run = await isOverwrite(projectName)
        if(run){
            // 覆盖
            await fs.remove(filePath)
        } else {
            return // 不覆盖直接结束
        }
    }


    const templateName = await select({
        message: "请选择模板📋️",
        choices: templateList,
    });

    const info = templates.get(templateName);

    if(info) {
        clone(info.downloadUrl, projectName, ['-b', info.branch])
    }
}