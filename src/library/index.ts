import { reactive, watch } from "vue";
import { queryFingerprint } from "./utils";
import { LocationQuery, Router } from "vue-router";
import { DataType, NavigationOperation, ParsedQuery } from "./types";
import { WatchStopHandle } from "vue";

const _query = reactive({
  query: {} as ParsedQuery,
  rawQuery: {} as LocationQuery,
  serializedId: 0,
});

let router!: Router;
let debug = false;
let navigationOperation!: (
  query: ParsedQuery,
  router: Router,
) => "push" | "replace";

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

function serializeChangedValue(key: string, value: any) {
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

function handleRouteChange() {
  Object.keys(_query.query).forEach(function (key) {
    delete _query.query[key];
  });
  clearWatchers();
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
}

function setup(
  _router: Router,
  _debug: boolean,
  _navigationOperation: NavigationOperation,
) {
  router = _router;
  debug = _debug;
  if (_navigationOperation === "push" || _navigationOperation === "replace") {
    navigationOperation = () => _navigationOperation;
  } else {
    navigationOperation = _navigationOperation;
  }

  router.beforeEach((to, from) => {
    dlog("beforeEach called", to.name, from.name);
    if (to.name !== from.name) {
      handleRouteChange();
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
      debug,
      navigationOperation,
    }: {
      router: Router;
      datatypes?: Array<DataType<any>>;
      debug?: boolean;
      navigationOperation?: NavigationOperation;
    },
  ) {
    setup(router, debug || false, navigationOperation || "push");
  },
};
export default QuerySynchronizer;
