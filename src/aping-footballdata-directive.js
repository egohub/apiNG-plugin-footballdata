"use strict";

angular.module("jtt_aping_footballdata", ['jtt_footballdata'])
    .directive('apingFootballdata', ['apingFootballDataHelper', 'apingUtilityHelper', 'footballdataFactory', function (apingFootballDataHelper, apingUtilityHelper, footballdataFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingFootballdata, apingFootballDataHelper.getThisPlatformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };

                    if (angular.isDefined(appSettings.getNativeData)) {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }
                    //create requestObject for api request call

                    var requestObject = {
                        apiKey: apingUtilityHelper.getApiCredentials(apingFootballDataHelper.getThisPlatformString(), "api_key"),
                    };

                    if (request.protocol === "http" || request.protocol === "https") {
                        requestObject.protocol = request.protocol;
                    } else if (appSettings.protocol === "http" || appSettings.protocol === "https") {
                        requestObject.protocol = appSettings.protocol;
                    } else {
                        requestObject.protocol = "";
                    }

                    if (angular.isDefined(request.items)) {
                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }
                    }

                    switch (helperObject.model) {
                        case 'fbd-team':
                            if (angular.isDefined(request.teamId)) {

                                requestObject.id = request.teamId;

                                footballdataFactory.getTeam(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            } else if (angular.isDefined(request.leagueId)) {
                                requestObject.id = request.leagueId;

                                footballdataFactory.getTeamsBySeason(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            }
                            break;

                        case 'fbd-league':
                            if (angular.isDefined(request.year)) {

                                if (request.year !== '$CURRENT') {
                                    requestObject.season = request.year;
                                }

                                footballdataFactory.getSeasons(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            } else if (angular.isDefined(request.leagueId)) {
                                requestObject.id = request.leagueId;

                                footballdataFactory.getSeason(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            }
                            break;

                        case 'fbd-player':
                            if (angular.isDefined(request.teamId)) {

                                requestObject.id = request.teamId;

                                footballdataFactory.getPlayersByTeam(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            }
                            break;

                        case 'fbd-table':
                            if (angular.isDefined(request.leagueId)) {

                                requestObject.id = request.leagueId;

                                if (angular.isDefined(request.matchday)) {
                                    requestObject.matchday = request.matchday;
                                }

                                footballdataFactory.getLeagueTableBySeason(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            }
                            break;

                        case 'fbd-fixture':
                            if (angular.isDefined(request.fixtureId)) {

                                requestObject.id = request.fixtureId;

                                footballdataFactory.getFixture(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            } else if (angular.isDefined(request.leagueId)) {
                                requestObject.id = request.leagueId;

                                if (angular.isDefined(request.timeFrame)) {
                                    requestObject.timeFrame = request.timeFrame;
                                }

                                if (angular.isDefined(request.matchday)) {
                                    requestObject.matchday = request.matchday;
                                }

                                footballdataFactory.getFixturesBySeason(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            } else if (angular.isDefined(request.teamId)) {
                                requestObject.id = request.teamId;

                                if (angular.isDefined(request.timeFrame)) {
                                    requestObject.timeFrame = request.timeFrame;
                                }

                                if (angular.isDefined(request.year)) {
                                    if (request.year !== '$CURRENT') {
                                        requestObject.season = request.year;
                                    }
                                }

                                if (angular.isDefined(request.venue)) {
                                    requestObject.venue = request.venue;
                                }

                                footballdataFactory.getFixturesByTeam(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            } else {
                                if (angular.isDefined(request.timeFrame)) {
                                    requestObject.timeFrame = request.timeFrame;
                                }

                                if (angular.isDefined(request.leagueCodes)) {
                                    requestObject.league = request.leagueCodes;
                                }

                                footballdataFactory.getFixtures(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFootballDataHelper.getObjectByJsonData(_data, helperObject));
                                        }
                                    });
                            }
                            break;
                    }
                });
            }
        }
    }]);