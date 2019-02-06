const Builder = require('../lib/ClientQuery');
const spec = require('../lib/ApiQueryParameters');
const assert = require('assert');

describe('ClientQuery.js', () => {

    it(' addSortingParameters() creates sorting parameters', () => {
        var params = new Builder()
                .addSortingParameters("firstName", spec.SORTING_ASCENDING_PARAMETER)
                .addSortingParameters("lastName", spec.SORTING_DESCENDING_PARAMETER)
                .build();
        assert.equal("sort=firstName:asc,lastName:desc", params);
     });

	it(' addPaginationParameters() creates pagination parameters', () => {
		var params = new Builder()
		        .addPaginationParameters("5", "25")
		        .build();
		assert.equal("size=5&page=25", params);
    });

   	it(' addFilterParameters() creates filter parameters', () => {
		var params = new Builder()
		        .addFilterParameters("fistName", "Daniel", spec.FILTERING_EQUAL_OPERATOR)
		        .addFilterParameters("lastName", "Edmonds", spec.FILTERING_LIKE_OPERATOR)
		        .addFilterParameters("city", "London", spec.FILTERING_INEQUALITY_OPERATOR)
		        .addFilterParameters("age", "18", spec.FILTERING_GREATER_THAN_OPERATOR)
		        .addFilterParameters("year", "2000", spec.FILTERING_GREATER_THAN_OR_EQUAL_TO_OPERATOR)
		        .addFilterParameters("expiry", "2020", spec.FILTERING_LESS_THAN_OPERATOR)
		        .addFilterParameters("daysActive", "14", spec.FILTERING_LESS_THAN_OR_EQUAL_TO_OPERATOR)
		        .build();
		assert.equal("fistName=Daniel:eq"
						+ "&lastName=Edmonds:lk"
						+ "&city=London:neq"
						+ "&age=18:gt"
						+ "&year=2000:gte"
						+ "&expiry=2020:lt"
						+ "&daysActive=14:lte", params);
    });

   	it(' builds pagination, filtering and sorting paramters', () => {
		var params = new Builder()
                .addSortingParameters("firstName", spec.SORTING_ASCENDING_PARAMETER)
                .addSortingParameters("lastName", spec.SORTING_DESCENDING_PARAMETER)
                .addPaginationParameters("5", "25")
				.addFilterParameters("fistName", "Daniel", spec.FILTERING_EQUAL_OPERATOR)
		        .addFilterParameters("lastName", "Edmonds", spec.FILTERING_LIKE_OPERATOR)
		        .build();
		assert.equal("sort=firstName:asc,lastName:desc&size=5&page=25&fistName=Daniel:eq&lastName=Edmonds:lk", params);
    });

});
