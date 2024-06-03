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
                body: args.join(" "),
            })
            old(...arguments);
        }
    });
    window.onerror = function(event, source, lineno, colno, error){
        console.log(error.stack);
        return false;
    }
}