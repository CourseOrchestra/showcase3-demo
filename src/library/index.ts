import { reactive, watch, App } from "vue";
import { LocationQuery, Router } from "vue-router";
import { WatchStopHandle } from "vue";

type ParsedQuery = {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  [key: string]: string | number | string[] | number[] | boolean | any;
};

interface DetailedFingerprint {
  [key: string]: string | null;
}
function queryFingerprint(query: LocationQuery): {
  fingerprint: string;
  detailedFingerprint: DetailedFingerprint;
} {
  let fingerprint = "";
  const detailedFingerprint: DetailedFingerprint = {};
  const keys = Object.keys(query).sort();
  for (const key_index in keys) {
    let key = keys[key_index];
    const value = query[key];
    key = encodeURIComponent(key);
    if (value == null) {
      fingerprint += "&" + key;
      detailedFingerprint[key] = null;
      continue;
    }
    // keep null values
    const values = Array.isArray(value)
      ? value.map((v) => v && encodeURIComponent(v))
      : [value && encodeURIComponent(value)];
    values.sort();
    let valueFingerprint = "";
    for (let i = 0; i < values.length; i++) {
      valueFingerprint += "&" + key;
      if (values[i] != null) {
        valueFingerprint += "=" + values[i];
      }
    }
    fingerprint += valueFingerprint;
    detailedFingerprint[key] = valueFingerprint;
  }
  return { fingerprint, detailedFingerprint };
}

const _query = reactive({
  query: {} as ParsedQuery,
  rawQuery: {} as LocationQuery,
});

let router!: Router;

let fingerprint: string | null = null;
let detailedFingerprint: DetailedFingerprint = {};
let watchers: { [key: string]: WatchStopHandle } = {};

function serializeChangedValue(key: string, value: object) {
  _query.rawQuery[key] = JSON.stringify(value, null);

  const actualFingerprint = queryFingerprint(_query.rawQuery);
  fingerprint = actualFingerprint.fingerprint;
  detailedFingerprint = actualFingerprint.detailedFingerprint;

  router["replace"]({ query: _query.rawQuery });
}
function setWatcher(key: string) {
  if (key in watchers) {
    return;
  }

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
  fingerprint = null;
  detailedFingerprint = {};
  Object.keys(_query.query).forEach(function (key) {
    delete _query.query[key];
  });
  clearWatchers();
}

function parseAndStoreQuery(
  query: LocationQuery,
  actualDetailedFingerprint: DetailedFingerprint,
) {
  for (const key of Object.keys(query)) {
    if (detailedFingerprint[key] === actualDetailedFingerprint[key]) {
      continue;
    }

    if (query[key]) {
      _query.query[key] = JSON.parse(query[key]!.toString());
    }
  }

  _query.rawQuery = {};
  Object.assign(_query.rawQuery, query);
}

function setup(_router: Router) {
  router = _router;

  router.beforeEach((to, from) => {
    if (to.name !== from.name) {
      handleRouteChange();
    }

    const actualFingerprint = queryFingerprint(to.query);
    if (actualFingerprint.fingerprint === fingerprint) {
      return;
    }

    parseAndStoreQuery(to.query, actualFingerprint.detailedFingerprint);

    fingerprint = actualFingerprint.fingerprint;
    detailedFingerprint = actualFingerprint.detailedFingerprint;
  });
}

export type URLObject = {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
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
  install(app: App, { router }: { router: Router }) {
    setup(router);
  },
};
export default QuerySynchronizer;
