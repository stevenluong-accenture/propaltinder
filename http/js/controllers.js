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
            $scope.successRate = 0;
            $scope.opportunity =
                {
                    opportunityId: 'Opp_ID_0001',
                    og: 'Health & Public Service',
                    ou: 'H&PS EALA OU',
                    csg: 'H&PS EALA Gallia',
                    subCsg: 'N/A',
                    masterClient: 'Master_Client_0199',
                    masterClientClass: 'Foundation',
                    masterClientLevel: 'Master_Client_Level2_0045',
                    industrySegment: 'H&PS Health',
                    industrySubSegment: 'H&PS HEALTH-PUBLIC OTHER - 100%',
                    stage: '3B',
                    tow: 'C',
                    restricted: 'N',
                    closedQuarter: 'FY16Q4',
                    totalNetRevenue: 'S',
                    cons: 'S',
                    os: '0',
                    ic: '0',
                    mc: '0',
                    sc: '0',
                    si: '0',
                    tc: 'S',
                    ao: '0',
                    bpo: '0',
                    io: '0',
                    localCurrency: 'EUR',
                    globalClientAccountLead: 'Opp_ID_0001  - Global Client Account Lead',
                    technologyAccountLead: 'Opp_ID_0001  - Technology Account Lead',
                    clientAccountLead: 'Opp_ID_0001  - Client Account Lead',
                    salesCapturePrimary: 'Opp_ID_0001  - Sales Capture (Primary)',
                    salesCapture: '',
                    overallSalesCapture: '',
                    opportunityContact: '',
                    solutionArchitect: '',
                    enterpriseArchitect: '',
                    deliveryLead: 'Opp_ID_0001  - Delivery Lead',
                    keyMembersOfOppTeam: '',
                    bidManager: '',
                    dealShaper: '',
                    lCPResponsible: '',
                    mobilizationLead: '',
                    negotiator: '',
                    salesOrigination: '',
                    proposalArchitect: '',
                    competitiveArchitect: '',
                    opportunityClass: 'Alpha',
                    riskProfile: '',
                    pricingStructure: 'Fixed Price',
                    responsibleBusinessEntity: 'OG',
                    responsibleBusinessEntityOverride: '',
                    clientClassificationAttribute: 'Emerging Diamond',
                    contractExtensionFlag: 'N',
                    softwareDelivery: 'Y',
                    clientLocation: 'France',
                    sellingCountry: 'France',
                    geoArea: 'EALA',
                    geoUnit: 'Gallia',
                    accentureDigital: 'Not Applicable - Not Applicable - 100%',
                    accentureSoftware: 'X-OG, NOT APPLICABLE OR ATTRIBUTABLE TO ACCENTURE PRODUCTS AND PLATFORMS, NOT APPLICABLE OR ATTRIBUT',
                    alliances: 'IBM - MIDDLEWARE - 40%;NOT APPLICABLE - 60%',
                    businessService: 'HEALTH-CLINICAL & HEALTH MGMT - HEALTH-CLINICAL & HLTH MGMT-CLINICAL INFORMATICS - HEALTH-CLINICAL &',
                    consultingPractice: '',
                    crossServiceGroupOffering: 'Cloud - Not Applicable - 100%;Security - Not Applicable - 100%',
                    mergersAcquisitions: '',
                    microsoftPlatformInformation: 'NO MICROSOFT - 0%',
                    strategyOfferings: '',
                    techOperationsOfferings: 'APPLICATIONS - SOLN TRNSFRM ANLYS, DSGN, IMPLMN PLNNING-TC - TC-SOLN TRNSFRM ANLYS, DSGN, IMPLMN PLN',
                    win: '1'
                }
