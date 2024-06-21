define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.overrideLogger = void 0;
    function thisLine() {
        const e = new Error();
        const regex = /\((.*):(\d+):(\d+)\)$/;
        const stack = e.stack.split("\n");
        if (stack == null || stack.length < 4) {
            return "";
        }
        const match = regex.exec(stack[3]);
        if (match == null) {
            return "";
        }
        const position = {
            filepath: match[1],
            line: match[2],
            column: match[3]
        };
        return ` at ${position.filepath}:${position.line}:${position.column}`;
    }
    function overrideLogger() {
        const methods = ["debug", "error", "info", "log", "warn"];
        const newPort = ":" + (Number(location.port) + 1);
        const logUrl = location.protocol + "//" + location.hostname.replace(newPort, "") + newPort;
        methods.forEach((method) => {
            const old = console[method];
            console[method] = function () {
                const args = [];
                for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                fetch(logUrl, {
                    method: "POST",
                    body: args.join(" ") + thisLine(),
                });
                old(...arguments);
            };
        });
        window.onerror = function (event, source, lineno, colno, error) {
            console.log(error.stack);
            return false;
        };
    }
    exports.overrideLogger = overrideLogger;
});
//# sourceMappingURL=logger.js.map