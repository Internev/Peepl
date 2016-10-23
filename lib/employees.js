'use strict'

var employeeDb = require('../database/employees');


exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

function getEmployees(callback){
  setTimeout(()=>{
    callback(null, employeeDb);
  }, 500);
}

function getEmployee(employeeId, callback){
  getEmployees((err, data)=>{
    if (err){
      return callback(error);
    }

    let result = data.find((item)=>{
      return item.id === employeeId;
    });

    callback(null, result);
  });
}
