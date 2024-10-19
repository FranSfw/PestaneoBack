const mysql = require('mysql2');
const { Client } = require('ssh2');
const fs = require('fs');
require('dotenv').config();

const sshClient = new Client();

// define connection config for the database
const dbServer = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}
// define connection config for the ssh tunnel
const tunnelConfig = {
    host: process.env.SSH_HOST,
    port: 22,
    username: 'ubuntu',
    privateKey: fs.readFileSync(process.env.SSH_KEY)
}

const forwardConfig = {
    srcHost: '127.0.0.1', // any valid address
    srcPort: 3306, // any valid port
    dstHost: dbServer.host, // destination database
    dstPort: dbServer.port // destination port
};

const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        console.log('SSH Connection established');
        sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
             if (err){
                console.error('SSH forwarding error:', err);
                reject(err);
                return;
            }

            // create a new DB server object including stream
            const updatedDbServer = {
                 ...dbServer,
                 stream
            };
            // connect to mysql
            const connection =  mysql.createConnection(updatedDbServer);
            // check for successful connection
           //  resolve or reject the Promise accordingly
           connection.connect((error) => {
            if (error) {
                reject(error);
            }
            console.log('Database connection established');
            resolve(connection);
            });
       });
    }).connect(tunnelConfig);
});

module.exports = SSHConnection;


