Spindoctor = {};

Spindoctor.Controllers = {};

/* Static Controllers -----------------------------------------------------------*/

Spindoctor.Controllers.Intro = function ($scope, $http, $routeParams, treeService, navigationService, sdPath) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    window.spindoctorNavigationPath = sdPath;
    Spindoctor.WaitTree('TreeLoad');
}

Spindoctor.Controllers.Dashboard = function ($scope, $http, $routeParams, treeService, navigationService) {
}

Spindoctor.Controllers.SettingsIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
    Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "settings"]);
}
    Spindoctor.Controllers.LicensedDomainsIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "settings", "licenseddomains"]);
    }
    Spindoctor.Controllers.ConnectedAccountsIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "settings", "connectedaccounts"]);
    }

Spindoctor.Controllers.ModelIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
    Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "model"]);
}
    Spindoctor.Controllers.SegmentsIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "model", "segments"]);
    }
    Spindoctor.Controllers.ProfileAttributesIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "model", "profileattributes"]);
    }

Spindoctor.Controllers.LogicIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
    Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "logic"]);
}
    Spindoctor.Controllers.ActionsIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "logic", "actions"]);
    }
    Spindoctor.Controllers.TriggersIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "logic", "triggers"]);
    }


Spindoctor.Controllers.OutputIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
    Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "output"]);
}
    Spindoctor.Controllers.ContentSelectorsIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "output", "contentselectors"]);
    }
    Spindoctor.Controllers.ReportsIntro = function ($scope, $http, $routeParams, treeService, navigationService) {
        Spindoctor.Controllers.Intro($scope, $http, $routeParams, treeService, navigationService, ["-1", "output", "reports"]);
    }




/* Dynamic Controllers -----------------------------------------------------------*/

Spindoctor.WaitTree = function (waitFor) {
    var treeScopeHead = angular.element("#tree").scope().$$childHead;
    var tree = treeScopeHead.activeTree;
    switch (waitFor) {
        case 'TreeLoad':
            if (tree != null) {
                treeScopeHead.currentNode = undefined;
                window.spindoctorNavigationService.syncTree({ tree: 'SpindoctorTree', path: window.spindoctorNavigationPath, forceReload: true });
                Spindoctor.WaitTree('CurrentNode');
            }
            else setTimeout("Spindoctor.WaitTree('" + waitFor + "')", 100);
            break;
        case 'CurrentNode':
            if (treeScopeHead.currentNode != undefined) {
                window.spindoctorCurrentNode = treeScopeHead.currentNode;
            }
            else setTimeout("Spindoctor.WaitTree('" + waitFor + "')", 100);
            break;
    }
}

Spindoctor.GetPropertyBagProperty = function (propertybag, propertyName) {
    var v;
    $.each(propertybag, function (index, property) {
        if (property.Name == propertyName) {
            v = property.Value;
        }
    });
    return v;
}
Spindoctor.DeletePropertyBagProperty = function (propertybag, propertyName) {
    $.each(propertybag, function (index, property) {
        if (property==undefined || property.Name == propertyName) {
            propertybag.splice(index, 1);
        }
    });
}
Spindoctor.SetPropertyBagPropertyValue = function (propertybag, propertyName, propertyValue) {
    var isSet = false;
    $.each(propertybag, function (index, property) {
        if (property.Name == propertyName) {
            property.Value = propertyValue;
            isSet = true;
        }
    });
    if (!isSet) propertybag.push({ Name: propertyName, Value: propertyValue });
}
Spindoctor.SortByProperty = function(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }

        return sortStatus;
    };
}


Spindoctor.Confirm = function (callback, params) {
    UmbClientMgr.openAngularModalWindow({
        callback: callback,
        params: params,
        template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/confirm.html'
    });
}
Spindoctor.Controllers.Confirm = function ($scope, $http, $routeParams, treeService, navigationService) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.params = dialogOptions.params;
    $scope.save = function () { dialogOptions.callback(dialogOptions.params); $scope.close(); }
}

Spindoctor.Inform = function ($scope, params) {
    UmbClientMgr.openAngularModalWindow({
        scope: $scope,
        params: params,
        template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/inform.html'
    });
}
Spindoctor.Controllers.Inform = function ($scope, $http, $routeParams, treeService, navigationService) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.params = dialogOptions.params;
}

Spindoctor.Controllers.EditDomain = function ($scope, $http, $routeParams, treeService, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    if ($routeParams.id > 0) {
        window.spindoctorNavigationPath = ["-1", "settings", "licenseddomains", 'SL_' + $routeParams.id];
    } else {
        window.spindoctorNavigationPath = ["-1", "settings", "licenseddomains"];
        $scope.domain = { Id: 0, Name: window.location.hostname };
    }
    Spindoctor.WaitTree('TreeLoad');

    $scope.id = $routeParams.id;

    if ($routeParams.id > 0) {
        $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetDomainEdit?domainId=" + $routeParams.id })
            .success(function (data) {
                $scope.domain = data.Domain;
                $scope.validationMessage = data.ValidationMessage;
            });
    }

    $scope.save = function () {
        if ($scope.form1.$valid) {
            $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateDomain", data: $scope.domain })
                .success(function (data) {
                    if (data.Domain.Id > 0) {
                        $scope.domain = data.Domain;
                        location.href = '#/Spindoctor/SpindoctorTree/licenseddomains/' + $scope.domain.Id;
                        top.UmbSpeechBubble.ShowMessage('success', 'DOMAIN SAVED', 'License for domain &quot;' + $scope.domain.Name + '&quot; was successfully saved.');
                    } else {
                        $scope.domain = data.Domain;
                        $scope.validationMessage = data.ValidationMessage;
                        top.UmbSpeechBubble.ShowMessage('error', 'DOMAIN NOT SAVED', 'License information is NOT VALID.');
                    }
                });
        }
    };

    $scope.delete = function () {
        var params = {};
        params.title = "Delete Domain license";
        params.intro = "Are you sure you wish to delete Domain license &quot;" + $scope.domain.Name + "&quot;?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/DeleteDomain?domainId=" + $scope.domain.Id })
            .success(function (data) {
                window.spindoctorTreeService.removeNode(window.spindoctorCurrentNode);
                top.UmbSpeechBubble.ShowMessage('success', 'DOMAIN DELETED', 'License for domain &quot;' + $scope.domain.Name + '&quot; was successfully deleted.');
                location.href = '#/Spindoctor/SpindoctorTree/licenseddomains-intro/yeah';
            });
        }, params);
    }
    
}

Spindoctor.Controllers.EditConnectedAccount = function ($scope, $http, $routeParams, treeService, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    $scope.accounttype = $routeParams.id;

    $scope.showFacebook = function () {
        return ($scope.accounttype == 'facebook');
    }

    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetConnectedAccounts" })
    .success(function (data) {
        $scope.accounts = data;
    });

    window.spindoctorNavigationPath = ["-1", "settings", "connectedaccounts", $routeParams.id];
    Spindoctor.WaitTree('TreeLoad');

    $scope.save = function () {
        if ($scope.form1.$valid) {
            $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateConnectedAccounts", data: $scope.accounts })
                .success(function (data) {
                    top.UmbSpeechBubble.ShowMessage('success', 'CONNECTED ACCOUNT SAVED', 'The connected account was successfully saved.');
                });
        }
    };
}


Spindoctor.Controllers.TrackerConfiguration = function ($scope, $http, $routeParams, treeService, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;

    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetTrackerConfigurationEdit" })
    .success(function (data) {
        $scope.config = data;
    });

    window.spindoctorNavigationPath = ["-1", "settings", "trackerconfiguration"];
    Spindoctor.WaitTree('TreeLoad');

    $scope.save = function () {
        if ($scope.form1.$valid) {
            $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateTrackerConfiguration", data: $scope.config })
                .success(function (data) {
                    top.UmbSpeechBubble.ShowMessage('success', 'TRACKER CONFIGURATION SAVED', 'The tracker configuration was successfully saved.');
                });
        }
    };
}


Spindoctor.Controllers.EditSegment = function ($scope, $http, $routeParams, treeService, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    if ($routeParams.id > 0) {
        window.spindoctorNavigationPath = ["-1", "model", "segments", 'SS_' + $routeParams.id];
    } else {
        window.spindoctorNavigationPath = ["-1", "model", "segments"];
        $scope.segment = { Id: 0, Name: 'New segment', LifetimeDays: 30 };
    }
    Spindoctor.WaitTree('TreeLoad');

    if ($routeParams.id > 0) {
        $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetSegment?segmentId=" + $routeParams.id })
            .success(function (data) {
                $scope.segment = data;
                $scope.segment.LifetimeDays = parseInt(data.LifetimeSeconds) / 3600;
            });
    }

    $scope.save = function () {
        if ($scope.form1.$valid) {
            $scope.segment.LifetimeSeconds = parseInt($scope.segment.LifetimeDays) * 3600;
            $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateSegment", data: $scope.segment })
                .success(function (data) {
                    if ($scope.segment.Id > 0) {
                        window.spindoctorTreeService.reloadNode(window.spindoctorCurrentNode);
                    } else {
                        location.href = '#/Spindoctor/SpindoctorTree/segments/' + data;
                    }
                    top.UmbSpeechBubble.ShowMessage('success', 'SEGMENT SAVED', 'Segment &quot;' + $scope.segment.Name + '&quot; was successfully saved.');
                });
        }
    };

    $scope.delete = function () {
        var params = {};
        params.title = "Delete Segment";
        params.intro = "Are you sure you wish to delete Segment &quot;" + $scope.segment.Name + "&quot;?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/DeleteSegment?segmentId=" + $scope.segment.Id })
            .success(function (data) {
                window.spindoctorTreeService.removeNode(window.spindoctorCurrentNode);
                top.UmbSpeechBubble.ShowMessage('success', 'SEGMENT DELETED', 'Segment &quot;' + $scope.segment.Name + '&quot; was successfully deleted.');
                location.href = '#/Spindoctor/SpindoctorTree/segments-intro/yeah';
            });
        }, params);
    }
}

