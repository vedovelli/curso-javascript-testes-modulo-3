/*
 * Mirage JS guide on Routes: https://miragejs.com/docs/route-handlers/functions
 */

// import { Response } from 'miragejs';

export default function routes() {
  this.namespace = 'api';
  // this.timing = 5000;

  /*
   * A resource comprises all operations for a CRUD
   * operation. .get(), .post(), .put() and delete().
   * Mirage JS guide on Resource: https://miragejs.com/docs/route-handlers/shorthands#resource-helper
   */
  this.resource('users');
  this.resource('products');
  // this.get('products', () => {
  //   return new Response(500, {}, 'O server morreu!');
  // });

  /*
   * From your component use fetch('api/messages?userId=<a user id>')
   * replacing <a user id> with a real ID
   */
  this.get('messages', (schema, request) => {
    const {
      queryParams: { userId },
    } = request;

    return schema.messages.where({ userId });
  });
}
