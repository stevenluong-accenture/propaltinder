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
        return $http.post("http://ec2-52-26-10-39.us-west-2.compute.amazonaws.com:80/",opportunity)
    };
    return opportunities;
});
