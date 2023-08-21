document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength: 0,
			taxiQueueLength: 0,

			init() {
				
				axios.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength = result.data.queueCount.passenger_queue_count;
					});

				axios.get('/api/taxi/queue')
				    .then((result)=>{
			     	 	this.taxiQueueLength = result.data.queueCount.taxi_queue_count;
				    });
			},

			joinQueue() {

				axios.post('/api/passenger/join')
                    .then(result => {

                        this.queueLength = result.data.sql.passenger_queue_count;

                    });

			},
			leaveQueue() {

				axios.post('/api/passenger/leave')
                    .then(result => {

                        this.queueLength = result.data.sql.passenger_queue_count;

                    });

			},

			joinTaxiQueue() {

				axios.post('/api/taxi/join')
                    .then(result => {
                        console.log(result.data)

                        this.taxiQueueLength = result.data.sql.taxi_queue_count;

                    });

			},

			taxiDepart() {

				if (this.queueLength >= 12 && this.taxiQueueLength > 0) {
                    axios.post('/api/taxi/depart')
                        .then((result) => {

							this.taxiQueueLength = result.data.sql.taxi_queue_count;
							this.queueLength = result.data.sql.passenger_queue_count;


                        });
                }

			}
		}
	});

});


