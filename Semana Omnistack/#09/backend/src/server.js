const express = require('express');
const cors =  require('cors')
const routes =  require('./routes/routes');
const path = require('path')

const mongoose =  require('mongoose');
const app =  express();

// mongoose.connect('mongodb+srv://ad_aircnc:rocket2019@tindev-0sp8v.mongodb.net/bd_aircnc?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
mongoose.connect('mongodb://localhost:27017',{
    dbName:'Aircnc',
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(cors())
app.use(express.json());
app.use('/v1/api',routes);
app.use('/v1/api/files',express.static(path.resolve(__dirname,'..','uploads')))
// req.params para router params
app.listen(3333, err => {
    if(err){
       console.log(err.message)
        return;
    }
    console.log('servidor rodando na http://localhost:3333/v1/api')
});
