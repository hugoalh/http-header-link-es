import {
	readManifest,
	transform
} from "DNT";
const manifest = await readManifest("jsr.jsonc");
await transform({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: manifest.exports,
	generateDeclarationMap: true,
	mappings: {
		"jsr:@hugoalh/http-header-value-handler@^0.2.1/handle": {
			name: "@hugoalh/http-header-value-handler",
			version: "^0.2.1",
			subPath: "handle"
		},
		"jsr:@hugoalh/is-string-singleline@^1.0.6": {
			name: "@hugoalh/is-string-singleline",
			version: "^1.0.6"
		},
		"jsr:@hugoalh/sort@^0.4.0/collection": {
			name: "@hugoalh/sort",
			version: "^0.4.0",
			subPath: "collection"
		}
	},
	metadata: {
		//@ts-ignore Lazy type.
		name: manifest.name,
		//@ts-ignore Lazy type.
		version: manifest.version,
		description: "A module to handle the HTTP header `Link` according to the specification RFC 8288.",
		keywords: [
			"header",
			"http",
			"link"
		],
		homepage: "https://codeberg.org/hugoalh/http-header-link-es#readme",
		bugs: {
			url: "https://codeberg.org/hugoalh/http-header-link-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://codeberg.org/hugoalh/http-header-link-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-codeberg",
	outputDirectoryPreEmpty: true,
	shims: {
		blob: false,
		crypto: false,
		deno: false,
		prompts: false,
		timers: false,
		undici: false,
		weakRef: false,
		webSocket: false
	}
});
