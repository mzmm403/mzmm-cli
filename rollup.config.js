import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default defineConfig([
    {
        input: {
            index: "src/index.ts", // 打包入口文件
        },
        output: [
            {
                dir: "dist", // 输出目标文件夹
                format: "cjs", // 输出 commonjs 文件
            },
        ],
    // 这些依赖的作用上文提到过
        plugins: [
            nodeResolve(),
            externals({
                devDeps: false
            }),
            typescript(),
            json(),
            commonjs(),
            terser(),
        ],
    },
]);
