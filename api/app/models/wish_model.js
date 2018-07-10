module.exports = (() => {
  'use strict';

  const squel = require('squel');
  const { Extension } = require('../../config/pools.js');
  const ApplicationRecord = require('./application_record.js');

  class Wish extends ApplicationRecord {
    constructor() {
      console.log(Extension);
      super(Extension, 'wishes');
    }

    where({ wish_id, id, finished }) {
      let whereClause = squel.expr();


      console.log(id, finished);
      if (id && finished){

        console.log("INHEREEEEEEEEEEEEE");
        whereClause = whereClause.and('user_id = ?', id).and('status = ?', 'finished');
      }

      if (id && wish_id === undefined && finished === undefined) {
        whereClause = whereClause.and('user_id = ?', id).and('status != ?', 'finished');
      }

      if (id && wish_id) {
        whereClause = whereClause.and('wish_id = ?', wish_id).and('user_id = ?', id);
      }

      this.query = this.query.where(whereClause);
      return this;
    }
  }

  return Wish;
})();
