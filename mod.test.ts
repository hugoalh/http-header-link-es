import {
	deepStrictEqual,
	throws
} from "node:assert";
import { HTTPHeaderLink } from "./mod.ts";
Deno.test("String Good 1", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.getByRel("preconnect")[0][0], "https://example.com");
});
Deno.test("String Good 2", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com>; rel=preconnect`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.getByRel("preconnect")[0][0], "https://example.com");
});
Deno.test("String Good 3", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.getByRel("preconnect")[0][0], "https://example.com/苗条");
});
Deno.test("String Good 4", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.getByRel("preconnect")[0][0], "https://one.example.com");
	deepStrictEqual(instance.getByRel("preconnect")[1][0], "https://two.example.com");
	deepStrictEqual(instance.getByRel("preconnect")[2][0], "https://three.example.com");
});
Deno.test("String Good 5", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink();
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), false);
	deepStrictEqual(instance.hasParameter("rel", "connect"), false);
	deepStrictEqual(instance.hasParameter("rel", "postconnect"), false);
	deepStrictEqual(instance.entries().length, 0);
});
Deno.test("Entries Good 1", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink([["https://one.example.com", { rel: "preconnect" }]]);
	deepStrictEqual(instance.hasParameter("rel", "preconnect"), true);
	deepStrictEqual(instance.entries().length, 1);
	deepStrictEqual(instance.toString(), `<https://one.example.com>; rel="preconnect"`);
});
Deno.test("String Bad 1", { permissions: "none" }, () => {
	throws(() => {
		new HTTPHeaderLink(`https://bad.example; rel="preconnect"`);
	});
});
