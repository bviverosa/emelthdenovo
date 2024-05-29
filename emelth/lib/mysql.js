import mysql from 'serverless-mysql'

export const conn=mysql({
    config:{
        host:'localhost',
        user:'root',
        password:'Heatens123-',
        port:3306,
        database:'emelth'
    }

})