-- SQLite
UPDATE taxi_queue SET passenger_queue_count = 0, taxi_queue_count = 0;

UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1

SELECT COUNT(passenger_queue_count) AS Count FROM taxi_queue;

SELECT taxi_queue_count FROM taxi_queue

SELECT * FROM taxi_queue;