Spindoctor.Controllers.EditProfileAttribute = function ($scope, $http, $routeParams, treeService, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    if ($routeParams.id > 0) {
        window.spindoctorNavigationPath = ["-1", "model", "profileattributes", 'SP_' + $routeParams.id];
    } else {
        window.spindoctorNavigationPath = ["-1", "model", "profileattributes"];
    }
    Spindoctor.WaitTree('TreeLoad');

    $scope.edit = function (item) {
        UmbClientMgr.openAngularModalWindow({
            component: angular.copy(item),
            componentRef: item,
            attribute: $scope.attribute,
            template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-editcomponent.html'
        });
    };

    $scope.delete = function (item) {
        var params = {};
        params.title = "Delete Attribute Component";
        params.intro = "Are you sure you wish to delete the Attribute Component &quot;" + item.Name + "&quot;?";
        params.item = item;
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $.each(params.orgscope.attribute.Components, function (index, component) {
                if (component == params.item) {
                    params.orgscope.attribute.Components.splice(index, 1);
                }
            });
        }, params);
    };

    $scope.add = function () {
        UmbClientMgr.openAngularModalWindow({
            component: { Id: 0, Name: 'New component' },
            componentRef: null,
            attribute: $scope.attribute,
            template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-editcomponent.html'
        });
    }

    if ($routeParams.id > 0) {
        $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetProfilingAttribute?attributeId=" + $routeParams.id })
        .success(function (data) {
            $scope.attribute = data;
        });
    } else {
        $scope.attribute = { Id:0, Name:'New Profile Attribute', Components: []};
    }

    $scope.deleteAttribute = function () {
        var params = {};
        params.title = "Delete Profiling Attribute";
        params.intro = "Are you sure you wish to delete Profiling Attribute &quot;" + $scope.attribute.Name + "&quot;?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/DeleteProfilingAttribute?attributeId=" + $scope.attribute.Id })
            .success(function (data) {
                window.spindoctorTreeService.removeNode(window.spindoctorCurrentNode);
                top.UmbSpeechBubble.ShowMessage('success', 'PROFILING ATTRIBUTE DELETED', 'Profiling Attribute &quot;' + $scope.attribute.Name + '&quot; was successfully deleted.');
                location.href = '#/Spindoctor/SpindoctorTree/profileattributes-intro/yeah';
            });
        }, params);
    }


    $scope.save = function () {
        if ($scope.form1.$valid) {
            $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateProfilingAttribute", data: $scope.attribute })
                .success(function (data) {
                    if ($scope.attribute.Id > 0) {
                        window.spindoctorTreeService.reloadNode(window.spindoctorCurrentNode);
                    } else {
                        location.href = '#/Spindoctor/SpindoctorTree/profileattributes/' + data;
                    }
                    top.UmbSpeechBubble.ShowMessage('success', 'PROFILING ATTRIBUTE SAVED', 'Profiling Attribute &quot;' + $scope.attribute.Name + '&quot; was successfully saved.');
                });
        }
    };
}

Spindoctor.Controllers.EditComponentDialog = function ($scope) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.component = dialogOptions.component;
    $scope.componentRef = dialogOptions.componentRef;
    $scope.attribute = dialogOptions.attribute;
    $scope.save = function () {
        if ($scope.componentRef == null) {
            $scope.attribute.Components.push($scope.component);
        } else {
            $scope.componentRef.Name = $scope.component.Name;
        }
        $scope.close();
    }
}

Spindoctor.Controllers.EditAction = function ($scope, $http, $routeParams, treeService, navigationService, $compile, assetsService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    if ($routeParams.id > 0) {
        window.spindoctorNavigationPath = ["-1", "logic", "actions", 'SA_' + $routeParams.id];
    } else {
        window.spindoctorNavigationPath = ["-1", "logic", "actions"];
    }
    Spindoctor.WaitTree('TreeLoad');

    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetActionEdit?actionId=" + $routeParams.id })
    .success(function (data) {
        if ($routeParams.id > 0) {
            $scope.action = data.action;
            $scope.referencedTriggers = data.referencedTriggers;
        } else {
            $scope.action = { Id: 0, Name: 'New action', TypeCode: 0, Properties: [] };
            $scope.referencedTriggers = [];
        }
        $scope.actionTypeDefaults = data.actionTypeDefaults;
        Spindoctor.Controllers.EditAction.UpdateActionType($scope, $compile, $http, assetsService);
    });

    $scope.delete = function () {
        var params = {};
        params.orgscope = $scope;
        if ($scope.referencedTriggers.length > 0) {
            params.title = "Action is being used";
            params.intro = "This action can not be deleted as it is being used by the following trigger(s):<ul>";

            $.each($scope.referencedTriggers, function (index, trigger) {
                params.intro += '<li><a href="#/Spindoctor/SpindoctorTree/triggers/' + trigger.Id + '">' + trigger.Name + '</a></li>';
            });
            params.intro += '</ul>';
            Spindoctor.Inform($scope, params);
        } else {
            params.title = "Delete Action";
            params.intro = "Are you sure you wish to delete Action &quot;" + $scope.action.Name + "&quot;?";
            Spindoctor.Confirm(function () {
                $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/DeleteAction?actionId=" + params.orgscope.action.Id })
                    .success(function (data) {
                        window.spindoctorTreeService.removeNode(window.spindoctorCurrentNode);
                        top.UmbSpeechBubble.ShowMessage('success', 'ACTION DELETED', 'Action &quot;' + params.orgscope.action.Name + '&quot; was successfully deleted.');
                        location.href = '#/Spindoctor/SpindoctorTree/actions-intro/yeah';
                    });
            }, params);
        }
    }

    $scope.save = function () {
        if ($scope.form1.$valid) {
            var actionTypeObj = Spindoctor.Controllers.EditAction.GetActionTypeDefault($scope, $scope.action.TypeCode, false);
            Spindoctor.ActionTypes[actionTypeObj.Tag].Save($scope, $http);

            $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateAction", data: $scope.action })
                    .success(function (data) {
                        if ($scope.action.Id > 0) {
                            window.spindoctorTreeService.reloadNode(window.spindoctorCurrentNode);
                        } else {
                            location.href = '#/Spindoctor/SpindoctorTree/actions/' + data;
                        }
                        top.UmbSpeechBubble.ShowMessage('success', 'ACTION SAVED', 'Action &quot;' + $scope.action.Name + '&quot; was successfully saved.');
                    });
        }
    };

    $scope.selectActionType = function () {
        UmbClientMgr.openAngularModalWindow({
            selectedActionTypeCode: $scope.action.TypeCode,
            actionTypeDefaults: $scope.actionTypeDefaults,
            orgscope: $scope,
            template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-selectactiontype.html'
        });
    }
}

Spindoctor.Controllers.EditAction.UpdateActionType = function ($scope, $compile, $http, assetsService) {
    if ($scope.action.TypeCode != 0) {
        $scope.actionTypeParentName = Spindoctor.Controllers.EditAction.GetActionTypeDefault($scope, $scope.action.TypeCode, true).Name;

        var actionTypeObj = Spindoctor.Controllers.EditAction.GetActionTypeDefault($scope, $scope.action.TypeCode, false);
        $scope.actionTypeName = actionTypeObj.Name;

        $("#sd-action-insert").html(actionTypeObj.Html);
        $compile($("#sd-action-insert").contents())($scope);
        
        Spindoctor.ActionTypes[actionTypeObj.Tag].Load($scope, $http);
    }
}
Spindoctor.Controllers.EditAction.GetActionTypeDefault = function ($scope, code, selectParent) {
    var ac;
    $.each($scope.actionTypeDefaults, function (index, chapter) {
        $.each(chapter.Children, function(index2, actionType) {
            if (actionType.Code == code) {
                if (!selectParent)
                    ac = actionType;
                else
                    ac = chapter;
            }
        });
    });
    return ac;
}

Spindoctor.Controllers.SelectActionTypeDialog = function ($scope, $compile, $http, assetsService) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.actionTypeDefaults = dialogOptions.actionTypeDefaults;
    $scope.selectedActionTypeCode = dialogOptions.selectedActionTypeCode;
    $scope.orgscope = dialogOptions.orgscope;

    $scope.select = function (code) { $scope.selectedActionTypeCode = code; };

    $scope.save = function () {
        if ($scope.selectedActionTypeCode != 0) {
            $scope.orgscope.action.TypeCode = $scope.selectedActionTypeCode;
            Spindoctor.Controllers.EditAction.UpdateActionType($scope.orgscope, $compile, $http, assetsService);
            $scope.close();
        }
    }
}

Spindoctor.Controllers.SelectSegment = function ($scope, segmentsArray, selectedSegmentId, callback) {
    UmbClientMgr.openAngularModalWindow({
        segments: segmentsArray,
        selectedSegmentId: selectedSegmentId,
        callback: callback,
        template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-selectsegment.html'
    });
}

Spindoctor.Controllers.SelectSegmentDialog = function ($scope) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.segments = dialogOptions.segments;
    $scope.selectedSegmentId = dialogOptions.selectedSegmentId;

    $scope.select = function (id) { $scope.selectedSegmentId = id; };

    $scope.save = function () { dialogOptions.callback($scope.selectedSegmentId); $scope.close(); }
}

