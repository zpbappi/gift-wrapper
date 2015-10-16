var q = require('q');

function toParamArray(obj){
  if(!obj){
    return [];
  }
  var array = [];
  for(var key in obj){
    array.push(obj[key]);
  }

  return array;
};

function wrapCallback(func, context, args){
  var deferred = q.defer();
  args[args.length] = function(){
    return deferred.resolve.apply(null, toParamArray(arguments));
  };
  func.apply(context, toParamArray(args));
  return deferred.promise;
};

function wrapCallbackWithError(func, context, args){
  var deferred = q.defer();
  args[args.length] = function(){
    var argArray = toParamArray(arguments);
    var error = argArray[0];
    if(error){
      return deferred.reject(error);
    }
    else{
      return deferred.resolve.apply(null, argArray.slice(1));
    }
  };

  var p = toParamArray(args);
  func.apply(context, p);
  return deferred.promise;
};

function wrap(wrapperType, wrappingObject, methods, propertyNames){
  // copy public properties
  for(var i in propertyNames){
    var prop = propertyNames[i];
    wrapperType[prop] = wrappingObject[prop];
  }

  // wrap methods
  for(var i in methods){
    var method = methods[i];
    if(method.async === false){
      if(method.transformer){
        wrapperType[method.name] = function(){
          var argArry = toParamArray(arguments);
          var result = wrappingObject[method.name].apply(wrappingObject, argArry);
          if(result != null && typeof result.push == "function"){
            return method.transformer.apply(null, result);
          }
          else{
            return method.transformer(result);
          }
        }
      }
      else{
        wrapperType[method.name] = wrappingObject[method.name];
      }
      continue;
    }

    // handle async functions below
    var wrapperFn = method.handlesError ? wrapCallbackWithError : wrapCallback;
    var context = createContext(wrappingObject, wrapperFn, method.name, method.transformer);

    wrapperType[method.name] = context;
  }
}

function createContext(obj, wrapper, methodName, tx){
  if(tx){
    return function(){ return wrapper(obj[methodName], obj, arguments).then(tx); };
  }
  else{
    return function(){ return wrapper(obj[methodName], obj, arguments); };
  }
}

module.exports = {
  wrap: wrap
};
