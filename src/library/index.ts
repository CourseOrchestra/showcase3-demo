import { reactive, watch } from "vue";
import { /*arraysMatch,*/ queryFingerprint } from "./utils";
import {
  ArrayDatatype,
  BoolDatatype,
  CommaArrayDatatype,
  IntDatatype,
  SpaceArrayDatatype,
  StringDatatype,
} from "./datatypes";
import {
  LocationQuery,
  RouteLocationNormalizedLoaded,
  Router,
} from "vue-router";
import {
  DataType,
  DataTypes,
  NavigationOperation,
  ParsedQuery,
  QueryParameterDefinition,
  QueryParameterDefinitions,
  QuerySettings,
} from "./types";
import { WatchStopHandle } from "vue";

export * from "./datatypes";
export * from "./types";

/**
 * convert parameter in "meta/query" from string representation to object representation
 *
 * @internal
 */
function parseParamDefinition<T>(
  defOrString: QueryParameterDefinition<T> | string,
  datatypes: DataTypes,
): QueryParameterDefinition<T> {
  let def: QueryParameterDefinition<T>;
  if (typeof defOrString === "string") {
    let splitted = defOrString.split(":");
    if (splitted.length === 1) {
      splitted = ["string", splitted[0]];
    }
    const datatype = datatypes[splitted[0]];

    if (!datatype) {
      throw new Error(`No query datatype "${splitted[0]}"`);
    }

    def = {
      datatype: datatype,
      defaultValue: datatype.parseDefault(splitted[1]),
    };
  } else {
    def = defOrString;
  }
  if (def.datatype === undefined) {
    def.datatype = datatypes["string"];
  }
  return def;
}

const _query = reactive({
  query: {} as ParsedQuery,
  rawQuery: {} as LocationQuery,
  enabled: false,
  serializedId: 0,
});

let router!: Router;
let datatypes!: DataTypes;
let debug = false;
let navigationOperation!: (
  query: ParsedQuery,
  router: Router,
) => "push" | "replace";

let queryDefinition: QueryParameterDefinitions | null = null;
let querySettings: QuerySettings | null = null;
let fingerprint: string | null = null;
//let detailedFingerprint: DetailedFingerprint = {};
let watchers: { [key: string]: WatchStopHandle } = {};