Spindoctor.Controllers.EditTrigger = function ($scope, $http, $routeParams, treeService, navigationService, $compile, assetsService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    if ($routeParams.id > 0) {
        window.spindoctorNavigationPath = ["-1", "logic", "triggers", 'ST_' + $routeParams.id];
    } else {
        window.spindoctorNavigationPath = ["-1", "logic", "triggers"];
    }
    Spindoctor.WaitTree('TreeLoad');

    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetTriggerEdit?triggerId=" + $routeParams.id })
        .success(function (data) {
            if ($routeParams.id > 0) {
                $scope.trigger = data.trigger;
                $scope.trigger.TriggerRules.sort(Spindoctor.SortByProperty('SortOrder'));
                $scope.trigger.TriggerActions.sort(Spindoctor.SortByProperty('SortOrder'));
            } else {
                $scope.trigger = { Id: 0, Name: 'New trigger', TriggerRules:[], TriggerActions:[] };
            }
            $scope.actions = data.actions;
            $scope.triggerRuleTypes = data.triggerRuleTypes;
            $scope.documentTypes = data.documentTypes;
            $scope.documentTypeProperties = data.documentTypeProperties;
            $scope.segments = data.segments;
            $scope.components = data.components;
        });

    $scope.filterDescription = function (property) {
        return (property.Name=='Description');
    }

    $scope.sortableOptionsTriggerRules = {
        axis: 'y',
        stop: function (e, ui) {
            $scope.ReorderTriggerRules($scope);
        }
    };

    $scope.sortableOptionsActions = {
        axis: 'y',
        stop: function (e, ui) {
            $scope.ReorderTriggerActions($scope);
        }
    }

    $scope.ReorderTriggerRules = function ($scope) {
        $.each($scope.trigger.TriggerRules, function (index, rule) {
            rule.SortOrder = index;
        });
    }
    $scope.ReorderTriggerActions = function ($scope) {
        $.each($scope.trigger.TriggerActions, function (index, action) {
            action.SortOrder = index;
        });
    }

    $scope.LeftBraces = 1;
    $scope.RightBraces = 2;
    $scope.OperatorNot = 4;
    $scope.OperatorAnd = 8;
    $scope.OperatorOr = 16;

    $scope.IsLastTriggerRule = function(rule) {
        return (rule == $scope.trigger.TriggerRules[$scope.trigger.TriggerRules.length - 1]);
    }

    $scope.HasOperator = function (rule, operator) {
        return (rule.LogicalOperatorFlags & operator) > 0;
    };

    $scope.SetOperator = function (rule, operator, set) {
        if ($scope.HasOperator(rule, operator) == set) return;

        if (set) {
            rule.LogicalOperatorFlags += operator;
        } else {
            rule.LogicalOperatorFlags -= operator;
        }
    };

    $scope.ToggleOperator = function (rule, operator) {
        if ($scope.HasOperator(rule, operator)) {
            $scope.SetOperator(rule, operator, false);
        } else {
            $scope.SetOperator(rule, operator, true);
        }
    };

    $scope.ToggleAndOrOperator = function (rule) {
        var isAnd = $scope.HasOperator(rule, $scope.OperatorAnd);
        $scope.SetOperator(rule, $scope.OperatorOr, isAnd);
        $scope.SetOperator(rule, $scope.OperatorAnd, !isAnd);
    };

    $scope.selectAction = function (item) {
        Spindoctor.Controllers.SelectAction($scope.actions, item, function (selectedActionId) {
            $.each($scope.actions, function (index, action) {
                if (action.Id == selectedActionId) {
                    if (item != null) {
                        item.ActionId = action.Id;
                        item.ActionName = action.Name;
                    } else {
                        $scope.trigger.TriggerActions.push({ ActionId: action.Id, ActionName: action.Name, SortOrder: $scope.trigger.TriggerActions.length, TriggerId: $scope.trigger.Id });
                    }
                }
            });
        });
    };

    $scope.deleteAction = function (item) {
        var params = {};
        params.title = "Unreference action";
        params.intro = "Are you sure you wish to unreference Action &quot;" + item.ActionName + "&quot;?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $.each(params.orgscope.trigger.TriggerActions, function (index, rule) {
                if (rule == item) {
                    params.orgscope.trigger.TriggerActions.splice(index, 1);
                }
            });
            params.orgscope.ReorderTriggerActions(params.orgscope);
        }, params);
    };

    $scope.editTriggerRule = function (item) {
        Spindoctor.Controllers.EditTriggerRule($scope, item, function (triggerRuleCopy) {
            if (triggerRuleCopy.SortOrder == -1) {
                triggerRuleCopy.LogicalOperatorFlags = $scope.OperatorOr;
                triggerRuleCopy.SortOrder = $scope.trigger.TriggerRules.length;
                $scope.trigger.TriggerRules.push(triggerRuleCopy);
            } else {
                item.TriggerRuleTypeId = triggerRuleCopy.TriggerRuleTypeId;
                item.MinimumHits = triggerRuleCopy.MinimumHits;
                item.LogicalOperatorFlags = triggerRuleCopy.LogicalOperatorFlags;
                item.SortOrder = triggerRuleCopy.SortOrder;
                item.Properties = triggerRuleCopy.Properties;
            }
        });
    };

    $scope.deleteTriggerRule = function (item) {
        var params = {};
        params.title = "Delete Trigger Rule";
        params.intro = "Are you sure you wish to delete Trigger Rule &quot;" + Spindoctor.GetPropertyBagProperty(item.Properties,'Description') + "&quot;?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {

            $.each(params.orgscope.trigger.TriggerRules, function (index, rule) {
                if (rule == item) {
                    params.orgscope.trigger.TriggerRules.splice(index, 1);
                }
            });
            params.orgscope.ReorderTriggerRules(params.orgscope);
        }, params);
    }


    $scope.save = function () {
        if ($scope.form1.$valid) {
            $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateTrigger", data: $scope.trigger })
                    .success(function (data) {
                        var successMsg = false;
                        if ($scope.trigger.Id > 0 && data > 0) {
                            top.UmbSpeechBubble.ShowMessage('success', 'TRIGGER SAVED', 'Trigger &quot;' + $scope.trigger.Name + '&quot; was successfully saved.');
                            window.spindoctorTreeService.reloadNode(window.spindoctorCurrentNode);
                        } else if (data == -1) {
                            top.UmbSpeechBubble.ShowMessage('error', 'TRIGGER NOT SAVED', 'Invalid logical configuration. Please check the braces around the trigger rules.');
                        } else {
                            top.UmbSpeechBubble.ShowMessage('success', 'TRIGGER SAVED', 'Trigger &quot;' + $scope.trigger.Name + '&quot; was successfully saved.');
                            location.href = '#/Spindoctor/SpindoctorTree/triggers/' + data;
                        }
                    });
        }
    }

    $scope.hasTriggerRules = function(){
        return ($scope.trigger != undefined && $scope.trigger.TriggerRules.length > 0);
    }
    $scope.hasTriggerActions = function () {
        return ($scope.trigger != undefined && $scope.trigger.TriggerActions.length > 0);
    }

    $scope.delete = function () {
        var params = {};
        params.title = "Delete Trigger";
        params.intro = "Are you sure you wish to delete Trigger &quot;" + $scope.trigger.Name + "&quot;?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/DeleteTrigger?triggerId=" + $scope.trigger.Id })
            .success(function (data) {
                window.spindoctorTreeService.removeNode(window.spindoctorCurrentNode);
                top.UmbSpeechBubble.ShowMessage('success', 'TRIGGER DELETED', 'Trigger &quot;' + $scope.trigger.Name + '&quot; was successfully deleted.');
                location.href = '#/Spindoctor/SpindoctorTree/triggers-intro/yeah';
            });
        }, params);
    }
}

Spindoctor.Controllers.EditTriggerRule = function ($scope, item, callback) {
    UmbClientMgr.openAngularModalWindow({
        triggerRuleTypes: $scope.triggerRuleTypes,
        documentTypes: $scope.documentTypes,
        documentTypeProperties: $scope.documentTypeProperties,
        segments: $scope.segments,
        components: $scope.components,
        selectedTriggerRuleTypeTag: (item != null ? Spindoctor.GetPropertyBagProperty(item.Properties, 'TriggerRuleTypeTag') : ''),
        selectedTriggerRule: item != null ? angular.copy(item) : null,
        orgscope: $scope,
        callback: callback,
        template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-edittriggerrule.html'
    });
}
Spindoctor.Controllers.EditTriggerRuleDialog = function ($scope, $http, $compile, treeService, entityResource) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.content = { tabs: [{ id: 10, label: "Trigger Rule Type" }, { id: 11, label: "Trigger Rule Config" }] };
    $scope.triggerRuleTypes = dialogOptions.triggerRuleTypes;
    $scope.selectedTriggerRule = dialogOptions.selectedTriggerRule;
    $scope.selectedTriggerRuleTypeTag = dialogOptions.selectedTriggerRuleTypeTag;
    $scope.documentTypes = dialogOptions.documentTypes;
    $scope.documentTypeProperties = dialogOptions.documentTypeProperties;
    $scope.segments = dialogOptions.segments;
    $scope.components = dialogOptions.components;
    $scope.orgscope = dialogOptions.orgscope;

    $scope.isInsertButton = function () {
        return ($scope.selectedTriggerRule == null || $scope.selectedTriggerRule == undefined || $scope.selectedTriggerRule.SortOrder == -1);
    }

    $scope.select = function (tag) {
        $scope.selectedTriggerRuleTypeTag = tag;
        $scope.loadTriggerRuleType($scope, $http, $compile);
    };

    $scope.save = function () {
        if ($scope.form2.$valid) {
            var tag = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'TriggerRuleTypeTag');
            Spindoctor.TriggerRuleTypes[tag].Save($scope, $http);
            var objTriggerRuleType = Spindoctor.Controllers.EditTriggerRuleDialog.GetTriggerRuleTypeDefault($scope.orgscope, tag, false);
            $scope.selectedTriggerRule.TriggerRuleTypeId = objTriggerRuleType.RuleTypeId;
            dialogOptions.callback($scope.selectedTriggerRule);
            $scope.close();
        }
    }

    $scope.loadTriggerRuleType = function ($scope, $http, $compile) {
        if ($scope.selectedTriggerRuleTypeTag != '') {
            var objTriggerRuleType = Spindoctor.Controllers.EditTriggerRuleDialog.GetTriggerRuleTypeDefault($scope.orgscope, $scope.selectedTriggerRuleTypeTag, false);

            $("#sd-triggerrule-insert").html(objTriggerRuleType.Html);
            $compile($("#sd-triggerrule-insert").contents())($scope);

            Spindoctor.TriggerRuleTypes[objTriggerRuleType.Tag].Load($scope, $http, treeService, entityResource);
            setTimeout(function () { $('a[href="#tab11"]').show().click(); }, 600);
        } else {
            setTimeout(function () { $('a[href="#tab11"]').hide(); }, 600);
        }
    }

    setTimeout(function () {
        $scope.loadTriggerRuleType($scope, $http, $compile);
    }, 100);

}
Spindoctor.Controllers.EditTriggerRuleDialog.GetTriggerRuleTypeDefault = function ($scope, tag, selectParent) {
    $.each($scope.triggerRuleTypes, function (index, chapter) {
        $.each(chapter.Children, function (index2, triggerRuleType) {
            if (triggerRuleType.Tag == tag) {
                if (!selectParent)
                    ac = triggerRuleType;
                else
                    ac = chapter;
            }
        });
    });
    return ac;
}

Spindoctor.Controllers.SelectAction = function (actionsArray, item, callback) {
    UmbClientMgr.openAngularModalWindow({
        actions: actionsArray,
        selectedActionId: (item != null)? item.ActionId:0,
        callback: callback,
        template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-selectaction.html'
    });
}
Spindoctor.Controllers.SelectActionDialog = function ($scope) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.actions = dialogOptions.actions;
    $scope.selectedActionId = dialogOptions.selectedActionId;

    $scope.select = function (id) { $scope.selectedActionId = id; };

    $scope.save = function () { dialogOptions.callback($scope.selectedActionId); $scope.close(); }
}


