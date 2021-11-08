/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
    TraceableConfig,
    ThundraSourceCodeInstrumenter
} from '@thundra/instrumenter';

import Options from './models/Options';

import { 
    getFileExtension,
    getFileContent,
    getTraceRelativePath,
} from './utils';

export const ThundraEsbuildPlugin = (options: Options) => ({
    name: 'thundra',
    setup(build: any) {

        if (!options || !options.traceableConfigs) {
            return;
        }

        const pluginFilters: string[] = [];
        const traceableConfigs: TraceableConfig[] = options.traceableConfigs.map((traceableConfigStr) => {

            const traceableConfig = TraceableConfig.fromString(traceableConfigStr);
            pluginFilters.push(traceableConfig.pattern);

            return traceableConfig;
        });

        const sourceCodeInstrumenter = new ThundraSourceCodeInstrumenter(traceableConfigs);

        if (!pluginFilters || !pluginFilters.length) {
            return;
        }

        const filter = new RegExp(pluginFilters.join('|'));

        const transformContents = async ({ args, contents }: any) => {

            const filePath = args.path;

            const fileExtension = getFileExtension(filePath);
            const traceRelativePath = getTraceRelativePath(filePath);

            const instrumentedSourceCode = sourceCodeInstrumenter.addTraceHooks(
                contents,
                traceRelativePath,
                false,
                args.path,
            );

            return { contents: instrumentedSourceCode, loader: fileExtension.substring(1) };
        };

        build.onLoad({ filter, namespace: '' }, async (args: any) => {

            const contents = await getFileContent(args.path);

            try {
                return transformContents({ args, contents });
            } catch (error) {
                return { contents };
            }
        });
    }
});