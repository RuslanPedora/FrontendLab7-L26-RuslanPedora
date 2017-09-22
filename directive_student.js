const app = angular.module('studentsList', ['ui.router']);

app.controller('stdController', ['$scope', '$state', '$transitions', function($scope, $state, $transitions) {
        $scope.students = [
            {  
                name: 'Ivan',
                surname: 'Ivanov',
                birthDate: new Date(),
                phoneNumber: '111-11-11',
                photo: 'http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg'
            },
            {  
                name: 'Petro',
                surname: 'Petro',
                birthDate: new Date(),
                phoneNumber: '222-22-22',
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-gLKaPeZ5gVsG1zOewJQ-ll2Dw8P8PwDpL2WrsZezHhsgKZO'
            },
            {  
                name: 'Mykola',
                surname: 'Kykolaiv',
                birthDate: new Date(),
                phoneNumber: '333-33-33',
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPgtuycIywD6WK90vf_kygubL8A2OXF0Z-JPiER_dEUB_QOMjQw'
            },
            {  
                name: 'Inna',
                surname: 'Fedko',
                birthDate: new Date(),
                phoneNumber: '444-44-44',
                photo: 'https://lh3.googleusercontent.com/mq-rxSLITU7pD5zTsZFBX7ud5ugkyqvmkCEnsswQ10t4A9WuTd5OsIu2boH0kFSm4O4=w300'
            },
            {  
                name: 'Iryna',
                surname: 'Fedulova',
                birthDate: new Date(),
                phoneNumber: '555-55-55',
                photo: 'https://i.pinimg.com/736x/7d/0e/64/7d0e64e360753dd00c022cea376cd51a--beautiful-smile-beautiful-people.jpg'
            }
        ];
        $scope.goToStudent = function(id) {
            $state.go(`student`, {id});
        }
        $scope.navDisabled = true;
        $transitions.onSuccess( { to: 'list', from: '*' }, function() {
            $scope.navDisabled = true;
        });        
        $transitions.onSuccess( { to: 'student', from: '*' }, function() {
            $scope.navDisabled = false;
        });                
}]);

app.directive('studentList', function factory() {
    return {
        template:'<table class="table table-hover">\
                    <thead>\
                        <caption>\
                            Students\
                        </caption>\
                    </thead>\
                    <tbody>\
                        <tr ng-repeat="(key,val) in students" ng-click="goToStudent(key)" class="clickable">\
                            <td>\
                                <img ng-src="{{val.photo}}" alt="Student pic.">\
                            </td>\
                            <td>\
                                {{val.name}}\
                            </td>\
                            <td>\
                                {{val.surname}}\
                            </td>\
                        </tr>\
                    </tbody>\
                  </table>'
    };
  });

app.directive('student', function factory() {
    return {
        template: '<form class="form-horizontal">\
                        <div id="img-wrapper">\
                            <img src="{{currentStd.photo}}">\
                        </div>\
                        <div class="form-group">\
                            <label class="control-label col-sm-4">\
                                Name:\
                            </label>\
                            <div class="col-sm-7">\
                                <span ng-show="!editMode">{{currentStd.name}}</span>\
                                <input ng-model="tempName" ng-show="editMode" class="form-control">\
                            </div>\
                        </div>\
                        <div class="form-group">\
                            <label class="control-label col-sm-4">\
                                Surname:\
                            </label>\
                            <div class="col-sm-7">\
                                <span ng-show="!editMode">{{currentStd.surname}}</span>\
                                <input ng-model="tempSurname" ng-show="editMode" class="form-control">\
                            </div>\
                        </div>\
                        <div class="form-group">\
                            <label class="control-label col-sm-4">\
                                Brith date:\
                            </label>\
                            <div class="col-sm-7">\
                                <span ng-show="!editMode">{{currentStd.birthDate}}</span>\
                                <input ng-model="tempBirthDate" ng-show="editMode" type="date" class="form-control">\
                            </div>\
                        </div>\
                        <div class="form-group">\
                            <label class="control-label col-sm-4">\
                                Phone number:\
                            </label>\
                            <div class="col-sm-7">\
                                <span ng-show="!editMode">{{currentStd.phoneNumber}}</span>\
                                <input ng-model="tempPhoneNumber" ng-show="editMode" class="form-control">\
                            </div>\
                        </div>\
                        <button ng-click="editMode=true;" ng-show="!editMode" class="btn btn-default">Edit</button>\
                        <button ng-click="save();" ng-show="editMode" class="btn btn-default">Save</button>\
                   </form>',
        scope: true,
        controller: function($scope, $stateParams) {
            let curStd = $scope.students[$stateParams.id];

            $scope.currentStd = curStd;
            $scope.editMode = false;

            $scope.tempName = curStd.name;
            $scope.tempSurname = curStd.surname;
            $scope.tempBirthDate = curStd.birthDate;
            $scope.tempPhoneNumber = curStd.phoneNumber;

            $scope.save = function() {
                $scope.editMode = false;
                curStd.name = $scope.tempName;
                curStd.surname = $scope.tempSurname;
                curStd.birthDate = $scope.tempBirthDate;
                curStd.phoneNumber = $scope.tempPhoneNumber;
                }
        }
    };
 });

 app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/student-list')
    $stateProvider
      .state('list', {
        url: "/student-list",
        template: "<student-list></student-list>"
      })
      .state('student', {
        url: "/student/:id",
        template: "<student></student>"
      });
  });