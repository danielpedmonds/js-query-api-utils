const FilterOptions = require('./domain/FilterOptions');
const PaginationOptions = require('./domain/PaginationOptions');
const SortingOptions = require('./domain/SortingOptions');
const spec = require('./ApiQueryParameters');

var Builder = function() {
  var baseUrl = "";
  var sortingOptions = [];
  var paginationOptions = {};
  var filterOptions = [];
  
  function buildSortParameters(query) {
    if (sortingOptions.length > 0) {
        query += addAmpersandIfNotFirstParameter(query) 
               + spec.SORTING_SORT_PARAMETER
               + spec.EQUALS;
        for (var i = 0; i < sortingOptions.length; i++) {
            if (i > 0) {
              query += spec.COMMA;
            }
            query += sortingOptions[i].field 
                  + spec.COLON_OPERATOR 
                  + sortingOptions[i].order;
        }
    }
    return query;
  }

  function buildPaginationParameters(query) {
    if (paginationOptions.page != null && paginationOptions.pageSize != null) {
          query = addAmpersandIfNotFirstParameter(query)
                + spec.PAGINATION_SIZE_PARAMETER
                + spec.EQUALS
                + paginationOptions.pageSize
                + spec.AMPERSAND
                + spec.PAGINATION_PAGE_PARAMETER
                + spec.EQUALS
                + paginationOptions.page;
    }
    return query;
  }
  
  function buildFilterParameters(query) {
    if (filterOptions.length > 0) {
      query = addAmpersandIfNotFirstParameter(query);
        for (var i = 0; i < filterOptions.length; i++) {
            if (i > 0) {
              query += spec.AMPERSAND;
            }

               query += filterOptions[i].field 
                     + spec.EQUALS
                     + filterOptions[i].value
                     + (filterOptions[i].operator != null ? spec.COLON_OPERATOR + filterOptions[i].operator : "");
        }
    }
    return query;
  }


  function addAmpersandIfNotFirstParameter(query) {
    if (query != "" && query != baseUrl && query != baseUrl + spec.QUESTION_MARK) {
      query += spec.AMPERSAND;
    }
    return query;
  }
   
  return {
      addSortingParameters : function(field, order) {
        sortingOptions.push(new SortingOptions(field, order));
        return this;
      },
      addPaginationParameters : function(pageSize, page) {
        paginationOptions = new PaginationOptions(pageSize, page);
        return this;
      },
      addFilterParameters : function(field, value, operator) {
        filterOptions.push(new FilterOptions(field, value, operator));
        return this;
      },
      build : function() {
        var query = "";
        query = buildSortParameters(query);
        query = buildPaginationParameters(query);
        query = buildFilterParameters(query);
        return query;
      }
  };  
};

module.exports = Builder;