/* eslint @typescript-eslint/no-explicit-any: "off" */
function dlog(...args: any[]) {
  if (debug) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

function prepareQuery(route: RouteLocationNormalizedLoaded) {
  const _queryDefinition: QueryParameterDefinitions = {};
  const _querySettings: QuerySettings = {};

  // merge query definition from all matched segments on path
  route.matched.forEach((match) => {
    if (!match.meta) {
      return;
    }
    if (match.meta.query) {
      Object.assign(_queryDefinition, match.meta.query);
    }
    if (match.meta.querySettings) {
      Object.assign(_querySettings, match.meta.querySettings);
    }
  });
  if (!_queryDefinition) {
    return false;
  }
  // parse param definitions
  Object.keys(_queryDefinition).forEach((key) => {
    _queryDefinition[key] = parseParamDefinition(
      _queryDefinition[key],
      datatypes,
    );
  });
  if (_querySettings.onInit) {
    _querySettings.onInit(_queryDefinition);
  }
  queryDefinition = _queryDefinition;
  querySettings = _querySettings;
  dlog("query definition, query settings", queryDefinition, querySettings);
  return true;
}

function serializeChangedValue(key: string, value: any) {
  /*
  dlog("serialize changed value", key, value);
  if (value !== undefined) {
    const def = queryDefinition![key];
    if (def) {
      value = def.datatype.serialize(value, def.defaultValue);
    }
  }

*/
  saveValueToRawQuery(key, value);
}

function saveValueToRawQuery(key: string, value: string | string[]) {
  _query.rawQuery[key] = JSON.stringify(value, null);
  _query.serializedId++;
}

function setWatcher(key: string) {
  if (key in watchers) {
    return;
  }
  dlog("Adding watcher", key);

  watchers[key] = watch(
    () => _query.query[key],
    (value) => serializeChangedValue(key, value),
    { deep: true },
  );
}

function clearWatchers() {
  Object.values(watchers).forEach((watcher) => watcher());
  watchers = {};
}

function handleRouteChange(to: RouteLocationNormalizedLoaded) {
  fingerprint = null;
  //  detailedFingerprint = {};
  Object.keys(_query.query).forEach(function (key) {
    delete _query.query[key];
  });
  queryDefinition = {};
  querySettings = {};
  clearWatchers();

  if (!prepareQuery(to)) {
    dlog("No query meta on this route");
    _query.enabled = false;
  } else {
    dlog("Got query meta on this route");
    _query.enabled = true;
  }
}

function parseAndStoreQuery(
  query: LocationQuery /*,  actualDetailedFingerprint: DetailedFingerprint,*/,
) {
  for (const key of Object.keys(query)) {
    if (query[key]) {
      _query.query[key] = JSON.parse(query[key]!.toString());
    }
  }

  _query.rawQuery = {};
  Object.assign(_query.rawQuery, query);

  if (querySettings!.onLoad) {
    querySettings!.onLoad(_query.query);
  }
}

function setup(
  _router: Router,
  _datatypes: DataTypes,
  _debug: boolean,
  _navigationOperation: NavigationOperation,
) {
  router = _router;
  datatypes = _datatypes;
  debug = _debug;
  if (_navigationOperation === "push" || _navigationOperation === "replace") {
    navigationOperation = () => _navigationOperation;
  } else {
    navigationOperation = _navigationOperation;
  }

  router.beforeEach((to, from) => {
    dlog("beforeEach called", to.name, from.name);
    if (to.name !== from.name) {
      handleRouteChange(to);
    }
    if (!_query.enabled) {
      return;
    }
    // check fingerprint if query modified
    const actualFingerprint = queryFingerprint(to.query);
    if (actualFingerprint.fingerprint === fingerprint) {
      dlog("same fingerprint, not changing args");
      return;
    }
    dlog("parsing args", actualFingerprint);

    // parse and store query params
    parseAndStoreQuery(to.query /*, actualFingerprint.detailedFingerprint*/);

    // set up watchers
    for (const key of Object.keys(_query.query)) {
      setWatcher(key);
    }

    // set fingerprint
    fingerprint = actualFingerprint.fingerprint;
    //detailedFingerprint = actualFingerprint.detailedFingerprint;
  });

  watch(
    () => _query.serializedId,
    () => {
      // no need to go through the parsing process again when router calls beforeEach,
      // so set the fingerprint
      const actualFingerprint = queryFingerprint(_query.rawQuery);
      fingerprint = actualFingerprint.fingerprint;
      //detailedFingerprint = actualFingerprint.detailedFingerprint;
      if (querySettings!.onChange) {
        querySettings!.onChange(_query.rawQuery, _query.query);
      }
      const op = navigationOperation(_query.query, router);
      router[op]({ query: _query.rawQuery });
    },
  );
}

export type URLObject = {
  [key: string]: any;
};

export type URLParam = {
  name: string;
  obj: URLObject;
  props: Array<string>;
};

let arrModel: Array<URLParam>;

export function useQuery(_arrModel: Array<URLParam>): ParsedQuery {
  arrModel = _arrModel;

  arrModel.forEach((element: URLParam) => {
    if (_query.query[element.name]) {
      element.props.forEach((prop: string) => {
        if (typeof _query.query[element.name] === "object") {
          element.obj[prop] = _query.query[element.name][prop];
        } else {
          element.obj[prop] = _query.query[element.name];
        }
      });
    }
    _query.query[element.name] = element.obj;
    setWatcher(element.name);
  });

  return _query.query;
}

const QuerySynchronizer = {
  install(
    app: any,
    {
      router,
      datatypes,
      debug,
      navigationOperation,
    }: {
      router: Router;
      datatypes?: Array<DataType<any>>;
      debug?: boolean;
      navigationOperation?: NavigationOperation;
    },
  ) {
    const _datatypes: DataTypes = {
      string: StringDatatype,
      bool: BoolDatatype,
      int: IntDatatype,
      array: ArrayDatatype,
      commaarray: CommaArrayDatatype,
      spacearray: SpaceArrayDatatype,
    };
    if (datatypes) {
      (datatypes || []).forEach((c) => {
        _datatypes[c.name] = c;
      });
    }
    setup(router, _datatypes, debug || false, navigationOperation || "push");
  },
};

/**
 * Vue plugin. Usage:
 * ```
 * createApp(App).use(router).use(QuerySynchronizer, { router, debug: true })
 * ```
 *
 * @param router application's router
 * @param datatypes an optional array of custom (user-defined) datatypes
 * @param debug if set to true, print library's debug messages
 */
export default QuerySynchronizer;
