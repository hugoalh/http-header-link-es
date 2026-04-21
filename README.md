# HTTP Header Link (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/http-header-link-es)
[JSR](https://jsr.io/@hugoalh/http-header-link)
[NPM](https://www.npmjs.com/package/@hugoalh/http-header-link)

An ECMAScript module to handle the [HTTP header `Link`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) according to the specification [RFC 8288](https://httpwg.org/specs/rfc8288.html#header).

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

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

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  class HTTPHeaderLink {
    constructor(...inputs: (string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response)[]);
    add(...inputs: (string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response)[]): this;
    entries(): HTTPHeaderLinkEntry[];
    getByParameter(key: string, value: string): HTTPHeaderLinkEntry[];
    getByRel(value: string): HTTPHeaderLinkEntry[];
    hasParameter(key: string, value: string): boolean;
    toString(): string;
    static parse(...inputs: (string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response)[]): HTTPHeaderLink;
    static stringify(...inputs: (string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response)[]): string;
  }
  ```
- ```ts
  type HTTPHeaderLinkEntry = [
    uri: string,
    parameters: { [key: string]: string; }
  ];
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/http-header-link)

## ✍️ Examples

- ```ts
  new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
  /*=>
  HTTPHeaderLink [
    ["https://example.com", { rel: "preconnect" }]
  ]
  */
  ```
- ```ts
  new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
  /*=>
  HTTPHeaderLink [
    ["https://example.com/苗条", { rel: "preconnect" }]
  ]
  */
  ```
