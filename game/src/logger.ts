function thisLine() {
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/
    const stack = e.stack.split("\n")
    if (stack == null || stack.length < 4) {
        return "";
    }
    const match = regex.exec(stack[3])
    if (match == null) {
        return "";
    }
    const position = {
      filepath: match[1],
      line: match[2],
      column: match[3]
    };
    return ` at ${position.filepath}:${position.line}:${position.column}`
}

export function overrideLogger(){
    const methods = ["debug", "error", "info", "log", "warn"];
    const newPort = ":" + (Number(location.port) + 1);
    const logUrl = location.protocol + "//" + location.hostname.replace(newPort, "") + newPort
    methods.forEach((method)=>{
        //@ts-ignore
        const old = console[method];
        //@ts-ignore
        console[method] = function(){
            const args:string[] = []
            for (var i=0;i<arguments.length;i++){
                args.push(arguments[i]);
            }
            fetch(logUrl, {
                method: "POST",
                body: args.join(" ") + thisLine(),
            })
            old(...arguments);
        }
    });
    window.onerror = function(event, source, lineno, colno, error){
        console.log(error.stack);
        return false;
    }
}