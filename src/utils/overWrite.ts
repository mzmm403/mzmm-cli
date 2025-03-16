import { select } from "@inquirer/prompts"

export const isOverwrite = (projectName: string) => {
    console.warn(`${projectName} 已存在，是否覆盖？`)
    return select({
        message: "是否覆盖？✒️",
        choices: [
            {name:"覆盖✅", value: true},
            {name:"取消❌️", value: false},
        ]
    })
}