Spindoctor.Controllers.EditContentSelector = function ($routeParams, $scope, $http, $compile, treeService, entityResource, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;

    if ($routeParams.id > 0) {
        window.spindoctorNavigationPath = ["-1", "output", "contentselectors", 'SC_' + $routeParams.id];
    } else {
        window.spindoctorNavigationPath = ["-1", "output", "contentselectors"];
    }
    Spindoctor.WaitTree('TreeLoad');

    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetContentSelectorEdit?contentSelectorId=" + $routeParams.id })
        .success(function (data) {
            if ($routeParams.id > 0) {
                $scope.contentselector = data.ContentSelector;
            } else {
                $scope.contentselector = { Id: 0, DisplayName: 'New content selector', Alias: 'sdNewAlias', TypeCode: 1, Properties: [{ Name: 'Rules', Value: [] }] };
            };

            $scope.profileattributes = data.ProfileAttributes;
            $scope.segments = data.Segments;

            $scope.switchContentSelectorType();

            var defaultNodeId = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'DefaultNodeId');
            if (defaultNodeId != undefined && defaultNodeId > 0) {
                entityResource.getById(defaultNodeId, 'Document')
                  .then(function (data) {
                      $scope.DefaultNodeName = data.name;
                  });
            }

            var parentNodeId = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'ParentNodeId');
            if (parentNodeId != undefined && parentNodeId > 0) {
                entityResource.getById(parentNodeId, 'Document')
                  .then(function (data) {
                      $scope.ParentNodeName = data.name;
                  });
            }
        });


    $scope.isSegmentContentSelector = function () {
        return ($scope.contentselector == undefined || $scope.contentselector.TypeCode == 1);
    }
    $scope.hasRules = function () {
        if ($scope.contentselector == undefined) return false;
        var r = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'Rules');
        if (r == undefined) return false;
        return (r.length > 0);
    }
    $scope.deleteRule = function (item) {
        var params = {};
        params.title = "Delete Content selection rule";
        params.intro = "Are you sure you wish to delete this content selection rule?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $.each(params.orgscope.contentselectorrules, function (index, rule) {
                if (rule == item) {
                    params.orgscope.contentselectorrules.splice(index, 1);
                }
            });
            params.orgscope.reorderContentSelectionRules();
        }, params);
    }
    $scope.editRule = function (item) {
        Spindoctor.Controllers.EditContentSelectionRule($scope, item, function (contentSelectionRuleCopy) {
            if (contentSelectionRuleCopy.SortOrder == -1) {
                contentSelectionRuleCopy.SortOrder = $scope.contentselectorrules.length;
                $scope.contentselectorrules.push(contentSelectionRuleCopy);
            } else {
                item.Id = contentSelectionRuleCopy.Id;
                item.NodeId = contentSelectionRuleCopy.NodeId;
                item.ContentName = contentSelectionRuleCopy.ContentName;
                item.SegmentId = contentSelectionRuleCopy.SegmentId;
                item.SegmentName = contentSelectionRuleCopy.SegmentName;
                item.SortOrder = contentSelectionRuleCopy.SortOrder;
            }
        });
    }
    $scope.hasDefaultNode = function () {
        var n = $scope.contentselector != undefined ? Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'DefaultNodeId') : '0';
        return ($scope.contentselector != undefined && n != null && parseInt(n)>0);
    }
    $scope.hasParentNode = function () {
        var n = $scope.contentselector != undefined ? Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'ParentNodeId') : '0';
        return ($scope.contentselector != undefined && n != null && parseInt(n) > 0);
    }
    $scope.chooseDefaultNode = function () {
        var n = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'DefaultNodeId');

        UmbClientMgr.openAngularModalWindow({
            selectedNode: { Id: n, Name: '' },
            callback: function (selectedNode) {
                Spindoctor.SetPropertyBagPropertyValue($scope.contentselector.Properties, 'DefaultNodeId', selectedNode.Id);
                $scope.DefaultNodeName = selectedNode.Name;
            },
            template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-selectcontent.html'
        });
    }
    $scope.deselectDefaultNode = function () {
        $scope.DefaultNodeName = '';
        Spindoctor.SetPropertyBagPropertyValue($scope.contentselector.Properties, 'DefaultNodeId', 0);
    }
    $scope.chooseParentNode = function () {
        var n = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'ParentNodeId');

        UmbClientMgr.openAngularModalWindow({
            selectedNode: { Id: n, Name: '' },
            callback: function (selectedNode) {
                Spindoctor.SetPropertyBagPropertyValue($scope.contentselector.Properties, 'ParentNodeId', selectedNode.Id);
                Spindoctor.SetPropertyBagPropertyValue($scope.contentselector.Properties, 'XPath', '');
                $scope.ParentNodeName = selectedNode.Name;
            },
            template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-selectcontent.html'
        });
    }
    $scope.deselectParentNode = function () {
        $scope.ParentNodeName = '';
        Spindoctor.SetPropertyBagPropertyValue($scope.contentselector.Properties, 'ParentNodeId', 0);
    }

    $scope.reorderContentSelectionRules = function () {
        $.each($scope.contentselectorrules, function (index, rule) {
            rule.SortOrder = index;
        });
    }

    $scope.sortableOptionsContentSelectorRules = {
        axis: 'y',
        stop: function (e, ui) {
            $scope.reorderContentSelectionRules();
        }
    }

    $scope.save = function () {
        Spindoctor.SetPropertyBagPropertyValue($scope.contentselector.Properties, 'Rules', $scope.contentselectorrules);

        $http({ method: 'POST', url: "backoffice/Spindoctor/Callback/UpdateContentSelector", data: $scope.contentselector })
            .success(function (data) {
                if ($scope.contentselector.Id > 0) {
                    window.spindoctorTreeService.reloadNode(window.spindoctorCurrentNode);
                } else {
                    location.href = '#/Spindoctor/SpindoctorTree/contentselectors/' + data;
                }
                top.UmbSpeechBubble.ShowMessage('success', 'CONTENT SELECTOR SAVED', 'Content selector &quot;' + $scope.contentselector.DisplayName + '&quot; was successfully saved.');
            });
    }

    $scope.delete = function () {
        var params = {};
        params.title = "Delete Content selector";
        params.intro = "Are you sure you wish to delete Content selector &quot;" + $scope.contentselector.DisplayName + "&quot;?";
        params.orgscope = $scope;
        Spindoctor.Confirm(function () {
            $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/DeleteContentSelector?contentSelectorId=" + $scope.contentselector.Id })
            .success(function (data) {
                window.spindoctorTreeService.removeNode(window.spindoctorCurrentNode);
                top.UmbSpeechBubble.ShowMessage('success', 'CONTENT SELECTOR DELETED', 'Content selector &quot;' + $scope.contentselector.DisplayName + '&quot; was successfully deleted.');
                location.href = '#/Spindoctor/SpindoctorTree/contentselectors-intro/yeah';
            });
        }, params);
    }

    $scope.getAttributeWeight = function (attributeId) {
        var data = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'AttributeWeight');
        for (var key in data) {
            if (parseInt(key) == parseInt(attributeId)) return data[key];
        }
        return 100;
    }

    $scope.switchContentSelectorType = function () {
        if ($scope.isSegmentContentSelector()) {
            var r = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'Rules');
            if (r == undefined || r == null) {
                $scope.contentselector.Properties = [
                    { Name: 'Rules', Value: [] },
                    { Name: 'DefaultNodeId', Value: 0 }
                ]
            }
            $scope.contentselectorrules = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'Rules');
            if ($scope.contentselectorrules.length > 0) $scope.contentselectorrules.sort(Spindoctor.SortByProperty('SortOrder'));
        } else {
            var defaultAttributeWeight = {};
            var r = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'AttributeWeight');
            if (r == undefined) {
                $.each($scope.profileattributes, function (index, pa) {
                    defaultAttributeWeight[pa.Id] = 100;
                });

                $scope.contentselector.Properties = [
                    { Name: 'AttributeWeight', Value: defaultAttributeWeight },
                    { Name: 'MaxCount', Value: 1 },
                    { Name: 'ParentNodeId', Value: 0 },
                    { Name: 'XPath', Value: '' }
                ]
            } else {
                $.each($scope.profileattributes, function (index, pa) {
                    defaultAttributeWeight[pa.Id] = $scope.getAttributeWeight(pa.Id);
                });
                Spindoctor.SetPropertyBagPropertyValue($scope.contentselector.Properties, 'AttributeWeight', defaultAttributeWeight);
            }

            setTimeout(function () {
                $.each($scope.profileattributes, function (index, attribute) {
                    $("#attributeweight_slider_" + attribute.Id).slider({
                        handle: 'square',
                        min: 0,
                        max: 100,
                        tooltip: 'hide',
                        value: $scope.getAttributeWeight(attribute.Id)
                    }).on('slide', function (ev) {
                        var w = Spindoctor.GetPropertyBagProperty($scope.contentselector.Properties, 'AttributeWeight');
                        w[attribute.Id] = ev.value;
                    });
                });

            }, 500);

        }
    }
}


Spindoctor.Controllers.EditContentSelectionRule = function ($scope, item, callback) {
    UmbClientMgr.openAngularModalWindow({
        segments: $scope.segments,
        selectedContentSelectionRule: item != null ? angular.copy(item) : { Id:0, NodeId:0, ContentName:'', SegmentId:0, SegmentName:'', SortOrder:-1 },
        orgscope: $scope,
        callback: callback,
        template: '/App_Plugins/Spindoctor/Backoffice/SpindoctorTree/dialog-editcontentselectionrule.html'
    });
}
Spindoctor.Controllers.EditContentSelectionRuleDialog = function ($scope, $http, $compile, treeService, entityResource) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.content = {};
    $scope.selectedContentSelectionRule = dialogOptions.selectedContentSelectionRule;
    $scope.segments = dialogOptions.segments;
    $scope.orgscope = dialogOptions.orgscope;

    $scope.isInsertButton = function () {
        return ($scope.selectedContentSelectionRule == null || $scope.selectedContentSelectionRule == undefined || $scope.selectedContentSelectionRule.SortOrder == -1);
    }

    $scope.save = function () {
        if ($scope.form2.$valid) {
            dialogOptions.callback($scope.selectedContentSelectionRule);
            $scope.close();
        }
    }

    $scope.selectSegment = function (id, name) {
        $scope.selectedContentSelectionRule.SegmentId = id;
        $scope.selectedContentSelectionRule.SegmentName = name;
    }

    $scope.tree = $({
    });

    $scope.check = function ($scope, root) {
        var found = null;
        if ($scope.selectedContentSelectionRule != undefined && $scope.selectedContentSelectionRule != null && $scope.selectedContentSelectionRule.NodeId > 0) {
            var id = $scope.selectedContentSelectionRule.NodeId;
            if ($scope.treeService != undefined && $scope.treeService != null) {
                found = $scope.treeService.getDescendantNode(root, id);
                if (found != null) {
                    $scope.currentNode = found;
                    angular.element(".sd-tree-selectcontent .root ul").first().children().each(function () { $(this).scope().currentNode = $scope.currentNode; });
                    $scope.$digest();
                }
            }
        }
        if (found == null) setTimeout(function () { $scope.check($scope, root); }, 500);
    }

    $scope.tree.bind("treeLoaded", function (ev, args) {
        $scope.treeService = treeService;
        if ($scope.selectedContentSelectionRule.NodeId != 0) {
            entityResource.getById($scope.selectedContentSelectionRule.NodeId, 'Document')
              .then(function (data) {
                  //$scope.currentNodeData = data;
                  $scope.treeService.syncTree({ node: args.tree.root, path: data.path.split(',') });
              }).then(function () {
                  $scope.check($scope, args.tree.root);
              });
        }
    });
    $scope.tree.bind("treeNodeSelect", function (ev, args) {
        $scope.currentNode = args.node;
        angular.element(".sd-tree-selectcontent .root ul").first().children().each(function () { $(this).scope().currentNode = args.node; })

        $scope.selectedContentSelectionRule.NodeId = parseInt($scope.currentNode.id);
        $scope.selectedContentSelectionRule.ContentName = $scope.currentNode.name;
    });
}


Spindoctor.Controllers.SelectContentDialog = function ($scope, $compile, $http, assetsService, treeService, entityResource) {
    var dialogOptions = $scope.$parent.dialogOptions;
    $scope.orgscope = dialogOptions.orgscope;
    $scope.callback = dialogOptions.callback;
    $scope.selectedNode = dialogOptions.selectedNode;

    $scope.save = function () {
        $scope.callback($scope.selectedNode);
        $scope.close();
    }

    $scope.tree = $({
    });

    $scope.check = function ($scope, root) {
        var found = null;
        if ($scope.currentNodeData != undefined && $scope.currentNodeData != null) {
            var id = $scope.currentNodeData.id;
            if ($scope.treeService != undefined && $scope.treeService != null) {
                found = $scope.treeService.getDescendantNode(root, id);
                if (found != null) {
                    $scope.currentNode = found;
                    angular.element(".sd-tree-pagevisit .root ul").first().children().each(function () { $(this).scope().currentNode = $scope.currentNode; });
                    $scope.$digest();
                }
            }
        }
        if (found == null) setTimeout(function () { $scope.check($scope, root); }, 500);
    }

    $scope.tree.bind("treeLoaded", function (ev, args) {
        $scope.treeService = treeService;
        if ($scope.selectedNode.Id != 0) {
            entityResource.getById($scope.selectedNode.Id, 'Document')
              .then(function (data) {
                  $scope.currentNodeData = data;
                  $scope.treeService.syncTree({ node: args.tree.root, path: data.path.split(',') });
              }).then(function () {
                  $scope.check($scope, args.tree.root);
              });
        }
    });
    $scope.tree.bind("treeNodeSelect", function (ev, args) {
        $scope.currentNode = args.node;
        angular.element(".sd-tree-selectcontent .root ul").first().children().each(function () { $(this).scope().currentNode = args.node; })

        $scope.selectedNode.Id = parseInt($scope.currentNode.id);
        $scope.selectedNode.Name = $scope.currentNode.name;
    });

}

