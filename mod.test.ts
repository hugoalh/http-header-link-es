import {
	deepStrictEqual,
	throws
} from "node:assert";
import { HTTPHeaderLink } from "./mod.ts";
Deno.test("String Valid 1", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.filterByRel("preconnect")[0].uri, "https://example.com");
});
Deno.test("String Valid 2", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com>; rel=preconnect`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.filterByRel("preconnect")[0].uri, "https://example.com");
});
Deno.test("String Valid 3", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.filterByRel("preconnect")[0].uri, "https://example.com/苗条");
});
Deno.test("String Valid 4", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.filterByRel("preconnect")[0].uri, "https://one.example.com");
	deepStrictEqual(instance.filterByRel("preconnect")[1].uri, "https://two.example.com");
	deepStrictEqual(instance.filterByRel("preconnect")[2].uri, "https://three.example.com");
});
Deno.test("String Valid 5", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink();
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), false);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.entries().length, 0);
});
Deno.test("Entries Valid 1", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink([{ uri: "https://one.example.com", parameters: { rel: "preconnect" } }]);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.entries().length, 1);
	deepStrictEqual(instance.toString(), `<https://one.example.com>; rel=preconnect`);
});
Deno.test("String Invalid 1", { permissions: "none" }, () => {
	throws(() => {
		new HTTPHeaderLink(`https://bad.example; rel="preconnect"`);
	});
});
