document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'no-api-1.0',
			queueCount: 0,
			taxiQueue: 0,

			joinQueue() {

				return this.queueCount++;

			},
			leaveQueue() {

				return this.queueCount--;

			},

			joinTaxiQueue() {

				return this.taxiQueue++;

			},

			queueLength() {

				this.joinQueue();
				const queueLength = this.queueCount.length;
				return queueLength;

			},

			taxiQueueLength() {

				// this.joinTaxiQueue();
				const taxiLength = this.taxiQueue.length
				return taxiLength;


			},

			taxiDepart() {

				if (this.queueCount >= 12 && this.taxiQueue > 0){
					this.taxiQueue--;
					// this.leaveQueue();	
					this.queueCount -= 12;
				}

			}
		}

	});

});


