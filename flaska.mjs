/**
 * Router
 */

function Branch() {
  this._map = new Map()
  this._paramName = null
  this._paramPrototype = null
  this._handler = null
}

const __paramMapName = '__param'

function FlaskaRouter() {
  this._root = new Branch()
}

FlaskaRouter.prototype.addRoute = function(route, handler) {
  if (route[0] !== '/')
    throw new Error(`route "${route}" must start with forward slash`);

  let start = 1;
  let end = 1;
  let name = '';
  let param = '';
  let objectPrototype = {};
  let paramDefined = false;
  let isParam = false;
  let branch = this._root;
  let hashConflict = new Map();
  for (let i = 1; i <= route.length; i++) {
    if ((i === route.length || route[i] === '/') && end > start) {
      let child;
      let number = 0;
      name = route.substring(start, end);
      if (isParam) {
        param = name;
        name = __paramMapName;
      }
      if (branch._map.has(name)) {
        child = branch._map.get(name);
      }
      else {
        child = new Branch();
        branch._map.set(name, child);
      }
      branch = child;
      end = i;
      start = i;
      if (isParam) {
        branch._paramName = param;
        Object.defineProperty(objectPrototype, param, {
          enumerable: true,
          writable: true,
          value: '',
        });
        paramDefined = true;
        isParam = false;
      }
    }
    if (i === route.length) {
      branch._handler = handler;
      branch._paramPrototype = objectPrototype;
      continue;
    }
    if (route[i] === ':') {
      isParam = true;
      end = start = i + 1;
    }
    else if (route[i] === '/') {
      end = start = i + 1;
    }
    else {
      end++;
    }
  }
}

FlaskaRouter.prototype.match = function(url) {
  let branch = this._root;
  let start = 1;
  let end = 1;
  let output;
  let map;
  let name;
  let char;
  let paramMap = new Map();
  for (let i = 1; i <= url.length; i++) {
    char = url[i];
    if ((i === url.length || char === '/') && end > start) {
      name = url.slice(start, end);
      map = branch._map;
      if (output = map.get(name)) {
        branch = output;
      }
      else if (output = map.get(__paramMapName)) {
        branch = output;
        paramMap.set(branch._paramName, name);
      } else {
        return null
      }
      i++;
      end = start = i;
      char = url[i];
    }
    if (i >= url.length) {
      return {
        handler: branch._handler,
        params: paramMap,
      };
    }
    if (char === '/') {
      end = start = i + 1;
    }
    else {
      end++;
    }
  }
  return null;
}

export {
  FlaskaRouter,
}
