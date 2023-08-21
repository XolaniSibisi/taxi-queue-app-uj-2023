import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});

await db.migrate();



export async function joinQueue() {
    // console.log('join queue')
    // console.log("Hello World");
    const sql = `UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1`;
    await db.run(sql)  

}

export async function leaveQueue() {

    const sql = `UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - 1`;
    await db.run(sql)
    
}

export async function joinTaxiQueue() {

    const sql = `UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count + 1`;
    await db.run(sql)
   
}

export async function queueLength() {

    const sql = `SELECT COUNT(passenger_queue_count) AS Count FROM taxi_queue`;
     await db.run(sql)
} 
const result1 = await queueLength();
console.log(result1);


export async function taxiQueueLength() {

    const sql = `SELECT COUNT(taxi_queue_count) AS numberOfTaxis FROM taxi_queue`;
    await db.run(sql)
}
const result = await taxiQueueLength();
console.log(result);

export async function taxiDepart() {

    const check = `SELECT passenger_queue_count, taxi_queue_count FROM taxi_queue WHERE id = 1`
    const passenger_queue_count = await db.all(check);
    const taxi_queue_count = await db.all(check);
    let new_queue_count = passenger_queue_count[0].passenger_queue_count;
    let new_taxi_count = taxi_queue_count[0].taxi_queue_count;

    if(new_queue_count >= 12 && new_taxi_count > 0){

        new_queue_count = new_queue_count - 12;
        new_taxi_count -= 1;

        const sql = `UPDATE taxi_queue SET passenger_queue_count = ${new_queue_count}, taxi_queue_count = ${new_taxi_count}`;
        return await db.run(sql)

    }
    else{
        return;
    }

}