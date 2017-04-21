//prod
//var server = "http://slapps.fr/rssReader2/ror/"
//dev
//var server = "localhost:8000";
'use strict';

/* Services */

var mainServices = angular.module('mainServices', ['ngResource']);
mainServices.factory('Opportunities',function($http){
    var opportunities = {};
    opportunities.getSimilarities = function(opportunity){
        return $http.post("http://ec2-34-208-103-9.us-west-2.compute.amazonaws.com:80/",opportunity)
    };
   opportunities.askTheBot= function(query){
        return $http.post("http://ec2-34-208-103-9.us-west-2.compute.amazonaws.com:80/text/",query)
    };

    return opportunities;
});