Spindoctor.Controllers.ViewReport = function ($scope, $http, $routeParams, treeService, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;

    if ($routeParams.id > 0) {
        window.spindoctorNavigationPath = ["-1", "output", "reports", 'SR_' + $routeParams.id];
    } else {
        window.spindoctorNavigationPath = ["-1", "output", "reports"];
    }
    Spindoctor.WaitTree('TreeLoad');

    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetReport?reportId=" + $routeParams.id })
    .success(function (data) {
        $scope.report = data;
        $scope.generatedreport = { Html: '' };

        if ($scope.report.IsLicensed) {
            setTimeout($scope.generate, 100);
        } else {
            $scope.generatedreport = { Html: 'The reporting engine is a <strong>Pro</strong> feature. Could not detect a qualified license.' };
        }
    });

    $scope.generate = function () {
        $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GenerateReport?reportId=" + $routeParams.id })
        .success(function (data) {
            $scope.generatedreport = data;
        });
    }
}

Spindoctor.AttributeComponentsEditorController = function ($scope, $http, $routeParams, treeService, navigationService) {
    //$scope.data = 'Test';
    $scope.SpindoctorProfileAttributeComponents = [];
    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetProfilingAttributes" })
        .success(function (data) {
            $scope.profileAttributes = [];
            
            $.each(data, function (index, attribute) {
                if ($scope.model.config.ProfileAttributes.indexOf(attribute.Id) >= 0) $scope.profileAttributes.push(attribute);
            });
            
            if ($scope.model.value == undefined || $scope.model.value == null || $scope.model.value == '' || ($scope.model.value+'').indexOf('SpindoctorAttributeComponents|')==-1) {
                $.each($scope.profileAttributes, function (index, attribute) {
                    $.each(attribute.Components, function (index2, component) {
                        $scope.SpindoctorProfileAttributeComponents.push({ id: parseInt(component.Id), value: 0 });
                    });
                });
                $scope.convertToText();
            } else {
                $scope.convertToJson();
            }

            setTimeout(function () {
                $.each($scope.profileAttributes, function (index, attribute) {
                    $.each(attribute.Components, function (index2, component) {
                        var value = 100;
                        $.each($scope.SpindoctorProfileAttributeComponents, function (index, comp) {
                            if (comp.id == component.Id) value = comp.value;
                        });

                        $("#page_slider_" + component.Id).slider({
                            handle: 'square',
                            min: 0,
                            max: 100,
                            tooltip: 'hide',
                            value: value
                        }).on('slide', function (ev) {
                            $.each($scope.SpindoctorProfileAttributeComponents, function (index, comp) {
                                if (comp.id == component.Id) comp.value = ev.value;
                            });
                            $scope.convertToText();
                        });
                    });
                });
                
            }, 500);
        });

    $scope.convertToJson = function () {
        $scope.SpindoctorProfileAttributeComponents = [];
        if (!($scope.model.value == undefined || $scope.model.value == null || $scope.model.value == '')) {
            if ($scope.model.value.indexOf('SpindoctorAttributeComponents|') != -1) {
                var result = $scope.model.value.replace('SpindoctorAttributeComponents|', '');
                var pairs = result.split(',');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];
                    var splitpair = pair.split(':');
                    $scope.SpindoctorProfileAttributeComponents.push({ id: parseInt(splitpair[0]), value: parseInt(splitpair[1]) });;
                }
            }
        }
    }

    $scope.convertToText = function () {
        var result = "SpindoctorAttributeComponents|";
        $.each($scope.SpindoctorProfileAttributeComponents, function (index, comp) {
            result += comp.id + ':' + comp.value;
            if (index < $scope.SpindoctorProfileAttributeComponents.length - 1) result += ',';
        });
        $scope.model.value = result;
    }
}
Spindoctor.AttributeComponentsPreValueEditorController = function ($scope, $http, $routeParams, treeService, navigationService) {

    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetProfilingAttributes" })
        .success(function (data) {
            $scope.profileattributes = data;

            if ($scope.model.value == undefined) {
                $scope.model.value = [];

                $.each($scope.profileattributes, function (index, attribute) {
                    $scope.model.value.push(parseInt(attribute.Id));
                });
            }

        });

    $scope.isAttributeChecked = function (id) {
        return ($scope.model.value.indexOf(id) >= 0);
    }

    $scope.checkAttribute = function (id) {
        if (!$scope.isAttributeChecked(id)) {
            $scope.model.value.push(parseInt(id));
        } else {
            $scope.model.value.splice($scope.model.value.indexOf(id), 1);
        }
    }
}

Spindoctor.Controllers.RealtimeLog = function ($scope, $http, $routeParams, treeService, navigationService) {
    window.scope = angular.element("#tree").scope();
    window.spindoctorNavigationService = navigationService;
    window.spindoctorTreeService = treeService;
    window.spindoctorNavigationPath = ["-1", "output", "realtimelog"];
    Spindoctor.WaitTree('TreeLoad');

    $scope.lastId = -1;
    $scope.logEntries = [];
    $scope.isLicensed = false;
    $scope.isFetching = false;

    $scope.refresh = function () {
        if (!$scope.isFetching) {
            $scope.isFetching = true;
            if ($scope.lastId == -1) {
                $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetInMemoryLog" })
                    .success(function (data) {
                        $scope.lastId = data.LogEntries.length > 0 ? data.LogEntries[0].Id : -1;
                        $scope.logEntries = data.LogEntries;
                        $scope.isLicensed = data.IsLicensed;
                        $scope.isFetching = false;
                    }).error(function (data) {
                        $scope.isFetching = false;
                    });
            } else {
                $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetInMemoryLogSince?id=" + $scope.lastId + "&r=" + Math.random() })
                    .success(function (data) {
                        var t = $scope.logEntries;
                        $.each(data.LogEntries, function (index, entry) {
                            t.splice(0, 0, entry);
                            $scope.lastId = entry.Id;
                        });
                        $scope.logEntries = t;
                        $scope.isFetching = false;
                    }).error(function (data) {
                        $scope.isFetching = false;
                    });
            }
        }
        setTimeout(function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
            $scope.refresh();
        }, 1000);
    }

    $scope.filterOn = function (s) {
        $scope.term = s;
    }

    $scope.refresh();

}

/* TriggerRuleTypes -----------------------------------------------------------*/

Spindoctor.TriggerRuleTypeDefaults = {};
Spindoctor.TriggerRuleTypeDefaults.DefaultRule = function (tag) {
    return {
        Id: 0,
        LogicalOperatorFlags: 0,
        SortOrder: -1,
        Properties: [{ Name: 'TriggerRuleTypeTag', Value: tag }],
        MinimumHits: 1,
        TriggerRuleTypeId: 0, //Set upon overall save
        Description: '' //Set upon rule save
    };
}
Spindoctor.TriggerRuleTypeDefaults.CleanRule = function ($scope, tag) {
    if ($scope.selectedTriggerRule == null || Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'TriggerRuleTypeTag') != tag) {
        if ($scope.selectedTriggerRule == null) {
            $scope.selectedTriggerRule = Spindoctor.TriggerRuleTypeDefaults.DefaultRule(tag);
        } else {
            $scope.selectedTriggerRule.Properties = Spindoctor.TriggerRuleTypeDefaults.DefaultRule(tag).Properties;
        }
        return true;
    }
    return false;
}




Spindoctor.TriggerRuleTypes = [];

Spindoctor.TriggerRuleTypes['Spindoctor.Profile'] = {};
Spindoctor.TriggerRuleTypes['Spindoctor.Profile'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'Spindoctor.Profile')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'ComponentId', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'Comparison', Value: 'GE' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'CompareMode', Value: 'perc' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'CompareValue', Value: 50 });
    }
    $scope.comparemode = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'CompareMode');

}
Spindoctor.TriggerRuleTypes['Spindoctor.Profile'].Save = function ($scope, $http) {
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'CompareMode', $scope.comparemode);

    var c = '';
    var cid = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'ComponentId');
    $.each($scope.components, function (index, component) {
        if (component.Id == cid) {
            c = component.Name;
        }
    });

    var description = 'Value of attribute component <span class="em">' + c + '</span> ';
    switch (Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Comparison')) {
        case 'L': description += '&lt; '; break;
        case 'LE': description += '&lt;= '; break;
        case 'E': description += '= '; break;
        case 'GE': description += '&gt;= '; break;
        case 'G': description += '&gt; '; break;
    }
    description += Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'CompareValue');
    if ($scope.comparemode == 'perc') description += '%';
    
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}



Spindoctor.TriggerRuleTypes['Spindoctor.Segmentation'] = {};
Spindoctor.TriggerRuleTypes['Spindoctor.Segmentation'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'Spindoctor.Segmentation')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'SegmentId', Value: 0 });
    }
    $scope.select = function (id) {
        $scope.segmentId = id;
    }
    $scope.segmentId = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'SegmentId');
}
Spindoctor.TriggerRuleTypes['Spindoctor.Segmentation'].Save = function ($scope, $http) {
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'SegmentId', $scope.segmentId);
    var sn = '';
    $.each($scope.segments, function (index, s) {
        if (s.Id == $scope.segmentId) {
            sn = s.Name;
        }
    });
    var description = 'Visitor present in segment <span class="em">' + sn + '</span>';
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}


Spindoctor.TriggerRuleTypes['Social.Facebook'] = {};
Spindoctor.TriggerRuleTypes['Social.Facebook'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'Social.Facebook')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'fbField', Value: 'Gender' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'fbAgeFrom', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'fbAgeTo', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'fbGender', Value: 'm' });
    }
    $scope.gender = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'fbGender');
    if ($scope.gender == null) $scope.gender = 'm';
    $scope.agefrom = parseInt(Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'fbAgeFrom'));
    $scope.ageto = parseInt(Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'fbAgeTo'));
    $scope.selectedFieldIsGender = function () {
        return (Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'fbField') == 'Gender');
    }
}
Spindoctor.TriggerRuleTypes['Social.Facebook'].Save = function ($scope, $http) {
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'fbGender', $scope.gender);
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'fbAgeFrom', $scope.agefrom + '');
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'fbAgeTo', $scope.ageto + '');

    var description = 'Facebook ';
    if ($scope.selectedFieldIsGender()) {
        description += '<span class="em">Gender (' + ($scope.gender == 'm' ? 'Male' : 'Female') + ')</span>';
    } else {
        description += '<span class="em">Age (' + ($scope.agefrom + '-' + $scope.ageto) + ')</span>';
    }
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}



Spindoctor.TriggerRuleTypes['UserAgent.Regex'] = {};
Spindoctor.TriggerRuleTypes['UserAgent.Regex'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'UserAgent.Regex')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Browser', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'BrowserVersion', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'Platform', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'CustomRegex', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['UserAgent.Regex'].Save = function ($scope, $http) {
    description = 'Using specific platform or browser (custom regex)';
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}




Spindoctor.TriggerRuleTypes['UserAgent.Platform'] = {};
Spindoctor.TriggerRuleTypes['UserAgent.Platform'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'UserAgent.Platform')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Browser', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'BrowserVersion', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'Platform', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'CustomRegex', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['UserAgent.Platform'].Save = function ($scope, $http) {
    var platform = $('#useragent_platform_dd option:selected').text();
    description = 'On <span class="em">' + platform + '</span>';
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}



