import {
	parseHTTPHeaderValueIterate,
	stringifyHTTPHeaderValue,
	type HTTPHeaderValueElementContext
} from "jsr:@hugoalh/http-header-value-handler@^0.2.1/handle";
import { isStringSingleLine } from "jsr:@hugoalh/is-string-singleline@^1.0.6";
import { sortCollectionByKeys } from "jsr:@hugoalh/sort@^0.4.0/collection";
const parametersNeedLowerCase: readonly string[] = [/* UNIQUE */
	"rel",
	"type"
];
function assertURI(uri: string): void {
	if (!(isStringSingleLine(uri) && uri.indexOf(" ") === -1)) {
		throw new SyntaxError(`\`${uri}\` is not a valid HTTP header Link URI!`);
	}
}
/**
 * HTTP header `Link` entry.
 */
export interface HTTPHeaderLinkEntry {
	parameters: Record<string, string | undefined>;
	uri: string;
}
/**
 * Handle the HTTP header `Link` according to the specification RFC 8288.
 */
export class HTTPHeaderLink {
	get [Symbol.toStringTag](): string {
		return "HTTPHeaderLink";
	}
	#entries: Map<string, HTTPHeaderLinkEntry> = new Map<string, HTTPHeaderLinkEntry>();
	/**
	 * Initialize.
	 * @param {string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response} [input] Input. Can append later via the method {@linkcode HTTPHeaderLink.add}.
	 */
	constructor(input?: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response) {
		if (typeof input !== "undefined") {
			this.add(input);
		}
	}
	#add(...inputs: readonly HTTPHeaderLinkEntry[]): void {
		for (const input of inputs) {
			this.#entries.set(`${input.uri};${JSON.stringify(sortCollectionByKeys(input.parameters))}`, input);
		}
	}
	#addFromString(input: string): void {
		return this.#add(...Array.from(parseHTTPHeaderValueIterate(input), ({
			parameters,
			value = ""
		}: HTTPHeaderValueElementContext): HTTPHeaderLinkEntry => {
			if (!(value.startsWith("<") && value.endsWith(">"))) {
				throw new SyntaxError(`URI \`${value}\` is not start with \`<\` and end with \`>\`!`);
			}
			const uriSlice: string = value.slice(1, -1);
			assertURI(uriSlice);
			return {
				parameters: Object.fromEntries(Object.entries(parameters).map(([key, value]: [string, string | undefined]): [string, string] => {
					return [key, parametersNeedLowerCase.includes(key) ? value!.toLowerCase() : value!];
				})),
				uri: decodeURI(uriSlice)
			};
		}));
	}
	/**
	 * Add entries.
	 * @param {string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response} input Input.
	 * @returns {this}
	 */
	add(input: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): this {
		if (input instanceof Headers) {
			const value: string | null = input.get("Link");
			if (value !== null) {
				this.#addFromString(value);
			}
		} else if (input instanceof HTTPHeaderLink) {
			for (const [
				key,
				value
			] of input.#entries.entries()) {
				this.#entries.set(key, value);
			}
		} else if (Array.isArray(input)) {
			for (const {
				parameters,
				uri
			} of input) {
				assertURI(uri);
				for (const [
					key,
					value = ""
				] of Object.entries(parameters)) {
					if (
						key !== key.toLowerCase() ||
						!(/^[\w-]+\*?$/.test(key))
					) {
						throw new SyntaxError(`\`${key}\` is not a valid HTTP header Link parameter key!`);
					}
					if (parametersNeedLowerCase.includes(key) && value !== value.toLowerCase()) {
						throw new SyntaxError(`\`${value}\` is not a valid HTTP header Link parameter value!`);
					}
				}
			}
			this.#add(...structuredClone(input));
		} else if (input instanceof Response) {
			const value: string | null = input.headers.get("Link");
			if (value !== null) {
				this.#addFromString(value);
			}
		} else {
			this.#addFromString(input);
		}
		return this;
	}
	/**
	 * Return all of the entries.
	 * @returns {HTTPHeaderLinkEntry[]} Entries.
	 */
	entries(): HTTPHeaderLinkEntry[] {
		return structuredClone(Array.from(this.#entries.values()));
	}
	/**
	 * Get entries by parameter.
	 * @param {string} key Key of the parameter.
	 * @param {string} value Value of the parameter.
	 * @returns {HTTPHeaderLinkEntry[]} Entries which match the parameter.
	 */
	filterByParameter(key: string, value: string): HTTPHeaderLinkEntry[] {
		const keyFmt: string = key.toLowerCase();
		if (keyFmt === "rel") {
			return this.filterByRel(value);
		}
		return this.entries().filter(({ parameters }: HTTPHeaderLinkEntry): boolean => {
			return (parameters[keyFmt] === value);
		});
	}
	/**
	 * Get entries by parameter `rel`.
	 * @param {string} value Value of the parameter `rel`.
	 * @returns {HTTPHeaderLinkEntry[]} Entries which match the parameter.
	 */
	filterByRel(value: string): HTTPHeaderLinkEntry[] {
		if (value !== value.toLowerCase()) {
			throw new SyntaxError(`\`${value}\` is not a valid parameter \`rel\` value!`);
		}
		return this.entries().filter(({ parameters: { rel } }: HTTPHeaderLinkEntry): boolean => {
			return (rel?.toLowerCase() === value);
		});
	}
	/**
	 * Whether have entries that match parameter.
	 * @param {string} key Key of the parameter.
	 * @param {string} value Value of the parameter.
	 * @returns {boolean} Determine result.
	 */
	hasParameter(key: string, value: string): boolean {
		return (this.filterByParameter(key, value).length > 0);
	}
	/**
	 * Stringify entries.
	 * @returns {string} Stringified entries.
	 */
	toString(): string {
		return stringifyHTTPHeaderValue(Array.from(this.#entries.values(), ({
			parameters,
			uri
		}: HTTPHeaderLinkEntry): HTTPHeaderValueElementContext => {
			return {
				parameters,
				value: `<${encodeURI(uri)}>`
			};
		}));
	}
}
export default HTTPHeaderLink;
