module.exports = {
    app:[
        {
            name: "project-management",
            script: "pnpm",
            args: "run dev",
            interpreter: "none",
            env:{
                NODE_ENV: "development"
            }
        }
    ]
}