/*
                //opportunityId: 'Opp_ID_0001',
                og: 'Health & Public Serv',
                ou: 'H&PS EALA OU',
                csg: 'H&PS EALA Gallia',
                subCsg: 'N/A',
                //masterClient: 'Master_Client_0199',
                masterClientClass: 'Foundation',
                masterClientLevel: 'Master_Client_Level2',
                industrySegment: 'H&PS Health',
                industrySubSegment: 'H&PS HEALTH-PUBLIC O',
                stage: '3B',
                tow: 'C',
                restricted: 'N',
                closedQuarter: 'FY16Q4',
                totalNetRevenue: 'S',
                cons: 'S',
                os: 'S',
                ic: 'S',
                mc: 'S',
                sc: 'S',
                si: 'S',
                tc: 'S',
                ao: 'S',
                bpo: 'S',
                io: 'S',
                localCurrency: 'EUR',
                //globalClientAccountLead: 'Opp_ID_0001  - Globa',
                technologyAccountLead: 'Opp_ID_0001  - Techn',
                clientAccountLead: 'Opp_ID_0001  - Clien',
                salesCapturePrimary: 'Opp_ID_0001  - Sales',
                salesCapture: '',
                overallSalesCapture: '',
                opportunityContact: '',
                solutionArchitect: '',
                enterpriseArchitect: '',
                deliveryLead: 'Opp_ID_0001  - Deliv',
                keyMembersOfOppTeam: '',
                //bidManager: '',
                dealShaper: '',
                lCPResponsible: '',
                //mobilizationLead: '',
                negotiator: '',
                salesOrigination: '',
                proposalArchitect: '',
                competitiveArchitect: '',
                opportunityClass: 'Alpha',
                riskProfile: '',
                pricingStructure: 'Fixed Price',
                responsibleBusinessEntity: 'OG',
                //responsibleBusinessEntityOverride: '',
                clientClassificationAttribute: 'Emerging Diamond',
                contractExtensionFlag: 'N',
                softwareDelivery: 'Y',
                clientLocation: 'France',
                sellingCountry: 'France',
                geoArea: 'EALA',
                geoUnit: 'Gallia',
                accentureDigital: 'Not Applicable - Not',
                accentureSoftware: 'X-OG, NOT APPLICABLE',
                alliances: 'IBM - MIDDLEWARE - 4',
                businessService: 'HEALTH-CLINICAL & HE',
                consultingPractice: '',
                //crossServiceGroupOffering: 'Cloud - Not Applicab',
                //mergersAcquisitions: '',
                microsoftPlatformInformation: 'NO MICROSOFT - 0%',
                strategyOfferings: '',
                techOperationsOfferings: 'APPLICATIONS - SOLN ' }
                */
            $scope.generate= function(){
                console.log("generate");
                $scope.opportunities =[];
                Opportunities.getSimilarities($scope.opportunity).success(function(response){
                    process(response);
                });

            }
            $scope.askTheBot= function(){
                console.log("ask the bot");
                console.log($scope.query);
                $scope.opportunities =[];
                Opportunities.askTheBot($scope.query).success(function(response){
                    process(response);
                });

            }
            var process = function(response){
                console.log(response);
                $scope.successRate = response.successRate;
                var j = response.records;
                j.forEach(function(o){
                    console.log(o);
                    o.serviceGroup = "";
                    if(o.ic!=0)
                        o.serviceGroup = o.serviceGroup + "IC ";
                    if(o.mc!=0)
                        o.serviceGroup = o.serviceGroup + "MC ";
                    if(o.sc!=0)
                        o.serviceGroup = o.serviceGroup + "SC ";
                    if(o.si!=0)
                        o.serviceGroup = o.serviceGroup + "SI ";
                    if(o.tc!=0)
                        o.serviceGroup = o.serviceGroup + "TC ";
                    if(o.ao!=0)
                        o.serviceGroup = o.serviceGroup + "AO ";
                    if(o.bpo!=0)
                        o.serviceGroup = o.serviceGroup + "BPO ";
                    if(o.io!=0)
                        o.serviceGroup = o.serviceGroup + "IO ";
                    $scope.opportunities.push(o);
                })

            }

        }]);


