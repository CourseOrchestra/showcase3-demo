import { reactive, watch, App } from "vue";
import { LocationQuery, Router } from "vue-router";
import { WatchStopHandle } from "vue";

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

type ParsedQuery = {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  [key: string]: any;
};

const _query = reactive({
  query: {} as ParsedQuery,
  rawQuery: {} as LocationQuery,
});

let router!: Router;

let fingerprint: string | null = null;
let detailedFingerprint: DetailedFingerprint = {};
let watchers: { [key: string]: WatchStopHandle } = {};

function serializeChangedValue(key: string, value: object) {
  const s = JSON.stringify(
    value,
    arrModel.filter((param) => param.name === key)[0].props,
  );
  if (_query.rawQuery[key] === s) {
    return;
  }
  _query.rawQuery[key] = s;

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
  arrModel = [];
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

let arrModel: Array<URLParam> = [];

export function useURLMapper(useModel: Array<URLParam>) {
  useModel.forEach((param: URLParam) => {
    if (_query.query[param.name]) {
      param.props.forEach((prop: string) => {
        if (typeof _query.query[param.name] === "object") {
          param.obj[prop] = _query.query[param.name][prop];
        } else {
          param.obj[prop] = _query.query[param.name];
        }
      });
    }
    _query.query[param.name] = param.obj;
    setWatcher(param.name);
  });

  arrModel.push(...useModel);

  useModel.forEach((param: URLParam) => {
    serializeChangedValue(param.name, _query.query[param.name]);
  });
}

export function debugURLMapper(): ParsedQuery {
  return _query.query;
}

export default {
  install(app: App, { router }: { router: Router }) {
    setup(router);
  },
};
