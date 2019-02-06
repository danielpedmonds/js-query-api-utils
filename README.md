# js-query-api-utils

This library provides a utility builder class '/lib/ClientQuery.js' for building api query parameters containing pagination, filtering and sorting, to be used to call APIs that the ['java-query-api-utils'](https://github.com/danielpedmonds/java-query-api-utils) project. All of the key field names and operators can be found in '/lib/ApiQueryParamaters.js'.

## Pagination
Pagination can be implemented using the .addPaginationParameters(size, page) function passing parameters:
- **'size'** - defines the maximum number of records to return.
- **'page'** - defines which page of results to return as an offset based on page.
Both values should be a positive integer, greater than zero.
```
  e.g.  new Builder().addPaginationParameters(1, 25).build();

  		/find-users?page=1&size=25
```
## Sorting
Sorting is implemented using the .addSortingParameters(field, order) function taking parameters:
 - **'field'**  - the name of the field to be sorted.
 - **'order'** - the direction of sort, which can be one of two values:
 -- **'asc'** - defines ascending order.
 -- **'desc'** - defines descending order.
 ```
  e.g.  new Builder().addSortingParameters("firstName", spec.SORTING_ASCENDING_PARAMETER).build();

  		/find-users?sort=firstName:asc
```
 This get mapped to a ORDER BY clause constructed using JOOQs .orderBy method

## Filtering
Filtering can be implemented using the .addFilterParameters(filed, value, operator) function taking paramaters:
 - **'field'**  - the name of the field to be filtered
 - **'value'** - the value that you want to compare
 - **'operator'** - the operator to be used for field comparison:
 -- **'eq'** - Equal (used by default)
 -- **'neq'** - Not equal
 -- **'lk'** - Like
 -- **'gt'** - Greater than
 -- **'gte'** - Greater than or equal
 -- **'lt'** - Less than
 -- **'lte'** - Less than or equal
```
  e.g. new Builder().addFilterParameters("fistName", "Daniel", spec.FILTERING_EQUAL_OPERATOR).build();

  		/find-users?fullName=Daniel:eq
``` 