Spindoctor.TriggerRuleTypes['UserAgent.Browser'] = {};
Spindoctor.TriggerRuleTypes['UserAgent.Browser'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'UserAgent.Browser')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Browser', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'BrowserVersion', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'Platform', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'CustomRegex', Value: '' });
    }
    $scope.filterBrowser = function (property) {
        return (property.Name == 'Browser');
    }
}
Spindoctor.TriggerRuleTypes['UserAgent.Browser'].Save = function ($scope, $http) {
    var browser = $('#useragent_browser_dd option:selected').text();
    var browserVersion = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'BrowserVersion');
    description = 'Using <span class="em">' + browser;
    if (!!browserVersion) description += ' ' + browserVersion;
    description += '</span>';
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}



Spindoctor.TriggerRuleTypes['PageVisit.ReturningVisitor'] = {};
Spindoctor.TriggerRuleTypes['PageVisit.ReturningVisitor'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'PageVisit.ReturningVisitor')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Absence', Value: '30|1440' });
    }
}
Spindoctor.TriggerRuleTypes['PageVisit.ReturningVisitor'].Save = function ($scope, $http) {
    var s = '';
    var t = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Absence');
    switch (t) {
        case '30|1440': s = 'between 30 minutes and 24 hours'; break;
        case '1440|10080': s = 'between 24 hours and 7 days'; break;
        case '10080|43200': s = 'between 7 days and 30 days'; break;
        case '43200|525600': s = 'between 30 days and a year'; break;
    }

    var description = 'Visitor returns after <span class="em">' + s + '</span>';
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}


Spindoctor.TriggerRuleTypes['PageVisit.Property'] = {};
Spindoctor.TriggerRuleTypes['PageVisit.Property'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'PageVisit.Property')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'PropertyName', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'PropertyValue', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'ValueComparison', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['PageVisit.Property'].Save = function ($scope, $http) {
    var pa = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, "PropertyName");
    var pn = '';
    $.each($scope.documentTypeProperties, function (index, dt) {
        if (dt.PropertyAlias == pa) {
            pn = dt.PropertyName;
        }
    });
    var description = 'At least <span class="em">' + $scope.selectedTriggerRule.MinimumHits + '</span> visit' + ($scope.selectedTriggerRule.MinimumHits > 1 ? 's' : '') + ' to ';
    description += 'property <span class="em">' + pn + '</span>';  // TODO: add 'equals value'
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}



Spindoctor.TriggerRuleTypes['PageVisit.DocumentType'] = {};
Spindoctor.TriggerRuleTypes['PageVisit.DocumentType'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'PageVisit.DocumentType')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'DocType', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['PageVisit.DocumentType'].Save = function ($scope, $http) {
    var da = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, "DocType");
    var docTypeName = "";
    $.each($scope.documentTypes, function (index, dt) {
        if (dt.DocumentTypeAlias == da) {
            docTypeName = dt.DocumentTypeName;
        }
    });
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', 'At least <span class="em">' + $scope.selectedTriggerRule.MinimumHits + '</span> visit' + ($scope.selectedTriggerRule.MinimumHits > 1 ? 's' : '') + ' to content type <span class="em">' + docTypeName + '</span>');
}


Spindoctor.TriggerRuleTypes['PageVisit.SpecificPage'] = {};
Spindoctor.TriggerRuleTypes['PageVisit.SpecificPage'].Load = function ($scope, $http, treeService, entityResource) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'PageVisit.SpecificPage')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'NodeId', Value: 0 });
        $scope.selectedTriggerRule.Properties.push({ Name: 'ContentName', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'IncludeChildren', Value: true });
        $scope.selectedTriggerRule.Properties.push({ Name: 'IncludeDescendants', Value: false });
    }

    $scope.tree = $({
    });

    $scope.check = function ($scope, root) {
        var found = null;
        if ($scope.currentNodeData != undefined && $scope.currentNodeData != null) {
            var id = $scope.currentNodeData.id;
            if ($scope.treeService != undefined && $scope.treeService != null) {
                found = $scope.treeService.getDescendantNode(root, id);
                if (found != null) {
                    $scope.currentNode = found;
                    angular.element(".sd-tree-pagevisit .root ul").first().children().each(function () { $(this).scope().currentNode = $scope.currentNode; });
                    $scope.$digest();
                }
            }
        }
        if (found == null) setTimeout(function () { $scope.check($scope, root); }, 500);
    }

    $scope.tree.bind("treeLoaded", function (ev, args) {
        $scope.treeService = treeService;
        var nodeId = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'NodeId');
        if (nodeId != null && nodeId > 0) {
            entityResource.getById(Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'NodeId'), 'Document')
              .then(function (data) {
                  $scope.currentNodeData = data;
                  $scope.treeService.syncTree({ node: args.tree.root, path: data.path.split(',') });
              }).then(function () {
                  $scope.check($scope, args.tree.root);
              });
        }
    });
    $scope.tree.bind("treeNodeSelect", function (ev, args) {
        $scope.currentNode = args.node;
        angular.element(".sd-tree-pagevisit .root ul").first().children().each(function () { $(this).scope().currentNode = args.node; })

        Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, "NodeId", parseInt($scope.currentNode.id));
        Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, "ContentName", $scope.currentNode.name);
    });

}
Spindoctor.TriggerRuleTypes['PageVisit.SpecificPage'].Save = function ($scope, $http) {
    var d = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, "IncludeDescendants");
    var c = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, "IncludeChildren");
    var desc = 'At least <span class="em">' + $scope.selectedTriggerRule.MinimumHits + '</span> visit' + ($scope.selectedTriggerRule.MinimumHits > 1 ? 's' : '') + ' to <span class="em">' + Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, "ContentName") + '</span>';
    if (d != null)
        desc += ' or descendants';
    else if (c != null) desc += ' or children';
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', desc);
}



Spindoctor.TriggerRuleTypes['Source.Referer'] = {};
Spindoctor.TriggerRuleTypes['Source.Referer'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'Source.Referer')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Keywords', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['Source.Referer'].Save = function ($scope, $http) {
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', 'At least <span class="em">' + $scope.selectedTriggerRule.MinimumHits + '</span> visit' + ($scope.selectedTriggerRule.MinimumHits > 1 ? 's' : '') + ' from specific referring urls');
}


Spindoctor.TriggerRuleTypes['Source.SearchEngine'] = {};
Spindoctor.TriggerRuleTypes['Source.SearchEngine'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'Source.SearchEngine')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Keywords', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['Source.SearchEngine'].Save = function ($scope, $http) {
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', 'At least <span class="em">' + $scope.selectedTriggerRule.MinimumHits + '</span> visit' + ($scope.selectedTriggerRule.MinimumHits > 1 ? 's' : '') + ' from search engine with specific query');
}


