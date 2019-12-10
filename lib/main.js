"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const core = __importStar(require("@actions/core"));
const markdownTable = require('markdown-table');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputPath = core.getInput('inputPath');
            core.debug(`Input path: ${inputPath}`);
            const outputPath = core.getInput('outputPath') ||
                `${inputPath.substring(0, inputPath.length - path.extname(inputPath).length)}.md`;
            core.debug(`Output path: ${outputPath}`);
            const input = JSON.parse(yield readFile(inputPath, 'utf8'));
            core.debug(`Input: ${input}`);
            const output = markdownTable(input.data, input.options || {});
            core.debug(`Output: ${output}`);
            yield writeFile(outputPath, output);
            core.setOutput('outputPath', outputPath);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
