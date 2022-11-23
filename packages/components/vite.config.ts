
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts';
import DefineOptions from "unplugin-vue-define-options/vite";
import {resolve} from "path";
export default defineConfig(
    {
        build: {
            target: 'modules',
            //打包文件目录
            outDir: "es",
            //压缩
            minify: true,
            //css分离
            //cssCodeSplit: true,
            rollupOptions: {
                //忽略打包vue文件
                external: ['vue','/\.less/','@kitty-ui/utils'],
                input: ['index.ts'],
                output: [
                    {
                        format: 'es',
                        //不用打包成.es.js,这里我们想把它打包成.js
                        entryFileNames: '[name].mjs',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        exports: 'named',
                        //配置打包根目录
                        dir: resolve(__dirname, './yuying-ui/es'),
                    },
                    {
                        format: 'cjs',
                        entryFileNames: '[name].js',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        //配置打包根目录
                        exports: 'named',
                        dir: resolve(__dirname, './kitty-ui/lib')
                    }
                ]
            },
            lib: {
                entry: './index.ts',
                name: 'yuying'
            }
        },
        plugins: [
            vue(),
            DefineOptions(),
            dts({
                entryRoot: 'src',
                outputDir: [resolve(__dirname, './kitty-ui/es/src'), resolve(__dirname, './kitty-ui/lib/src')],
                // 加入声明文件
                tsConfigFilePath: '../../tsconfig.json'
            }),
            {
                name: 'style',
                generateBundle(config, bundle) {
                    //这里可以获取打包后的文件目录以及代码code
                    const keys = Object.keys(bundle)
                    for (const key of keys) {
                        const bundler: any = bundle[key as any]
                        //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件
                        this.emitFile({
                            type: 'asset',
                            fileName: key,//文件名名不变
                            source: bundler.code.replace(/\.less/g, '.css')
                        })
                    }
                }
            },
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        }
    }
)