Spindoctor.TriggerRuleTypes['Source.Location'] = {};
Spindoctor.TriggerRuleTypes['Source.Location'].Load = function ($scope, $http) {
    $scope.countries = [{ Id: 'AF', Name: 'Afghanistan' }, { Id: 'AX', Name: 'Aland Islands' }, { Id: 'AL', Name: 'Albania' }, { Id: 'DZ', Name: 'Algeria' }, { Id: 'AS', Name: 'American Samoa' }, { Id: 'AD', Name: 'Andorra' }, { Id: 'AO', Name: 'Angola' }, { Id: 'AI', Name: 'Anguilla' }, { Id: 'AQ', Name: 'Antarctica' }, { Id: 'AG', Name: 'Antigua and Barbuda' }, { Id: 'AR', Name: 'Argentina' }, { Id: 'AM', Name: 'Armenia' }, { Id: 'AW', Name: 'Aruba' }, { Id: 'AU', Name: 'Australia' }, { Id: 'AT', Name: 'Austria' }, { Id: 'AZ', Name: 'Azerbaijan' }, { Id: 'BS', Name: 'Bahamas' }, { Id: 'BH', Name: 'Bahrain' }, { Id: 'BD', Name: 'Bangladesh' }, { Id: 'BB', Name: 'Barbados' }, { Id: 'BY', Name: 'Belarus' }, { Id: 'BE', Name: 'Belgium' }, { Id: 'BZ', Name: 'Belize' }, { Id: 'BJ', Name: 'Benin' }, { Id: 'BM', Name: 'Bermuda' }, { Id: 'BT', Name: 'Bhutan' }, { Id: 'BO', Name: 'Bolivia' }, { Id: 'BQ', Name: 'Bonaire, Saint Eustatius and Saba ' }, { Id: 'BA', Name: 'Bosnia and Herzegovina' }, { Id: 'BW', Name: 'Botswana' }, { Id: 'BV', Name: 'Bouvet Island' }, { Id: 'BR', Name: 'Brazil' }, { Id: 'IO', Name: 'British Indian Ocean Territory' }, { Id: 'VG', Name: 'British Virgin Islands' }, { Id: 'BN', Name: 'Brunei' }, { Id: 'BG', Name: 'Bulgaria' }, { Id: 'BF', Name: 'Burkina Faso' }, { Id: 'BI', Name: 'Burundi' }, { Id: 'KH', Name: 'Cambodia' }, { Id: 'CM', Name: 'Cameroon' }, { Id: 'CA', Name: 'Canada' }, { Id: 'CV', Name: 'Cape Verde' }, { Id: 'KY', Name: 'Cayman Islands' }, { Id: 'CF', Name: 'Central African Republic' }, { Id: 'TD', Name: 'Chad' }, { Id: 'CL', Name: 'Chile' }, { Id: 'CN', Name: 'China' }, { Id: 'CX', Name: 'Christmas Island' }, { Id: 'CC', Name: 'Cocos Islands' }, { Id: 'CO', Name: 'Colombia' }, { Id: 'KM', Name: 'Comoros' }, { Id: 'CK', Name: 'Cook Islands' }, { Id: 'CR', Name: 'Costa Rica' }, { Id: 'HR', Name: 'Croatia' }, { Id: 'CU', Name: 'Cuba' }, { Id: 'CW', Name: 'Curacao' }, { Id: 'CY', Name: 'Cyprus' }, { Id: 'CZ', Name: 'Czech Republic' }, { Id: 'CD', Name: 'Democratic Republic of the Congo' }, { Id: 'DK', Name: 'Denmark' }, { Id: 'DJ', Name: 'Djibouti' }, { Id: 'DM', Name: 'Dominica' }, { Id: 'DO', Name: 'Dominican Republic' }, { Id: 'TL', Name: 'East Timor' }, { Id: 'EC', Name: 'Ecuador' }, { Id: 'EG', Name: 'Egypt' }, { Id: 'SV', Name: 'El Salvador' }, { Id: 'GQ', Name: 'Equatorial Guinea' }, { Id: 'ER', Name: 'Eritrea' }, { Id: 'EE', Name: 'Estonia' }, { Id: 'ET', Name: 'Ethiopia' }, { Id: 'FK', Name: 'Falkland Islands' }, { Id: 'FO', Name: 'Faroe Islands' }, { Id: 'FJ', Name: 'Fiji' }, { Id: 'FI', Name: 'Finland' }, { Id: 'FR', Name: 'France' }, { Id: 'GF', Name: 'French Guiana' }, { Id: 'PF', Name: 'French Polynesia' }, { Id: 'TF', Name: 'French Southern Territories' }, { Id: 'GA', Name: 'Gabon' }, { Id: 'GM', Name: 'Gambia' }, { Id: 'GE', Name: 'Georgia' }, { Id: 'DE', Name: 'Germany' }, { Id: 'GH', Name: 'Ghana' }, { Id: 'GI', Name: 'Gibraltar' }, { Id: 'GR', Name: 'Greece' }, { Id: 'GL', Name: 'Greenland' }, { Id: 'GD', Name: 'Grenada' }, { Id: 'GP', Name: 'Guadeloupe' }, { Id: 'GU', Name: 'Guam' }, { Id: 'GT', Name: 'Guatemala' }, { Id: 'GG', Name: 'Guernsey' }, { Id: 'GN', Name: 'Guinea' }, { Id: 'GW', Name: 'Guinea-Bissau' }, { Id: 'GY', Name: 'Guyana' }, { Id: 'HT', Name: 'Haiti' }, { Id: 'HM', Name: 'Heard Island and McDonald Islands' }, { Id: 'HN', Name: 'Honduras' }, { Id: 'HK', Name: 'Hong Kong' }, { Id: 'HU', Name: 'Hungary' }, { Id: 'IS', Name: 'Iceland' }, { Id: 'IN', Name: 'India' }, { Id: 'ID', Name: 'Indonesia' }, { Id: 'IR', Name: 'Iran' }, { Id: 'IQ', Name: 'Iraq' }, { Id: 'IE', Name: 'Ireland' }, { Id: 'IM', Name: 'Isle of Man' }, { Id: 'IL', Name: 'Israel' }, { Id: 'IT', Name: 'Italy' }, { Id: 'CI', Name: 'Ivory Coast' }, { Id: 'JM', Name: 'Jamaica' }, { Id: 'JP', Name: 'Japan' }, { Id: 'JE', Name: 'Jersey' }, { Id: 'JO', Name: 'Jordan' }, { Id: 'KZ', Name: 'Kazakhstan' }, { Id: 'KE', Name: 'Kenya' }, { Id: 'KI', Name: 'Kiribati' }, { Id: 'XK', Name: 'Kosovo' }, { Id: 'KW', Name: 'Kuwait' }, { Id: 'KG', Name: 'Kyrgyzstan' }, { Id: 'LA', Name: 'Laos' }, { Id: 'LV', Name: 'Latvia' }, { Id: 'LB', Name: 'Lebanon' }, { Id: 'LS', Name: 'Lesotho' }, { Id: 'LR', Name: 'Liberia' }, { Id: 'LY', Name: 'Libya' }, { Id: 'LI', Name: 'Liechtenstein' }, { Id: 'LT', Name: 'Lithuania' }, { Id: 'LU', Name: 'Luxembourg' }, { Id: 'MO', Name: 'Macao' }, { Id: 'MK', Name: 'Macedonia' }, { Id: 'MG', Name: 'Madagascar' }, { Id: 'MW', Name: 'Malawi' }, { Id: 'MY', Name: 'Malaysia' }, { Id: 'MV', Name: 'Maldives' }, { Id: 'ML', Name: 'Mali' }, { Id: 'MT', Name: 'Malta' }, { Id: 'MH', Name: 'Marshall Islands' }, { Id: 'MQ', Name: 'Martinique' }, { Id: 'MR', Name: 'Mauritania' }, { Id: 'MU', Name: 'Mauritius' }, { Id: 'YT', Name: 'Mayotte' }, { Id: 'MX', Name: 'Mexico' }, { Id: 'FM', Name: 'Micronesia' }, { Id: 'MD', Name: 'Moldova' }, { Id: 'MC', Name: 'Monaco' }, { Id: 'MN', Name: 'Mongolia' }, { Id: 'ME', Name: 'Montenegro' }, { Id: 'MS', Name: 'Montserrat' }, { Id: 'MA', Name: 'Morocco' }, { Id: 'MZ', Name: 'Mozambique' }, { Id: 'MM', Name: 'Myanmar' }, { Id: 'NA', Name: 'Namibia' }, { Id: 'NR', Name: 'Nauru' }, { Id: 'NP', Name: 'Nepal' }, { Id: 'NL', Name: 'Netherlands' }, { Id: 'AN', Name: 'Netherlands Antilles' }, { Id: 'NC', Name: 'New Caledonia' }, { Id: 'NZ', Name: 'New Zealand' }, { Id: 'NI', Name: 'Nicaragua' }, { Id: 'NE', Name: 'Niger' }, { Id: 'NG', Name: 'Nigeria' }, { Id: 'NU', Name: 'Niue' }, { Id: 'NF', Name: 'Norfolk Island' }, { Id: 'KP', Name: 'North Korea' }, { Id: 'MP', Name: 'Northern Mariana Islands' }, { Id: 'NO', Name: 'Norway' }, { Id: 'OM', Name: 'Oman' }, { Id: 'PK', Name: 'Pakistan' }, { Id: 'PW', Name: 'Palau' }, { Id: 'PS', Name: 'Palestinian Territory' }, { Id: 'PA', Name: 'Panama' }, { Id: 'PG', Name: 'Papua New Guinea' }, { Id: 'PY', Name: 'Paraguay' }, { Id: 'PE', Name: 'Peru' }, { Id: 'PH', Name: 'Philippines' }, { Id: 'PN', Name: 'Pitcairn' }, { Id: 'PL', Name: 'Poland' }, { Id: 'PT', Name: 'Portugal' }, { Id: 'PR', Name: 'Puerto Rico' }, { Id: 'QA', Name: 'Qatar' }, { Id: 'CG', Name: 'Republic of the Congo' }, { Id: 'RE', Name: 'Reunion' }, { Id: 'RO', Name: 'Romania' }, { Id: 'RU', Name: 'Russia' }, { Id: 'RW', Name: 'Rwanda' }, { Id: 'BL', Name: 'Saint Barthelemy' }, { Id: 'SH', Name: 'Saint Helena' }, { Id: 'KN', Name: 'Saint Kitts and Nevis' }, { Id: 'LC', Name: 'Saint Lucia' }, { Id: 'MF', Name: 'Saint Martin' }, { Id: 'PM', Name: 'Saint Pierre and Miquelon' }, { Id: 'VC', Name: 'Saint Vincent and the Grenadines' }, { Id: 'WS', Name: 'Samoa' }, { Id: 'SM', Name: 'San Marino' }, { Id: 'ST', Name: 'Sao Tome and Principe' }, { Id: 'SA', Name: 'Saudi Arabia' }, { Id: 'SN', Name: 'Senegal' }, { Id: 'RS', Name: 'Serbia' }, { Id: 'CS', Name: 'Serbia and Montenegro' }, { Id: 'SC', Name: 'Seychelles' }, { Id: 'SL', Name: 'Sierra Leone' }, { Id: 'SG', Name: 'Singapore' }, { Id: 'SX', Name: 'Sint Maarten' }, { Id: 'SK', Name: 'Slovakia' }, { Id: 'SI', Name: 'Slovenia' }, { Id: 'SB', Name: 'Solomon Islands' }, { Id: 'SO', Name: 'Somalia' }, { Id: 'ZA', Name: 'South Africa' }, { Id: 'GS', Name: 'South Georgia and the South Sandwich Islands' }, { Id: 'KR', Name: 'South Korea' }, { Id: 'ES', Name: 'Spain' }, { Id: 'LK', Name: 'Sri Lanka' }, { Id: 'SD', Name: 'Sudan' }, { Id: 'SR', Name: 'Suriname' }, { Id: 'SJ', Name: 'Svalbard and Jan Mayen' }, { Id: 'SZ', Name: 'Swaziland' }, { Id: 'SE', Name: 'Sweden' }, { Id: 'CH', Name: 'Switzerland' }, { Id: 'SY', Name: 'Syria' }, { Id: 'TW', Name: 'Taiwan' }, { Id: 'TJ', Name: 'Tajikistan' }, { Id: 'TZ', Name: 'Tanzania' }, { Id: 'TH', Name: 'Thailand' }, { Id: 'TG', Name: 'Togo' }, { Id: 'TK', Name: 'Tokelau' }, { Id: 'TO', Name: 'Tonga' }, { Id: 'TT', Name: 'Trinidad and Tobago' }, { Id: 'TN', Name: 'Tunisia' }, { Id: 'TR', Name: 'Turkey' }, { Id: 'TM', Name: 'Turkmenistan' }, { Id: 'TC', Name: 'Turks and Caicos Islands' }, { Id: 'TV', Name: 'Tuvalu' }, { Id: 'VI', Name: 'U.S. Virgin Islands' }, { Id: 'UG', Name: 'Uganda' }, { Id: 'UA', Name: 'Ukraine' }, { Id: 'AE', Name: 'United Arab Emirates' }, { Id: 'GB', Name: 'United Kingdom' }, { Id: 'US', Name: 'United States' }, { Id: 'UM', Name: 'United States Minor Outlying Islands' }, { Id: 'UY', Name: 'Uruguay' }, { Id: 'UZ', Name: 'Uzbekistan' }, { Id: 'VU', Name: 'Vanuatu' }, { Id: 'VA', Name: 'Vatican' }, { Id: 'VE', Name: 'Venezuela' }, { Id: 'VN', Name: 'Vietnam' }, { Id: 'WF', Name: 'Wallis and Futuna' }, { Id: 'EH', Name: 'Western Sahara' }, { Id: 'YE', Name: 'Yemen' }, { Id: 'ZM', Name: 'Zambia' }, { Id: 'ZW', Name: 'Zimbabwe' }];
    $scope.regions = [];
    $scope.cities = [];

    $scope.changeCountry = function (preSelectRegion, preSelectCity) {
        var country = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Country');
        Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Region', preSelectRegion != undefined ? preSelectRegion:'');
        Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'City', preSelectCity != undefined ? preSelectCity:'');

        $scope.regions = [];
        $scope.cities = [];
        if (country != '') {
            $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetRegionsForCountry?countryCode=" + country })
            .success(function (data) {
                for (var key in data) {
                    $scope.regions.push({ Id: key, Name: data[key] });
                }
                $scope.regions.sort(Spindoctor.SortByProperty('Name'));
                if (preSelectCity != undefined) $scope.changeRegion(preSelectCity);
            });
        }
    }
    $scope.changeRegion = function (preSelectCity) {
        var country = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Country');
        var region = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Region');
        var city = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'City');

        $scope.cities = [];
        if (region != '') {
            var regionCode = '';
            $.each($scope.regions, function (index, regionObj) {
                if (regionObj.Name == region) {
                    regionCode = regionObj.Id;
                }
            });

            $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetCitiesForRegion?countryCode=" + country + "&regionCode=" + encodeURIComponent(regionCode) })
            .success(function (data) {
                for (var key in data) {
                    $scope.cities.push({ Id: data[key], Name: data[key] });
                }
                $scope.cities.sort(Spindoctor.SortByProperty('Name'));
            });
        }

    }

    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'Source.Location')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Country', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'Region', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'City', Value: '' });
    }

    var region = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Region');
    var city = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'City');

    $scope.changeCountry(region, city);
}
Spindoctor.TriggerRuleTypes['Source.Location'].Save = function ($scope, $http) {
    var country = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Country');
    var region = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'Region');
    var city = Spindoctor.GetPropertyBagProperty($scope.selectedTriggerRule.Properties, 'City');
    if (region == null) {
        region = ''; Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Region', '');
        city = ''; Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'City', '');
    }
    if (city == null) {
        city = ''; Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'City', '');
    }

    var description = 'Located in <span class="em">' + country + '</span>';
    if (region != '') description += ', <span class="em">' + region + '</span>';
    if (city != '') description += ', <span class="em">' + city + '</span>';
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', description);
}




