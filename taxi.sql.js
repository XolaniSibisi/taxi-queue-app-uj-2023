import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});

await db.migrate();



export async function joinQueue() {

    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1');

    const sql = await db.get('SELECT passenger_queue_count FROM taxi_queue');
    return sql;  

}

export async function leaveQueue() {

    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - 1');

    const sql = await db.get('SELECT passenger_queue_count FROM taxi_queue');
    return sql;
    
}

export async function joinTaxiQueue() {

    await db.run('UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count + 1');

    const sql = await db.get('SELECT taxi_queue_count FROM taxi_queue');
    return sql;
   
}

export async function queueLength() {

    const sql = `SELECT passenger_queue_count FROM taxi_queue`;
    return sql;
} 

export async function taxiQueueLength() {

    const sql = `SELECT taxi_queue_count FROM taxi_queue`;
    return sql;
}

export async function taxiDepart() {

   await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count-12, taxi_queue_count = taxi_queue_count - 1 WHERE passenger_queue_count >= 12 AND taxi_queue_count > 0');
   const sql = await db.get('select * from taxi_queue');
   return sql;

}