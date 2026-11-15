const app = require('./app');
require('dotenv').config();


const PORT = process.env.PORT || 5001; 

const server = app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}
    `);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})