Spindoctor.TriggerRuleTypes['UrlQuery.Url'] = {};
Spindoctor.TriggerRuleTypes['UrlQuery.Url'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope,'UrlQuery.Url')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'UrlFragments', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['UrlQuery.Url'].Save = function ($scope, $http) {
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', 'At least <span class="em">' + $scope.selectedTriggerRule.MinimumHits + '</span> visit' + ($scope.selectedTriggerRule.MinimumHits > 1 ? 's' : '') + ' on specific urls');
}


Spindoctor.TriggerRuleTypes['UrlQuery.QueryString'] = {};
Spindoctor.TriggerRuleTypes['UrlQuery.QueryString'].Load = function ($scope, $http) {
    if (Spindoctor.TriggerRuleTypeDefaults.CleanRule($scope, 'UrlQuery.QueryString')) {
        $scope.selectedTriggerRule.Properties.push({ Name: 'Param', Value: '' });
        $scope.selectedTriggerRule.Properties.push({ Name: 'ValueFragments', Value: '' });
    }
}
Spindoctor.TriggerRuleTypes['UrlQuery.QueryString'].Save = function ($scope, $http) {
    Spindoctor.SetPropertyBagPropertyValue($scope.selectedTriggerRule.Properties, 'Description', 'At least <span class="em">' + $scope.selectedTriggerRule.MinimumHits + '</span> visit' + ($scope.selectedTriggerRule.MinimumHits > 1 ? 's' : '') + ' with specific querystrings');
}




/* ActionTypes -----------------------------------------------------------*/

Spindoctor.ActionTypes = [];
Spindoctor.ActionTypes['Spindoctor.SetSegment'] = {};
Spindoctor.ActionTypes['Spindoctor.SetSegment'].Save = function ($scope, $http) {
    $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Spindoctor.SetSegment" }, { "Name": "SegmentId", "Value": $scope.Spindoctor_SetSegments_SegmentId }];
};
Spindoctor.ActionTypes['Spindoctor.SetSegment'].Load = function($scope, $http){
    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetSegments" })
        .success(function (data) {
            $scope.Spindoctor_SetSegments_Segments = data;
            var obj = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'SegmentId');
            if (obj == null) {
                segmentId = 0;
                $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Spindoctor.SetSegment" }, { "Name": "SegmentId", "Value": segmentId }];
            } else {
                segmentId = parseInt(obj);
            }
            $scope.Spindoctor_SetSegments_SegmentId = segmentId;

            $.each(data, function (index, segment) {
                if (segment.Id == segmentId) {
                    $scope.Spindoctor_SetSegments_SegmentName = segment.Name;
                }
            });

            $scope.selectSegment = function () {
                Spindoctor.Controllers.SelectSegment(
                    $scope,
                    $scope.Spindoctor_SetSegments_Segments,
                    $scope.Spindoctor_SetSegments_SegmentId,
                    function (newSelectedSegmentId) {
                        $scope.Spindoctor_SetSegments_SegmentId = newSelectedSegmentId;
                        $.each($scope.Spindoctor_SetSegments_Segments, function (index, segment) {
                            if (segment.Id == newSelectedSegmentId) {
                                $scope.Spindoctor_SetSegments_SegmentName = segment.Name;
                            }
                        });
                    }
                );
            };
        });
}


Spindoctor.ActionTypes['Spindoctor.RemoveFromSegment'] = {};
Spindoctor.ActionTypes['Spindoctor.RemoveFromSegment'].Save = function ($scope, $http) {
    $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Spindoctor.RemoveFromSegment" }, { "Name": "SegmentId", "Value": $scope.Spindoctor_RemoveSegments_SegmentId }];
};
Spindoctor.ActionTypes['Spindoctor.RemoveFromSegment'].Load = function ($scope, $http) {
    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetSegments" })
        .success(function (data) {
            $scope.Spindoctor_RemoveSegments_Segments = data;
            var obj = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'SegmentId');
            if (obj == null) {
                segmentId = 0;
                $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Spindoctor.RemoveFromSegment" }, { "Name": "SegmentId", "Value": segmentId }];
            } else {
                segmentId = parseInt(obj);
            }
            $scope.Spindoctor_RemoveSegments_SegmentId = segmentId;

            $.each(data, function (index, segment) {
                if (segment.Id == segmentId) {
                    $scope.Spindoctor_RemoveSegments_SegmentName = segment.Name;
                }
            });

            $scope.selectSegment = function () {
                Spindoctor.Controllers.SelectSegment(
                    $scope,
                    $scope.Spindoctor_RemoveSegments_Segments,
                    $scope.Spindoctor_RemoveSegments_SegmentId,
                    function (newSelectedSegmentId) {
                        $scope.Spindoctor_RemoveSegments_SegmentId = newSelectedSegmentId;
                        $.each($scope.Spindoctor_RemoveSegments_Segments, function (index, segment) {
                            if (segment.Id == newSelectedSegmentId) {
                                $scope.Spindoctor_RemoveSegments_SegmentName = segment.Name;
                            }
                        });
                    }
                );
            };
        });
}



Spindoctor.ActionTypes['Browser.Redirect'] = {};
Spindoctor.ActionTypes['Browser.Redirect'].Save = function ($scope, $http) {
    $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Browser.Redirect" }, { "Name": "DestinationAddress", "Value": $scope.Browser_Redirect }];
};
Spindoctor.ActionTypes['Browser.Redirect'].Load = function ($scope, $http) {
    var destinationAddress = "";
    var obj = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'DestinationAddress');
    if (obj == null) {
        $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Browser.Redirect" }, { "Name": "DestinationAddress", "Value": destinationAddress }];
    } else {
        destinationAddress = obj;
    }
    $scope.Browser_Redirect = destinationAddress;
}

Spindoctor.ActionTypes['Browser.SetCookie'] = {};
Spindoctor.ActionTypes['Browser.SetCookie'].Save = function ($scope, $http) {
    $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Browser.SetCookie" },
                                    { "Name": "CookieName", "Value": $scope.Browser_SetCookie_Name },
                                    { "Name": "CookieValue", "Value": $scope.Browser_SetCookie_Value },
                                    { "Name": "CookieDomain", "Value": $scope.Browser_SetCookie_Domain },
                                    { "Name": "CookieExpires", "Value": $scope.Browser_SetCookie_Expires }];
};
Spindoctor.ActionTypes['Browser.SetCookie'].Load = function ($scope, $http) {
    var obj = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CookieName');
    if (obj == null) {
        $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Browser.SetCookie" },
                                    { "Name": "CookieName", "Value": "" },
                                    { "Name": "CookieValue", "Value": "" },
                                    { "Name": "CookieDomain", "Value": "" },
                                    { "Name": "CookieExpires", "Value": 60 }];
    }
    $scope.Browser_SetCookie_Name = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CookieName');
    $scope.Browser_SetCookie_Value = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CookieValue');
    $scope.Browser_SetCookie_Domain = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CookieDomain');
    $scope.Browser_SetCookie_Expires = parseInt(Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CookieExpires'));
};


Spindoctor.ActionTypes['Custom.CallDLL'] = {};
Spindoctor.ActionTypes['Custom.CallDLL'].Save = function ($scope, $http) {
    $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Custom.CallDLL" },
                                    { "Name": "CustomDllAssembly", "Value": $scope.Custom_CallDll_Assembly },
                                    { "Name": "CustomDllClass", "Value": $scope.Custom_CallDll_ClassType },
                                    { "Name": "CustomDllMethod", "Value": $scope.Custom_CallDll_Method }];
};
Spindoctor.ActionTypes['Custom.CallDLL'].Load = function ($scope, $http) {
    var obj = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CustomDllAssembly');
    if (obj == null) {
        $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Custom.CallDLL" },
                                    { "Name": "CustomDllAssembly", "Value": "" },
                                    { "Name": "CustomDllClass", "Value": "" },
                                    { "Name": "CustomDllMethod", "Value": "" }];
    }
    $scope.Custom_CallDll_Assembly = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CustomDllAssembly');
    $scope.Custom_CallDll_ClassType = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CustomDllClass');
    $scope.Custom_CallDll_Method = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'CustomDllMethod');
};


Spindoctor.ActionTypes['Spindoctor.InfluenceProfile'] = {};
Spindoctor.ActionTypes['Spindoctor.InfluenceProfile'].Save = function ($scope, $http) {
    //Cleaned in code
};
Spindoctor.ActionTypes['Spindoctor.InfluenceProfile'].Load = function ($scope, $http) {
    $http({ method: 'GET', url: "backoffice/Spindoctor/Callback/GetProfilingAttributes" })
        .success(function (data) {
            $scope.Spindoctor_InfluenceProfile_ProfileAttributes = data;
            var obj = Spindoctor.GetPropertyBagProperty($scope.action.Properties, 'ActionTypeTag');
            if (obj == null || obj != "Spindoctor.InfluenceProfile") {
                $scope.action.Properties = [{ "Name": "ActionTypeTag", "Value": "Spindoctor.InfluenceProfile" }];
            }

            setTimeout(function () {
                var components = [];
                $.each(data, function (index, attribute) {
                    $("#action_check_attribute_" + attribute.Id).click(function() {
                        var $this = $(this);
                        if (!$this.is(':checked')) {
                            $.each(attribute.Components, function (index2, component) {
                                Spindoctor.DeletePropertyBagProperty($scope.action.Properties, "Component" + component.Id + "Score");
                                var x = $("#action_slider_" + component.Id).slider();
                                x.slider('setValue', 0);
                            });
                        }
                    });
                    $.each(attribute.Components, function (index2, component) {
                        components.push("Component" + component.Id + "Score");
                        var valueObj = Spindoctor.GetPropertyBagProperty($scope.action.Properties, "Component" + component.Id + "Score");
                        var value = 0;
                        if (valueObj != null) {
                            value = parseInt(valueObj);
                            $("#action_check_attribute_" + attribute.Id).prop('checked', true);
                        }

                        $("#action_slider_" + component.Id).slider({
                            handle: 'square',
                            min: 0,
                            max: 100,
                            tooltip: 'hide',
                            value: value
                        }).on('slide', function (ev) {
                            if (ev.value == 0) {
                                Spindoctor.DeletePropertyBagProperty($scope.action.Properties, "Component" + component.Id + "Score");
                            } else {
                                $("#action_check_attribute_" + attribute.Id).prop('checked', true);
                                Spindoctor.SetPropertyBagPropertyValue($scope.action.Properties, "Component" + component.Id + "Score", ev.value);
                            }
                        });
                    });
                });

                $.each($scope.action.Properties, function (index, prop) {
                    if (prop.Name != 'ActionTypeTag') {
                        if ($.inArray(prop.Name, components) == -1) {
                            Spindoctor.DeletePropertyBagProperty($scope.action.Properties, prop.Name);
                        }
                    }
                });
            }, 500);
        });
}

