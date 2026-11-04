/* setup.js — prepara el entorno una sola vez.   Uso:  node setup.js        */
const { spawnSync } = require("child_process");
const path = require("path");
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { stdio: "inherit", shell: true, ...opts }).status === 0;
const has = (cmd) => spawnSync(cmd, ["--version"], { shell: true, stdio: "ignore" }).status === 0;

console.log("== Verificando requisitos ==");
const major = parseInt(process.versions.node.split(".")[0], 10);
if (major < 18) { console.error("Se requiere Node.js 18 o superior."); process.exit(1); }
console.log("Node " + process.version + " OK");

const py = has("python") ? "python" : has("python3") ? "python3" : null;
if (!py) { console.error("No se encontró Python 3.9+ (https://www.python.org/downloads/)."); process.exit(1); }
console.log("Python: " + py + " OK");

console.log("\n== Instalando dependencias de Python (pymupdf) ==");
if (!run(py, ["-m", "pip", "install", "-r", "requirements.txt"])) process.exit(1);

console.log("\n== Instalando dependencias de Node (_tools) ==");
if (!run("npm", ["install", "--silent"], { cwd: path.join(__dirname, "_tools") })) process.exit(1);

console.log("\nListo. Abre Claude Code en esta carpeta y ejecuta /init-course");
