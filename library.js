(function (global) {
  var Greeter = function (firstname, lastname, language) {

    // return a new object from the method so that user 
    // does not have to use new keyword everytime to call Greeter Library
    return new Greeter.init(firstname, lastname, language);
  }

  /**
   * Have some private variables that are enclosed in this library
   * and have nothing to do with the outside world.
   * They are blocked on this library only and never directly accessible
   */

  var supportedLangs = ['en', 'es', 'punjabi'];

  // informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Hola',
    punjabi: 'Kida'
  }

  // formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludoes',
    punjabi: 'Jee Aayan Nu'
  }


  var logMessages = {
    en: 'Logged in ',
    es: 'Inició sesión',
    punjabi: 'Aao Ji'
  }

  // All methods will be in the prototype
  Greeter.prototype = {

    fullName: function () {
      return this.firstname + ' ' + this.lastname;
    },

    greeting: function () {
      return greetings[this.language] + ' ' + this.firstname + '!';
    },

    formalGreeting: function () {
      return formalGreetings[this.language] + ' ' + this.fullName();
    },

    validate() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw new Error('Invalid Language');
      }
    },

    greet(formal) {
      var msg;

      // if formal is undefined or null, it will be coerced to false
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at the execution time when greet was called and 
      // thus it makes the greet method chainable
      return this;
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ':' + this.fullName());
      }
      return this;
    },

    setLanguage: function (lang) {
      // set the NEW language;
      this.language = lang;

      // now validate it
      this.validate();

      return this;
    }

  };

  Greeter.init = function (firstname, lastname, language) {
    var self = this;
    self.firstname = firstname || '';
    self.lastname = lastname || '';
    self.language = language || 'en';

    self.validate();
  }

  /**
   * Objects returned from Greeter.init function constructor 
   * must point to Greeter's prototype in order to use all 
   * the funcions of the Greeter library
   */
  Greeter.init.prototype = Greeter.prototype;

  /**
   * Expose Greeter function to the outside world by attaching it
   * to global(window) object
   * Also provide a shorthand 'G' for ease purpose. 
   */
  global.Greeter = global.G = Greeter;  
}(window));