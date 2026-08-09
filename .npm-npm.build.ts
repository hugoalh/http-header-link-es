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
		"https://raw.githubusercontent.com/hugoalh/http-header-value-handler-es/v0.2.1/handle.ts": {
			name: "@hugoalh/http-header-value-handler",
			version: "^0.2.1",
			subPath: "handle"
		},
		"https://raw.githubusercontent.com/hugoalh/is-string-singleline-es/v1.0.6/mod.ts": {
			name: "@hugoalh/is-string-singleline",
			version: "^1.0.6"
		},
		"https://raw.githubusercontent.com/hugoalh/sort-es/v0.4.0/collection.ts": {
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
		homepage: "https://github.com/hugoalh/http-header-link-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/http-header-link-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/http-header-link-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-npm",
	outputDirectoryPreEmpty: true
});
