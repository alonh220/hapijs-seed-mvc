//
// Internal dependencies
//
const BaseRoutes = require('./base.routes')
const controller = require('../controllers/todo_lists.controller')


/******************************************
 *
 * Lists routes
 *
 ******************************************/
let routes = new class TodoListsRoutes extends BaseRoutes {

  /**
   * Constructor
   */
  constructor() {
    let endpointName = '/todo-lists'
    super(controller, endpointName)
  }

  /**
   * Retrieve a ToDo list and all its ToDo's
   *
   * @return {object}
   */
  viewAll() {
    // Re-use default view()
    let route = super.view()

    // Overwrite attributes
    route.path += '/todos'
    route.config.description = `Retrieve a ToDo list and all its ToDo's`
    route.config.handler = this.controller.viewAll

    return route
  }

  /**
   * Create a new ToDo list
   *
   * @return {object}
   */
  create() {
    // Get route settings from parent
    let route = super.create()

    // Update end-point description (used in Documentation)
    route.config.description = 'Create a new ToDo list'

    // Add validations for POST payload
    route.config.validate.payload = {
      name: this.joi.string().required().description('ToDo list name')
    }

    return route
  }

  /**
   * Update an existing ToDo list
   *
   * @return {object}
   */
  update() {
    // Get route settings from parent
    let route = super.update()

    // Update end-point description (used in Documentation)
    route.config.description = 'Update an existing ToDo list'

    // Add validations for POST payload
    route.config.validate.payload = {
      name: this.joi.string().description('ToDo list name')
    }

    return route
  }
}


//
// Export public end-points
//
module.exports = [
  routes.index(),
  routes.view(),
  routes.viewAll(),
  routes.create(),
  routes.update(),
  routes.remove()
]