//prod
//var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('MainCtrl', ['$scope','Opportunities',
        function($scope, Opportunities) {
            $scope.opportunities = [];
            $scope.opportunity =
            {"Client Location":"France","ToW":"C","Closed Quarter":"FY16Q4","Software Delivery":"Y","OG":"Health & Public Service","Industry Segment":"H&PS Health","IC  -  Net Revenue":"S","Responsible Business Entity":"OG"}
                 /*opportunityId: 'Opp_ID_0001',
                   ou: 'H&PS EALA OU',
                     csg: 'H&PS EALA Gallia',
                       subcsg: 'N/A',
                         masterClient: 'Master_Client_0199',
                           closedQuarter: 'FY16Q4',
                             salesCapture: '',
                               clientLocation: 'France',
                                 og: 'Health & Public Serv',
                                   industrySegment: 'H&PS Health',
                                     tow: 'C',
                                       ic: 'S',
                                         mc: 'S',
                                           sc: 'S',
                                             si: 'S',
                                               tc: 'S',
                                                 ao: 'S',
                                                   bpo: 'S',
                                                     io: 'S',
                                                       responsibleBusiness: 'OG',
                                                         contractExtensionFlag: 'N',
                                                           softwareDelivery: 'Y' */


            Opportunities.getSimilarities($scope.opportunity).success(function(response){
                console.log(JSON.parse(response))
                response.records.forEach(function(o){
                    console.log(o);
                    $scope.opportunities.push(o);
                })
            });
            $scope.generate= function(){
                console.log("generate");
            }
        }]);
