/*
=============================================================
 Title: employee-api.js
 Author: Professor Krasso
 Date:   28 September 2020
 Modified By: Janet Blohn
 Description: nodebucket project
 JavaScript file for the employee api
=============================================================
*/
// Create the requirements
const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

/*****************************************
 API: findEmployeeById
 A JSON employee object should be returned
 *****************************************/
router.get('/:empId', async(req, res) => {

  try {
    // Query MongoDB Atlas by employeeId using Mongoose
    Employee.findOne({empId: req.params.empId}, function(err, employee) {
      // Return a server 500 error on a database level error
      if(err) {
        console.log(err);
        res.status(500).send({
          "message": "Internal server error!"
        })

      } else {
        // Return the employee object when there are no database level errors
        console.log(employee);
        res.json(employee);
      }
    })

  } catch (e)  {
    // Catch potential errors not caught by the try
    console.log(e);
    res.status(500).send ({
      "message": "Internal server error!"
    })
  }
});

/*******************************
 API: findAllTasks
'empId toDos done' expected back
********************************/
router.get('/:empId/tasks', async(req, res) => {
  try {
    // Query MongoDB Atlas by employeeId using Mongoose
    Employee.findOne({empId: req.params.empId}, 'empId toDos done', function(err, employee) {
      if (err) {
        console.log(err);

        // Send back an error response with a status of 500, Internal server error message, and the err
        const findTasksMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findTasksMongoDbErrorResp.toObject())

      } else {
        // When there's a good response, log the employee to the console, and send a successful response message
        console.log(employee);
        const findTasksSuccessResp = new BaseResponse('200', 'Successful query', employee);
        res.json(findTasksSuccessResp.toObject());
      }
    })

  } catch (e) {
      console.loge(e);
      // Catch any bad responses and send message back with error code, an internal error message, and the actual error message received
      const findTaskErrorCatchResp = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(findTaskErrorCatchResp.toObject());
    }
  })

/**************************
 API: createTask
 Create a new toDo item
****************************/
router.post('/:empId/tasks', async(req, res) => {

  try {
      // Query MongoDb Atlas by employeeId using Mongoose
      Employee.findOne({empId: req.params.empId}, function(err, employee) {
        // If there's an error, send it back with a message and status code of 500
        if (err) {
          console.log(err);
          const createTaskMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
          res.status(500).send(createTaskMongoDbErrorResp.toObject());

        } else {
        // Otherwise, get the change in the HTTP body
          console.log(employee);
          const item = {
            text: req.body.text
          };
          // Push the item to the toDos Array
          employee.toDos.push(item);
          // Save the item to the database
          employee.save(function(err, updatedEmployee) {
            if (err) {
            //Send an error message if there is one along with a 500 status code
              console.log(err);
              const createTaskSaveMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', e.message);
              res.status(500).send(createTaskSaveMongoDbErrorResp.toObject());

            } else {
            // Send a Successful entry response
              console.log(updatedEmployee);
              const createTaskSaveSuccessResp = new BaseResponse('200', 'Successful entry', updatedEmployee);
              res.json(createTaskSaveSuccessResp.toObject());
            }
          })
        }
      })

  } catch (e)  {
      // Catch potential errors
      console.loge(e);
      // Catch any bad responses and send message back with error code, an internal error message, and the actual error message received
      const createTaskCatchErrorResp = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(createTaskCatchErrorResp.toObject());
    }
  })

/**************************
 API: updateTask
 Update an existing task (item)
****************************/
router.put('/:empId/tasks', async(req, res) => {
  try {
     // Query MongoDb Atlas by employeeId using Mongoose
    Employee.findOne({empId: req.params.empId}, function(err, employee) {
      if (err) {
        // If there's an error, send it to the console and send a 500 status code end error message back in the response
        console.log(err);
        const updateTaskMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(updateTaskMongoDbErrorResp.toObject());

      } else {
        // Log the employee to the console and set the HTTP body for the toDos and Done arrays
        console.log(employee);
        employee.set({
          toDos: req.body.toDos,
          done: req.body.done
        });

        // Save the updated item(s) to the database
        employee.save(function(err, updateEmployee) {
          if (err) {
            // Send a 500 status code and Server error message if there's an error
            console.log(err);
            const updateTaskSaveMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(updateTaskSaveMongoDbErrorResp.toObject());

          } else {
            // Otherwise, send a successful update message
            console.log(updateEmployee);
            const updatedTaskSaveSuccessResp = new BaseResponse('200', 'Tasks successfully updated', updateEmployee);
            res.json(updatedTaskSaveSuccessResp.toObject());
          }
        })
      }
    })

  } catch (e) {
    // Catch any errors possibly missed by the try and send back a 500 status code and error message response
    console.log(e);
    const updateTaskCatchErrorResp = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(updateTaskCatchErrorResp.toObject());
  }
})

/******************************
 API: deleteTask
 Delete an existing task (item)
*******************************/
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    // Query MongoDb Atlas by employeeId using Mongoose
    Employee.findOne({empId: req.params.empId}, function(err, employee) {
      if (err) {
        // Log an error if one occurs and send a 500 status code and error message in the response
        console.log(err);
        const deleteTaskMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(deleteTaskMongoDbErrorResp.toObject());

      } else {
        console.log(employee);
        // Put the task based on its taskId into the appropriate array
        const toDosItem = employee.toDos.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (toDosItem) {
            // Delete it if it's a toDo item first from the array,
          employee.toDos.id(toDosItem._id).remove();
          // And also from the database
          employee.save(function(err, updatedToDoItemEmployee) {
            if (err) {
              // Send an error response back with a 500 status code if an error occurs
              console.log(err);
              const deleteTaskSaveMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(deleteTaskSaveMongoDbErrorResp.toObject());

            } else {
              // Send a successful delete response and 200 status code up successful deletion
              console.log(updatedToDoItemEmployee);
              const deleteToDoItemSuccessResp = new BaseResponse('200', 'Removed item from the todo list', updatedToDoItemEmployee);
              res.json(deleteToDoItemSuccessResp.toObject());
            }
          })

        } else if (doneItem) {
          // Remove it from the done Array if found there
          employee.done.id(doneItem._id).remove();
          // Save the updated Array to the database
          employee.save(function(err, updatedDoneItemEmployee) {
            if (err) {
              // Log any error and send a response of a 500 status code and error message
              console.log(err);
              const deleteDoneItemSaveMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(deleteDoneItemSaveMongoDbErrorResp.toObject());

            } else {
              // Otherwise send a response of successful with a 200 status code
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResp = new BaseResponse('200', 'Removed item from the done list', updatedDoneItemEmployee);
              res.json(deleteDoneItemSuccessResp.toObject());
            }
          })

        } else {
          // Send a 200 status code and a response that the task doesn't exist
          console.log('Invalid task id');
          const deleteTaskNotFoundResp = new ErrorResponse('200', 'Unable to locate the requested task', null);
          res.status(200).send(deleteTaskNotFoundResp.toObject());
        }
      }
    })

  } catch (e) {
    // Catch any errors that may have been missed, send a 500 status code, and an error message as the response
    console.log(e);
    const deleteTaskCatchErrorResp = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(deleteTaskCatchErrorResp.toObject());
  }

})

// Export this as the router
module.exports = router;
