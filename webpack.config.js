export default (env, argv) => ({
target: 'node',
mode: argv.mode ?? 'development',
entry: './src/server.js',
output: { filename: 'server.bundle.js' }
})