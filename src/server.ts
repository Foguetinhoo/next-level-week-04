import { app } from "./app";

const port = process.env.API_PORT
app.listen(port, err => {
    if (err) {
        throw new Error('error in application');
    }
    console.log(`application loading at ${port}`)
})


