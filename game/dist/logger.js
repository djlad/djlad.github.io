define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.overrideLogger = void 0;
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
                    body: args.join(" "),
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