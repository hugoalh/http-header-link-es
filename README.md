# HTTP Header Link (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/http_header_link_ecmascript)
● [GitHub](https://github.com/hugoalh/http-header-link-es)
● [JSR](https://jsr.io/@hugoalh/http-header-link)
● [NPM](https://www.npmjs.com/package/@hugoalh/http-header-link)

An ECMAScript module to handle the [HTTP header `Link`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) according to the specification [RFC 8288](https://httpwg.org/specs/rfc8288.html#header).

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources & Entrypoints

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/http-header-link-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/http-header-link[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/http-header-link[@{Tag}]
  ```

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

> [!NOTE]
> - Different runtimes have vary support for the sources and entrypoints, visit the runtime documentation for more information.
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## 🧩 APIs

- ```ts
  class HTTPHeaderLink {
    constructor(input?: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response);
    add(input: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): this;
    entries(): HTTPHeaderLinkEntry[];
    filterByParameter(key: string, value: string): HTTPHeaderLinkEntry[];
    filterByRel(value: string): HTTPHeaderLinkEntry[];
    hasParameter(key: string, value: string): boolean;
    toString(): string;
  }
  ```
- ```ts
  interface HTTPHeaderLinkEntry {
    parameters: Record<string, string | undefined>;
    uri: string;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc)
>   - [JSR](https://jsr.io/@hugoalh/http-header-link)

## ✍️ Examples

- ```ts
  new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
  /*=>
  HTTPHeaderLink [
    { uri: "https://example.com", parameters: { rel: "preconnect" }}
  ]
  */
  ```
- ```ts
  new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
  /*=>
  HTTPHeaderLink [
    { uri: "https://example.com/苗条", parameters: { rel: "preconnect" }}
  ]
  */
  ```
