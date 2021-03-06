import { app } from "./app";

app.listen(3000, err => {
    if (err) {
        throw new Error('error in application');
    }
    console.log('application loading at localhost:3000')
})


