
exports.up = function(knex, Promise) {
    
    return knex.schema.createTable('TodoList', (table) => {
        
        table.increments('id').primary()
        table.string('Tasks')
        table.string('Description')
        table.string('Priority')
        table.string('Completed')
      })
}


exports.down = function(knex, Promise) {

    return knex.schema.dropTable('TodoList')
  
}