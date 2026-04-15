module.exports = [
"[project]/node_modules/@hexagon/base64/src/base64.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64",
    ()=>base64,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/* ------------------------------------------------------------------------------------

  base64 - MIT License - Hexagon <hexagon@56k.guru>

  ------------------------------------------------------------------------------------

  License:

	Copyright (c) 2021 Hexagon <hexagon@56k.guru>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

  ------------------------------------------------------------------------------------  */ const // Regular base64 characters
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", // Base64url characters
charsUrl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", genLookup = (target)=>{
    const lookupTemp = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
    const len = chars.length;
    for(let i = 0; i < len; i++){
        lookupTemp[target.charCodeAt(i)] = i;
    }
    return lookupTemp;
}, // Use a lookup table to find the index.
lookup = genLookup(chars), lookupUrl = genLookup(charsUrl);
/**
 * Pre-calculated regexes for validating base64 and base64url
 */ const base64UrlPattern = /^[-A-Za-z0-9\-_]*$/;
const base64Pattern = /^[-A-Za-z0-9+/]*={0,3}$/;
/**
 * @namespace base64
 */ const base64 = {};
/**
 * Convenience function for converting a base64 encoded string to an ArrayBuffer instance
 * @public
 * 
 * @param {string} data - Base64 representation of data
 * @param {boolean} [urlMode] - If set to true, URL mode string will be expected
 * @returns {ArrayBuffer} - Decoded data
 */ base64.toArrayBuffer = (data, urlMode)=>{
    const len = data.length;
    let bufferLength = data.length * 0.75, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (data[data.length - 1] === "=") {
        bufferLength--;
        if (data[data.length - 2] === "=") {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer), target = urlMode ? lookupUrl : lookup;
    for(i = 0; i < len; i += 4){
        encoded1 = target[data.charCodeAt(i)];
        encoded2 = target[data.charCodeAt(i + 1)];
        encoded3 = target[data.charCodeAt(i + 2)];
        encoded4 = target[data.charCodeAt(i + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
};
/**
 * Convenience function for creating a base64 encoded string from an ArrayBuffer instance
 * @public
 * 
 * @param {ArrayBuffer} arrBuf - ArrayBuffer to be encoded
 * @param {boolean} [urlMode] - If set to true, URL mode string will be returned
 * @returns {string} - Base64 representation of data
 */ base64.fromArrayBuffer = (arrBuf, urlMode)=>{
    const bytes = new Uint8Array(arrBuf);
    let i, result = "";
    const len = bytes.length, target = urlMode ? charsUrl : chars;
    for(i = 0; i < len; i += 3){
        result += target[bytes[i] >> 2];
        result += target[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        result += target[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        result += target[bytes[i + 2] & 63];
    }
    const remainder = len % 3;
    if (remainder === 2) {
        result = result.substring(0, result.length - 1) + (urlMode ? "" : "=");
    } else if (remainder === 1) {
        result = result.substring(0, result.length - 2) + (urlMode ? "" : "==");
    }
    return result;
};
/**
 * Convenience function for converting base64 to string
 * @public
 * 
 * @param {string} str - Base64 encoded string to be decoded
 * @param {boolean} [urlMode] - If set to true, URL mode string will be expected
 * @returns {string} - Decoded string
 */ base64.toString = (str, urlMode)=>{
    return new TextDecoder().decode(base64.toArrayBuffer(str, urlMode));
};
/**
 * Convenience function for converting a javascript string to base64
 * @public
 * 
 * @param {string} str - String to be converted to base64
 * @param {boolean} [urlMode] - If set to true, URL mode string will be returned
 * @returns {string} - Base64 encoded string
 */ base64.fromString = (str, urlMode)=>{
    return base64.fromArrayBuffer(new TextEncoder().encode(str), urlMode);
};
/**
 * Function to validate base64
 * @public
 * @param {string} encoded - Base64 or Base64url encoded data
 * @param {boolean} [urlMode] - If set to true, base64url will be expected
 * @returns {boolean} - Valid base64/base64url?
 */ base64.validate = (encoded, urlMode)=>{
    // Bail out if not string
    if (!(typeof encoded === "string" || encoded instanceof String)) {
        return false;
    }
    // Go on validate
    try {
        return urlMode ? base64UrlPattern.test(encoded) : base64Pattern.test(encoded);
    } catch (_e) {
        return false;
    }
};
base64.base64 = base64;
const __TURBOPACK__default__export__ = base64;
;
}),
"[project]/node_modules/@levischuck/tiny-cbor/esm/cbor/cbor_internal.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAJOR_TYPE_ARRAY",
    ()=>MAJOR_TYPE_ARRAY,
    "MAJOR_TYPE_BYTE_STRING",
    ()=>MAJOR_TYPE_BYTE_STRING,
    "MAJOR_TYPE_MAP",
    ()=>MAJOR_TYPE_MAP,
    "MAJOR_TYPE_NEGATIVE_INTEGER",
    ()=>MAJOR_TYPE_NEGATIVE_INTEGER,
    "MAJOR_TYPE_SIMPLE_OR_FLOAT",
    ()=>MAJOR_TYPE_SIMPLE_OR_FLOAT,
    "MAJOR_TYPE_TAG",
    ()=>MAJOR_TYPE_TAG,
    "MAJOR_TYPE_TEXT_STRING",
    ()=>MAJOR_TYPE_TEXT_STRING,
    "MAJOR_TYPE_UNSIGNED_INTEGER",
    ()=>MAJOR_TYPE_UNSIGNED_INTEGER,
    "decodeLength",
    ()=>decodeLength,
    "encodeLength",
    ()=>encodeLength
]);
function decodeLength(data, argument, index) {
    if (argument < 24) {
        return [
            argument,
            1
        ];
    }
    const remainingDataLength = data.byteLength - index - 1;
    const view = new DataView(data.buffer, index + 1);
    let output;
    let bytes = 0;
    switch(argument){
        case 24:
            {
                if (remainingDataLength > 0) {
                    output = view.getUint8(0);
                    bytes = 2;
                }
                break;
            }
        case 25:
            {
                if (remainingDataLength > 1) {
                    output = view.getUint16(0, false);
                    bytes = 3;
                }
                break;
            }
        case 26:
            {
                if (remainingDataLength > 3) {
                    output = view.getUint32(0, false);
                    bytes = 5;
                }
                break;
            }
        case 27:
            {
                if (remainingDataLength > 7) {
                    const bigOutput = view.getBigUint64(0, false);
                    // Bound it to [24, MAX_SAFE_INTEGER], where it is safe
                    // to encode as a javascript number
                    if (bigOutput >= 24n && bigOutput <= Number.MAX_SAFE_INTEGER) {
                        return [
                            Number(bigOutput),
                            9
                        ];
                    }
                }
                break;
            }
    }
    if (output && output >= 24) {
        return [
            output,
            bytes
        ];
    }
    throw new Error("Length not supported or not well formed");
}
const MAJOR_TYPE_UNSIGNED_INTEGER = 0;
const MAJOR_TYPE_NEGATIVE_INTEGER = 1;
const MAJOR_TYPE_BYTE_STRING = 2;
const MAJOR_TYPE_TEXT_STRING = 3;
const MAJOR_TYPE_ARRAY = 4;
const MAJOR_TYPE_MAP = 5;
const MAJOR_TYPE_TAG = 6;
const MAJOR_TYPE_SIMPLE_OR_FLOAT = 7;
function encodeLength(major, argument) {
    const majorEncoded = major << 5;
    if (argument < 0) {
        throw new Error("CBOR Data Item argument must not be negative");
    }
    // Convert to bigint first.
    // Encode integers around and above 32 bits in big endian / network byte order
    // is unreliable in javascript.
    // https://tc39.es/ecma262/#sec-bitwise-shift-operators
    // Bit shifting operations result in 32 bit signed numbers
    let bigintArgument;
    if (typeof argument == "number") {
        if (!Number.isInteger(argument)) {
            throw new Error("CBOR Data Item argument must be an integer");
        }
        bigintArgument = BigInt(argument);
    } else {
        bigintArgument = argument;
    }
    // Negative 0 is not a thing
    if (major == MAJOR_TYPE_NEGATIVE_INTEGER) {
        if (bigintArgument == 0n) {
            throw new Error("CBOR Data Item argument cannot be zero when negative");
        }
        bigintArgument = bigintArgument - 1n;
    }
    if (bigintArgument > 18446744073709551615n) {
        throw new Error("CBOR number out of range");
    }
    // Encode into 64 bits and extract the tail
    const buffer = new Uint8Array(8);
    const view = new DataView(buffer.buffer);
    view.setBigUint64(0, bigintArgument, false);
    if (bigintArgument <= 23) {
        return [
            majorEncoded | buffer[7]
        ];
    } else if (bigintArgument <= 255) {
        return [
            majorEncoded | 24,
            buffer[7]
        ];
    } else if (bigintArgument <= 65535) {
        return [
            majorEncoded | 25,
            ...buffer.slice(6)
        ];
    } else if (bigintArgument <= 4294967295) {
        return [
            majorEncoded | 26,
            ...buffer.slice(4)
        ];
    } else {
        return [
            majorEncoded | 27,
            ...buffer
        ];
    }
}
}),
"[project]/node_modules/@levischuck/tiny-cbor/esm/cbor/cbor.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CBORTag",
    ()=>CBORTag,
    "decodeCBOR",
    ()=>decodeCBOR,
    "decodePartialCBOR",
    ()=>decodePartialCBOR,
    "encodeCBOR",
    ()=>encodeCBOR
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@levischuck/tiny-cbor/esm/cbor/cbor_internal.js [app-route] (ecmascript)");
;
class CBORTag {
    /**
     * Wrap a value with a tag number.
     * When encoded, this tag will be attached to the value.
     *
     * @param tag Tag number
     * @param value Wrapped value
     */ constructor(tag, value){
        Object.defineProperty(this, "tagId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tagValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tagId = tag;
        this.tagValue = value;
    }
    /**
     * Read the tag number
     */ get tag() {
        return this.tagId;
    }
    /**
     * Read the value
     */ get value() {
        return this.tagValue;
    }
}
function decodeUnsignedInteger(data, argument, index) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeLength"])(data, argument, index);
}
function decodeNegativeInteger(data, argument, index) {
    const [value, length] = decodeUnsignedInteger(data, argument, index);
    return [
        -value - 1,
        length
    ];
}
function decodeByteString(data, argument, index) {
    const [lengthValue, lengthConsumed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeLength"])(data, argument, index);
    const dataStartIndex = index + lengthConsumed;
    return [
        new Uint8Array(data.buffer.slice(dataStartIndex, dataStartIndex + lengthValue)),
        lengthConsumed + lengthValue
    ];
}
const TEXT_DECODER = new TextDecoder();
function decodeString(data, argument, index) {
    const [value, length] = decodeByteString(data, argument, index);
    return [
        TEXT_DECODER.decode(value),
        length
    ];
}
function decodeArray(data, argument, index) {
    if (argument === 0) {
        return [
            [],
            1
        ];
    }
    const [length, lengthConsumed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeLength"])(data, argument, index);
    let consumedLength = lengthConsumed;
    const value = [];
    for(let i = 0; i < length; i++){
        const remainingDataLength = data.byteLength - index - consumedLength;
        if (remainingDataLength <= 0) {
            throw new Error("array is not supported or well formed");
        }
        const [decodedValue, consumed] = decodeNext(data, index + consumedLength);
        value.push(decodedValue);
        consumedLength += consumed;
    }
    return [
        value,
        consumedLength
    ];
}
const MAP_ERROR = "Map is not supported or well formed";
function decodeMap(data, argument, index) {
    if (argument === 0) {
        return [
            new Map(),
            1
        ];
    }
    const [length, lengthConsumed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeLength"])(data, argument, index);
    let consumedLength = lengthConsumed;
    const result = new Map();
    for(let i = 0; i < length; i++){
        let remainingDataLength = data.byteLength - index - consumedLength;
        if (remainingDataLength <= 0) {
            throw new Error(MAP_ERROR);
        }
        // Load key
        const [key, keyConsumed] = decodeNext(data, index + consumedLength);
        consumedLength += keyConsumed;
        remainingDataLength -= keyConsumed;
        // Check that there's enough to have a value
        if (remainingDataLength <= 0) {
            throw new Error(MAP_ERROR);
        }
        // Technically CBOR maps can have any type as the key, and so can JS Maps
        // However, JS Maps can only reference such keys as references which would
        // require key iteration and pattern matching.
        // For simplicity, since such keys are not in use with WebAuthn, this
        // capability is not implemented and the types are restricted to strings
        // and numbers.
        if (typeof key !== "string" && typeof key !== "number") {
            throw new Error(MAP_ERROR);
        }
        // CBOR Maps are not well formed if there are duplicate keys
        if (result.has(key)) {
            throw new Error(MAP_ERROR);
        }
        // Load value
        const [value, valueConsumed] = decodeNext(data, index + consumedLength);
        consumedLength += valueConsumed;
        result.set(key, value);
    }
    return [
        result,
        consumedLength
    ];
}
function decodeFloat16(data, index) {
    if (index + 3 > data.byteLength) {
        throw new Error("CBOR stream ended before end of Float 16");
    }
    // Skip the first byte
    const result = data.getUint16(index + 1, false);
    // A minimal selection of supported values
    if (result == 0x7c00) {
        return [
            Infinity,
            3
        ];
    } else if (result == 0x7e00) {
        return [
            NaN,
            3
        ];
    } else if (result == 0xfc00) {
        return [
            -Infinity,
            3
        ];
    }
    throw new Error("Float16 data is unsupported");
}
function decodeFloat32(data, index) {
    if (index + 5 > data.byteLength) {
        throw new Error("CBOR stream ended before end of Float 32");
    }
    // Skip the first byte
    const result = data.getFloat32(index + 1, false);
    // First byte + 4 byte float
    return [
        result,
        5
    ];
}
function decodeFloat64(data, index) {
    if (index + 9 > data.byteLength) {
        throw new Error("CBOR stream ended before end of Float 64");
    }
    // Skip the first byte
    const result = data.getFloat64(index + 1, false);
    // First byte + 8 byte float
    return [
        result,
        9
    ];
}
function decodeTag(data, argument, index) {
    const [tag, tagBytes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeLength"])(data, argument, index);
    const [value, valueBytes] = decodeNext(data, index + tagBytes);
    return [
        new CBORTag(tag, value),
        tagBytes + valueBytes
    ];
}
function decodeNext(data, index) {
    if (index >= data.byteLength) {
        throw new Error("CBOR stream ended before tag value");
    }
    const byte = data.getUint8(index);
    const majorType = byte >> 5;
    const argument = byte & 0x1f;
    switch(majorType){
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_UNSIGNED_INTEGER"]:
            {
                return decodeUnsignedInteger(data, argument, index);
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_NEGATIVE_INTEGER"]:
            {
                return decodeNegativeInteger(data, argument, index);
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_BYTE_STRING"]:
            {
                return decodeByteString(data, argument, index);
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_TEXT_STRING"]:
            {
                return decodeString(data, argument, index);
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_ARRAY"]:
            {
                return decodeArray(data, argument, index);
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_MAP"]:
            {
                return decodeMap(data, argument, index);
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_TAG"]:
            {
                return decodeTag(data, argument, index);
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_SIMPLE_OR_FLOAT"]:
            {
                switch(argument){
                    case 20:
                        return [
                            false,
                            1
                        ];
                    case 21:
                        return [
                            true,
                            1
                        ];
                    case 22:
                        return [
                            null,
                            1
                        ];
                    case 23:
                        return [
                            undefined,
                            1
                        ];
                    // 24: Simple value (value 32..255 in following byte)
                    case 25:
                        return decodeFloat16(data, index);
                    case 26:
                        return decodeFloat32(data, index);
                    case 27:
                        return decodeFloat64(data, index);
                }
            }
    }
    throw new Error(`Unsupported or not well formed at ${index}`);
}
function encodeSimple(data) {
    if (data === true) {
        return 0xf5;
    } else if (data === false) {
        return 0xf4;
    } else if (data === null) {
        return 0xf6;
    }
    // Else undefined
    return 0xf7;
}
function encodeFloat(data) {
    if (Math.fround(data) == data || !Number.isFinite(data) || Number.isNaN(data)) {
        // Float32
        const output = new Uint8Array(5);
        output[0] = 0xfa;
        const view = new DataView(output.buffer);
        view.setFloat32(1, data, false);
        return output;
    } else {
        // Float64
        const output = new Uint8Array(9);
        output[0] = 0xfb;
        const view = new DataView(output.buffer);
        view.setFloat64(1, data, false);
        return output;
    }
}
function encodeNumber(data) {
    if (typeof data == "number") {
        if (Number.isSafeInteger(data)) {
            // Encode integer
            if (data < 0) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_NEGATIVE_INTEGER"], Math.abs(data));
            } else {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_UNSIGNED_INTEGER"], data);
            }
        }
        return [
            encodeFloat(data)
        ];
    } else {
        if (data < 0n) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_NEGATIVE_INTEGER"], data * -1n);
        } else {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_UNSIGNED_INTEGER"], data);
        }
    }
}
const ENCODER = new TextEncoder();
function encodeString(data, output) {
    output.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_TEXT_STRING"], data.length));
    output.push(ENCODER.encode(data));
}
function encodeBytes(data, output) {
    output.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_BYTE_STRING"], data.length));
    output.push(data);
}
function encodeArray(data, output) {
    output.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_ARRAY"], data.length));
    for (const element of data){
        encodePartialCBOR(element, output);
    }
}
function encodeMap(data, output) {
    output.push(new Uint8Array((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_MAP"], data.size)));
    for (const [key, value] of data.entries()){
        encodePartialCBOR(key, output);
        encodePartialCBOR(value, output);
    }
}
function encodeTag(tag, output) {
    output.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeLength"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor_internal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAJOR_TYPE_TAG"], tag.tag));
    encodePartialCBOR(tag.value, output);
}
function encodePartialCBOR(data, output) {
    if (typeof data == "boolean" || data === null || data == undefined) {
        output.push(encodeSimple(data));
        return;
    }
    if (typeof data == "number" || typeof data == "bigint") {
        output.push(...encodeNumber(data));
        return;
    }
    if (typeof data == "string") {
        encodeString(data, output);
        return;
    }
    if (data instanceof Uint8Array) {
        encodeBytes(data, output);
        return;
    }
    if (Array.isArray(data)) {
        encodeArray(data, output);
        return;
    }
    if (data instanceof Map) {
        encodeMap(data, output);
        return;
    }
    if (data instanceof CBORTag) {
        encodeTag(data, output);
        return;
    }
    throw new Error("Not implemented");
}
function decodePartialCBOR(data, index) {
    if (data.byteLength === 0 || data.byteLength <= index || index < 0) {
        throw new Error("No data");
    }
    if (data instanceof Uint8Array) {
        return decodeNext(new DataView(data.buffer), index);
    } else if (data instanceof ArrayBuffer) {
        return decodeNext(new DataView(data), index);
    }
    // otherwise, it is a data view
    return decodeNext(data, index);
}
function decodeCBOR(data) {
    const [value, length] = decodePartialCBOR(data, 0);
    if (length !== data.byteLength) {
        throw new Error(`Data was decoded, but the whole stream was not processed ${length} != ${data.byteLength}`);
    }
    return value;
}
function encodeCBOR(data) {
    const results = [];
    encodePartialCBOR(data, results);
    let length = 0;
    for (const result of results){
        if (typeof result == "number") {
            length += 1;
        } else {
            length += result.length;
        }
    }
    const output = new Uint8Array(length);
    let index = 0;
    for (const result of results){
        if (typeof result == "number") {
            output[index] = result;
            index += 1;
        } else {
            output.set(result, index);
            index += result.length;
        }
    }
    return output;
}
}),
"[project]/node_modules/@levischuck/tiny-cbor/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$levischuck$2f$tiny$2d$cbor$2f$esm$2f$cbor$2f$cbor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@levischuck/tiny-cbor/esm/cbor/cbor.js [app-route] (ecmascript)");
;
}),
"[project]/node_modules/pvtsutils/build/index.es.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BufferSourceConverter",
    ()=>BufferSourceConverter,
    "Convert",
    ()=>Convert,
    "assign",
    ()=>assign,
    "combine",
    ()=>combine,
    "isEqual",
    ()=>isEqual
]);
/*!
 * MIT License
 * 
 * Copyright (c) 2017-2024 Peculiar Ventures, LLC
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */ const ARRAY_BUFFER_NAME = "[object ArrayBuffer]";
class BufferSourceConverter {
    static isArrayBuffer(data) {
        return Object.prototype.toString.call(data) === ARRAY_BUFFER_NAME;
    }
    static toArrayBuffer(data) {
        if (this.isArrayBuffer(data)) {
            return data;
        }
        if (data.byteLength === data.buffer.byteLength) {
            return data.buffer;
        }
        if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) {
            return data.buffer;
        }
        return this.toUint8Array(data.buffer).slice(data.byteOffset, data.byteOffset + data.byteLength).buffer;
    }
    static toUint8Array(data) {
        return this.toView(data, Uint8Array);
    }
    static toView(data, type) {
        if (data.constructor === type) {
            return data;
        }
        if (this.isArrayBuffer(data)) {
            return new type(data);
        }
        if (this.isArrayBufferView(data)) {
            return new type(data.buffer, data.byteOffset, data.byteLength);
        }
        throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
    }
    static isBufferSource(data) {
        return this.isArrayBufferView(data) || this.isArrayBuffer(data);
    }
    static isArrayBufferView(data) {
        return ArrayBuffer.isView(data) || data && this.isArrayBuffer(data.buffer);
    }
    static isEqual(a, b) {
        const aView = BufferSourceConverter.toUint8Array(a);
        const bView = BufferSourceConverter.toUint8Array(b);
        if (aView.length !== bView.byteLength) {
            return false;
        }
        for(let i = 0; i < aView.length; i++){
            if (aView[i] !== bView[i]) {
                return false;
            }
        }
        return true;
    }
    static concat(...args) {
        let buffers;
        if (Array.isArray(args[0]) && !(args[1] instanceof Function)) {
            buffers = args[0];
        } else if (Array.isArray(args[0]) && args[1] instanceof Function) {
            buffers = args[0];
        } else {
            if (args[args.length - 1] instanceof Function) {
                buffers = args.slice(0, args.length - 1);
            } else {
                buffers = args;
            }
        }
        let size = 0;
        for (const buffer of buffers){
            size += buffer.byteLength;
        }
        const res = new Uint8Array(size);
        let offset = 0;
        for (const buffer of buffers){
            const view = this.toUint8Array(buffer);
            res.set(view, offset);
            offset += view.length;
        }
        if (args[args.length - 1] instanceof Function) {
            return this.toView(res, args[args.length - 1]);
        }
        return res.buffer;
    }
}
const STRING_TYPE = "string";
const HEX_REGEX = /^[0-9a-f\s]+$/i;
const BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
const BASE64URL_REGEX = /^[a-zA-Z0-9-_]+$/;
class Utf8Converter {
    static fromString(text) {
        const s = unescape(encodeURIComponent(text));
        const uintArray = new Uint8Array(s.length);
        for(let i = 0; i < s.length; i++){
            uintArray[i] = s.charCodeAt(i);
        }
        return uintArray.buffer;
    }
    static toString(buffer) {
        const buf = BufferSourceConverter.toUint8Array(buffer);
        let encodedString = "";
        for(let i = 0; i < buf.length; i++){
            encodedString += String.fromCharCode(buf[i]);
        }
        const decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    }
}
class Utf16Converter {
    static toString(buffer, littleEndian = false) {
        const arrayBuffer = BufferSourceConverter.toArrayBuffer(buffer);
        const dataView = new DataView(arrayBuffer);
        let res = "";
        for(let i = 0; i < arrayBuffer.byteLength; i += 2){
            const code = dataView.getUint16(i, littleEndian);
            res += String.fromCharCode(code);
        }
        return res;
    }
    static fromString(text, littleEndian = false) {
        const res = new ArrayBuffer(text.length * 2);
        const dataView = new DataView(res);
        for(let i = 0; i < text.length; i++){
            dataView.setUint16(i * 2, text.charCodeAt(i), littleEndian);
        }
        return res;
    }
}
class Convert {
    static isHex(data) {
        return typeof data === STRING_TYPE && HEX_REGEX.test(data);
    }
    static isBase64(data) {
        return typeof data === STRING_TYPE && BASE64_REGEX.test(data);
    }
    static isBase64Url(data) {
        return typeof data === STRING_TYPE && BASE64URL_REGEX.test(data);
    }
    static ToString(buffer, enc = "utf8") {
        const buf = BufferSourceConverter.toUint8Array(buffer);
        switch(enc.toLowerCase()){
            case "utf8":
                return this.ToUtf8String(buf);
            case "binary":
                return this.ToBinary(buf);
            case "hex":
                return this.ToHex(buf);
            case "base64":
                return this.ToBase64(buf);
            case "base64url":
                return this.ToBase64Url(buf);
            case "utf16le":
                return Utf16Converter.toString(buf, true);
            case "utf16":
            case "utf16be":
                return Utf16Converter.toString(buf);
            default:
                throw new Error(`Unknown type of encoding '${enc}'`);
        }
    }
    static FromString(str, enc = "utf8") {
        if (!str) {
            return new ArrayBuffer(0);
        }
        switch(enc.toLowerCase()){
            case "utf8":
                return this.FromUtf8String(str);
            case "binary":
                return this.FromBinary(str);
            case "hex":
                return this.FromHex(str);
            case "base64":
                return this.FromBase64(str);
            case "base64url":
                return this.FromBase64Url(str);
            case "utf16le":
                return Utf16Converter.fromString(str, true);
            case "utf16":
            case "utf16be":
                return Utf16Converter.fromString(str);
            default:
                throw new Error(`Unknown type of encoding '${enc}'`);
        }
    }
    static ToBase64(buffer) {
        const buf = BufferSourceConverter.toUint8Array(buffer);
        if (typeof btoa !== "undefined") {
            const binary = this.ToString(buf, "binary");
            return btoa(binary);
        } else {
            return Buffer.from(buf).toString("base64");
        }
    }
    static FromBase64(base64) {
        const formatted = this.formatString(base64);
        if (!formatted) {
            return new ArrayBuffer(0);
        }
        if (!Convert.isBase64(formatted)) {
            throw new TypeError("Argument 'base64Text' is not Base64 encoded");
        }
        if (typeof atob !== "undefined") {
            return this.FromBinary(atob(formatted));
        } else {
            return new Uint8Array(Buffer.from(formatted, "base64")).buffer;
        }
    }
    static FromBase64Url(base64url) {
        const formatted = this.formatString(base64url);
        if (!formatted) {
            return new ArrayBuffer(0);
        }
        if (!Convert.isBase64Url(formatted)) {
            throw new TypeError("Argument 'base64url' is not Base64Url encoded");
        }
        return this.FromBase64(this.Base64Padding(formatted.replace(/\-/g, "+").replace(/\_/g, "/")));
    }
    static ToBase64Url(data) {
        return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
    }
    static FromUtf8String(text, encoding = Convert.DEFAULT_UTF8_ENCODING) {
        switch(encoding){
            case "ascii":
                return this.FromBinary(text);
            case "utf8":
                return Utf8Converter.fromString(text);
            case "utf16":
            case "utf16be":
                return Utf16Converter.fromString(text);
            case "utf16le":
            case "usc2":
                return Utf16Converter.fromString(text, true);
            default:
                throw new Error(`Unknown type of encoding '${encoding}'`);
        }
    }
    static ToUtf8String(buffer, encoding = Convert.DEFAULT_UTF8_ENCODING) {
        switch(encoding){
            case "ascii":
                return this.ToBinary(buffer);
            case "utf8":
                return Utf8Converter.toString(buffer);
            case "utf16":
            case "utf16be":
                return Utf16Converter.toString(buffer);
            case "utf16le":
            case "usc2":
                return Utf16Converter.toString(buffer, true);
            default:
                throw new Error(`Unknown type of encoding '${encoding}'`);
        }
    }
    static FromBinary(text) {
        const stringLength = text.length;
        const resultView = new Uint8Array(stringLength);
        for(let i = 0; i < stringLength; i++){
            resultView[i] = text.charCodeAt(i);
        }
        return resultView.buffer;
    }
    static ToBinary(buffer) {
        const buf = BufferSourceConverter.toUint8Array(buffer);
        let res = "";
        for(let i = 0; i < buf.length; i++){
            res += String.fromCharCode(buf[i]);
        }
        return res;
    }
    static ToHex(buffer) {
        const buf = BufferSourceConverter.toUint8Array(buffer);
        let result = "";
        const len = buf.length;
        for(let i = 0; i < len; i++){
            const byte = buf[i];
            if (byte < 16) {
                result += "0";
            }
            result += byte.toString(16);
        }
        return result;
    }
    static FromHex(hexString) {
        let formatted = this.formatString(hexString);
        if (!formatted) {
            return new ArrayBuffer(0);
        }
        if (!Convert.isHex(formatted)) {
            throw new TypeError("Argument 'hexString' is not HEX encoded");
        }
        if (formatted.length % 2) {
            formatted = `0${formatted}`;
        }
        const res = new Uint8Array(formatted.length / 2);
        for(let i = 0; i < formatted.length; i = i + 2){
            const c = formatted.slice(i, i + 2);
            res[i / 2] = parseInt(c, 16);
        }
        return res.buffer;
    }
    static ToUtf16String(buffer, littleEndian = false) {
        return Utf16Converter.toString(buffer, littleEndian);
    }
    static FromUtf16String(text, littleEndian = false) {
        return Utf16Converter.fromString(text, littleEndian);
    }
    static Base64Padding(base64) {
        const padCount = 4 - base64.length % 4;
        if (padCount < 4) {
            for(let i = 0; i < padCount; i++){
                base64 += "=";
            }
        }
        return base64;
    }
    static formatString(data) {
        return (data === null || data === void 0 ? void 0 : data.replace(/[\n\r\t ]/g, "")) || "";
    }
}
Convert.DEFAULT_UTF8_ENCODING = "utf8";
function assign(target, ...sources) {
    const res = arguments[0];
    for(let i = 1; i < arguments.length; i++){
        const obj = arguments[i];
        for(const prop in obj){
            res[prop] = obj[prop];
        }
    }
    return res;
}
function combine(...buf) {
    const totalByteLength = buf.map((item)=>item.byteLength).reduce((prev, cur)=>prev + cur);
    const res = new Uint8Array(totalByteLength);
    let currentPos = 0;
    buf.map((item)=>new Uint8Array(item)).forEach((arr)=>{
        for (const item2 of arr){
            res[currentPos++] = item2;
        }
    });
    return res.buffer;
}
function isEqual(bytes1, bytes2) {
    if (!(bytes1 && bytes2)) {
        return false;
    }
    if (bytes1.byteLength !== bytes2.byteLength) {
        return false;
    }
    const b1 = new Uint8Array(bytes1);
    const b2 = new Uint8Array(bytes2);
    for(let i = 0; i < bytes1.byteLength; i++){
        if (b1[i] !== b2[i]) {
            return false;
        }
    }
    return true;
}
;
}),
"[project]/node_modules/pvutils/build/utils.es.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrayBufferToString",
    ()=>arrayBufferToString,
    "bufferToHexCodes",
    ()=>bufferToHexCodes,
    "checkBufferParams",
    ()=>checkBufferParams,
    "clearProps",
    ()=>clearProps,
    "fromBase64",
    ()=>fromBase64,
    "getParametersValue",
    ()=>getParametersValue,
    "getUTCDate",
    ()=>getUTCDate,
    "isEqualBuffer",
    ()=>isEqualBuffer,
    "nearestPowerOf2",
    ()=>nearestPowerOf2,
    "padNumber",
    ()=>padNumber,
    "stringToArrayBuffer",
    ()=>stringToArrayBuffer,
    "toBase64",
    ()=>toBase64,
    "utilConcatBuf",
    ()=>utilConcatBuf,
    "utilConcatView",
    ()=>utilConcatView,
    "utilDecodeTC",
    ()=>utilDecodeTC,
    "utilEncodeTC",
    ()=>utilEncodeTC,
    "utilFromBase",
    ()=>utilFromBase,
    "utilToBase",
    ()=>utilToBase
]);
/*!
 Copyright (c) Peculiar Ventures, LLC
*/ function getUTCDate(date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}
function getParametersValue(parameters, name, defaultValue) {
    var _a;
    if (parameters instanceof Object === false) {
        return defaultValue;
    }
    return (_a = parameters[name]) !== null && _a !== void 0 ? _a : defaultValue;
}
function bufferToHexCodes(inputBuffer, inputOffset = 0, inputLength = inputBuffer.byteLength - inputOffset, insertSpace = false) {
    let result = "";
    for (const item of new Uint8Array(inputBuffer, inputOffset, inputLength)){
        const str = item.toString(16).toUpperCase();
        if (str.length === 1) {
            result += "0";
        }
        result += str;
        if (insertSpace) {
            result += " ";
        }
    }
    return result.trim();
}
function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
    if (!(inputBuffer instanceof ArrayBuffer)) {
        baseBlock.error = "Wrong parameter: inputBuffer must be \"ArrayBuffer\"";
        return false;
    }
    if (!inputBuffer.byteLength) {
        baseBlock.error = "Wrong parameter: inputBuffer has zero length";
        return false;
    }
    if (inputOffset < 0) {
        baseBlock.error = "Wrong parameter: inputOffset less than zero";
        return false;
    }
    if (inputLength < 0) {
        baseBlock.error = "Wrong parameter: inputLength less than zero";
        return false;
    }
    if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
        baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
        return false;
    }
    return true;
}
function utilFromBase(inputBuffer, inputBase) {
    let result = 0;
    if (inputBuffer.length === 1) {
        return inputBuffer[0];
    }
    for(let i = inputBuffer.length - 1; i >= 0; i--){
        result += inputBuffer[inputBuffer.length - 1 - i] * Math.pow(2, inputBase * i);
    }
    return result;
}
function utilToBase(value, base, reserved = -1) {
    const internalReserved = reserved;
    let internalValue = value;
    let result = 0;
    let biggest = Math.pow(2, base);
    for(let i = 1; i < 8; i++){
        if (value < biggest) {
            let retBuf;
            if (internalReserved < 0) {
                retBuf = new ArrayBuffer(i);
                result = i;
            } else {
                if (internalReserved < i) {
                    return new ArrayBuffer(0);
                }
                retBuf = new ArrayBuffer(internalReserved);
                result = internalReserved;
            }
            const retView = new Uint8Array(retBuf);
            for(let j = i - 1; j >= 0; j--){
                const basis = Math.pow(2, j * base);
                retView[result - j - 1] = Math.floor(internalValue / basis);
                internalValue -= retView[result - j - 1] * basis;
            }
            return retBuf;
        }
        biggest *= Math.pow(2, base);
    }
    return new ArrayBuffer(0);
}
function utilConcatBuf(...buffers) {
    let outputLength = 0;
    let prevLength = 0;
    for (const buffer of buffers){
        outputLength += buffer.byteLength;
    }
    const retBuf = new ArrayBuffer(outputLength);
    const retView = new Uint8Array(retBuf);
    for (const buffer of buffers){
        retView.set(new Uint8Array(buffer), prevLength);
        prevLength += buffer.byteLength;
    }
    return retBuf;
}
function utilConcatView(...views) {
    let outputLength = 0;
    let prevLength = 0;
    for (const view of views){
        outputLength += view.length;
    }
    const retBuf = new ArrayBuffer(outputLength);
    const retView = new Uint8Array(retBuf);
    for (const view of views){
        retView.set(view, prevLength);
        prevLength += view.length;
    }
    return retView;
}
function utilDecodeTC() {
    const buf = new Uint8Array(this.valueHex);
    if (this.valueHex.byteLength >= 2) {
        const condition1 = buf[0] === 0xFF && buf[1] & 0x80;
        const condition2 = buf[0] === 0x00 && (buf[1] & 0x80) === 0x00;
        if (condition1 || condition2) {
            this.warnings.push("Needlessly long format");
        }
    }
    const bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
    const bigIntView = new Uint8Array(bigIntBuffer);
    for(let i = 0; i < this.valueHex.byteLength; i++){
        bigIntView[i] = 0;
    }
    bigIntView[0] = buf[0] & 0x80;
    const bigInt = utilFromBase(bigIntView, 8);
    const smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
    const smallIntView = new Uint8Array(smallIntBuffer);
    for(let j = 0; j < this.valueHex.byteLength; j++){
        smallIntView[j] = buf[j];
    }
    smallIntView[0] &= 0x7F;
    const smallInt = utilFromBase(smallIntView, 8);
    return smallInt - bigInt;
}
function utilEncodeTC(value) {
    const modValue = value < 0 ? value * -1 : value;
    let bigInt = 128;
    for(let i = 1; i < 8; i++){
        if (modValue <= bigInt) {
            if (value < 0) {
                const smallInt = bigInt - modValue;
                const retBuf = utilToBase(smallInt, 8, i);
                const retView = new Uint8Array(retBuf);
                retView[0] |= 0x80;
                return retBuf;
            }
            let retBuf = utilToBase(modValue, 8, i);
            let retView = new Uint8Array(retBuf);
            if (retView[0] & 0x80) {
                const tempBuf = retBuf.slice(0);
                const tempView = new Uint8Array(tempBuf);
                retBuf = new ArrayBuffer(retBuf.byteLength + 1);
                retView = new Uint8Array(retBuf);
                for(let k = 0; k < tempBuf.byteLength; k++){
                    retView[k + 1] = tempView[k];
                }
                retView[0] = 0x00;
            }
            return retBuf;
        }
        bigInt *= Math.pow(2, 8);
    }
    return new ArrayBuffer(0);
}
function isEqualBuffer(inputBuffer1, inputBuffer2) {
    if (inputBuffer1.byteLength !== inputBuffer2.byteLength) {
        return false;
    }
    const view1 = new Uint8Array(inputBuffer1);
    const view2 = new Uint8Array(inputBuffer2);
    for(let i = 0; i < view1.length; i++){
        if (view1[i] !== view2[i]) {
            return false;
        }
    }
    return true;
}
function padNumber(inputNumber, fullLength) {
    const str = inputNumber.toString(10);
    if (fullLength < str.length) {
        return "";
    }
    const dif = fullLength - str.length;
    const padding = new Array(dif);
    for(let i = 0; i < dif; i++){
        padding[i] = "0";
    }
    const paddingString = padding.join("");
    return paddingString.concat(str);
}
const base64Template = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const base64UrlTemplate = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
function toBase64(input, useUrlTemplate = false, skipPadding = false, skipLeadingZeros = false) {
    let i = 0;
    let flag1 = 0;
    let flag2 = 0;
    let output = "";
    const template = useUrlTemplate ? base64UrlTemplate : base64Template;
    if (skipLeadingZeros) {
        let nonZeroPosition = 0;
        for(let i = 0; i < input.length; i++){
            if (input.charCodeAt(i) !== 0) {
                nonZeroPosition = i;
                break;
            }
        }
        input = input.slice(nonZeroPosition);
    }
    while(i < input.length){
        const chr1 = input.charCodeAt(i++);
        if (i >= input.length) {
            flag1 = 1;
        }
        const chr2 = input.charCodeAt(i++);
        if (i >= input.length) {
            flag2 = 1;
        }
        const chr3 = input.charCodeAt(i++);
        const enc1 = chr1 >> 2;
        const enc2 = (chr1 & 0x03) << 4 | chr2 >> 4;
        let enc3 = (chr2 & 0x0F) << 2 | chr3 >> 6;
        let enc4 = chr3 & 0x3F;
        if (flag1 === 1) {
            enc3 = enc4 = 64;
        } else {
            if (flag2 === 1) {
                enc4 = 64;
            }
        }
        if (skipPadding) {
            if (enc3 === 64) {
                output += `${template.charAt(enc1)}${template.charAt(enc2)}`;
            } else {
                if (enc4 === 64) {
                    output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}`;
                } else {
                    output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}${template.charAt(enc4)}`;
                }
            }
        } else {
            output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}${template.charAt(enc4)}`;
        }
    }
    return output;
}
function fromBase64(input, useUrlTemplate = false, cutTailZeros = false) {
    const template = useUrlTemplate ? base64UrlTemplate : base64Template;
    function indexOf(toSearch) {
        for(let i = 0; i < 64; i++){
            if (template.charAt(i) === toSearch) return i;
        }
        return 64;
    }
    function test(incoming) {
        return incoming === 64 ? 0x00 : incoming;
    }
    let i = 0;
    let output = "";
    while(i < input.length){
        const enc1 = indexOf(input.charAt(i++));
        const enc2 = i >= input.length ? 0x00 : indexOf(input.charAt(i++));
        const enc3 = i >= input.length ? 0x00 : indexOf(input.charAt(i++));
        const enc4 = i >= input.length ? 0x00 : indexOf(input.charAt(i++));
        const chr1 = test(enc1) << 2 | test(enc2) >> 4;
        const chr2 = (test(enc2) & 0x0F) << 4 | test(enc3) >> 2;
        const chr3 = (test(enc3) & 0x03) << 6 | test(enc4);
        output += String.fromCharCode(chr1);
        if (enc3 !== 64) {
            output += String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
            output += String.fromCharCode(chr3);
        }
    }
    if (cutTailZeros) {
        const outputLength = output.length;
        let nonZeroStart = -1;
        for(let i = outputLength - 1; i >= 0; i--){
            if (output.charCodeAt(i) !== 0) {
                nonZeroStart = i;
                break;
            }
        }
        if (nonZeroStart !== -1) {
            output = output.slice(0, nonZeroStart + 1);
        } else {
            output = "";
        }
    }
    return output;
}
function arrayBufferToString(buffer) {
    let resultString = "";
    const view = new Uint8Array(buffer);
    for (const element of view){
        resultString += String.fromCharCode(element);
    }
    return resultString;
}
function stringToArrayBuffer(str) {
    const stringLength = str.length;
    const resultBuffer = new ArrayBuffer(stringLength);
    const resultView = new Uint8Array(resultBuffer);
    for(let i = 0; i < stringLength; i++){
        resultView[i] = str.charCodeAt(i);
    }
    return resultBuffer;
}
const log2 = Math.log(2);
function nearestPowerOf2(length) {
    const base = Math.log(length) / log2;
    const floor = Math.floor(base);
    const round = Math.round(base);
    return floor === round ? floor : round;
}
function clearProps(object, propsArray) {
    for (const prop of propsArray){
        delete object[prop];
    }
}
;
}),
"[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Any",
    ()=>Any,
    "BaseBlock",
    ()=>BaseBlock,
    "BaseStringBlock",
    ()=>BaseStringBlock,
    "BitString",
    ()=>BitString,
    "BmpString",
    ()=>BmpString,
    "Boolean",
    ()=>Boolean,
    "CharacterString",
    ()=>CharacterString,
    "Choice",
    ()=>Choice,
    "Constructed",
    ()=>Constructed,
    "DATE",
    ()=>DATE,
    "DateTime",
    ()=>DateTime,
    "Duration",
    ()=>Duration,
    "EndOfContent",
    ()=>EndOfContent,
    "Enumerated",
    ()=>Enumerated,
    "GeneralString",
    ()=>GeneralString,
    "GeneralizedTime",
    ()=>GeneralizedTime,
    "GraphicString",
    ()=>GraphicString,
    "HexBlock",
    ()=>HexBlock,
    "IA5String",
    ()=>IA5String,
    "Integer",
    ()=>Integer,
    "Null",
    ()=>Null,
    "NumericString",
    ()=>NumericString,
    "ObjectIdentifier",
    ()=>ObjectIdentifier,
    "OctetString",
    ()=>OctetString,
    "Primitive",
    ()=>Primitive,
    "PrintableString",
    ()=>PrintableString,
    "RawData",
    ()=>RawData,
    "RelativeObjectIdentifier",
    ()=>RelativeObjectIdentifier,
    "Repeated",
    ()=>Repeated,
    "Sequence",
    ()=>Sequence,
    "Set",
    ()=>Set,
    "TIME",
    ()=>TIME,
    "TeletexString",
    ()=>TeletexString,
    "TimeOfDay",
    ()=>TimeOfDay,
    "UTCTime",
    ()=>UTCTime,
    "UniversalString",
    ()=>UniversalString,
    "Utf8String",
    ()=>Utf8String,
    "ValueBlock",
    ()=>ValueBlock,
    "VideotexString",
    ()=>VideotexString,
    "ViewWriter",
    ()=>ViewWriter,
    "VisibleString",
    ()=>VisibleString,
    "compareSchema",
    ()=>compareSchema,
    "fromBER",
    ()=>fromBER,
    "verifySchema",
    ()=>verifySchema
]);
/*!
 * Copyright (c) 2014, GMO GlobalSign
 * Copyright (c) 2015-2022, Peculiar Ventures
 * All rights reserved.
 * 
 * Author 2014-2019, Yury Strozhevsky
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pvtsutils/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pvutils/build/utils.es.js [app-route] (ecmascript)");
;
;
function assertBigInt() {
    if (typeof BigInt === "undefined") {
        throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
    }
}
function concat(buffers) {
    let outputLength = 0;
    let prevLength = 0;
    for(let i = 0; i < buffers.length; i++){
        const buffer = buffers[i];
        outputLength += buffer.byteLength;
    }
    const retView = new Uint8Array(outputLength);
    for(let i = 0; i < buffers.length; i++){
        const buffer = buffers[i];
        retView.set(new Uint8Array(buffer), prevLength);
        prevLength += buffer.byteLength;
    }
    return retView.buffer;
}
function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
    if (!(inputBuffer instanceof Uint8Array)) {
        baseBlock.error = "Wrong parameter: inputBuffer must be 'Uint8Array'";
        return false;
    }
    if (!inputBuffer.byteLength) {
        baseBlock.error = "Wrong parameter: inputBuffer has zero length";
        return false;
    }
    if (inputOffset < 0) {
        baseBlock.error = "Wrong parameter: inputOffset less than zero";
        return false;
    }
    if (inputLength < 0) {
        baseBlock.error = "Wrong parameter: inputLength less than zero";
        return false;
    }
    if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
        baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
        return false;
    }
    return true;
}
class ViewWriter {
    constructor(){
        this.items = [];
    }
    write(buf) {
        this.items.push(buf);
    }
    final() {
        return concat(this.items);
    }
}
const powers2 = [
    new Uint8Array([
        1
    ])
];
const digitsString = "0123456789";
const NAME = "name";
const VALUE_HEX_VIEW = "valueHexView";
const IS_HEX_ONLY = "isHexOnly";
const ID_BLOCK = "idBlock";
const TAG_CLASS = "tagClass";
const TAG_NUMBER = "tagNumber";
const IS_CONSTRUCTED = "isConstructed";
const FROM_BER = "fromBER";
const TO_BER = "toBER";
const LOCAL = "local";
const EMPTY_STRING = "";
const EMPTY_BUFFER = new ArrayBuffer(0);
const EMPTY_VIEW = new Uint8Array(0);
const END_OF_CONTENT_NAME = "EndOfContent";
const OCTET_STRING_NAME = "OCTET STRING";
const BIT_STRING_NAME = "BIT STRING";
function HexBlock(BaseClass) {
    var _a;
    return _a = class Some extends BaseClass {
        get valueHex() {
            return this.valueHexView.slice().buffer;
        }
        set valueHex(value) {
            this.valueHexView = new Uint8Array(value);
        }
        constructor(...args){
            var _b;
            super(...args);
            const params = args[0] || {};
            this.isHexOnly = (_b = params.isHexOnly) !== null && _b !== void 0 ? _b : false;
            this.valueHexView = params.valueHex ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(params.valueHex) : EMPTY_VIEW;
        }
        fromBER(inputBuffer, inputOffset, inputLength) {
            const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
            if (!checkBufferParams(this, view, inputOffset, inputLength)) {
                return -1;
            }
            const endLength = inputOffset + inputLength;
            this.valueHexView = view.subarray(inputOffset, endLength);
            if (!this.valueHexView.length) {
                this.warnings.push("Zero buffer length");
                return inputOffset;
            }
            this.blockLength = inputLength;
            return endLength;
        }
        toBER(sizeOnly = false) {
            if (!this.isHexOnly) {
                this.error = "Flag 'isHexOnly' is not set, abort";
                return EMPTY_BUFFER;
            }
            if (sizeOnly) {
                return new ArrayBuffer(this.valueHexView.byteLength);
            }
            return this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer;
        }
        toJSON() {
            return {
                ...super.toJSON(),
                isHexOnly: this.isHexOnly,
                valueHex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(this.valueHexView)
            };
        }
    }, _a.NAME = "hexBlock", _a;
}
class LocalBaseBlock {
    static blockName() {
        return this.NAME;
    }
    get valueBeforeDecode() {
        return this.valueBeforeDecodeView.slice().buffer;
    }
    set valueBeforeDecode(value) {
        this.valueBeforeDecodeView = new Uint8Array(value);
    }
    constructor({ blockLength = 0, error = EMPTY_STRING, warnings = [], valueBeforeDecode = EMPTY_VIEW } = {}){
        this.blockLength = blockLength;
        this.error = error;
        this.warnings = warnings;
        this.valueBeforeDecodeView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(valueBeforeDecode);
    }
    toJSON() {
        return {
            blockName: this.constructor.NAME,
            blockLength: this.blockLength,
            error: this.error,
            warnings: this.warnings,
            valueBeforeDecode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(this.valueBeforeDecodeView)
        };
    }
}
LocalBaseBlock.NAME = "baseBlock";
class ValueBlock extends LocalBaseBlock {
    fromBER(_inputBuffer, _inputOffset, _inputLength) {
        throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
    }
    toBER(_sizeOnly, _writer) {
        throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
    }
}
ValueBlock.NAME = "valueBlock";
class LocalIdentificationBlock extends HexBlock(LocalBaseBlock) {
    constructor({ idBlock = {} } = {}){
        var _a, _b, _c, _d;
        super();
        if (idBlock) {
            this.isHexOnly = (_a = idBlock.isHexOnly) !== null && _a !== void 0 ? _a : false;
            this.valueHexView = idBlock.valueHex ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(idBlock.valueHex) : EMPTY_VIEW;
            this.tagClass = (_b = idBlock.tagClass) !== null && _b !== void 0 ? _b : -1;
            this.tagNumber = (_c = idBlock.tagNumber) !== null && _c !== void 0 ? _c : -1;
            this.isConstructed = (_d = idBlock.isConstructed) !== null && _d !== void 0 ? _d : false;
        } else {
            this.tagClass = -1;
            this.tagNumber = -1;
            this.isConstructed = false;
        }
    }
    toBER(sizeOnly = false) {
        let firstOctet = 0;
        switch(this.tagClass){
            case 1:
                firstOctet |= 0x00;
                break;
            case 2:
                firstOctet |= 0x40;
                break;
            case 3:
                firstOctet |= 0x80;
                break;
            case 4:
                firstOctet |= 0xC0;
                break;
            default:
                this.error = "Unknown tag class";
                return EMPTY_BUFFER;
        }
        if (this.isConstructed) firstOctet |= 0x20;
        if (this.tagNumber < 31 && !this.isHexOnly) {
            const retView = new Uint8Array(1);
            if (!sizeOnly) {
                let number = this.tagNumber;
                number &= 0x1F;
                firstOctet |= number;
                retView[0] = firstOctet;
            }
            return retView.buffer;
        }
        if (!this.isHexOnly) {
            const encodedBuf = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilToBase"](this.tagNumber, 7);
            const encodedView = new Uint8Array(encodedBuf);
            const size = encodedBuf.byteLength;
            const retView = new Uint8Array(size + 1);
            retView[0] = firstOctet | 0x1F;
            if (!sizeOnly) {
                for(let i = 0; i < size - 1; i++)retView[i + 1] = encodedView[i] | 0x80;
                retView[size] = encodedView[size - 1];
            }
            return retView.buffer;
        }
        const retView = new Uint8Array(this.valueHexView.byteLength + 1);
        retView[0] = firstOctet | 0x1F;
        if (!sizeOnly) {
            const curView = this.valueHexView;
            for(let i = 0; i < curView.length - 1; i++)retView[i + 1] = curView[i] | 0x80;
            retView[this.valueHexView.byteLength] = curView[curView.length - 1];
        }
        return retView.buffer;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const inputView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
            return -1;
        }
        const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        if (intBuffer.length === 0) {
            this.error = "Zero buffer length";
            return -1;
        }
        const tagClassMask = intBuffer[0] & 0xC0;
        switch(tagClassMask){
            case 0x00:
                this.tagClass = 1;
                break;
            case 0x40:
                this.tagClass = 2;
                break;
            case 0x80:
                this.tagClass = 3;
                break;
            case 0xC0:
                this.tagClass = 4;
                break;
            default:
                this.error = "Unknown tag class";
                return -1;
        }
        this.isConstructed = (intBuffer[0] & 0x20) === 0x20;
        this.isHexOnly = false;
        const tagNumberMask = intBuffer[0] & 0x1F;
        if (tagNumberMask !== 0x1F) {
            this.tagNumber = tagNumberMask;
            this.blockLength = 1;
        } else {
            let count = 1;
            let intTagNumberBuffer = this.valueHexView = new Uint8Array(255);
            let tagNumberBufferMaxLength = 255;
            while(intBuffer[count] & 0x80){
                intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F;
                count++;
                if (count >= intBuffer.length) {
                    this.error = "End of input reached before message was fully decoded";
                    return -1;
                }
                if (count === tagNumberBufferMaxLength) {
                    tagNumberBufferMaxLength += 255;
                    const tempBufferView = new Uint8Array(tagNumberBufferMaxLength);
                    for(let i = 0; i < intTagNumberBuffer.length; i++)tempBufferView[i] = intTagNumberBuffer[i];
                    intTagNumberBuffer = this.valueHexView = new Uint8Array(tagNumberBufferMaxLength);
                }
            }
            this.blockLength = count + 1;
            intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F;
            const tempBufferView = new Uint8Array(count);
            for(let i = 0; i < count; i++)tempBufferView[i] = intTagNumberBuffer[i];
            intTagNumberBuffer = this.valueHexView = new Uint8Array(count);
            intTagNumberBuffer.set(tempBufferView);
            if (this.blockLength <= 9) this.tagNumber = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilFromBase"](intTagNumberBuffer, 7);
            else {
                this.isHexOnly = true;
                this.warnings.push("Tag too long, represented as hex-coded");
            }
        }
        if (this.tagClass === 1 && this.isConstructed) {
            switch(this.tagNumber){
                case 1:
                case 2:
                case 5:
                case 6:
                case 9:
                case 13:
                case 14:
                case 23:
                case 24:
                case 31:
                case 32:
                case 33:
                case 34:
                    this.error = "Constructed encoding used for primitive type";
                    return -1;
            }
        }
        return inputOffset + this.blockLength;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            tagClass: this.tagClass,
            tagNumber: this.tagNumber,
            isConstructed: this.isConstructed
        };
    }
}
LocalIdentificationBlock.NAME = "identificationBlock";
class LocalLengthBlock extends LocalBaseBlock {
    constructor({ lenBlock = {} } = {}){
        var _a, _b, _c;
        super();
        this.isIndefiniteForm = (_a = lenBlock.isIndefiniteForm) !== null && _a !== void 0 ? _a : false;
        this.longFormUsed = (_b = lenBlock.longFormUsed) !== null && _b !== void 0 ? _b : false;
        this.length = (_c = lenBlock.length) !== null && _c !== void 0 ? _c : 0;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const view = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        if (!checkBufferParams(this, view, inputOffset, inputLength)) {
            return -1;
        }
        const intBuffer = view.subarray(inputOffset, inputOffset + inputLength);
        if (intBuffer.length === 0) {
            this.error = "Zero buffer length";
            return -1;
        }
        if (intBuffer[0] === 0xFF) {
            this.error = "Length block 0xFF is reserved by standard";
            return -1;
        }
        this.isIndefiniteForm = intBuffer[0] === 0x80;
        if (this.isIndefiniteForm) {
            this.blockLength = 1;
            return inputOffset + this.blockLength;
        }
        this.longFormUsed = !!(intBuffer[0] & 0x80);
        if (this.longFormUsed === false) {
            this.length = intBuffer[0];
            this.blockLength = 1;
            return inputOffset + this.blockLength;
        }
        const count = intBuffer[0] & 0x7F;
        if (count > 8) {
            this.error = "Too big integer";
            return -1;
        }
        if (count + 1 > intBuffer.length) {
            this.error = "End of input reached before message was fully decoded";
            return -1;
        }
        const lenOffset = inputOffset + 1;
        const lengthBufferView = view.subarray(lenOffset, lenOffset + count);
        if (lengthBufferView[count - 1] === 0x00) this.warnings.push("Needlessly long encoded length");
        this.length = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilFromBase"](lengthBufferView, 8);
        if (this.longFormUsed && this.length <= 127) this.warnings.push("Unnecessary usage of long length form");
        this.blockLength = count + 1;
        return inputOffset + this.blockLength;
    }
    toBER(sizeOnly = false) {
        let retBuf;
        let retView;
        if (this.length > 127) this.longFormUsed = true;
        if (this.isIndefiniteForm) {
            retBuf = new ArrayBuffer(1);
            if (sizeOnly === false) {
                retView = new Uint8Array(retBuf);
                retView[0] = 0x80;
            }
            return retBuf;
        }
        if (this.longFormUsed) {
            const encodedBuf = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilToBase"](this.length, 8);
            if (encodedBuf.byteLength > 127) {
                this.error = "Too big length";
                return EMPTY_BUFFER;
            }
            retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);
            if (sizeOnly) return retBuf;
            const encodedView = new Uint8Array(encodedBuf);
            retView = new Uint8Array(retBuf);
            retView[0] = encodedBuf.byteLength | 0x80;
            for(let i = 0; i < encodedBuf.byteLength; i++)retView[i + 1] = encodedView[i];
            return retBuf;
        }
        retBuf = new ArrayBuffer(1);
        if (sizeOnly === false) {
            retView = new Uint8Array(retBuf);
            retView[0] = this.length;
        }
        return retBuf;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            isIndefiniteForm: this.isIndefiniteForm,
            longFormUsed: this.longFormUsed,
            length: this.length
        };
    }
}
LocalLengthBlock.NAME = "lengthBlock";
const typeStore = {};
class BaseBlock extends LocalBaseBlock {
    constructor({ name = EMPTY_STRING, optional = false, primitiveSchema, ...parameters } = {}, valueBlockType){
        super(parameters);
        this.name = name;
        this.optional = optional;
        if (primitiveSchema) {
            this.primitiveSchema = primitiveSchema;
        }
        this.idBlock = new LocalIdentificationBlock(parameters);
        this.lenBlock = new LocalLengthBlock(parameters);
        this.valueBlock = valueBlockType ? new valueBlockType(parameters) : new ValueBlock(parameters);
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
        if (resultOffset === -1) {
            this.error = this.valueBlock.error;
            return resultOffset;
        }
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
        return resultOffset;
    }
    toBER(sizeOnly, writer) {
        const _writer = writer || new ViewWriter();
        if (!writer) {
            prepareIndefiniteForm(this);
        }
        const idBlockBuf = this.idBlock.toBER(sizeOnly);
        _writer.write(idBlockBuf);
        if (this.lenBlock.isIndefiniteForm) {
            _writer.write(new Uint8Array([
                0x80
            ]).buffer);
            this.valueBlock.toBER(sizeOnly, _writer);
            _writer.write(new ArrayBuffer(2));
        } else {
            const valueBlockBuf = this.valueBlock.toBER(sizeOnly);
            this.lenBlock.length = valueBlockBuf.byteLength;
            const lenBlockBuf = this.lenBlock.toBER(sizeOnly);
            _writer.write(lenBlockBuf);
            _writer.write(valueBlockBuf);
        }
        if (!writer) {
            return _writer.final();
        }
        return EMPTY_BUFFER;
    }
    toJSON() {
        const object = {
            ...super.toJSON(),
            idBlock: this.idBlock.toJSON(),
            lenBlock: this.lenBlock.toJSON(),
            valueBlock: this.valueBlock.toJSON(),
            name: this.name,
            optional: this.optional
        };
        if (this.primitiveSchema) object.primitiveSchema = this.primitiveSchema.toJSON();
        return object;
    }
    toString(encoding = "ascii") {
        if (encoding === "ascii") {
            return this.onAsciiEncoding();
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(this.toBER());
    }
    onAsciiEncoding() {
        const name = this.constructor.NAME;
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(this.valueBlock.valueBeforeDecodeView);
        return `${name} : ${value}`;
    }
    isEqual(other) {
        if (this === other) {
            return true;
        }
        if (!(other instanceof this.constructor)) {
            return false;
        }
        const thisRaw = this.toBER();
        const otherRaw = other.toBER();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isEqualBuffer"](thisRaw, otherRaw);
    }
}
BaseBlock.NAME = "BaseBlock";
function prepareIndefiniteForm(baseBlock) {
    var _a;
    if (baseBlock instanceof typeStore.Constructed) {
        for (const value of baseBlock.valueBlock.value){
            if (prepareIndefiniteForm(value)) {
                baseBlock.lenBlock.isIndefiniteForm = true;
            }
        }
    }
    return !!((_a = baseBlock.lenBlock) === null || _a === void 0 ? void 0 : _a.isIndefiniteForm);
}
class BaseStringBlock extends BaseBlock {
    getValue() {
        return this.valueBlock.value;
    }
    setValue(value) {
        this.valueBlock.value = value;
    }
    constructor({ value = EMPTY_STRING, ...parameters } = {}, stringValueBlockType){
        super(parameters, stringValueBlockType);
        if (value) {
            this.fromString(value);
        }
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
        if (resultOffset === -1) {
            this.error = this.valueBlock.error;
            return resultOffset;
        }
        this.fromBuffer(this.valueBlock.valueHexView);
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
        return resultOffset;
    }
    onAsciiEncoding() {
        return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
    }
}
BaseStringBlock.NAME = "BaseStringBlock";
class LocalPrimitiveValueBlock extends HexBlock(ValueBlock) {
    constructor({ isHexOnly = true, ...parameters } = {}){
        super(parameters);
        this.isHexOnly = isHexOnly;
    }
}
LocalPrimitiveValueBlock.NAME = "PrimitiveValueBlock";
var _a$w;
class Primitive extends BaseBlock {
    constructor(parameters = {}){
        super(parameters, LocalPrimitiveValueBlock);
        this.idBlock.isConstructed = false;
    }
}
_a$w = Primitive;
(()=>{
    typeStore.Primitive = _a$w;
})();
Primitive.NAME = "PRIMITIVE";
function localChangeType(inputObject, newType) {
    if (inputObject instanceof newType) {
        return inputObject;
    }
    const newObject = new newType();
    newObject.idBlock = inputObject.idBlock;
    newObject.lenBlock = inputObject.lenBlock;
    newObject.warnings = inputObject.warnings;
    newObject.valueBeforeDecodeView = inputObject.valueBeforeDecodeView;
    return newObject;
}
function localFromBER(inputBuffer, inputOffset = 0, inputLength = inputBuffer.length) {
    const incomingOffset = inputOffset;
    let returnObject = new BaseBlock({}, ValueBlock);
    const baseBlock = new LocalBaseBlock();
    if (!checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength)) {
        returnObject.error = baseBlock.error;
        return {
            offset: -1,
            result: returnObject
        };
    }
    const intBuffer = inputBuffer.subarray(inputOffset, inputOffset + inputLength);
    if (!intBuffer.length) {
        returnObject.error = "Zero buffer length";
        return {
            offset: -1,
            result: returnObject
        };
    }
    let resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
    if (returnObject.idBlock.warnings.length) {
        returnObject.warnings.concat(returnObject.idBlock.warnings);
    }
    if (resultOffset === -1) {
        returnObject.error = returnObject.idBlock.error;
        return {
            offset: -1,
            result: returnObject
        };
    }
    inputOffset = resultOffset;
    inputLength -= returnObject.idBlock.blockLength;
    resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
    if (returnObject.lenBlock.warnings.length) {
        returnObject.warnings.concat(returnObject.lenBlock.warnings);
    }
    if (resultOffset === -1) {
        returnObject.error = returnObject.lenBlock.error;
        return {
            offset: -1,
            result: returnObject
        };
    }
    inputOffset = resultOffset;
    inputLength -= returnObject.lenBlock.blockLength;
    if (!returnObject.idBlock.isConstructed && returnObject.lenBlock.isIndefiniteForm) {
        returnObject.error = "Indefinite length form used for primitive encoding form";
        return {
            offset: -1,
            result: returnObject
        };
    }
    let newASN1Type = BaseBlock;
    switch(returnObject.idBlock.tagClass){
        case 1:
            if (returnObject.idBlock.tagNumber >= 37 && returnObject.idBlock.isHexOnly === false) {
                returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
                return {
                    offset: -1,
                    result: returnObject
                };
            }
            switch(returnObject.idBlock.tagNumber){
                case 0:
                    if (returnObject.idBlock.isConstructed && returnObject.lenBlock.length > 0) {
                        returnObject.error = "Type [UNIVERSAL 0] is reserved";
                        return {
                            offset: -1,
                            result: returnObject
                        };
                    }
                    newASN1Type = typeStore.EndOfContent;
                    break;
                case 1:
                    newASN1Type = typeStore.Boolean;
                    break;
                case 2:
                    newASN1Type = typeStore.Integer;
                    break;
                case 3:
                    newASN1Type = typeStore.BitString;
                    break;
                case 4:
                    newASN1Type = typeStore.OctetString;
                    break;
                case 5:
                    newASN1Type = typeStore.Null;
                    break;
                case 6:
                    newASN1Type = typeStore.ObjectIdentifier;
                    break;
                case 10:
                    newASN1Type = typeStore.Enumerated;
                    break;
                case 12:
                    newASN1Type = typeStore.Utf8String;
                    break;
                case 13:
                    newASN1Type = typeStore.RelativeObjectIdentifier;
                    break;
                case 14:
                    newASN1Type = typeStore.TIME;
                    break;
                case 15:
                    returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
                    return {
                        offset: -1,
                        result: returnObject
                    };
                case 16:
                    newASN1Type = typeStore.Sequence;
                    break;
                case 17:
                    newASN1Type = typeStore.Set;
                    break;
                case 18:
                    newASN1Type = typeStore.NumericString;
                    break;
                case 19:
                    newASN1Type = typeStore.PrintableString;
                    break;
                case 20:
                    newASN1Type = typeStore.TeletexString;
                    break;
                case 21:
                    newASN1Type = typeStore.VideotexString;
                    break;
                case 22:
                    newASN1Type = typeStore.IA5String;
                    break;
                case 23:
                    newASN1Type = typeStore.UTCTime;
                    break;
                case 24:
                    newASN1Type = typeStore.GeneralizedTime;
                    break;
                case 25:
                    newASN1Type = typeStore.GraphicString;
                    break;
                case 26:
                    newASN1Type = typeStore.VisibleString;
                    break;
                case 27:
                    newASN1Type = typeStore.GeneralString;
                    break;
                case 28:
                    newASN1Type = typeStore.UniversalString;
                    break;
                case 29:
                    newASN1Type = typeStore.CharacterString;
                    break;
                case 30:
                    newASN1Type = typeStore.BmpString;
                    break;
                case 31:
                    newASN1Type = typeStore.DATE;
                    break;
                case 32:
                    newASN1Type = typeStore.TimeOfDay;
                    break;
                case 33:
                    newASN1Type = typeStore.DateTime;
                    break;
                case 34:
                    newASN1Type = typeStore.Duration;
                    break;
                default:
                    {
                        const newObject = returnObject.idBlock.isConstructed ? new typeStore.Constructed() : new typeStore.Primitive();
                        newObject.idBlock = returnObject.idBlock;
                        newObject.lenBlock = returnObject.lenBlock;
                        newObject.warnings = returnObject.warnings;
                        returnObject = newObject;
                    }
            }
            break;
        case 2:
        case 3:
        case 4:
        default:
            {
                newASN1Type = returnObject.idBlock.isConstructed ? typeStore.Constructed : typeStore.Primitive;
            }
    }
    returnObject = localChangeType(returnObject, newASN1Type);
    resultOffset = returnObject.fromBER(inputBuffer, inputOffset, returnObject.lenBlock.isIndefiniteForm ? inputLength : returnObject.lenBlock.length);
    returnObject.valueBeforeDecodeView = inputBuffer.subarray(incomingOffset, incomingOffset + returnObject.blockLength);
    return {
        offset: resultOffset,
        result: returnObject
    };
}
function fromBER(inputBuffer) {
    if (!inputBuffer.byteLength) {
        const result = new BaseBlock({}, ValueBlock);
        result.error = "Input buffer has zero length";
        return {
            offset: -1,
            result
        };
    }
    return localFromBER(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer).slice(), 0, inputBuffer.byteLength);
}
function checkLen(indefiniteLength, length) {
    if (indefiniteLength) {
        return 1;
    }
    return length;
}
class LocalConstructedValueBlock extends ValueBlock {
    constructor({ value = [], isIndefiniteForm = false, ...parameters } = {}){
        super(parameters);
        this.value = value;
        this.isIndefiniteForm = isIndefiniteForm;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const view = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        if (!checkBufferParams(this, view, inputOffset, inputLength)) {
            return -1;
        }
        this.valueBeforeDecodeView = view.subarray(inputOffset, inputOffset + inputLength);
        if (this.valueBeforeDecodeView.length === 0) {
            this.warnings.push("Zero buffer length");
            return inputOffset;
        }
        let currentOffset = inputOffset;
        while(checkLen(this.isIndefiniteForm, inputLength) > 0){
            const returnObject = localFromBER(view, currentOffset, inputLength);
            if (returnObject.offset === -1) {
                this.error = returnObject.result.error;
                this.warnings.concat(returnObject.result.warnings);
                return -1;
            }
            currentOffset = returnObject.offset;
            this.blockLength += returnObject.result.blockLength;
            inputLength -= returnObject.result.blockLength;
            this.value.push(returnObject.result);
            if (this.isIndefiniteForm && returnObject.result.constructor.NAME === END_OF_CONTENT_NAME) {
                break;
            }
        }
        if (this.isIndefiniteForm) {
            if (this.value[this.value.length - 1].constructor.NAME === END_OF_CONTENT_NAME) {
                this.value.pop();
            } else {
                this.warnings.push("No EndOfContent block encoded");
            }
        }
        return currentOffset;
    }
    toBER(sizeOnly, writer) {
        const _writer = writer || new ViewWriter();
        for(let i = 0; i < this.value.length; i++){
            this.value[i].toBER(sizeOnly, _writer);
        }
        if (!writer) {
            return _writer.final();
        }
        return EMPTY_BUFFER;
    }
    toJSON() {
        const object = {
            ...super.toJSON(),
            isIndefiniteForm: this.isIndefiniteForm,
            value: []
        };
        for (const value of this.value){
            object.value.push(value.toJSON());
        }
        return object;
    }
}
LocalConstructedValueBlock.NAME = "ConstructedValueBlock";
var _a$v;
class Constructed extends BaseBlock {
    constructor(parameters = {}){
        super(parameters, LocalConstructedValueBlock);
        this.idBlock.isConstructed = true;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
        const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
        if (resultOffset === -1) {
            this.error = this.valueBlock.error;
            return resultOffset;
        }
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
        return resultOffset;
    }
    onAsciiEncoding() {
        const values = [];
        for (const value of this.valueBlock.value){
            values.push(value.toString("ascii").split("\n").map((o)=>`  ${o}`).join("\n"));
        }
        const blockName = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
        return values.length ? `${blockName} :\n${values.join("\n")}` : `${blockName} :`;
    }
}
_a$v = Constructed;
(()=>{
    typeStore.Constructed = _a$v;
})();
Constructed.NAME = "CONSTRUCTED";
class LocalEndOfContentValueBlock extends ValueBlock {
    fromBER(inputBuffer, inputOffset, _inputLength) {
        return inputOffset;
    }
    toBER(_sizeOnly) {
        return EMPTY_BUFFER;
    }
}
LocalEndOfContentValueBlock.override = "EndOfContentValueBlock";
var _a$u;
class EndOfContent extends BaseBlock {
    constructor(parameters = {}){
        super(parameters, LocalEndOfContentValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 0;
    }
}
_a$u = EndOfContent;
(()=>{
    typeStore.EndOfContent = _a$u;
})();
EndOfContent.NAME = END_OF_CONTENT_NAME;
var _a$t;
class Null extends BaseBlock {
    constructor(parameters = {}){
        super(parameters, ValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 5;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        if (this.lenBlock.length > 0) this.warnings.push("Non-zero length of value block for Null type");
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        this.blockLength += inputLength;
        if (inputOffset + inputLength > inputBuffer.byteLength) {
            this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
            return -1;
        }
        return inputOffset + inputLength;
    }
    toBER(sizeOnly, writer) {
        const retBuf = new ArrayBuffer(2);
        if (!sizeOnly) {
            const retView = new Uint8Array(retBuf);
            retView[0] = 0x05;
            retView[1] = 0x00;
        }
        if (writer) {
            writer.write(retBuf);
        }
        return retBuf;
    }
    onAsciiEncoding() {
        return `${this.constructor.NAME}`;
    }
}
_a$t = Null;
(()=>{
    typeStore.Null = _a$t;
})();
Null.NAME = "NULL";
class LocalBooleanValueBlock extends HexBlock(ValueBlock) {
    get value() {
        for (const octet of this.valueHexView){
            if (octet > 0) {
                return true;
            }
        }
        return false;
    }
    set value(value) {
        this.valueHexView[0] = value ? 0xFF : 0x00;
    }
    constructor({ value, ...parameters } = {}){
        super(parameters);
        if (parameters.valueHex) {
            this.valueHexView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(parameters.valueHex);
        } else {
            this.valueHexView = new Uint8Array(1);
        }
        if (value) {
            this.value = value;
        }
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const inputView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
            return -1;
        }
        this.valueHexView = inputView.subarray(inputOffset, inputOffset + inputLength);
        if (inputLength > 1) this.warnings.push("Boolean value encoded in more then 1 octet");
        this.isHexOnly = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilDecodeTC"].call(this);
        this.blockLength = inputLength;
        return inputOffset + inputLength;
    }
    toBER() {
        return this.valueHexView.slice();
    }
    toJSON() {
        return {
            ...super.toJSON(),
            value: this.value
        };
    }
}
LocalBooleanValueBlock.NAME = "BooleanValueBlock";
var _a$s;
class Boolean extends BaseBlock {
    getValue() {
        return this.valueBlock.value;
    }
    setValue(value) {
        this.valueBlock.value = value;
    }
    constructor(parameters = {}){
        super(parameters, LocalBooleanValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 1;
    }
    onAsciiEncoding() {
        return `${this.constructor.NAME} : ${this.getValue}`;
    }
}
_a$s = Boolean;
(()=>{
    typeStore.Boolean = _a$s;
})();
Boolean.NAME = "BOOLEAN";
class LocalOctetStringValueBlock extends HexBlock(LocalConstructedValueBlock) {
    constructor({ isConstructed = false, ...parameters } = {}){
        super(parameters);
        this.isConstructed = isConstructed;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        let resultOffset = 0;
        if (this.isConstructed) {
            this.isHexOnly = false;
            resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
            if (resultOffset === -1) return resultOffset;
            for(let i = 0; i < this.value.length; i++){
                const currentBlockName = this.value[i].constructor.NAME;
                if (currentBlockName === END_OF_CONTENT_NAME) {
                    if (this.isIndefiniteForm) break;
                    else {
                        this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
                        return -1;
                    }
                }
                if (currentBlockName !== OCTET_STRING_NAME) {
                    this.error = "OCTET STRING may consists of OCTET STRINGs only";
                    return -1;
                }
            }
        } else {
            this.isHexOnly = true;
            resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
            this.blockLength = inputLength;
        }
        return resultOffset;
    }
    toBER(sizeOnly, writer) {
        if (this.isConstructed) return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
        return sizeOnly ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            isConstructed: this.isConstructed
        };
    }
}
LocalOctetStringValueBlock.NAME = "OctetStringValueBlock";
var _a$r;
class OctetString extends BaseBlock {
    constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}){
        var _b, _c;
        (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
        super({
            idBlock: {
                isConstructed: parameters.isConstructed,
                ...idBlock
            },
            lenBlock: {
                ...lenBlock,
                isIndefiniteForm: !!parameters.isIndefiniteForm
            },
            ...parameters
        }, LocalOctetStringValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 4;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        this.valueBlock.isConstructed = this.idBlock.isConstructed;
        this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
        if (inputLength === 0) {
            if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;
            if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;
            return inputOffset;
        }
        if (!this.valueBlock.isConstructed) {
            const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
            const buf = view.subarray(inputOffset, inputOffset + inputLength);
            try {
                if (buf.byteLength) {
                    const asn = localFromBER(buf, 0, buf.byteLength);
                    if (asn.offset !== -1 && asn.offset === inputLength) {
                        this.valueBlock.value = [
                            asn.result
                        ];
                    }
                }
            } catch  {}
        }
        return super.fromBER(inputBuffer, inputOffset, inputLength);
    }
    onAsciiEncoding() {
        if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
            return Constructed.prototype.onAsciiEncoding.call(this);
        }
        const name = this.constructor.NAME;
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(this.valueBlock.valueHexView);
        return `${name} : ${value}`;
    }
    getValue() {
        if (!this.idBlock.isConstructed) {
            return this.valueBlock.valueHexView.slice().buffer;
        }
        const array = [];
        for (const content of this.valueBlock.value){
            if (content instanceof _a$r) {
                array.push(content.valueBlock.valueHexView);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].concat(array);
    }
}
_a$r = OctetString;
(()=>{
    typeStore.OctetString = _a$r;
})();
OctetString.NAME = OCTET_STRING_NAME;
class LocalBitStringValueBlock extends HexBlock(LocalConstructedValueBlock) {
    constructor({ unusedBits = 0, isConstructed = false, ...parameters } = {}){
        super(parameters);
        this.unusedBits = unusedBits;
        this.isConstructed = isConstructed;
        this.blockLength = this.valueHexView.byteLength;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        if (!inputLength) {
            return inputOffset;
        }
        let resultOffset = -1;
        if (this.isConstructed) {
            resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
            if (resultOffset === -1) return resultOffset;
            for (const value of this.value){
                const currentBlockName = value.constructor.NAME;
                if (currentBlockName === END_OF_CONTENT_NAME) {
                    if (this.isIndefiniteForm) break;
                    else {
                        this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
                        return -1;
                    }
                }
                if (currentBlockName !== BIT_STRING_NAME) {
                    this.error = "BIT STRING may consists of BIT STRINGs only";
                    return -1;
                }
                const valueBlock = value.valueBlock;
                if (this.unusedBits > 0 && valueBlock.unusedBits > 0) {
                    this.error = "Using of \"unused bits\" inside constructive BIT STRING allowed for least one only";
                    return -1;
                }
                this.unusedBits = valueBlock.unusedBits;
            }
            return resultOffset;
        }
        const inputView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
            return -1;
        }
        const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        this.unusedBits = intBuffer[0];
        if (this.unusedBits > 7) {
            this.error = "Unused bits for BitString must be in range 0-7";
            return -1;
        }
        if (!this.unusedBits) {
            const buf = intBuffer.subarray(1);
            try {
                if (buf.byteLength) {
                    const asn = localFromBER(buf, 0, buf.byteLength);
                    if (asn.offset !== -1 && asn.offset === inputLength - 1) {
                        this.value = [
                            asn.result
                        ];
                    }
                }
            } catch  {}
        }
        this.valueHexView = intBuffer.subarray(1);
        this.blockLength = intBuffer.length;
        return inputOffset + inputLength;
    }
    toBER(sizeOnly, writer) {
        if (this.isConstructed) {
            return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
        }
        if (sizeOnly) {
            return new ArrayBuffer(this.valueHexView.byteLength + 1);
        }
        if (!this.valueHexView.byteLength) {
            const empty = new Uint8Array(1);
            empty[0] = 0;
            return empty.buffer;
        }
        const retView = new Uint8Array(this.valueHexView.length + 1);
        retView[0] = this.unusedBits;
        retView.set(this.valueHexView, 1);
        return retView.buffer;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            unusedBits: this.unusedBits,
            isConstructed: this.isConstructed
        };
    }
}
LocalBitStringValueBlock.NAME = "BitStringValueBlock";
var _a$q;
class BitString extends BaseBlock {
    constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}){
        var _b, _c;
        (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
        super({
            idBlock: {
                isConstructed: parameters.isConstructed,
                ...idBlock
            },
            lenBlock: {
                ...lenBlock,
                isIndefiniteForm: !!parameters.isIndefiniteForm
            },
            ...parameters
        }, LocalBitStringValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 3;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        this.valueBlock.isConstructed = this.idBlock.isConstructed;
        this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
        return super.fromBER(inputBuffer, inputOffset, inputLength);
    }
    onAsciiEncoding() {
        if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
            return Constructed.prototype.onAsciiEncoding.call(this);
        } else {
            const bits = [];
            const valueHex = this.valueBlock.valueHexView;
            for (const byte of valueHex){
                bits.push(byte.toString(2).padStart(8, "0"));
            }
            const bitsStr = bits.join("");
            const name = this.constructor.NAME;
            const value = bitsStr.substring(0, bitsStr.length - this.valueBlock.unusedBits);
            return `${name} : ${value}`;
        }
    }
}
_a$q = BitString;
(()=>{
    typeStore.BitString = _a$q;
})();
BitString.NAME = BIT_STRING_NAME;
var _a$p;
function viewAdd(first, second) {
    const c = new Uint8Array([
        0
    ]);
    const firstView = new Uint8Array(first);
    const secondView = new Uint8Array(second);
    let firstViewCopy = firstView.slice(0);
    const firstViewCopyLength = firstViewCopy.length - 1;
    const secondViewCopy = secondView.slice(0);
    const secondViewCopyLength = secondViewCopy.length - 1;
    let value = 0;
    const max = secondViewCopyLength < firstViewCopyLength ? firstViewCopyLength : secondViewCopyLength;
    let counter = 0;
    for(let i = max; i >= 0; i--, counter++){
        switch(true){
            case counter < secondViewCopy.length:
                value = firstViewCopy[firstViewCopyLength - counter] + secondViewCopy[secondViewCopyLength - counter] + c[0];
                break;
            default:
                value = firstViewCopy[firstViewCopyLength - counter] + c[0];
        }
        c[0] = value / 10;
        switch(true){
            case counter >= firstViewCopy.length:
                firstViewCopy = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilConcatView"](new Uint8Array([
                    value % 10
                ]), firstViewCopy);
                break;
            default:
                firstViewCopy[firstViewCopyLength - counter] = value % 10;
        }
    }
    if (c[0] > 0) firstViewCopy = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilConcatView"](c, firstViewCopy);
    return firstViewCopy;
}
function power2(n) {
    if (n >= powers2.length) {
        for(let p = powers2.length; p <= n; p++){
            const c = new Uint8Array([
                0
            ]);
            let digits = powers2[p - 1].slice(0);
            for(let i = digits.length - 1; i >= 0; i--){
                const newValue = new Uint8Array([
                    (digits[i] << 1) + c[0]
                ]);
                c[0] = newValue[0] / 10;
                digits[i] = newValue[0] % 10;
            }
            if (c[0] > 0) digits = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilConcatView"](c, digits);
            powers2.push(digits);
        }
    }
    return powers2[n];
}
function viewSub(first, second) {
    let b = 0;
    const firstView = new Uint8Array(first);
    const secondView = new Uint8Array(second);
    const firstViewCopy = firstView.slice(0);
    const firstViewCopyLength = firstViewCopy.length - 1;
    const secondViewCopy = secondView.slice(0);
    const secondViewCopyLength = secondViewCopy.length - 1;
    let value;
    let counter = 0;
    for(let i = secondViewCopyLength; i >= 0; i--, counter++){
        value = firstViewCopy[firstViewCopyLength - counter] - secondViewCopy[secondViewCopyLength - counter] - b;
        switch(true){
            case value < 0:
                b = 1;
                firstViewCopy[firstViewCopyLength - counter] = value + 10;
                break;
            default:
                b = 0;
                firstViewCopy[firstViewCopyLength - counter] = value;
        }
    }
    if (b > 0) {
        for(let i = firstViewCopyLength - secondViewCopyLength + 1; i >= 0; i--, counter++){
            value = firstViewCopy[firstViewCopyLength - counter] - b;
            if (value < 0) {
                b = 1;
                firstViewCopy[firstViewCopyLength - counter] = value + 10;
            } else {
                b = 0;
                firstViewCopy[firstViewCopyLength - counter] = value;
                break;
            }
        }
    }
    return firstViewCopy.slice();
}
class LocalIntegerValueBlock extends HexBlock(ValueBlock) {
    setValueHex() {
        if (this.valueHexView.length >= 4) {
            this.warnings.push("Too big Integer for decoding, hex only");
            this.isHexOnly = true;
            this._valueDec = 0;
        } else {
            this.isHexOnly = false;
            if (this.valueHexView.length > 0) {
                this._valueDec = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilDecodeTC"].call(this);
            }
        }
    }
    constructor({ value, ...parameters } = {}){
        super(parameters);
        this._valueDec = 0;
        if (parameters.valueHex) {
            this.setValueHex();
        }
        if (value !== undefined) {
            this.valueDec = value;
        }
    }
    set valueDec(v) {
        this._valueDec = v;
        this.isHexOnly = false;
        this.valueHexView = new Uint8Array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilEncodeTC"](v));
    }
    get valueDec() {
        return this._valueDec;
    }
    fromDER(inputBuffer, inputOffset, inputLength, expectedLength = 0) {
        const offset = this.fromBER(inputBuffer, inputOffset, inputLength);
        if (offset === -1) return offset;
        const view = this.valueHexView;
        if (view[0] === 0x00 && (view[1] & 0x80) !== 0) {
            this.valueHexView = view.subarray(1);
        } else {
            if (expectedLength !== 0) {
                if (view.length < expectedLength) {
                    if (expectedLength - view.length > 1) expectedLength = view.length + 1;
                    this.valueHexView = view.subarray(expectedLength - view.length);
                }
            }
        }
        return offset;
    }
    toDER(sizeOnly = false) {
        const view = this.valueHexView;
        switch(true){
            case (view[0] & 0x80) !== 0:
                {
                    const updatedView = new Uint8Array(this.valueHexView.length + 1);
                    updatedView[0] = 0x00;
                    updatedView.set(view, 1);
                    this.valueHexView = updatedView;
                }
                break;
            case view[0] === 0x00 && (view[1] & 0x80) === 0:
                {
                    this.valueHexView = this.valueHexView.subarray(1);
                }
                break;
        }
        return this.toBER(sizeOnly);
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
        if (resultOffset === -1) {
            return resultOffset;
        }
        this.setValueHex();
        return resultOffset;
    }
    toBER(sizeOnly) {
        return sizeOnly ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            valueDec: this.valueDec
        };
    }
    toString() {
        const firstBit = this.valueHexView.length * 8 - 1;
        let digits = new Uint8Array(this.valueHexView.length * 8 / 3);
        let bitNumber = 0;
        let currentByte;
        const asn1View = this.valueHexView;
        let result = "";
        let flag = false;
        for(let byteNumber = asn1View.byteLength - 1; byteNumber >= 0; byteNumber--){
            currentByte = asn1View[byteNumber];
            for(let i = 0; i < 8; i++){
                if ((currentByte & 1) === 1) {
                    switch(bitNumber){
                        case firstBit:
                            digits = viewSub(power2(bitNumber), digits);
                            result = "-";
                            break;
                        default:
                            digits = viewAdd(digits, power2(bitNumber));
                    }
                }
                bitNumber++;
                currentByte >>= 1;
            }
        }
        for(let i = 0; i < digits.length; i++){
            if (digits[i]) flag = true;
            if (flag) result += digitsString.charAt(digits[i]);
        }
        if (flag === false) result += digitsString.charAt(0);
        return result;
    }
}
_a$p = LocalIntegerValueBlock;
LocalIntegerValueBlock.NAME = "IntegerValueBlock";
(()=>{
    Object.defineProperty(_a$p.prototype, "valueHex", {
        set: function(v) {
            this.valueHexView = new Uint8Array(v);
            this.setValueHex();
        },
        get: function() {
            return this.valueHexView.slice().buffer;
        }
    });
})();
var _a$o;
class Integer extends BaseBlock {
    constructor(parameters = {}){
        super(parameters, LocalIntegerValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 2;
    }
    toBigInt() {
        assertBigInt();
        return BigInt(this.valueBlock.toString());
    }
    static fromBigInt(value) {
        assertBigInt();
        const bigIntValue = BigInt(value);
        const writer = new ViewWriter();
        const hex = bigIntValue.toString(16).replace(/^-/, "");
        const view = new Uint8Array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].FromHex(hex));
        if (bigIntValue < 0) {
            const first = new Uint8Array(view.length + (view[0] & 0x80 ? 1 : 0));
            first[0] |= 0x80;
            const firstInt = BigInt(`0x${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(first)}`);
            const secondInt = firstInt + bigIntValue;
            const second = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].FromHex(secondInt.toString(16)));
            second[0] |= 0x80;
            writer.write(second);
        } else {
            if (view[0] & 0x80) {
                writer.write(new Uint8Array([
                    0
                ]));
            }
            writer.write(view);
        }
        const res = new _a$o({
            valueHex: writer.final()
        });
        return res;
    }
    convertToDER() {
        const integer = new _a$o({
            valueHex: this.valueBlock.valueHexView
        });
        integer.valueBlock.toDER();
        return integer;
    }
    convertFromDER() {
        return new _a$o({
            valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView
        });
    }
    onAsciiEncoding() {
        return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
    }
}
_a$o = Integer;
(()=>{
    typeStore.Integer = _a$o;
})();
Integer.NAME = "INTEGER";
var _a$n;
class Enumerated extends Integer {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 10;
    }
}
_a$n = Enumerated;
(()=>{
    typeStore.Enumerated = _a$n;
})();
Enumerated.NAME = "ENUMERATED";
class LocalSidValueBlock extends HexBlock(ValueBlock) {
    constructor({ valueDec = -1, isFirstSid = false, ...parameters } = {}){
        super(parameters);
        this.valueDec = valueDec;
        this.isFirstSid = isFirstSid;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        if (!inputLength) {
            return inputOffset;
        }
        const inputView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
            return -1;
        }
        const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        this.valueHexView = new Uint8Array(inputLength);
        for(let i = 0; i < inputLength; i++){
            this.valueHexView[i] = intBuffer[i] & 0x7F;
            this.blockLength++;
            if ((intBuffer[i] & 0x80) === 0x00) break;
        }
        const tempView = new Uint8Array(this.blockLength);
        for(let i = 0; i < this.blockLength; i++){
            tempView[i] = this.valueHexView[i];
        }
        this.valueHexView = tempView;
        if ((intBuffer[this.blockLength - 1] & 0x80) !== 0x00) {
            this.error = "End of input reached before message was fully decoded";
            return -1;
        }
        if (this.valueHexView[0] === 0x00) this.warnings.push("Needlessly long format of SID encoding");
        if (this.blockLength <= 8) this.valueDec = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilFromBase"](this.valueHexView, 7);
        else {
            this.isHexOnly = true;
            this.warnings.push("Too big SID for decoding, hex only");
        }
        return inputOffset + this.blockLength;
    }
    set valueBigInt(value) {
        assertBigInt();
        let bits = BigInt(value).toString(2);
        while(bits.length % 7){
            bits = "0" + bits;
        }
        const bytes = new Uint8Array(bits.length / 7);
        for(let i = 0; i < bytes.length; i++){
            bytes[i] = parseInt(bits.slice(i * 7, i * 7 + 7), 2) + (i + 1 < bytes.length ? 0x80 : 0);
        }
        this.fromBER(bytes.buffer, 0, bytes.length);
    }
    toBER(sizeOnly) {
        if (this.isHexOnly) {
            if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength);
            const curView = this.valueHexView;
            const retView = new Uint8Array(this.blockLength);
            for(let i = 0; i < this.blockLength - 1; i++)retView[i] = curView[i] | 0x80;
            retView[this.blockLength - 1] = curView[this.blockLength - 1];
            return retView.buffer;
        }
        const encodedBuf = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilToBase"](this.valueDec, 7);
        if (encodedBuf.byteLength === 0) {
            this.error = "Error during encoding SID value";
            return EMPTY_BUFFER;
        }
        const retView = new Uint8Array(encodedBuf.byteLength);
        if (!sizeOnly) {
            const encodedView = new Uint8Array(encodedBuf);
            const len = encodedBuf.byteLength - 1;
            for(let i = 0; i < len; i++)retView[i] = encodedView[i] | 0x80;
            retView[len] = encodedView[len];
        }
        return retView;
    }
    toString() {
        let result = "";
        if (this.isHexOnly) result = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(this.valueHexView);
        else {
            if (this.isFirstSid) {
                let sidValue = this.valueDec;
                if (this.valueDec <= 39) result = "0.";
                else {
                    if (this.valueDec <= 79) {
                        result = "1.";
                        sidValue -= 40;
                    } else {
                        result = "2.";
                        sidValue -= 80;
                    }
                }
                result += sidValue.toString();
            } else result = this.valueDec.toString();
        }
        return result;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            valueDec: this.valueDec,
            isFirstSid: this.isFirstSid
        };
    }
}
LocalSidValueBlock.NAME = "sidBlock";
class LocalObjectIdentifierValueBlock extends ValueBlock {
    constructor({ value = EMPTY_STRING, ...parameters } = {}){
        super(parameters);
        this.value = [];
        if (value) {
            this.fromString(value);
        }
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        let resultOffset = inputOffset;
        while(inputLength > 0){
            const sidBlock = new LocalSidValueBlock();
            resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
            if (resultOffset === -1) {
                this.blockLength = 0;
                this.error = sidBlock.error;
                return resultOffset;
            }
            if (this.value.length === 0) sidBlock.isFirstSid = true;
            this.blockLength += sidBlock.blockLength;
            inputLength -= sidBlock.blockLength;
            this.value.push(sidBlock);
        }
        return resultOffset;
    }
    toBER(sizeOnly) {
        const retBuffers = [];
        for(let i = 0; i < this.value.length; i++){
            const valueBuf = this.value[i].toBER(sizeOnly);
            if (valueBuf.byteLength === 0) {
                this.error = this.value[i].error;
                return EMPTY_BUFFER;
            }
            retBuffers.push(valueBuf);
        }
        return concat(retBuffers);
    }
    fromString(string) {
        this.value = [];
        let pos1 = 0;
        let pos2 = 0;
        let sid = "";
        let flag = false;
        do {
            pos2 = string.indexOf(".", pos1);
            if (pos2 === -1) sid = string.substring(pos1);
            else sid = string.substring(pos1, pos2);
            pos1 = pos2 + 1;
            if (flag) {
                const sidBlock = this.value[0];
                let plus = 0;
                switch(sidBlock.valueDec){
                    case 0:
                        break;
                    case 1:
                        plus = 40;
                        break;
                    case 2:
                        plus = 80;
                        break;
                    default:
                        this.value = [];
                        return;
                }
                const parsedSID = parseInt(sid, 10);
                if (isNaN(parsedSID)) return;
                sidBlock.valueDec = parsedSID + plus;
                flag = false;
            } else {
                const sidBlock = new LocalSidValueBlock();
                if (sid > Number.MAX_SAFE_INTEGER) {
                    assertBigInt();
                    const sidValue = BigInt(sid);
                    sidBlock.valueBigInt = sidValue;
                } else {
                    sidBlock.valueDec = parseInt(sid, 10);
                    if (isNaN(sidBlock.valueDec)) return;
                }
                if (!this.value.length) {
                    sidBlock.isFirstSid = true;
                    flag = true;
                }
                this.value.push(sidBlock);
            }
        }while (pos2 !== -1)
    }
    toString() {
        let result = "";
        let isHexOnly = false;
        for(let i = 0; i < this.value.length; i++){
            isHexOnly = this.value[i].isHexOnly;
            let sidStr = this.value[i].toString();
            if (i !== 0) result = `${result}.`;
            if (isHexOnly) {
                sidStr = `{${sidStr}}`;
                if (this.value[i].isFirstSid) result = `2.{${sidStr} - 80}`;
                else result += sidStr;
            } else result += sidStr;
        }
        return result;
    }
    toJSON() {
        const object = {
            ...super.toJSON(),
            value: this.toString(),
            sidArray: []
        };
        for(let i = 0; i < this.value.length; i++){
            object.sidArray.push(this.value[i].toJSON());
        }
        return object;
    }
}
LocalObjectIdentifierValueBlock.NAME = "ObjectIdentifierValueBlock";
var _a$m;
class ObjectIdentifier extends BaseBlock {
    getValue() {
        return this.valueBlock.toString();
    }
    setValue(value) {
        this.valueBlock.fromString(value);
    }
    constructor(parameters = {}){
        super(parameters, LocalObjectIdentifierValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 6;
    }
    onAsciiEncoding() {
        return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            value: this.getValue()
        };
    }
}
_a$m = ObjectIdentifier;
(()=>{
    typeStore.ObjectIdentifier = _a$m;
})();
ObjectIdentifier.NAME = "OBJECT IDENTIFIER";
class LocalRelativeSidValueBlock extends HexBlock(LocalBaseBlock) {
    constructor({ valueDec = 0, ...parameters } = {}){
        super(parameters);
        this.valueDec = valueDec;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        if (inputLength === 0) return inputOffset;
        const inputView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) return -1;
        const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        this.valueHexView = new Uint8Array(inputLength);
        for(let i = 0; i < inputLength; i++){
            this.valueHexView[i] = intBuffer[i] & 0x7F;
            this.blockLength++;
            if ((intBuffer[i] & 0x80) === 0x00) break;
        }
        const tempView = new Uint8Array(this.blockLength);
        for(let i = 0; i < this.blockLength; i++)tempView[i] = this.valueHexView[i];
        this.valueHexView = tempView;
        if ((intBuffer[this.blockLength - 1] & 0x80) !== 0x00) {
            this.error = "End of input reached before message was fully decoded";
            return -1;
        }
        if (this.valueHexView[0] === 0x00) this.warnings.push("Needlessly long format of SID encoding");
        if (this.blockLength <= 8) this.valueDec = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilFromBase"](this.valueHexView, 7);
        else {
            this.isHexOnly = true;
            this.warnings.push("Too big SID for decoding, hex only");
        }
        return inputOffset + this.blockLength;
    }
    toBER(sizeOnly) {
        if (this.isHexOnly) {
            if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength);
            const curView = this.valueHexView;
            const retView = new Uint8Array(this.blockLength);
            for(let i = 0; i < this.blockLength - 1; i++)retView[i] = curView[i] | 0x80;
            retView[this.blockLength - 1] = curView[this.blockLength - 1];
            return retView.buffer;
        }
        const encodedBuf = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilToBase"](this.valueDec, 7);
        if (encodedBuf.byteLength === 0) {
            this.error = "Error during encoding SID value";
            return EMPTY_BUFFER;
        }
        const retView = new Uint8Array(encodedBuf.byteLength);
        if (!sizeOnly) {
            const encodedView = new Uint8Array(encodedBuf);
            const len = encodedBuf.byteLength - 1;
            for(let i = 0; i < len; i++)retView[i] = encodedView[i] | 0x80;
            retView[len] = encodedView[len];
        }
        return retView.buffer;
    }
    toString() {
        let result = "";
        if (this.isHexOnly) result = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToHex(this.valueHexView);
        else {
            result = this.valueDec.toString();
        }
        return result;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            valueDec: this.valueDec
        };
    }
}
LocalRelativeSidValueBlock.NAME = "relativeSidBlock";
class LocalRelativeObjectIdentifierValueBlock extends ValueBlock {
    constructor({ value = EMPTY_STRING, ...parameters } = {}){
        super(parameters);
        this.value = [];
        if (value) {
            this.fromString(value);
        }
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        let resultOffset = inputOffset;
        while(inputLength > 0){
            const sidBlock = new LocalRelativeSidValueBlock();
            resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
            if (resultOffset === -1) {
                this.blockLength = 0;
                this.error = sidBlock.error;
                return resultOffset;
            }
            this.blockLength += sidBlock.blockLength;
            inputLength -= sidBlock.blockLength;
            this.value.push(sidBlock);
        }
        return resultOffset;
    }
    toBER(sizeOnly, _writer) {
        const retBuffers = [];
        for(let i = 0; i < this.value.length; i++){
            const valueBuf = this.value[i].toBER(sizeOnly);
            if (valueBuf.byteLength === 0) {
                this.error = this.value[i].error;
                return EMPTY_BUFFER;
            }
            retBuffers.push(valueBuf);
        }
        return concat(retBuffers);
    }
    fromString(string) {
        this.value = [];
        let pos1 = 0;
        let pos2 = 0;
        let sid = "";
        do {
            pos2 = string.indexOf(".", pos1);
            if (pos2 === -1) sid = string.substring(pos1);
            else sid = string.substring(pos1, pos2);
            pos1 = pos2 + 1;
            const sidBlock = new LocalRelativeSidValueBlock();
            sidBlock.valueDec = parseInt(sid, 10);
            if (isNaN(sidBlock.valueDec)) return true;
            this.value.push(sidBlock);
        }while (pos2 !== -1)
        return true;
    }
    toString() {
        let result = "";
        let isHexOnly = false;
        for(let i = 0; i < this.value.length; i++){
            isHexOnly = this.value[i].isHexOnly;
            let sidStr = this.value[i].toString();
            if (i !== 0) result = `${result}.`;
            if (isHexOnly) {
                sidStr = `{${sidStr}}`;
                result += sidStr;
            } else result += sidStr;
        }
        return result;
    }
    toJSON() {
        const object = {
            ...super.toJSON(),
            value: this.toString(),
            sidArray: []
        };
        for(let i = 0; i < this.value.length; i++)object.sidArray.push(this.value[i].toJSON());
        return object;
    }
}
LocalRelativeObjectIdentifierValueBlock.NAME = "RelativeObjectIdentifierValueBlock";
var _a$l;
class RelativeObjectIdentifier extends BaseBlock {
    getValue() {
        return this.valueBlock.toString();
    }
    setValue(value) {
        this.valueBlock.fromString(value);
    }
    constructor(parameters = {}){
        super(parameters, LocalRelativeObjectIdentifierValueBlock);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 13;
    }
    onAsciiEncoding() {
        return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            value: this.getValue()
        };
    }
}
_a$l = RelativeObjectIdentifier;
(()=>{
    typeStore.RelativeObjectIdentifier = _a$l;
})();
RelativeObjectIdentifier.NAME = "RelativeObjectIdentifier";
var _a$k;
class Sequence extends Constructed {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 16;
    }
}
_a$k = Sequence;
(()=>{
    typeStore.Sequence = _a$k;
})();
Sequence.NAME = "SEQUENCE";
var _a$j;
class Set extends Constructed {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 17;
    }
}
_a$j = Set;
(()=>{
    typeStore.Set = _a$j;
})();
Set.NAME = "SET";
class LocalStringValueBlock extends HexBlock(ValueBlock) {
    constructor({ ...parameters } = {}){
        super(parameters);
        this.isHexOnly = true;
        this.value = EMPTY_STRING;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            value: this.value
        };
    }
}
LocalStringValueBlock.NAME = "StringValueBlock";
class LocalSimpleStringValueBlock extends LocalStringValueBlock {
}
LocalSimpleStringValueBlock.NAME = "SimpleStringValueBlock";
class LocalSimpleStringBlock extends BaseStringBlock {
    constructor({ ...parameters } = {}){
        super(parameters, LocalSimpleStringValueBlock);
    }
    fromBuffer(inputBuffer) {
        this.valueBlock.value = String.fromCharCode.apply(null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer));
    }
    fromString(inputString) {
        const strLen = inputString.length;
        const view = this.valueBlock.valueHexView = new Uint8Array(strLen);
        for(let i = 0; i < strLen; i++)view[i] = inputString.charCodeAt(i);
        this.valueBlock.value = inputString;
    }
}
LocalSimpleStringBlock.NAME = "SIMPLE STRING";
class LocalUtf8StringValueBlock extends LocalSimpleStringBlock {
    fromBuffer(inputBuffer) {
        this.valueBlock.valueHexView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
        try {
            this.valueBlock.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToUtf8String(inputBuffer);
        } catch (ex) {
            this.warnings.push(`Error during "decodeURIComponent": ${ex}, using raw string`);
            this.valueBlock.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToBinary(inputBuffer);
        }
    }
    fromString(inputString) {
        this.valueBlock.valueHexView = new Uint8Array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].FromUtf8String(inputString));
        this.valueBlock.value = inputString;
    }
}
LocalUtf8StringValueBlock.NAME = "Utf8StringValueBlock";
var _a$i;
class Utf8String extends LocalUtf8StringValueBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 12;
    }
}
_a$i = Utf8String;
(()=>{
    typeStore.Utf8String = _a$i;
})();
Utf8String.NAME = "UTF8String";
class LocalBmpStringValueBlock extends LocalSimpleStringBlock {
    fromBuffer(inputBuffer) {
        this.valueBlock.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].ToUtf16String(inputBuffer);
        this.valueBlock.valueHexView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer);
    }
    fromString(inputString) {
        this.valueBlock.value = inputString;
        this.valueBlock.valueHexView = new Uint8Array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Convert"].FromUtf16String(inputString));
    }
}
LocalBmpStringValueBlock.NAME = "BmpStringValueBlock";
var _a$h;
class BmpString extends LocalBmpStringValueBlock {
    constructor({ ...parameters } = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 30;
    }
}
_a$h = BmpString;
(()=>{
    typeStore.BmpString = _a$h;
})();
BmpString.NAME = "BMPString";
class LocalUniversalStringValueBlock extends LocalSimpleStringBlock {
    fromBuffer(inputBuffer) {
        const copyBuffer = ArrayBuffer.isView(inputBuffer) ? inputBuffer.slice().buffer : inputBuffer.slice(0);
        const valueView = new Uint8Array(copyBuffer);
        for(let i = 0; i < valueView.length; i += 4){
            valueView[i] = valueView[i + 3];
            valueView[i + 1] = valueView[i + 2];
            valueView[i + 2] = 0x00;
            valueView[i + 3] = 0x00;
        }
        this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
    }
    fromString(inputString) {
        const strLength = inputString.length;
        const valueHexView = this.valueBlock.valueHexView = new Uint8Array(strLength * 4);
        for(let i = 0; i < strLength; i++){
            const codeBuf = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utilToBase"](inputString.charCodeAt(i), 8);
            const codeView = new Uint8Array(codeBuf);
            if (codeView.length > 4) continue;
            const dif = 4 - codeView.length;
            for(let j = codeView.length - 1; j >= 0; j--)valueHexView[i * 4 + j + dif] = codeView[j];
        }
        this.valueBlock.value = inputString;
    }
}
LocalUniversalStringValueBlock.NAME = "UniversalStringValueBlock";
var _a$g;
class UniversalString extends LocalUniversalStringValueBlock {
    constructor({ ...parameters } = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 28;
    }
}
_a$g = UniversalString;
(()=>{
    typeStore.UniversalString = _a$g;
})();
UniversalString.NAME = "UniversalString";
var _a$f;
class NumericString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 18;
    }
}
_a$f = NumericString;
(()=>{
    typeStore.NumericString = _a$f;
})();
NumericString.NAME = "NumericString";
var _a$e;
class PrintableString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 19;
    }
}
_a$e = PrintableString;
(()=>{
    typeStore.PrintableString = _a$e;
})();
PrintableString.NAME = "PrintableString";
var _a$d;
class TeletexString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 20;
    }
}
_a$d = TeletexString;
(()=>{
    typeStore.TeletexString = _a$d;
})();
TeletexString.NAME = "TeletexString";
var _a$c;
class VideotexString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 21;
    }
}
_a$c = VideotexString;
(()=>{
    typeStore.VideotexString = _a$c;
})();
VideotexString.NAME = "VideotexString";
var _a$b;
class IA5String extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 22;
    }
}
_a$b = IA5String;
(()=>{
    typeStore.IA5String = _a$b;
})();
IA5String.NAME = "IA5String";
var _a$a;
class GraphicString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 25;
    }
}
_a$a = GraphicString;
(()=>{
    typeStore.GraphicString = _a$a;
})();
GraphicString.NAME = "GraphicString";
var _a$9;
class VisibleString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 26;
    }
}
_a$9 = VisibleString;
(()=>{
    typeStore.VisibleString = _a$9;
})();
VisibleString.NAME = "VisibleString";
var _a$8;
class GeneralString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 27;
    }
}
_a$8 = GeneralString;
(()=>{
    typeStore.GeneralString = _a$8;
})();
GeneralString.NAME = "GeneralString";
var _a$7;
class CharacterString extends LocalSimpleStringBlock {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 29;
    }
}
_a$7 = CharacterString;
(()=>{
    typeStore.CharacterString = _a$7;
})();
CharacterString.NAME = "CharacterString";
var _a$6;
class UTCTime extends VisibleString {
    constructor({ value, valueDate, ...parameters } = {}){
        super(parameters);
        this.year = 0;
        this.month = 0;
        this.day = 0;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        if (value) {
            this.fromString(value);
            this.valueBlock.valueHexView = new Uint8Array(value.length);
            for(let i = 0; i < value.length; i++)this.valueBlock.valueHexView[i] = value.charCodeAt(i);
        }
        if (valueDate) {
            this.fromDate(valueDate);
            this.valueBlock.valueHexView = new Uint8Array(this.toBuffer());
        }
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 23;
    }
    fromBuffer(inputBuffer) {
        this.fromString(String.fromCharCode.apply(null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer)));
    }
    toBuffer() {
        const str = this.toString();
        const buffer = new ArrayBuffer(str.length);
        const view = new Uint8Array(buffer);
        for(let i = 0; i < str.length; i++)view[i] = str.charCodeAt(i);
        return buffer;
    }
    fromDate(inputDate) {
        this.year = inputDate.getUTCFullYear();
        this.month = inputDate.getUTCMonth() + 1;
        this.day = inputDate.getUTCDate();
        this.hour = inputDate.getUTCHours();
        this.minute = inputDate.getUTCMinutes();
        this.second = inputDate.getUTCSeconds();
    }
    toDate() {
        return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
    }
    fromString(inputString) {
        const parser = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig;
        const parserArray = parser.exec(inputString);
        if (parserArray === null) {
            this.error = "Wrong input string for conversion";
            return;
        }
        const year = parseInt(parserArray[1], 10);
        if (year >= 50) this.year = 1900 + year;
        else this.year = 2000 + year;
        this.month = parseInt(parserArray[2], 10);
        this.day = parseInt(parserArray[3], 10);
        this.hour = parseInt(parserArray[4], 10);
        this.minute = parseInt(parserArray[5], 10);
        this.second = parseInt(parserArray[6], 10);
    }
    toString(encoding = "iso") {
        if (encoding === "iso") {
            const outputArray = new Array(7);
            outputArray[0] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.year < 2000 ? this.year - 1900 : this.year - 2000, 2);
            outputArray[1] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.month, 2);
            outputArray[2] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.day, 2);
            outputArray[3] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.hour, 2);
            outputArray[4] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.minute, 2);
            outputArray[5] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.second, 2);
            outputArray[6] = "Z";
            return outputArray.join("");
        }
        return super.toString(encoding);
    }
    onAsciiEncoding() {
        return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            year: this.year,
            month: this.month,
            day: this.day,
            hour: this.hour,
            minute: this.minute,
            second: this.second
        };
    }
}
_a$6 = UTCTime;
(()=>{
    typeStore.UTCTime = _a$6;
})();
UTCTime.NAME = "UTCTime";
var _a$5;
class GeneralizedTime extends UTCTime {
    constructor(parameters = {}){
        var _b;
        super(parameters);
        (_b = this.millisecond) !== null && _b !== void 0 ? _b : this.millisecond = 0;
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 24;
    }
    fromDate(inputDate) {
        super.fromDate(inputDate);
        this.millisecond = inputDate.getUTCMilliseconds();
    }
    toDate() {
        const utcDate = Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond);
        return new Date(utcDate);
    }
    fromString(inputString) {
        let isUTC = false;
        let timeString = "";
        let dateTimeString = "";
        let fractionPart = 0;
        let parser;
        let hourDifference = 0;
        let minuteDifference = 0;
        if (inputString[inputString.length - 1] === "Z") {
            timeString = inputString.substring(0, inputString.length - 1);
            isUTC = true;
        } else {
            const number = new Number(inputString[inputString.length - 1]);
            if (isNaN(number.valueOf())) throw new Error("Wrong input string for conversion");
            timeString = inputString;
        }
        if (isUTC) {
            if (timeString.indexOf("+") !== -1) throw new Error("Wrong input string for conversion");
            if (timeString.indexOf("-") !== -1) throw new Error("Wrong input string for conversion");
        } else {
            let multiplier = 1;
            let differencePosition = timeString.indexOf("+");
            let differenceString = "";
            if (differencePosition === -1) {
                differencePosition = timeString.indexOf("-");
                multiplier = -1;
            }
            if (differencePosition !== -1) {
                differenceString = timeString.substring(differencePosition + 1);
                timeString = timeString.substring(0, differencePosition);
                if (differenceString.length !== 2 && differenceString.length !== 4) throw new Error("Wrong input string for conversion");
                let number = parseInt(differenceString.substring(0, 2), 10);
                if (isNaN(number.valueOf())) throw new Error("Wrong input string for conversion");
                hourDifference = multiplier * number;
                if (differenceString.length === 4) {
                    number = parseInt(differenceString.substring(2, 4), 10);
                    if (isNaN(number.valueOf())) throw new Error("Wrong input string for conversion");
                    minuteDifference = multiplier * number;
                }
            }
        }
        let fractionPointPosition = timeString.indexOf(".");
        if (fractionPointPosition === -1) fractionPointPosition = timeString.indexOf(",");
        if (fractionPointPosition !== -1) {
            const fractionPartCheck = new Number(`0${timeString.substring(fractionPointPosition)}`);
            if (isNaN(fractionPartCheck.valueOf())) throw new Error("Wrong input string for conversion");
            fractionPart = fractionPartCheck.valueOf();
            dateTimeString = timeString.substring(0, fractionPointPosition);
        } else dateTimeString = timeString;
        switch(true){
            case dateTimeString.length === 8:
                parser = /(\d{4})(\d{2})(\d{2})/ig;
                if (fractionPointPosition !== -1) throw new Error("Wrong input string for conversion");
                break;
            case dateTimeString.length === 10:
                parser = /(\d{4})(\d{2})(\d{2})(\d{2})/ig;
                if (fractionPointPosition !== -1) {
                    let fractionResult = 60 * fractionPart;
                    this.minute = Math.floor(fractionResult);
                    fractionResult = 60 * (fractionResult - this.minute);
                    this.second = Math.floor(fractionResult);
                    fractionResult = 1000 * (fractionResult - this.second);
                    this.millisecond = Math.floor(fractionResult);
                }
                break;
            case dateTimeString.length === 12:
                parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
                if (fractionPointPosition !== -1) {
                    let fractionResult = 60 * fractionPart;
                    this.second = Math.floor(fractionResult);
                    fractionResult = 1000 * (fractionResult - this.second);
                    this.millisecond = Math.floor(fractionResult);
                }
                break;
            case dateTimeString.length === 14:
                parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
                if (fractionPointPosition !== -1) {
                    const fractionResult = 1000 * fractionPart;
                    this.millisecond = Math.floor(fractionResult);
                }
                break;
            default:
                throw new Error("Wrong input string for conversion");
        }
        const parserArray = parser.exec(dateTimeString);
        if (parserArray === null) throw new Error("Wrong input string for conversion");
        for(let j = 1; j < parserArray.length; j++){
            switch(j){
                case 1:
                    this.year = parseInt(parserArray[j], 10);
                    break;
                case 2:
                    this.month = parseInt(parserArray[j], 10);
                    break;
                case 3:
                    this.day = parseInt(parserArray[j], 10);
                    break;
                case 4:
                    this.hour = parseInt(parserArray[j], 10) + hourDifference;
                    break;
                case 5:
                    this.minute = parseInt(parserArray[j], 10) + minuteDifference;
                    break;
                case 6:
                    this.second = parseInt(parserArray[j], 10);
                    break;
                default:
                    throw new Error("Wrong input string for conversion");
            }
        }
        if (isUTC === false) {
            const tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
            this.year = tempDate.getUTCFullYear();
            this.month = tempDate.getUTCMonth();
            this.day = tempDate.getUTCDay();
            this.hour = tempDate.getUTCHours();
            this.minute = tempDate.getUTCMinutes();
            this.second = tempDate.getUTCSeconds();
            this.millisecond = tempDate.getUTCMilliseconds();
        }
    }
    toString(encoding = "iso") {
        if (encoding === "iso") {
            const outputArray = [];
            outputArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.year, 4));
            outputArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.month, 2));
            outputArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.day, 2));
            outputArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.hour, 2));
            outputArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.minute, 2));
            outputArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.second, 2));
            if (this.millisecond !== 0) {
                outputArray.push(".");
                outputArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvutils$2f$build$2f$utils$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padNumber"](this.millisecond, 3));
            }
            outputArray.push("Z");
            return outputArray.join("");
        }
        return super.toString(encoding);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            millisecond: this.millisecond
        };
    }
}
_a$5 = GeneralizedTime;
(()=>{
    typeStore.GeneralizedTime = _a$5;
})();
GeneralizedTime.NAME = "GeneralizedTime";
var _a$4;
class DATE extends Utf8String {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 31;
    }
}
_a$4 = DATE;
(()=>{
    typeStore.DATE = _a$4;
})();
DATE.NAME = "DATE";
var _a$3;
class TimeOfDay extends Utf8String {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 32;
    }
}
_a$3 = TimeOfDay;
(()=>{
    typeStore.TimeOfDay = _a$3;
})();
TimeOfDay.NAME = "TimeOfDay";
var _a$2;
class DateTime extends Utf8String {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 33;
    }
}
_a$2 = DateTime;
(()=>{
    typeStore.DateTime = _a$2;
})();
DateTime.NAME = "DateTime";
var _a$1;
class Duration extends Utf8String {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 34;
    }
}
_a$1 = Duration;
(()=>{
    typeStore.Duration = _a$1;
})();
Duration.NAME = "Duration";
var _a;
class TIME extends Utf8String {
    constructor(parameters = {}){
        super(parameters);
        this.idBlock.tagClass = 1;
        this.idBlock.tagNumber = 14;
    }
}
_a = TIME;
(()=>{
    typeStore.TIME = _a;
})();
TIME.NAME = "TIME";
class Any {
    constructor({ name = EMPTY_STRING, optional = false } = {}){
        this.name = name;
        this.optional = optional;
    }
}
class Choice extends Any {
    constructor({ value = [], ...parameters } = {}){
        super(parameters);
        this.value = value;
    }
}
class Repeated extends Any {
    constructor({ value = new Any(), local = false, ...parameters } = {}){
        super(parameters);
        this.value = value;
        this.local = local;
    }
}
class RawData {
    get data() {
        return this.dataView.slice().buffer;
    }
    set data(value) {
        this.dataView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(value);
    }
    constructor({ data = EMPTY_VIEW } = {}){
        this.dataView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(data);
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
        const endLength = inputOffset + inputLength;
        this.dataView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer).subarray(inputOffset, endLength);
        return endLength;
    }
    toBER(_sizeOnly) {
        return this.dataView.slice().buffer;
    }
}
function compareSchema(root, inputData, inputSchema) {
    if (inputSchema instanceof Choice) {
        for (const element of inputSchema.value){
            const result = compareSchema(root, inputData, element);
            if (result.verified) {
                return {
                    verified: true,
                    result: root
                };
            }
        }
        {
            const _result = {
                verified: false,
                result: {
                    error: "Wrong values for Choice type"
                }
            };
            if (inputSchema.hasOwnProperty(NAME)) _result.name = inputSchema.name;
            return _result;
        }
    }
    if (inputSchema instanceof Any) {
        if (inputSchema.hasOwnProperty(NAME)) root[inputSchema.name] = inputData;
        return {
            verified: true,
            result: root
        };
    }
    if (root instanceof Object === false) {
        return {
            verified: false,
            result: {
                error: "Wrong root object"
            }
        };
    }
    if (inputData instanceof Object === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 data"
            }
        };
    }
    if (inputSchema instanceof Object === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    if (ID_BLOCK in inputSchema === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    if (FROM_BER in inputSchema.idBlock === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    if (TO_BER in inputSchema.idBlock === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    const encodedId = inputSchema.idBlock.toBER(false);
    if (encodedId.byteLength === 0) {
        return {
            verified: false,
            result: {
                error: "Error encoding idBlock for ASN.1 schema"
            }
        };
    }
    const decodedOffset = inputSchema.idBlock.fromBER(encodedId, 0, encodedId.byteLength);
    if (decodedOffset === -1) {
        return {
            verified: false,
            result: {
                error: "Error decoding idBlock for ASN.1 schema"
            }
        };
    }
    if (inputSchema.idBlock.hasOwnProperty(TAG_CLASS) === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    if (inputSchema.idBlock.tagClass !== inputData.idBlock.tagClass) {
        return {
            verified: false,
            result: root
        };
    }
    if (inputSchema.idBlock.hasOwnProperty(TAG_NUMBER) === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    if (inputSchema.idBlock.tagNumber !== inputData.idBlock.tagNumber) {
        return {
            verified: false,
            result: root
        };
    }
    if (inputSchema.idBlock.hasOwnProperty(IS_CONSTRUCTED) === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    if (inputSchema.idBlock.isConstructed !== inputData.idBlock.isConstructed) {
        return {
            verified: false,
            result: root
        };
    }
    if (!(IS_HEX_ONLY in inputSchema.idBlock)) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema"
            }
        };
    }
    if (inputSchema.idBlock.isHexOnly !== inputData.idBlock.isHexOnly) {
        return {
            verified: false,
            result: root
        };
    }
    if (inputSchema.idBlock.isHexOnly) {
        if (VALUE_HEX_VIEW in inputSchema.idBlock === false) {
            return {
                verified: false,
                result: {
                    error: "Wrong ASN.1 schema"
                }
            };
        }
        const schemaView = inputSchema.idBlock.valueHexView;
        const asn1View = inputData.idBlock.valueHexView;
        if (schemaView.length !== asn1View.length) {
            return {
                verified: false,
                result: root
            };
        }
        for(let i = 0; i < schemaView.length; i++){
            if (schemaView[i] !== asn1View[1]) {
                return {
                    verified: false,
                    result: root
                };
            }
        }
    }
    if (inputSchema.name) {
        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
        if (inputSchema.name) root[inputSchema.name] = inputData;
    }
    if (inputSchema instanceof typeStore.Constructed) {
        let admission = 0;
        let result = {
            verified: false,
            result: {
                error: "Unknown error"
            }
        };
        let maxLength = inputSchema.valueBlock.value.length;
        if (maxLength > 0) {
            if (inputSchema.valueBlock.value[0] instanceof Repeated) {
                maxLength = inputData.valueBlock.value.length;
            }
        }
        if (maxLength === 0) {
            return {
                verified: true,
                result: root
            };
        }
        if (inputData.valueBlock.value.length === 0 && inputSchema.valueBlock.value.length !== 0) {
            let _optional = true;
            for(let i = 0; i < inputSchema.valueBlock.value.length; i++)_optional = _optional && (inputSchema.valueBlock.value[i].optional || false);
            if (_optional) {
                return {
                    verified: true,
                    result: root
                };
            }
            if (inputSchema.name) {
                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                if (inputSchema.name) delete root[inputSchema.name];
            }
            root.error = "Inconsistent object length";
            return {
                verified: false,
                result: root
            };
        }
        for(let i = 0; i < maxLength; i++){
            if (i - admission >= inputData.valueBlock.value.length) {
                if (inputSchema.valueBlock.value[i].optional === false) {
                    const _result = {
                        verified: false,
                        result: root
                    };
                    root.error = "Inconsistent length between ASN.1 data and schema";
                    if (inputSchema.name) {
                        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                        if (inputSchema.name) {
                            delete root[inputSchema.name];
                            _result.name = inputSchema.name;
                        }
                    }
                    return _result;
                }
            } else {
                if (inputSchema.valueBlock.value[0] instanceof Repeated) {
                    result = compareSchema(root, inputData.valueBlock.value[i], inputSchema.valueBlock.value[0].value);
                    if (result.verified === false) {
                        if (inputSchema.valueBlock.value[0].optional) admission++;
                        else {
                            if (inputSchema.name) {
                                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                                if (inputSchema.name) delete root[inputSchema.name];
                            }
                            return result;
                        }
                    }
                    if (NAME in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].name.length > 0) {
                        let arrayRoot = {};
                        if (LOCAL in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].local) arrayRoot = inputData;
                        else arrayRoot = root;
                        if (typeof arrayRoot[inputSchema.valueBlock.value[0].name] === "undefined") arrayRoot[inputSchema.valueBlock.value[0].name] = [];
                        arrayRoot[inputSchema.valueBlock.value[0].name].push(inputData.valueBlock.value[i]);
                    }
                } else {
                    result = compareSchema(root, inputData.valueBlock.value[i - admission], inputSchema.valueBlock.value[i]);
                    if (result.verified === false) {
                        if (inputSchema.valueBlock.value[i].optional) admission++;
                        else {
                            if (inputSchema.name) {
                                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                                if (inputSchema.name) delete root[inputSchema.name];
                            }
                            return result;
                        }
                    }
                }
            }
        }
        if (result.verified === false) {
            const _result = {
                verified: false,
                result: root
            };
            if (inputSchema.name) {
                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                if (inputSchema.name) {
                    delete root[inputSchema.name];
                    _result.name = inputSchema.name;
                }
            }
            return _result;
        }
        return {
            verified: true,
            result: root
        };
    }
    if (inputSchema.primitiveSchema && VALUE_HEX_VIEW in inputData.valueBlock) {
        const asn1 = localFromBER(inputData.valueBlock.valueHexView);
        if (asn1.offset === -1) {
            const _result = {
                verified: false,
                result: asn1.result
            };
            if (inputSchema.name) {
                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                if (inputSchema.name) {
                    delete root[inputSchema.name];
                    _result.name = inputSchema.name;
                }
            }
            return _result;
        }
        return compareSchema(root, asn1.result, inputSchema.primitiveSchema);
    }
    return {
        verified: true,
        result: root
    };
}
function verifySchema(inputBuffer, inputSchema) {
    if (inputSchema instanceof Object === false) {
        return {
            verified: false,
            result: {
                error: "Wrong ASN.1 schema type"
            }
        };
    }
    const asn1 = localFromBER(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toUint8Array(inputBuffer));
    if (asn1.offset === -1) {
        return {
            verified: false,
            result: asn1.result
        };
    }
    return compareSchema(asn1.result, asn1.result, inputSchema);
}
;
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnPropTypes",
    ()=>AsnPropTypes,
    "AsnTypeTypes",
    ()=>AsnTypeTypes
]);
var AsnTypeTypes;
(function(AsnTypeTypes) {
    AsnTypeTypes[AsnTypeTypes["Sequence"] = 0] = "Sequence";
    AsnTypeTypes[AsnTypeTypes["Set"] = 1] = "Set";
    AsnTypeTypes[AsnTypeTypes["Choice"] = 2] = "Choice";
})(AsnTypeTypes || (AsnTypeTypes = {}));
var AsnPropTypes;
(function(AsnPropTypes) {
    AsnPropTypes[AsnPropTypes["Any"] = 1] = "Any";
    AsnPropTypes[AsnPropTypes["Boolean"] = 2] = "Boolean";
    AsnPropTypes[AsnPropTypes["OctetString"] = 3] = "OctetString";
    AsnPropTypes[AsnPropTypes["BitString"] = 4] = "BitString";
    AsnPropTypes[AsnPropTypes["Integer"] = 5] = "Integer";
    AsnPropTypes[AsnPropTypes["Enumerated"] = 6] = "Enumerated";
    AsnPropTypes[AsnPropTypes["ObjectIdentifier"] = 7] = "ObjectIdentifier";
    AsnPropTypes[AsnPropTypes["Utf8String"] = 8] = "Utf8String";
    AsnPropTypes[AsnPropTypes["BmpString"] = 9] = "BmpString";
    AsnPropTypes[AsnPropTypes["UniversalString"] = 10] = "UniversalString";
    AsnPropTypes[AsnPropTypes["NumericString"] = 11] = "NumericString";
    AsnPropTypes[AsnPropTypes["PrintableString"] = 12] = "PrintableString";
    AsnPropTypes[AsnPropTypes["TeletexString"] = 13] = "TeletexString";
    AsnPropTypes[AsnPropTypes["VideotexString"] = 14] = "VideotexString";
    AsnPropTypes[AsnPropTypes["IA5String"] = 15] = "IA5String";
    AsnPropTypes[AsnPropTypes["GraphicString"] = 16] = "GraphicString";
    AsnPropTypes[AsnPropTypes["VisibleString"] = 17] = "VisibleString";
    AsnPropTypes[AsnPropTypes["GeneralString"] = 18] = "GeneralString";
    AsnPropTypes[AsnPropTypes["CharacterString"] = 19] = "CharacterString";
    AsnPropTypes[AsnPropTypes["UTCTime"] = 20] = "UTCTime";
    AsnPropTypes[AsnPropTypes["GeneralizedTime"] = 21] = "GeneralizedTime";
    AsnPropTypes[AsnPropTypes["DATE"] = 22] = "DATE";
    AsnPropTypes[AsnPropTypes["TimeOfDay"] = 23] = "TimeOfDay";
    AsnPropTypes[AsnPropTypes["DateTime"] = 24] = "DateTime";
    AsnPropTypes[AsnPropTypes["Duration"] = 25] = "Duration";
    AsnPropTypes[AsnPropTypes["TIME"] = 26] = "TIME";
    AsnPropTypes[AsnPropTypes["Null"] = 27] = "Null";
})(AsnPropTypes || (AsnPropTypes = {}));
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/bit_string.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BitString",
    ()=>BitString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pvtsutils/build/index.es.js [app-route] (ecmascript)");
;
;
class BitString {
    constructor(params, unusedBits = 0){
        this.unusedBits = 0;
        this.value = new ArrayBuffer(0);
        if (params) {
            if (typeof params === "number") {
                this.fromNumber(params);
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].isBufferSource(params)) {
                this.unusedBits = unusedBits;
                this.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toArrayBuffer(params);
            } else {
                throw TypeError("Unsupported type of 'params' argument for BitString");
            }
        }
    }
    fromASN(asn) {
        if (!(asn instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BitString"])) {
            throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");
        }
        this.unusedBits = asn.valueBlock.unusedBits;
        this.value = asn.valueBlock.valueHex;
        return this;
    }
    toASN() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BitString"]({
            unusedBits: this.unusedBits,
            valueHex: this.value
        });
    }
    toSchema(name) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BitString"]({
            name
        });
    }
    toNumber() {
        let res = "";
        const uintArray = new Uint8Array(this.value);
        for (const octet of uintArray){
            res += octet.toString(2).padStart(8, "0");
        }
        res = res.split("").reverse().join("");
        if (this.unusedBits) {
            res = res.slice(this.unusedBits).padStart(this.unusedBits, "0");
        }
        return parseInt(res, 2);
    }
    fromNumber(value) {
        let bits = value.toString(2);
        const octetSize = bits.length + 7 >> 3;
        this.unusedBits = (octetSize << 3) - bits.length;
        const octets = new Uint8Array(octetSize);
        bits = bits.padStart(octetSize << 3, "0").split("").reverse().join("");
        let index = 0;
        while(index < octetSize){
            octets[index] = parseInt(bits.slice(index << 3, (index << 3) + 8), 2);
            index++;
        }
        this.value = octets.buffer;
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OctetString",
    ()=>OctetString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pvtsutils/build/index.es.js [app-route] (ecmascript)");
;
;
class OctetString {
    get byteLength() {
        return this.buffer.byteLength;
    }
    get byteOffset() {
        return 0;
    }
    constructor(param){
        if (typeof param === "number") {
            this.buffer = new ArrayBuffer(param);
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].isBufferSource(param)) {
                this.buffer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toArrayBuffer(param);
            } else if (Array.isArray(param)) {
                this.buffer = new Uint8Array(param);
            } else {
                this.buffer = new ArrayBuffer(0);
            }
        }
    }
    fromASN(asn) {
        if (!(asn instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"])) {
            throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
        }
        this.buffer = asn.valueBlock.valueHex;
        return this;
    }
    toASN() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]({
            valueHex: this.buffer
        });
    }
    toSchema(name) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]({
            name
        });
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$bit_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/bit_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
;
;
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnAnyConverter",
    ()=>AsnAnyConverter,
    "AsnBitStringConverter",
    ()=>AsnBitStringConverter,
    "AsnBmpStringConverter",
    ()=>AsnBmpStringConverter,
    "AsnBooleanConverter",
    ()=>AsnBooleanConverter,
    "AsnCharacterStringConverter",
    ()=>AsnCharacterStringConverter,
    "AsnConstructedOctetStringConverter",
    ()=>AsnConstructedOctetStringConverter,
    "AsnEnumeratedConverter",
    ()=>AsnEnumeratedConverter,
    "AsnGeneralStringConverter",
    ()=>AsnGeneralStringConverter,
    "AsnGeneralizedTimeConverter",
    ()=>AsnGeneralizedTimeConverter,
    "AsnGraphicStringConverter",
    ()=>AsnGraphicStringConverter,
    "AsnIA5StringConverter",
    ()=>AsnIA5StringConverter,
    "AsnIntegerArrayBufferConverter",
    ()=>AsnIntegerArrayBufferConverter,
    "AsnIntegerBigIntConverter",
    ()=>AsnIntegerBigIntConverter,
    "AsnIntegerConverter",
    ()=>AsnIntegerConverter,
    "AsnNullConverter",
    ()=>AsnNullConverter,
    "AsnNumericStringConverter",
    ()=>AsnNumericStringConverter,
    "AsnObjectIdentifierConverter",
    ()=>AsnObjectIdentifierConverter,
    "AsnOctetStringConverter",
    ()=>AsnOctetStringConverter,
    "AsnPrintableStringConverter",
    ()=>AsnPrintableStringConverter,
    "AsnTeletexStringConverter",
    ()=>AsnTeletexStringConverter,
    "AsnUTCTimeConverter",
    ()=>AsnUTCTimeConverter,
    "AsnUniversalStringConverter",
    ()=>AsnUniversalStringConverter,
    "AsnUtf8StringConverter",
    ()=>AsnUtf8StringConverter,
    "AsnVideotexStringConverter",
    ()=>AsnVideotexStringConverter,
    "AsnVisibleStringConverter",
    ()=>AsnVisibleStringConverter,
    "defaultConverter",
    ()=>defaultConverter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
;
;
;
const AsnAnyConverter = {
    fromASN: (value)=>value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Null"] ? null : value.valueBeforeDecodeView,
    toASN: (value)=>{
        if (value === null) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Null"]();
        }
        const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBER"](value);
        if (schema.result.error) {
            throw new Error(schema.result.error);
        }
        return schema.result;
    }
};
const AsnIntegerConverter = {
    fromASN: (value)=>value.valueBlock.valueHexView.byteLength >= 4 ? value.valueBlock.toString() : value.valueBlock.valueDec,
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Integer"]({
            value: +value
        })
};
const AsnEnumeratedConverter = {
    fromASN: (value)=>value.valueBlock.valueDec,
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Enumerated"]({
            value
        })
};
const AsnIntegerArrayBufferConverter = {
    fromASN: (value)=>value.valueBlock.valueHexView,
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Integer"]({
            valueHex: value
        })
};
const AsnIntegerBigIntConverter = {
    fromASN: (value)=>value.toBigInt(),
    toASN: (value)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Integer"].fromBigInt(value)
};
const AsnBitStringConverter = {
    fromASN: (value)=>value.valueBlock.valueHexView,
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BitString"]({
            valueHex: value
        })
};
const AsnObjectIdentifierConverter = {
    fromASN: (value)=>value.valueBlock.toString(),
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ObjectIdentifier"]({
            value
        })
};
const AsnBooleanConverter = {
    fromASN: (value)=>value.valueBlock.value,
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Boolean"]({
            value
        })
};
const AsnOctetStringConverter = {
    fromASN: (value)=>value.valueBlock.valueHexView,
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]({
            valueHex: value
        })
};
const AsnConstructedOctetStringConverter = {
    fromASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"](value.getValue()),
    toASN: (value)=>value.toASN()
};
function createStringConverter(Asn1Type) {
    return {
        fromASN: (value)=>value.valueBlock.value,
        toASN: (value)=>new Asn1Type({
                value
            })
    };
}
const AsnUtf8StringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Utf8String"]);
const AsnBmpStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BmpString"]);
const AsnUniversalStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniversalString"]);
const AsnNumericStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NumericString"]);
const AsnPrintableStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrintableString"]);
const AsnTeletexStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TeletexString"]);
const AsnVideotexStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VideotexString"]);
const AsnIA5StringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IA5String"]);
const AsnGraphicStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphicString"]);
const AsnVisibleStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VisibleString"]);
const AsnGeneralStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralString"]);
const AsnCharacterStringConverter = createStringConverter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CharacterString"]);
const AsnUTCTimeConverter = {
    fromASN: (value)=>value.toDate(),
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UTCTime"]({
            valueDate: value
        })
};
const AsnGeneralizedTimeConverter = {
    fromASN: (value)=>value.toDate(),
    toASN: (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralizedTime"]({
            valueDate: value
        })
};
const AsnNullConverter = {
    fromASN: ()=>null,
    toASN: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Null"]();
    }
};
function defaultConverter(type) {
    switch(type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any:
            return AsnAnyConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString:
            return AsnBitStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BmpString:
            return AsnBmpStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Boolean:
            return AsnBooleanConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].CharacterString:
            return AsnCharacterStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated:
            return AsnEnumeratedConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].GeneralString:
            return AsnGeneralStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].GeneralizedTime:
            return AsnGeneralizedTimeConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].GraphicString:
            return AsnGraphicStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].IA5String:
            return AsnIA5StringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer:
            return AsnIntegerConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null:
            return AsnNullConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].NumericString:
            return AsnNumericStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier:
            return AsnObjectIdentifierConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].OctetString:
            return AsnOctetStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].PrintableString:
            return AsnPrintableStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].TeletexString:
            return AsnTeletexStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].UTCTime:
            return AsnUTCTimeConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].UniversalString:
            return AsnUniversalStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Utf8String:
            return AsnUtf8StringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].VideotexString:
            return AsnVideotexStringConverter;
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].VisibleString:
            return AsnVisibleStringConverter;
        default:
            return null;
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/helper.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isArrayEqual",
    ()=>isArrayEqual,
    "isConvertible",
    ()=>isConvertible,
    "isTypeOfArray",
    ()=>isTypeOfArray
]);
function isConvertible(target) {
    if (typeof target === "function" && target.prototype) {
        if (target.prototype.toASN && target.prototype.fromASN) {
            return true;
        } else {
            return isConvertible(target.prototype);
        }
    } else {
        return !!(target && typeof target === "object" && "toASN" in target && "fromASN" in target);
    }
}
function isTypeOfArray(target) {
    var _a;
    if (target) {
        const proto = Object.getPrototypeOf(target);
        if (((_a = proto === null || proto === void 0 ? void 0 : proto.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === Array) {
            return true;
        }
        return isTypeOfArray(proto);
    }
    return false;
}
function isArrayEqual(bytes1, bytes2) {
    if (!(bytes1 && bytes2)) {
        return false;
    }
    if (bytes1.byteLength !== bytes2.byteLength) {
        return false;
    }
    const b1 = new Uint8Array(bytes1);
    const b2 = new Uint8Array(bytes2);
    for(let i = 0; i < bytes1.byteLength; i++){
        if (b1[i] !== b2[i]) {
            return false;
        }
    }
    return true;
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/schema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnSchemaStorage",
    ()=>AsnSchemaStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/helper.js [app-route] (ecmascript)");
;
;
;
class AsnSchemaStorage {
    constructor(){
        this.items = new WeakMap();
    }
    has(target) {
        return this.items.has(target);
    }
    get(target, checkSchema = false) {
        const schema = this.items.get(target);
        if (!schema) {
            throw new Error(`Cannot get schema for '${target.prototype.constructor.name}' target`);
        }
        if (checkSchema && !schema.schema) {
            throw new Error(`Schema '${target.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);
        }
        return schema;
    }
    cache(target) {
        const schema = this.get(target);
        if (!schema.schema) {
            schema.schema = this.create(target, true);
        }
    }
    createDefault(target) {
        const schema = {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
            items: {}
        };
        const parentSchema = this.findParentSchema(target);
        if (parentSchema) {
            Object.assign(schema, parentSchema);
            schema.items = Object.assign({}, schema.items, parentSchema.items);
        }
        return schema;
    }
    create(target, useNames) {
        const schema = this.items.get(target) || this.createDefault(target);
        const asn1Value = [];
        for(const key in schema.items){
            const item = schema.items[key];
            const name = useNames ? key : "";
            let asn1Item;
            if (typeof item.type === "number") {
                const Asn1TypeName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"][item.type];
                const Asn1Type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[Asn1TypeName];
                if (!Asn1Type) {
                    throw new Error(`Cannot get ASN1 class by name '${Asn1TypeName}'`);
                }
                asn1Item = new Asn1Type({
                    name
                });
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(item.type)) {
                const instance = new item.type();
                asn1Item = instance.toSchema(name);
            } else if (item.optional) {
                const itemSchema = this.get(item.type);
                if (itemSchema.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice) {
                    asn1Item = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Any({
                        name
                    });
                } else {
                    asn1Item = this.create(item.type, false);
                    asn1Item.name = name;
                }
            } else {
                asn1Item = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Any({
                    name
                });
            }
            const optional = !!item.optional || item.defaultValue !== undefined;
            if (item.repeated) {
                asn1Item.name = "";
                const Container = item.repeated === "set" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Set : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Sequence;
                asn1Item = new Container({
                    name: "",
                    value: [
                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Repeated({
                            name,
                            value: asn1Item
                        })
                    ]
                });
            }
            if (item.context !== null && item.context !== undefined) {
                if (item.implicit) {
                    if (typeof item.type === "number" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(item.type)) {
                        const Container = item.repeated ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Constructed : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Primitive;
                        asn1Value.push(new Container({
                            name,
                            optional,
                            idBlock: {
                                tagClass: 3,
                                tagNumber: item.context
                            }
                        }));
                    } else {
                        this.cache(item.type);
                        const isRepeated = !!item.repeated;
                        let value = !isRepeated ? this.get(item.type, true).schema : asn1Item;
                        value = "valueBlock" in value ? value.valueBlock.value : value.value;
                        asn1Value.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Constructed({
                            name: !isRepeated ? name : "",
                            optional,
                            idBlock: {
                                tagClass: 3,
                                tagNumber: item.context
                            },
                            value: value
                        }));
                    }
                } else {
                    asn1Value.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Constructed({
                        optional,
                        idBlock: {
                            tagClass: 3,
                            tagNumber: item.context
                        },
                        value: [
                            asn1Item
                        ]
                    }));
                }
            } else {
                asn1Item.optional = optional;
                asn1Value.push(asn1Item);
            }
        }
        switch(schema.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence:
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Sequence({
                    value: asn1Value,
                    name: ""
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Set:
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Set({
                    value: asn1Value,
                    name: ""
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice:
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Choice({
                    value: asn1Value,
                    name: ""
                });
            default:
                throw new Error(`Unsupported ASN1 type in use`);
        }
    }
    set(target, schema) {
        this.items.set(target, schema);
        return this;
    }
    findParentSchema(target) {
        const parent = Object.getPrototypeOf(target);
        if (parent) {
            const schema = this.items.get(parent);
            return schema || this.findParentSchema(parent);
        }
        return null;
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/storage.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "schemaStorage",
    ()=>schemaStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/schema.js [app-route] (ecmascript)");
;
const schemaStorage = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnSchemaStorage"]();
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnChoiceType",
    ()=>AsnChoiceType,
    "AsnProp",
    ()=>AsnProp,
    "AsnSequenceType",
    ()=>AsnSequenceType,
    "AsnSetType",
    ()=>AsnSetType,
    "AsnType",
    ()=>AsnType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/storage.js [app-route] (ecmascript)");
;
;
;
const AsnType = (options)=>(target)=>{
        let schema;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].has(target)) {
            schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].createDefault(target);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].set(target, schema);
        } else {
            schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].get(target);
        }
        Object.assign(schema, options);
    };
const AsnChoiceType = ()=>AsnType({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    });
const AsnSetType = (options)=>AsnType({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Set,
        ...options
    });
const AsnSequenceType = (options)=>AsnType({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        ...options
    });
const AsnProp = (options)=>(target, propertyKey)=>{
        let schema;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].has(target.constructor)) {
            schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].createDefault(target.constructor);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].set(target.constructor, schema);
        } else {
            schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].get(target.constructor);
        }
        const copyOptions = Object.assign({}, options);
        if (typeof copyOptions.type === "number" && !copyOptions.converter) {
            const defaultConverter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultConverter"](options.type);
            if (!defaultConverter) {
                throw new Error(`Cannot get default converter for property '${propertyKey}' of ${target.constructor.name}`);
            }
            copyOptions.converter = defaultConverter;
        }
        copyOptions.raw = options.raw;
        schema.items[propertyKey] = copyOptions;
    };
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/errors/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/errors/schema_validation.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnSchemaValidationError",
    ()=>AsnSchemaValidationError
]);
class AsnSchemaValidationError extends Error {
    constructor(){
        super(...arguments);
        this.schemas = [];
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/parser.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnParser",
    ()=>AsnParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/errors/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$schema_validation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/errors/schema_validation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/helper.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/storage.js [app-route] (ecmascript)");
;
;
;
;
;
;
class AsnParser {
    static parse(data, target) {
        const asn1Parsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.fromBER(data);
        if (asn1Parsed.result.error) {
            throw new Error(asn1Parsed.result.error);
        }
        const res = this.fromASN(asn1Parsed.result, target);
        return res;
    }
    static fromASN(asn1Schema, target) {
        try {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(target)) {
                const value = new target();
                return value.fromASN(asn1Schema);
            }
            const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].get(target);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].cache(target);
            let targetSchema = schema.schema;
            const choiceResult = this.handleChoiceTypes(asn1Schema, schema, target, targetSchema);
            if (choiceResult === null || choiceResult === void 0 ? void 0 : choiceResult.result) {
                return choiceResult.result;
            }
            if (choiceResult === null || choiceResult === void 0 ? void 0 : choiceResult.targetSchema) {
                targetSchema = choiceResult.targetSchema;
            }
            const sequenceResult = this.handleSequenceTypes(asn1Schema, schema, target, targetSchema);
            const res = new target();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTypeOfArray"])(target)) {
                return this.handleArrayTypes(asn1Schema, schema, target);
            }
            this.processSchemaItems(schema, sequenceResult, res);
            return res;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$schema_validation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnSchemaValidationError"]) {
                error.schemas.push(target.name);
            }
            throw error;
        }
    }
    static handleChoiceTypes(asn1Schema, schema, target, targetSchema) {
        if (asn1Schema.constructor === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Constructed && schema.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice && asn1Schema.idBlock.tagClass === 3) {
            for(const key in schema.items){
                const schemaItem = schema.items[key];
                if (schemaItem.context === asn1Schema.idBlock.tagNumber && schemaItem.implicit) {
                    if (typeof schemaItem.type === "function" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].has(schemaItem.type)) {
                        const fieldSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].get(schemaItem.type);
                        if (fieldSchema && fieldSchema.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence) {
                            const newSeq = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Sequence();
                            if ("value" in asn1Schema.valueBlock && Array.isArray(asn1Schema.valueBlock.value) && "value" in newSeq.valueBlock) {
                                newSeq.valueBlock.value = asn1Schema.valueBlock.value;
                                const fieldValue = this.fromASN(newSeq, schemaItem.type);
                                const res = new target();
                                res[key] = fieldValue;
                                return {
                                    result: res
                                };
                            }
                        }
                    }
                }
            }
        } else if (asn1Schema.constructor === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Constructed && schema.type !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice) {
            const newTargetSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Constructed({
                idBlock: {
                    tagClass: 3,
                    tagNumber: asn1Schema.idBlock.tagNumber
                },
                value: schema.schema.valueBlock.value
            });
            for(const key in schema.items){
                delete asn1Schema[key];
            }
            return {
                targetSchema: newTargetSchema
            };
        }
        return null;
    }
    static handleSequenceTypes(asn1Schema, schema, target, targetSchema) {
        if (schema.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence) {
            const asn1ComparedSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.compareSchema({}, asn1Schema, targetSchema);
            if (!asn1ComparedSchema.verified) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$schema_validation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnSchemaValidationError"](`Data does not match to ${target.name} ASN1 schema.${asn1ComparedSchema.result.error ? ` ${asn1ComparedSchema.result.error}` : ""}`);
            }
            return asn1ComparedSchema;
        } else {
            const asn1ComparedSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.compareSchema({}, asn1Schema, targetSchema);
            if (!asn1ComparedSchema.verified) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$schema_validation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnSchemaValidationError"](`Data does not match to ${target.name} ASN1 schema.${asn1ComparedSchema.result.error ? ` ${asn1ComparedSchema.result.error}` : ""}`);
            }
            return asn1ComparedSchema;
        }
    }
    static processRepeatedField(asn1Elements, asn1Index, schemaItem) {
        let elementsToProcess = asn1Elements.slice(asn1Index);
        if (elementsToProcess.length === 1 && elementsToProcess[0].constructor.name === "Sequence") {
            const seq = elementsToProcess[0];
            if (seq.valueBlock && seq.valueBlock.value && Array.isArray(seq.valueBlock.value)) {
                elementsToProcess = seq.valueBlock.value;
            }
        }
        if (typeof schemaItem.type === "number") {
            const converter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultConverter"](schemaItem.type);
            if (!converter) throw new Error(`No converter for ASN.1 type ${schemaItem.type}`);
            return elementsToProcess.filter((el)=>el && el.valueBlock).map((el)=>{
                try {
                    return converter.fromASN(el);
                } catch  {
                    return undefined;
                }
            }).filter((v)=>v !== undefined);
        } else {
            return elementsToProcess.filter((el)=>el && el.valueBlock).map((el)=>{
                try {
                    return this.fromASN(el, schemaItem.type);
                } catch  {
                    return undefined;
                }
            }).filter((v)=>v !== undefined);
        }
    }
    static processPrimitiveField(asn1Element, schemaItem) {
        const converter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultConverter"](schemaItem.type);
        if (!converter) throw new Error(`No converter for ASN.1 type ${schemaItem.type}`);
        return converter.fromASN(asn1Element);
    }
    static isOptionalChoiceField(schemaItem) {
        return schemaItem.optional && typeof schemaItem.type === "function" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].has(schemaItem.type) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].get(schemaItem.type).type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice;
    }
    static processOptionalChoiceField(asn1Element, schemaItem) {
        try {
            const value = this.fromASN(asn1Element, schemaItem.type);
            return {
                processed: true,
                value
            };
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$schema_validation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnSchemaValidationError"] && /Wrong values for Choice type/.test(err.message)) {
                return {
                    processed: false
                };
            }
            throw err;
        }
    }
    static handleArrayTypes(asn1Schema, schema, target) {
        if (!("value" in asn1Schema.valueBlock && Array.isArray(asn1Schema.valueBlock.value))) {
            throw new Error(`Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.`);
        }
        const itemType = schema.itemType;
        if (typeof itemType === "number") {
            const converter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultConverter"](itemType);
            if (!converter) {
                throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
            }
            return target.from(asn1Schema.valueBlock.value, (element)=>converter.fromASN(element));
        } else {
            return target.from(asn1Schema.valueBlock.value, (element)=>this.fromASN(element, itemType));
        }
    }
    static processSchemaItems(schema, asn1ComparedSchema, res) {
        for(const key in schema.items){
            const asn1SchemaValue = asn1ComparedSchema.result[key];
            if (!asn1SchemaValue) {
                continue;
            }
            const schemaItem = schema.items[key];
            const schemaItemType = schemaItem.type;
            let parsedValue;
            if (typeof schemaItemType === "number" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(schemaItemType)) {
                parsedValue = this.processPrimitiveSchemaItem(asn1SchemaValue, schemaItem, schemaItemType);
            } else {
                parsedValue = this.processComplexSchemaItem(asn1SchemaValue, schemaItem, schemaItemType);
            }
            if (parsedValue && typeof parsedValue === "object" && "value" in parsedValue && "raw" in parsedValue) {
                res[key] = parsedValue.value;
                res[`${key}Raw`] = parsedValue.raw;
            } else {
                res[key] = parsedValue;
            }
        }
    }
    static processPrimitiveSchemaItem(asn1SchemaValue, schemaItem, schemaItemType) {
        var _a;
        const converter = (_a = schemaItem.converter) !== null && _a !== void 0 ? _a : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(schemaItemType) ? new schemaItemType() : null;
        if (!converter) {
            throw new Error("Converter is empty");
        }
        if (schemaItem.repeated) {
            return this.processRepeatedPrimitiveItem(asn1SchemaValue, schemaItem, converter);
        } else {
            return this.processSinglePrimitiveItem(asn1SchemaValue, schemaItem, schemaItemType, converter);
        }
    }
    static processRepeatedPrimitiveItem(asn1SchemaValue, schemaItem, converter) {
        if (schemaItem.implicit) {
            const Container = schemaItem.repeated === "sequence" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Sequence : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Set;
            const newItem = new Container();
            newItem.valueBlock = asn1SchemaValue.valueBlock;
            const newItemAsn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.fromBER(newItem.toBER(false));
            if (newItemAsn.offset === -1) {
                throw new Error(`Cannot parse the child item. ${newItemAsn.result.error}`);
            }
            if (!("value" in newItemAsn.result.valueBlock && Array.isArray(newItemAsn.result.valueBlock.value))) {
                throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
            }
            const value = newItemAsn.result.valueBlock.value;
            return Array.from(value, (element)=>converter.fromASN(element));
        } else {
            return Array.from(asn1SchemaValue, (element)=>converter.fromASN(element));
        }
    }
    static processSinglePrimitiveItem(asn1SchemaValue, schemaItem, schemaItemType, converter) {
        let value = asn1SchemaValue;
        if (schemaItem.implicit) {
            let newItem;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(schemaItemType)) {
                newItem = new schemaItemType().toSchema("");
            } else {
                const Asn1TypeName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"][schemaItemType];
                const Asn1Type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[Asn1TypeName];
                if (!Asn1Type) {
                    throw new Error(`Cannot get '${Asn1TypeName}' class from asn1js module`);
                }
                newItem = new Asn1Type();
            }
            newItem.valueBlock = value.valueBlock;
            value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.fromBER(newItem.toBER(false)).result;
        }
        return converter.fromASN(value);
    }
    static processComplexSchemaItem(asn1SchemaValue, schemaItem, schemaItemType) {
        if (schemaItem.repeated) {
            if (!Array.isArray(asn1SchemaValue)) {
                throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");
            }
            return Array.from(asn1SchemaValue, (element)=>this.fromASN(element, schemaItemType));
        } else {
            const valueToProcess = this.handleImplicitTagging(asn1SchemaValue, schemaItem, schemaItemType);
            if (this.isOptionalChoiceField(schemaItem)) {
                try {
                    return this.fromASN(valueToProcess, schemaItemType);
                } catch (err) {
                    if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$schema_validation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnSchemaValidationError"] && /Wrong values for Choice type/.test(err.message)) {
                        return undefined;
                    }
                    throw err;
                }
            } else {
                const parsedValue = this.fromASN(valueToProcess, schemaItemType);
                if (schemaItem.raw) {
                    return {
                        value: parsedValue,
                        raw: asn1SchemaValue.valueBeforeDecodeView
                    };
                }
                return parsedValue;
            }
        }
    }
    static handleImplicitTagging(asn1SchemaValue, schemaItem, schemaItemType) {
        if (schemaItem.implicit && typeof schemaItem.context === "number") {
            const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].get(schemaItemType);
            if (schema.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence) {
                const newSeq = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Sequence();
                if ("value" in asn1SchemaValue.valueBlock && Array.isArray(asn1SchemaValue.valueBlock.value) && "value" in newSeq.valueBlock) {
                    newSeq.valueBlock.value = asn1SchemaValue.valueBlock.value;
                    return newSeq;
                }
            } else if (schema.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Set) {
                const newSet = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.Set();
                if ("value" in asn1SchemaValue.valueBlock && Array.isArray(asn1SchemaValue.valueBlock.value) && "value" in newSet.valueBlock) {
                    newSet.valueBlock.value = asn1SchemaValue.valueBlock.value;
                    return newSet;
                }
            }
        }
        return asn1SchemaValue;
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/serializer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnSerializer",
    ()=>AsnSerializer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/helper.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/storage.js [app-route] (ecmascript)");
;
;
;
;
;
class AsnSerializer {
    static serialize(obj) {
        if (obj instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseBlock"]) {
            return obj.toBER(false);
        }
        return this.toASN(obj).toBER(false);
    }
    static toASN(obj) {
        if (obj && typeof obj === "object" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(obj)) {
            return obj.toASN();
        }
        if (!(obj && typeof obj === "object")) {
            throw new TypeError("Parameter 1 should be type of Object.");
        }
        const target = obj.constructor;
        const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].get(target);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaStorage"].cache(target);
        let asn1Value = [];
        if (schema.itemType) {
            if (!Array.isArray(obj)) {
                throw new TypeError("Parameter 1 should be type of Array.");
            }
            if (typeof schema.itemType === "number") {
                const converter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultConverter"](schema.itemType);
                if (!converter) {
                    throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
                }
                asn1Value = obj.map((o)=>converter.toASN(o));
            } else {
                asn1Value = obj.map((o)=>this.toAsnItem({
                        type: schema.itemType
                    }, "[]", target, o));
            }
        } else {
            for(const key in schema.items){
                const schemaItem = schema.items[key];
                const objProp = obj[key];
                if (objProp === undefined || schemaItem.defaultValue === objProp || typeof schemaItem.defaultValue === "object" && typeof objProp === "object" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArrayEqual"])(this.serialize(schemaItem.defaultValue), this.serialize(objProp))) {
                    continue;
                }
                const asn1Item = AsnSerializer.toAsnItem(schemaItem, key, target, objProp);
                if (typeof schemaItem.context === "number") {
                    if (schemaItem.implicit) {
                        if (!schemaItem.repeated && (typeof schemaItem.type === "number" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConvertible"])(schemaItem.type))) {
                            const value = {};
                            value.valueHex = asn1Item instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Null"] ? asn1Item.valueBeforeDecodeView : asn1Item.valueBlock.toBER();
                            asn1Value.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Primitive"]({
                                optional: schemaItem.optional,
                                idBlock: {
                                    tagClass: 3,
                                    tagNumber: schemaItem.context
                                },
                                ...value
                            }));
                        } else {
                            asn1Value.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Constructed"]({
                                optional: schemaItem.optional,
                                idBlock: {
                                    tagClass: 3,
                                    tagNumber: schemaItem.context
                                },
                                value: asn1Item.valueBlock.value
                            }));
                        }
                    } else {
                        asn1Value.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Constructed"]({
                            optional: schemaItem.optional,
                            idBlock: {
                                tagClass: 3,
                                tagNumber: schemaItem.context
                            },
                            value: [
                                asn1Item
                            ]
                        }));
                    }
                } else if (schemaItem.repeated) {
                    asn1Value = asn1Value.concat(asn1Item);
                } else {
                    asn1Value.push(asn1Item);
                }
            }
        }
        let asnSchema;
        switch(schema.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence:
                asnSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Sequence"]({
                    value: asn1Value
                });
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Set:
                asnSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Set"]({
                    value: asn1Value
                });
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice:
                if (!asn1Value[0]) {
                    throw new Error(`Schema '${target.name}' has wrong data. Choice cannot be empty.`);
                }
                asnSchema = asn1Value[0];
                break;
        }
        return asnSchema;
    }
    static toAsnItem(schemaItem, key, target, objProp) {
        let asn1Item;
        if (typeof schemaItem.type === "number") {
            const converter = schemaItem.converter;
            if (!converter) {
                throw new Error(`Property '${key}' doesn't have converter for type ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"][schemaItem.type]} in schema '${target.name}'`);
            }
            if (schemaItem.repeated) {
                if (!Array.isArray(objProp)) {
                    throw new TypeError("Parameter 'objProp' should be type of Array.");
                }
                const items = Array.from(objProp, (element)=>converter.toASN(element));
                const Container = schemaItem.repeated === "sequence" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Sequence"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Set"];
                asn1Item = new Container({
                    value: items
                });
            } else {
                asn1Item = converter.toASN(objProp);
            }
        } else {
            if (schemaItem.repeated) {
                if (!Array.isArray(objProp)) {
                    throw new TypeError("Parameter 'objProp' should be type of Array.");
                }
                const items = Array.from(objProp, (element)=>this.toASN(element));
                const Container = schemaItem.repeated === "sequence" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Sequence"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Set"];
                asn1Item = new Container({
                    value: items
                });
            } else {
                asn1Item = this.toASN(objProp);
            }
        }
        return asn1Item;
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/convert.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnConvert",
    ()=>AsnConvert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/asn1js/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pvtsutils/build/index.es.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$serializer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/serializer.js [app-route] (ecmascript)");
;
;
;
;
class AsnConvert {
    static serialize(obj) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$serializer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnSerializer"].serialize(obj);
    }
    static parse(data, target) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnParser"].parse(data, target);
    }
    static toString(data) {
        const buf = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].isBufferSource(data) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pvtsutils$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferSourceConverter"].toArrayBuffer(data) : AsnConvert.serialize(data);
        const asn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$asn1js$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBER"](buf);
        if (asn.offset === -1) {
            throw new Error(`Cannot decode ASN.1 data. ${asn.result.error}`);
        }
        return asn.result.toString();
    }
}
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$serializer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/serializer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$errors$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/errors/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/convert.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsnArray",
    ()=>AsnArray
]);
class AsnArray extends Array {
    constructor(items = []){
        if (typeof items === "number") {
            super(items);
        } else {
            super();
            for (const item of items){
                this.push(item);
            }
        }
    }
}
}),
"[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__spread",
    ()=>__spread,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values
]);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
;
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}
}),
"[project]/node_modules/reflect-metadata/Reflect.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ var Reflect;
(function(Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : ("TURBOPACK compile-time truthy", 1) ? /*TURBOPACK member replacement*/ __turbopack_context__.g : "TURBOPACK unreachable";
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect !== "undefined") {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        function makeExporter(target, previous) {
            return function(key, value) {
                Object.defineProperty(target, key, {
                    configurable: true,
                    writable: true,
                    value: value
                });
                if (previous) previous(key, value);
            };
        }
        function functionThis() {
            try {
                return Function("return this;")();
            } catch (_) {}
        }
        function indirectEvalThis() {
            try {
                return (0, eval)("(function() { return this; })()");
            } catch (_) {}
        }
        function sloppyModeThis() {
            return functionThis() || indirectEvalThis();
        }
    })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = ({
            __proto__: []
        }) instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate ? function() {
                return MakeDictionary(Object.create(null));
            } : supportsProto ? function() {
                return MakeDictionary({
                    __proto__: null
                });
            } : function() {
                return MakeDictionary({});
            },
            has: downLevel ? function(map, key) {
                return hasOwn.call(map, key);
            } : function(map, key) {
                return key in map;
            },
            get: downLevel ? function(map, key) {
                return hasOwn.call(map, key) ? map[key] : undefined;
            } : function(map, key) {
                return map[key];
            }
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : undefined;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */ function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators)) throw new TypeError();
                if (!IsObject(target)) throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
                if (IsNull(attributes)) attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            } else {
                if (!IsArray(decorators)) throw new TypeError();
                if (!IsConstructor(target)) throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */ function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target)) throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */ function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */ function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */ function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */ function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */ function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */ function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */ function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */ function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            if (!IsObject(target)) throw new TypeError();
            if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
            var provider = GetMetadataProvider(target, propertyKey, /*Create*/ false);
            if (IsUndefined(provider)) return false;
            return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for(var i = decorators.length - 1; i >= 0; --i){
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated)) throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for(var i = decorators.length - 1; i >= 0; --i){
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated)) throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn) return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var provider = GetMetadataProvider(O, P, /*Create*/ false);
            if (IsUndefined(provider)) return false;
            return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var provider = GetMetadataProvider(O, P, /*Create*/ false);
            if (IsUndefined(provider)) return;
            return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var provider = GetMetadataProvider(O, P, /*Create*/ true);
            provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null) return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0) return ownKeys;
            if (ownKeys.length <= 0) return parentKeys;
            var set = new _Set();
            var keys = [];
            for(var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++){
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for(var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++){
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var provider = GetMetadataProvider(O, P, /*create*/ false);
            if (!provider) {
                return [];
            }
            return provider.OrdinaryOwnMetadataKeys(O, P);
        }
        // 6 ECMAScript Data Types and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null) return 1 /* Null */ ;
            switch(typeof x){
                case "undefined":
                    return 0 /* Undefined */ ;
                case "boolean":
                    return 2 /* Boolean */ ;
                case "string":
                    return 3 /* String */ ;
                case "symbol":
                    return 4 /* Symbol */ ;
                case "number":
                    return 5 /* Number */ ;
                case "object":
                    return x === null ? 1 /* Null */  : 6 /* Object */ ;
                default:
                    return 6 /* Object */ ;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch(Type(input)){
                case 0 /* Undefined */ :
                    return input;
                case 1 /* Null */ :
                    return input;
                case 2 /* Boolean */ :
                    return input;
                case 3 /* String */ :
                    return input;
                case 4 /* Symbol */ :
                    return input;
                case 5 /* Number */ :
                    return input;
            }
            var hint = PreferredType === 3 /* String */  ? "string" : PreferredType === 5 /* Number */  ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result)) throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result)) return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result)) return result;
                }
            } else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result)) return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result)) return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */ );
            if (IsSymbol(key)) return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch(Type(argument)){
                case 3 /* String */ :
                    return true;
                case 4 /* Symbol */ :
                    return true;
                default:
                    return false;
            }
        }
        function SameValueZero(x, y) {
            return x === y || x !== x && y !== y;
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null) return undefined;
            if (!IsCallable(func)) throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method)) throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator)) throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f) f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype) return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype) return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype) return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function") return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O) return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // Global metadata registry
        // - Allows `import "reflect-metadata"` and `import "reflect-metadata/no-conflict"` to interoperate.
        // - Uses isolated metadata if `Reflect` is frozen before the registry can be installed.
        /**
         * Creates a registry used to allow multiple `reflect-metadata` providers.
         */ function CreateMetadataRegistry() {
            var fallback;
            if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
                // interoperate with older version of `reflect-metadata` that did not support a registry.
                fallback = CreateFallbackProvider(root.Reflect);
            }
            var first;
            var second;
            var rest;
            var targetProviderMap = new _WeakMap();
            var registry = {
                registerProvider: registerProvider,
                getProvider: getProvider,
                setProvider: setProvider
            };
            return registry;
            //TURBOPACK unreachable
            ;
            function registerProvider(provider) {
                if (!Object.isExtensible(registry)) {
                    throw new Error("Cannot add provider to a frozen registry.");
                }
                switch(true){
                    case fallback === provider:
                        break;
                    case IsUndefined(first):
                        first = provider;
                        break;
                    case first === provider:
                        break;
                    case IsUndefined(second):
                        second = provider;
                        break;
                    case second === provider:
                        break;
                    default:
                        if (rest === undefined) rest = new _Set();
                        rest.add(provider);
                        break;
                }
            }
            function getProviderNoCache(O, P) {
                if (!IsUndefined(first)) {
                    if (first.isProviderFor(O, P)) return first;
                    if (!IsUndefined(second)) {
                        if (second.isProviderFor(O, P)) return first;
                        if (!IsUndefined(rest)) {
                            var iterator = GetIterator(rest);
                            while(true){
                                var next = IteratorStep(iterator);
                                if (!next) {
                                    return undefined;
                                }
                                var provider = IteratorValue(next);
                                if (provider.isProviderFor(O, P)) {
                                    IteratorClose(iterator);
                                    return provider;
                                }
                            }
                        }
                    }
                }
                if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
                    return fallback;
                }
                return undefined;
            }
            function getProvider(O, P) {
                var providerMap = targetProviderMap.get(O);
                var provider;
                if (!IsUndefined(providerMap)) {
                    provider = providerMap.get(P);
                }
                if (!IsUndefined(provider)) {
                    return provider;
                }
                provider = getProviderNoCache(O, P);
                if (!IsUndefined(provider)) {
                    if (IsUndefined(providerMap)) {
                        providerMap = new _Map();
                        targetProviderMap.set(O, providerMap);
                    }
                    providerMap.set(P, provider);
                }
                return provider;
            }
            function hasProvider(provider) {
                if (IsUndefined(provider)) throw new TypeError();
                return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
            }
            function setProvider(O, P, provider) {
                if (!hasProvider(provider)) {
                    throw new Error("Metadata provider not registered.");
                }
                var existingProvider = getProvider(O, P);
                if (existingProvider !== provider) {
                    if (!IsUndefined(existingProvider)) {
                        return false;
                    }
                    var providerMap = targetProviderMap.get(O);
                    if (IsUndefined(providerMap)) {
                        providerMap = new _Map();
                        targetProviderMap.set(O, providerMap);
                    }
                    providerMap.set(P, provider);
                }
                return true;
            }
        }
        /**
         * Gets or creates the shared registry of metadata providers.
         */ function GetOrCreateMetadataRegistry() {
            var metadataRegistry;
            if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
                metadataRegistry = root.Reflect[registrySymbol];
            }
            if (IsUndefined(metadataRegistry)) {
                metadataRegistry = CreateMetadataRegistry();
            }
            if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
                Object.defineProperty(root.Reflect, registrySymbol, {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: metadataRegistry
                });
            }
            return metadataRegistry;
        }
        function CreateMetadataProvider(registry) {
            // [[Metadata]] internal slot
            // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
            var metadata = new _WeakMap();
            var provider = {
                isProviderFor: function(O, P) {
                    var targetMetadata = metadata.get(O);
                    if (IsUndefined(targetMetadata)) return false;
                    return targetMetadata.has(P);
                },
                OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata,
                OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata,
                OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata,
                OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys,
                OrdinaryDeleteMetadata: OrdinaryDeleteMetadata
            };
            metadataRegistry.registerProvider(provider);
            return provider;
            //TURBOPACK unreachable
            ;
            function GetOrCreateMetadataMap(O, P, Create) {
                var targetMetadata = metadata.get(O);
                var createdTargetMetadata = false;
                if (IsUndefined(targetMetadata)) {
                    if (!Create) return undefined;
                    targetMetadata = new _Map();
                    metadata.set(O, targetMetadata);
                    createdTargetMetadata = true;
                }
                var metadataMap = targetMetadata.get(P);
                if (IsUndefined(metadataMap)) {
                    if (!Create) return undefined;
                    metadataMap = new _Map();
                    targetMetadata.set(P, metadataMap);
                    if (!registry.setProvider(O, P, provider)) {
                        targetMetadata.delete(P);
                        if (createdTargetMetadata) {
                            metadata.delete(O);
                        }
                        throw new Error("Wrong provider for target.");
                    }
                }
                return metadataMap;
            }
            // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
            function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap)) return false;
                return ToBoolean(metadataMap.has(MetadataKey));
            }
            // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
            function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap)) return undefined;
                return metadataMap.get(MetadataKey);
            }
            // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
            function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
                metadataMap.set(MetadataKey, MetadataValue);
            }
            // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
            function OrdinaryOwnMetadataKeys(O, P) {
                var keys = [];
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap)) return keys;
                var keysObj = metadataMap.keys();
                var iterator = GetIterator(keysObj);
                var k = 0;
                while(true){
                    var next = IteratorStep(iterator);
                    if (!next) {
                        keys.length = k;
                        return keys;
                    }
                    var nextValue = IteratorValue(next);
                    try {
                        keys[k] = nextValue;
                    } catch (e) {
                        try {
                            IteratorClose(iterator);
                        } finally{
                            throw e;
                        }
                    }
                    k++;
                }
            }
            function OrdinaryDeleteMetadata(MetadataKey, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap)) return false;
                if (!metadataMap.delete(MetadataKey)) return false;
                if (metadataMap.size === 0) {
                    var targetMetadata = metadata.get(O);
                    if (!IsUndefined(targetMetadata)) {
                        targetMetadata.delete(P);
                        if (targetMetadata.size === 0) {
                            metadata.delete(targetMetadata);
                        }
                    }
                }
                return true;
            }
        }
        function CreateFallbackProvider(reflect) {
            var defineMetadata = reflect.defineMetadata, hasOwnMetadata = reflect.hasOwnMetadata, getOwnMetadata = reflect.getOwnMetadata, getOwnMetadataKeys = reflect.getOwnMetadataKeys, deleteMetadata = reflect.deleteMetadata;
            var metadataOwner = new _WeakMap();
            var provider = {
                isProviderFor: function(O, P) {
                    var metadataPropertySet = metadataOwner.get(O);
                    if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
                        return true;
                    }
                    if (getOwnMetadataKeys(O, P).length) {
                        if (IsUndefined(metadataPropertySet)) {
                            metadataPropertySet = new _Set();
                            metadataOwner.set(O, metadataPropertySet);
                        }
                        metadataPropertySet.add(P);
                        return true;
                    }
                    return false;
                },
                OrdinaryDefineOwnMetadata: defineMetadata,
                OrdinaryHasOwnMetadata: hasOwnMetadata,
                OrdinaryGetOwnMetadata: getOwnMetadata,
                OrdinaryOwnMetadataKeys: getOwnMetadataKeys,
                OrdinaryDeleteMetadata: deleteMetadata
            };
            return provider;
        }
        /**
         * Gets the metadata provider for an object. If the object has no metadata provider and this is for a create operation,
         * then this module's metadata provider is assigned to the object.
         */ function GetMetadataProvider(O, P, Create) {
            var registeredProvider = metadataRegistry.getProvider(O, P);
            if (!IsUndefined(registeredProvider)) {
                return registeredProvider;
            }
            if (Create) {
                if (metadataRegistry.setProvider(O, P, metadataProvider)) {
                    return metadataProvider;
                }
                throw new Error("Illegal state.");
            }
            return undefined;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = function() {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function() {
                    return this;
                };
                MapIterator.prototype[iteratorSymbol] = function() {
                    return this;
                };
                MapIterator.prototype.next = function() {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        } else {
                            this._index++;
                        }
                        return {
                            value: result,
                            done: false
                        };
                    }
                    return {
                        value: undefined,
                        done: true
                    };
                };
                MapIterator.prototype.throw = function(error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function(value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return {
                        value: value,
                        done: true
                    };
                };
                return MapIterator;
            }();
            var Map1 = function() {
                function Map1() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map1.prototype, "size", {
                    get: function() {
                        return this._keys.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Map1.prototype.has = function(key) {
                    return this._find(key, /*insert*/ false) >= 0;
                };
                Map1.prototype.get = function(key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map1.prototype.set = function(key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map1.prototype.delete = function(key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for(var i = index + 1; i < size; i++){
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (SameValueZero(key, this._cacheKey)) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map1.prototype.clear = function() {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map1.prototype.keys = function() {
                    return new MapIterator(this._keys, this._values, getKey);
                };
                Map1.prototype.values = function() {
                    return new MapIterator(this._keys, this._values, getValue);
                };
                Map1.prototype.entries = function() {
                    return new MapIterator(this._keys, this._values, getEntry);
                };
                Map1.prototype["@@iterator"] = function() {
                    return this.entries();
                };
                Map1.prototype[iteratorSymbol] = function() {
                    return this.entries();
                };
                Map1.prototype._find = function(key, insert) {
                    if (!SameValueZero(this._cacheKey, key)) {
                        this._cacheIndex = -1;
                        for(var i = 0; i < this._keys.length; i++){
                            if (SameValueZero(this._keys[i], key)) {
                                this._cacheIndex = i;
                                break;
                            }
                        }
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map1;
            }();
            return Map1;
            //TURBOPACK unreachable
            ;
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [
                    key,
                    value
                ];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            var Set1 = function() {
                function Set1() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set1.prototype, "size", {
                    get: function() {
                        return this._map.size;
                    },
                    enumerable: true,
                    configurable: true
                });
                Set1.prototype.has = function(value) {
                    return this._map.has(value);
                };
                Set1.prototype.add = function(value) {
                    return this._map.set(value, value), this;
                };
                Set1.prototype.delete = function(value) {
                    return this._map.delete(value);
                };
                Set1.prototype.clear = function() {
                    this._map.clear();
                };
                Set1.prototype.keys = function() {
                    return this._map.keys();
                };
                Set1.prototype.values = function() {
                    return this._map.keys();
                };
                Set1.prototype.entries = function() {
                    return this._map.entries();
                };
                Set1.prototype["@@iterator"] = function() {
                    return this.keys();
                };
                Set1.prototype[iteratorSymbol] = function() {
                    return this.keys();
                };
                return Set1;
            }();
            return Set1;
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return function() {
                function WeakMap1() {
                    this._key = CreateUniqueKey();
                }
                WeakMap1.prototype.has = function(target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap1.prototype.get = function(target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap1.prototype.set = function(target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap1.prototype.delete = function(target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap1.prototype.clear = function() {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap1;
            }();
            //TURBOPACK unreachable
            ;
            function CreateUniqueKey() {
                var key;
                do key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key))
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create) return undefined;
                    Object.defineProperty(target, rootKey, {
                        value: HashMap.create()
                    });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for(var i = 0; i < size; ++i)buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    var array = new Uint8Array(size);
                    if (typeof crypto !== "undefined") {
                        crypto.getRandomValues(array);
                    } else if (typeof msCrypto !== "undefined") {
                        msCrypto.getRandomValues(array);
                    } else {
                        FillRandomBytes(array, size);
                    }
                    return array;
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for(var offset = 0; offset < UUID_SIZE; ++offset){
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8) result += "-";
                    if (byte < 16) result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_clear_attrs.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACClearAttrs",
    ()=>ACClearAttrs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_name.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/attribute.js [app-route] (ecmascript)");
;
;
;
class ACClearAttrs {
    constructor(params = {}){
        this.acIssuer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"]();
        this.acSerial = 0;
        this.attrs = [];
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"]
    })
], ACClearAttrs.prototype, "acIssuer", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], ACClearAttrs.prototype, "acSerial", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Attribute"],
        repeated: "sequence"
    })
], ACClearAttrs.prototype, "attrs", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_spec.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttrSpec",
    ()=>AttrSpec
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var AttrSpec_1;
;
;
let AttrSpec = AttrSpec_1 = class AttrSpec extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, AttrSpec_1.prototype);
    }
};
AttrSpec = AttrSpec_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], AttrSpec);
;
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_controls.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AAControls",
    ()=>AAControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_spec$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_spec.js [app-route] (ecmascript)");
;
;
;
class AAControls {
    constructor(params = {}){
        this.permitUnSpecified = true;
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AAControls.prototype, "pathLenConstraint", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_spec$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttrSpec"],
        implicit: true,
        context: 0,
        optional: true
    })
], AAControls.prototype, "permittedAttrs", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_spec$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttrSpec"],
        implicit: true,
        context: 1,
        optional: true
    })
], AAControls.prototype, "excludedAttrs", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Boolean,
        defaultValue: true
    })
], AAControls.prototype, "permitUnSpecified", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/issuer_serial.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IssuerSerial",
    ()=>IssuerSerial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_names.js [app-route] (ecmascript)");
;
;
;
class IssuerSerial {
    constructor(params = {}){
        this.issuer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralNames"]();
        this.serial = new ArrayBuffer(0);
        this.issuerUID = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralNames"]
    })
], IssuerSerial.prototype, "issuer", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], IssuerSerial.prototype, "serial", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString,
        optional: true
    })
], IssuerSerial.prototype, "issuerUID", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_digest_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DigestedObjectType",
    ()=>DigestedObjectType,
    "ObjectDigestInfo",
    ()=>ObjectDigestInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
;
;
;
var DigestedObjectType;
(function(DigestedObjectType) {
    DigestedObjectType[DigestedObjectType["publicKey"] = 0] = "publicKey";
    DigestedObjectType[DigestedObjectType["publicKeyCert"] = 1] = "publicKeyCert";
    DigestedObjectType[DigestedObjectType["otherObjectTypes"] = 2] = "otherObjectTypes";
})(DigestedObjectType || (DigestedObjectType = {}));
class ObjectDigestInfo {
    constructor(params = {}){
        this.digestedObjectType = DigestedObjectType.publicKey;
        this.digestAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]();
        this.objectDigest = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], ObjectDigestInfo.prototype, "digestedObjectType", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier,
        optional: true
    })
], ObjectDigestInfo.prototype, "otherObjectTypeID", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]
    })
], ObjectDigestInfo.prototype, "digestAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString
    })
], ObjectDigestInfo.prototype, "objectDigest", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/v2_form.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V2Form",
    ()=>V2Form
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_names.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/issuer_serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_digest_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_digest_info.js [app-route] (ecmascript)");
;
;
;
;
;
class V2Form {
    constructor(params = {}){
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralNames"],
        optional: true
    })
], V2Form.prototype, "issuerName", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IssuerSerial"],
        context: 0,
        implicit: true,
        optional: true
    })
], V2Form.prototype, "baseCertificateID", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_digest_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ObjectDigestInfo"],
        context: 1,
        implicit: true,
        optional: true
    })
], V2Form.prototype, "objectDigestInfo", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_issuer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttCertIssuer",
    ()=>AttCertIssuer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_name.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$v2_form$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/v2_form.js [app-route] (ecmascript)");
;
;
;
;
let AttCertIssuer = class AttCertIssuer {
    constructor(params = {}){
        Object.assign(this, params);
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"],
        repeated: "sequence"
    })
], AttCertIssuer.prototype, "v1Form", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$v2_form$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["V2Form"],
        context: 0,
        implicit: true
    })
], AttCertIssuer.prototype, "v2Form", void 0);
AttCertIssuer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], AttCertIssuer);
;
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_validity_period.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttCertValidityPeriod",
    ()=>AttCertValidityPeriod
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
;
;
class AttCertValidityPeriod {
    constructor(params = {}){
        this.notBeforeTime = new Date();
        this.notAfterTime = new Date();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].GeneralizedTime
    })
], AttCertValidityPeriod.prototype, "notBeforeTime", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].GeneralizedTime
    })
], AttCertValidityPeriod.prototype, "notAfterTime", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/holder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Holder",
    ()=>Holder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/issuer_serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_names.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_digest_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_digest_info.js [app-route] (ecmascript)");
;
;
;
;
;
class Holder {
    constructor(params = {}){
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IssuerSerial"],
        implicit: true,
        context: 0,
        optional: true
    })
], Holder.prototype, "baseCertificateID", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralNames"],
        implicit: true,
        context: 1,
        optional: true
    })
], Holder.prototype, "entityName", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_digest_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ObjectDigestInfo"],
        implicit: true,
        context: 2,
        optional: true
    })
], Holder.prototype, "objectDigestInfo", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttCertVersion",
    ()=>AttCertVersion,
    "AttributeCertificateInfo",
    ()=>AttributeCertificateInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/attribute.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$extension$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/extension.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$holder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/holder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_issuer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_issuer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_validity_period$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_validity_period.js [app-route] (ecmascript)");
;
;
;
;
;
;
var AttCertVersion;
(function(AttCertVersion) {
    AttCertVersion[AttCertVersion["v2"] = 1] = "v2";
})(AttCertVersion || (AttCertVersion = {}));
class AttributeCertificateInfo {
    constructor(params = {}){
        this.version = AttCertVersion.v2;
        this.holder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$holder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Holder"]();
        this.issuer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_issuer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttCertIssuer"]();
        this.signature = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]();
        this.serialNumber = new ArrayBuffer(0);
        this.attrCertValidityPeriod = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_validity_period$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttCertValidityPeriod"]();
        this.attributes = [];
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], AttributeCertificateInfo.prototype, "version", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$holder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Holder"]
    })
], AttributeCertificateInfo.prototype, "holder", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_issuer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttCertIssuer"]
    })
], AttributeCertificateInfo.prototype, "issuer", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]
    })
], AttributeCertificateInfo.prototype, "signature", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], AttributeCertificateInfo.prototype, "serialNumber", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_validity_period$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttCertValidityPeriod"]
    })
], AttributeCertificateInfo.prototype, "attrCertValidityPeriod", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Attribute"],
        repeated: "sequence"
    })
], AttributeCertificateInfo.prototype, "attributes", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString,
        optional: true
    })
], AttributeCertificateInfo.prototype, "issuerUniqueID", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$extension$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Extensions"],
        optional: true
    })
], AttributeCertificateInfo.prototype, "extensions", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttributeCertificate",
    ()=>AttributeCertificate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attribute_certificate_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate_info.js [app-route] (ecmascript)");
;
;
;
;
class AttributeCertificate {
    constructor(params = {}){
        this.acinfo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attribute_certificate_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttributeCertificateInfo"]();
        this.signatureAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]();
        this.signatureValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attribute_certificate_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AttributeCertificateInfo"]
    })
], AttributeCertificate.prototype, "acinfo", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]
    })
], AttributeCertificate.prototype, "signatureAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString
    })
], AttributeCertificate.prototype, "signatureValue", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/class_list.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClassList",
    ()=>ClassList,
    "ClassListFlags",
    ()=>ClassListFlags
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$bit_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/bit_string.js [app-route] (ecmascript)");
;
var ClassListFlags;
(function(ClassListFlags) {
    ClassListFlags[ClassListFlags["unmarked"] = 1] = "unmarked";
    ClassListFlags[ClassListFlags["unclassified"] = 2] = "unclassified";
    ClassListFlags[ClassListFlags["restricted"] = 4] = "restricted";
    ClassListFlags[ClassListFlags["confidential"] = 8] = "confidential";
    ClassListFlags[ClassListFlags["secret"] = 16] = "secret";
    ClassListFlags[ClassListFlags["topSecret"] = 32] = "topSecret";
})(ClassListFlags || (ClassListFlags = {}));
class ClassList extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$bit_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BitString"] {
}
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/security_category.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SecurityCategory",
    ()=>SecurityCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
;
;
class SecurityCategory {
    constructor(params = {}){
        this.type = "";
        this.value = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier,
        implicit: true,
        context: 0
    })
], SecurityCategory.prototype, "type", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any,
        implicit: true,
        context: 1
    })
], SecurityCategory.prototype, "value", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/clearance.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clearance",
    ()=>Clearance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$class_list$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/class_list.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$security_category$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/security_category.js [app-route] (ecmascript)");
;
;
;
;
class Clearance {
    constructor(params = {}){
        this.policyId = "";
        this.classList = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$class_list$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ClassList"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$class_list$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ClassListFlags"].unclassified);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], Clearance.prototype, "policyId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$class_list$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ClassList"],
        defaultValue: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$class_list$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ClassList"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$class_list$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ClassListFlags"].unclassified)
    })
], Clearance.prototype, "classList", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$security_category$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SecurityCategory"],
        repeated: "set"
    })
], Clearance.prototype, "securityCategories", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/ietf_attr_syntax.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IetfAttrSyntax",
    ()=>IetfAttrSyntax,
    "IetfAttrSyntaxValueChoices",
    ()=>IetfAttrSyntaxValueChoices
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_names.js [app-route] (ecmascript)");
;
;
;
class IetfAttrSyntaxValueChoices {
    constructor(params = {}){
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], IetfAttrSyntaxValueChoices.prototype, "cotets", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], IetfAttrSyntaxValueChoices.prototype, "oid", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Utf8String
    })
], IetfAttrSyntaxValueChoices.prototype, "string", void 0);
class IetfAttrSyntax {
    constructor(params = {}){
        this.values = [];
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralNames"],
        implicit: true,
        context: 0,
        optional: true
    })
], IetfAttrSyntax.prototype, "policyAuthority", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: IetfAttrSyntaxValueChoices,
        repeated: "sequence"
    })
], IetfAttrSyntax.prototype, "values", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_identifiers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "id_aca",
    ()=>id_aca,
    "id_aca_accessIdentity",
    ()=>id_aca_accessIdentity,
    "id_aca_authenticationInfo",
    ()=>id_aca_authenticationInfo,
    "id_aca_chargingIdentity",
    ()=>id_aca_chargingIdentity,
    "id_aca_encAttrs",
    ()=>id_aca_encAttrs,
    "id_aca_group",
    ()=>id_aca_group,
    "id_at",
    ()=>id_at,
    "id_at_clearance",
    ()=>id_at_clearance,
    "id_at_role",
    ()=>id_at_role,
    "id_ce_targetInformation",
    ()=>id_ce_targetInformation,
    "id_pe_aaControls",
    ()=>id_pe_aaControls,
    "id_pe_ac_auditIdentity",
    ()=>id_pe_ac_auditIdentity,
    "id_pe_ac_proxying",
    ()=>id_pe_ac_proxying
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/object_identifiers.js [app-route] (ecmascript)");
;
const id_pe_ac_auditIdentity = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_pe"]}.4`;
const id_pe_aaControls = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_pe"]}.6`;
const id_pe_ac_proxying = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_pe"]}.10`;
const id_ce_targetInformation = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_ce"]}.55`;
const id_aca = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_pkix"]}.10`;
const id_aca_authenticationInfo = `${id_aca}.1`;
const id_aca_accessIdentity = `${id_aca}.2`;
const id_aca_chargingIdentity = `${id_aca}.3`;
const id_aca_group = `${id_aca}.4`;
const id_aca_encAttrs = `${id_aca}.6`;
const id_at = "2.5.4";
const id_at_role = `${id_at}.72`;
const id_at_clearance = "2.5.1.5.55";
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/target.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Target",
    ()=>Target,
    "TargetCert",
    ()=>TargetCert,
    "Targets",
    ()=>Targets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_name.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/issuer_serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_digest_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_digest_info.js [app-route] (ecmascript)");
var Targets_1;
;
;
;
;
;
class TargetCert {
    constructor(params = {}){
        this.targetCertificate = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IssuerSerial"]();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IssuerSerial"]
    })
], TargetCert.prototype, "targetCertificate", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"],
        optional: true
    })
], TargetCert.prototype, "targetName", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_digest_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ObjectDigestInfo"],
        optional: true
    })
], TargetCert.prototype, "certDigestInfo", void 0);
let Target = class Target {
    constructor(params = {}){
        Object.assign(this, params);
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"],
        context: 0,
        implicit: true
    })
], Target.prototype, "targetName", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"],
        context: 1,
        implicit: true
    })
], Target.prototype, "targetGroup", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: TargetCert,
        context: 2,
        implicit: true
    })
], Target.prototype, "targetCert", void 0);
Target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], Target);
;
let Targets = Targets_1 = class Targets extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, Targets_1.prototype);
    }
};
Targets = Targets_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: Target
    })
], Targets);
;
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/proxy_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProxyInfo",
    ()=>ProxyInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$target$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/target.js [app-route] (ecmascript)");
var ProxyInfo_1;
;
;
;
let ProxyInfo = ProxyInfo_1 = class ProxyInfo extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, ProxyInfo_1.prototype);
    }
};
ProxyInfo = ProxyInfo_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$target$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Targets"]
    })
], ProxyInfo);
;
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/role_syntax.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RoleSyntax",
    ()=>RoleSyntax
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_names.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_name.js [app-route] (ecmascript)");
;
;
;
class RoleSyntax {
    constructor(params = {}){
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_names$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralNames"],
        implicit: true,
        context: 0,
        optional: true
    })
], RoleSyntax.prototype, "roleAuthority", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"],
        implicit: true,
        context: 1
    })
], RoleSyntax.prototype, "roleName", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/svce_auth_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SvceAuthInfo",
    ()=>SvceAuthInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/general_name.js [app-route] (ecmascript)");
;
;
;
class SvceAuthInfo {
    constructor(params = {}){
        this.service = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"]();
        this.ident = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"]();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"]
    })
], SvceAuthInfo.prototype, "service", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$general_name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneralName"]
    })
], SvceAuthInfo.prototype, "ident", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], SvceAuthInfo.prototype, "authInfo", void 0);
}),
"[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$aa_clear_attrs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_clear_attrs.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$aa_controls$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_controls.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_issuer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_issuer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_cert_validity_period$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_validity_period.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attr_spec$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_spec.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attribute_certificate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$attribute_certificate_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$class_list$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/class_list.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$clearance$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/clearance.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$holder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/holder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$ietf_attr_syntax$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/ietf_attr_syntax.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$issuer_serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/issuer_serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_digest_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_digest_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_identifiers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$proxy_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/proxy_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$role_syntax$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/role_syntax.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$security_category$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/security_category.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$svce_auth_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/svce_auth_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$target$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/target.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$v2_form$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/v2_form.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/@peculiar/asn1-ecc/build/es2015/object_identifiers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "id_ecDH",
    ()=>id_ecDH,
    "id_ecMQV",
    ()=>id_ecMQV,
    "id_ecPublicKey",
    ()=>id_ecPublicKey,
    "id_ecdsaWithSHA1",
    ()=>id_ecdsaWithSHA1,
    "id_ecdsaWithSHA224",
    ()=>id_ecdsaWithSHA224,
    "id_ecdsaWithSHA256",
    ()=>id_ecdsaWithSHA256,
    "id_ecdsaWithSHA384",
    ()=>id_ecdsaWithSHA384,
    "id_ecdsaWithSHA512",
    ()=>id_ecdsaWithSHA512,
    "id_secp192r1",
    ()=>id_secp192r1,
    "id_secp224r1",
    ()=>id_secp224r1,
    "id_secp256r1",
    ()=>id_secp256r1,
    "id_secp384r1",
    ()=>id_secp384r1,
    "id_secp521r1",
    ()=>id_secp521r1,
    "id_sect163k1",
    ()=>id_sect163k1,
    "id_sect163r2",
    ()=>id_sect163r2,
    "id_sect233k1",
    ()=>id_sect233k1,
    "id_sect233r1",
    ()=>id_sect233r1,
    "id_sect283k1",
    ()=>id_sect283k1,
    "id_sect283r1",
    ()=>id_sect283r1,
    "id_sect409k1",
    ()=>id_sect409k1,
    "id_sect409r1",
    ()=>id_sect409r1,
    "id_sect571k1",
    ()=>id_sect571k1,
    "id_sect571r1",
    ()=>id_sect571r1
]);
const id_ecPublicKey = "1.2.840.10045.2.1";
const id_ecDH = "1.3.132.1.12";
const id_ecMQV = "1.3.132.1.13";
const id_ecdsaWithSHA1 = "1.2.840.10045.4.1";
const id_ecdsaWithSHA224 = "1.2.840.10045.4.3.1";
const id_ecdsaWithSHA256 = "1.2.840.10045.4.3.2";
const id_ecdsaWithSHA384 = "1.2.840.10045.4.3.3";
const id_ecdsaWithSHA512 = "1.2.840.10045.4.3.4";
const id_secp192r1 = "1.2.840.10045.3.1.1";
const id_sect163k1 = "1.3.132.0.1";
const id_sect163r2 = "1.3.132.0.15";
const id_secp224r1 = "1.3.132.0.33";
const id_sect233k1 = "1.3.132.0.26";
const id_sect233r1 = "1.3.132.0.27";
const id_secp256r1 = "1.2.840.10045.3.1.7";
const id_sect283k1 = "1.3.132.0.16";
const id_sect283r1 = "1.3.132.0.17";
const id_secp384r1 = "1.3.132.0.34";
const id_sect409k1 = "1.3.132.0.36";
const id_sect409r1 = "1.3.132.0.37";
const id_secp521r1 = "1.3.132.0.35";
const id_sect571k1 = "1.3.132.0.38";
const id_sect571r1 = "1.3.132.0.39";
}),
"[project]/node_modules/@peculiar/asn1-ecc/build/es2015/algorithms.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ecdsaWithSHA1",
    ()=>ecdsaWithSHA1,
    "ecdsaWithSHA224",
    ()=>ecdsaWithSHA224,
    "ecdsaWithSHA256",
    ()=>ecdsaWithSHA256,
    "ecdsaWithSHA384",
    ()=>ecdsaWithSHA384,
    "ecdsaWithSHA512",
    ()=>ecdsaWithSHA512
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/object_identifiers.js [app-route] (ecmascript)");
;
;
function create(algorithm) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
        algorithm
    });
}
const ecdsaWithSHA1 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_ecdsaWithSHA1"]);
const ecdsaWithSHA224 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_ecdsaWithSHA224"]);
const ecdsaWithSHA256 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_ecdsaWithSHA256"]);
const ecdsaWithSHA384 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_ecdsaWithSHA384"]);
const ecdsaWithSHA512 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_ecdsaWithSHA512"]);
}),
"[project]/node_modules/@peculiar/asn1-ecc/build/es2015/rfc3279.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Curve",
    ()=>Curve,
    "ECPVer",
    ()=>ECPVer,
    "ECPoint",
    ()=>ECPoint,
    "FieldElement",
    ()=>FieldElement,
    "FieldID",
    ()=>FieldID,
    "SpecifiedECDomain",
    ()=>SpecifiedECDomain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
;
;
let FieldID = class FieldID {
    constructor(params = {}){
        Object.assign(this, params);
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], FieldID.prototype, "fieldType", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any
    })
], FieldID.prototype, "parameters", void 0);
FieldID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], FieldID);
;
class ECPoint extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"] {
}
class FieldElement extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"] {
}
let Curve = class Curve {
    constructor(params = {}){
        Object.assign(this, params);
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].OctetString
    })
], Curve.prototype, "a", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].OctetString
    })
], Curve.prototype, "b", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString,
        optional: true
    })
], Curve.prototype, "seed", void 0);
Curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], Curve);
;
var ECPVer;
(function(ECPVer) {
    ECPVer[ECPVer["ecpVer1"] = 1] = "ecpVer1";
})(ECPVer || (ECPVer = {}));
let SpecifiedECDomain = class SpecifiedECDomain {
    constructor(params = {}){
        this.version = ECPVer.ecpVer1;
        Object.assign(this, params);
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], SpecifiedECDomain.prototype, "version", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: FieldID
    })
], SpecifiedECDomain.prototype, "fieldID", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: Curve
    })
], SpecifiedECDomain.prototype, "curve", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: ECPoint
    })
], SpecifiedECDomain.prototype, "base", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], SpecifiedECDomain.prototype, "order", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], SpecifiedECDomain.prototype, "cofactor", void 0);
SpecifiedECDomain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], SpecifiedECDomain);
;
}),
"[project]/node_modules/@peculiar/asn1-ecc/build/es2015/ec_parameters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ECParameters",
    ()=>ECParameters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$rfc3279$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/rfc3279.js [app-route] (ecmascript)");
;
;
;
let ECParameters = class ECParameters {
    constructor(params = {}){
        Object.assign(this, params);
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], ECParameters.prototype, "namedCurve", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null
    })
], ECParameters.prototype, "implicitCurve", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$rfc3279$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SpecifiedECDomain"]
    })
], ECParameters.prototype, "specifiedCurve", void 0);
ECParameters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], ECParameters);
;
}),
"[project]/node_modules/@peculiar/asn1-ecc/build/es2015/ec_private_key.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ECPrivateKey",
    ()=>ECPrivateKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$ec_parameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/ec_parameters.js [app-route] (ecmascript)");
;
;
;
class ECPrivateKey {
    constructor(params = {}){
        this.version = 1;
        this.privateKey = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], ECPrivateKey.prototype, "version", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], ECPrivateKey.prototype, "privateKey", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$ec_parameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ECParameters"],
        context: 0,
        optional: true
    })
], ECPrivateKey.prototype, "parameters", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString,
        context: 1,
        optional: true
    })
], ECPrivateKey.prototype, "publicKey", void 0);
}),
"[project]/node_modules/@peculiar/asn1-ecc/build/es2015/ec_signature_value.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ECDSASigValue",
    ()=>ECDSASigValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
;
;
class ECDSASigValue {
    constructor(params = {}){
        this.r = new ArrayBuffer(0);
        this.s = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], ECDSASigValue.prototype, "r", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], ECDSASigValue.prototype, "s", void 0);
}),
"[project]/node_modules/@peculiar/asn1-ecc/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/algorithms.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$ec_parameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/ec_parameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$ec_private_key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/ec_private_key.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$ec_signature_value$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/ec_signature_value.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$ecc$2f$build$2f$es2015$2f$rfc3279$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-ecc/build/es2015/rfc3279.js [app-route] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/object_identifiers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "id_RSAES_OAEP",
    ()=>id_RSAES_OAEP,
    "id_RSASSA_PSS",
    ()=>id_RSASSA_PSS,
    "id_md2",
    ()=>id_md2,
    "id_md2WithRSAEncryption",
    ()=>id_md2WithRSAEncryption,
    "id_md5",
    ()=>id_md5,
    "id_md5WithRSAEncryption",
    ()=>id_md5WithRSAEncryption,
    "id_mgf1",
    ()=>id_mgf1,
    "id_pSpecified",
    ()=>id_pSpecified,
    "id_pkcs_1",
    ()=>id_pkcs_1,
    "id_rsaEncryption",
    ()=>id_rsaEncryption,
    "id_sha1",
    ()=>id_sha1,
    "id_sha1WithRSAEncryption",
    ()=>id_sha1WithRSAEncryption,
    "id_sha224",
    ()=>id_sha224,
    "id_sha224WithRSAEncryption",
    ()=>id_sha224WithRSAEncryption,
    "id_sha256",
    ()=>id_sha256,
    "id_sha256WithRSAEncryption",
    ()=>id_sha256WithRSAEncryption,
    "id_sha384",
    ()=>id_sha384,
    "id_sha384WithRSAEncryption",
    ()=>id_sha384WithRSAEncryption,
    "id_sha512",
    ()=>id_sha512,
    "id_sha512WithRSAEncryption",
    ()=>id_sha512WithRSAEncryption,
    "id_sha512_224",
    ()=>id_sha512_224,
    "id_sha512_224WithRSAEncryption",
    ()=>id_sha512_224WithRSAEncryption,
    "id_sha512_256",
    ()=>id_sha512_256,
    "id_sha512_256WithRSAEncryption",
    ()=>id_sha512_256WithRSAEncryption,
    "id_ssha224WithRSAEncryption",
    ()=>id_ssha224WithRSAEncryption
]);
const id_pkcs_1 = "1.2.840.113549.1.1";
const id_rsaEncryption = `${id_pkcs_1}.1`;
const id_RSAES_OAEP = `${id_pkcs_1}.7`;
const id_pSpecified = `${id_pkcs_1}.9`;
const id_RSASSA_PSS = `${id_pkcs_1}.10`;
const id_md2WithRSAEncryption = `${id_pkcs_1}.2`;
const id_md5WithRSAEncryption = `${id_pkcs_1}.4`;
const id_sha1WithRSAEncryption = `${id_pkcs_1}.5`;
const id_sha224WithRSAEncryption = `${id_pkcs_1}.14`;
const id_ssha224WithRSAEncryption = id_sha224WithRSAEncryption;
const id_sha256WithRSAEncryption = `${id_pkcs_1}.11`;
const id_sha384WithRSAEncryption = `${id_pkcs_1}.12`;
const id_sha512WithRSAEncryption = `${id_pkcs_1}.13`;
const id_sha512_224WithRSAEncryption = `${id_pkcs_1}.15`;
const id_sha512_256WithRSAEncryption = `${id_pkcs_1}.16`;
const id_sha1 = "1.3.14.3.2.26";
const id_sha224 = "2.16.840.1.101.3.4.2.4";
const id_sha256 = "2.16.840.1.101.3.4.2.1";
const id_sha384 = "2.16.840.1.101.3.4.2.2";
const id_sha512 = "2.16.840.1.101.3.4.2.3";
const id_sha512_224 = "2.16.840.1.101.3.4.2.5";
const id_sha512_256 = "2.16.840.1.101.3.4.2.6";
const id_md2 = "1.2.840.113549.2.2";
const id_md5 = "1.2.840.113549.2.5";
const id_mgf1 = `${id_pkcs_1}.8`;
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/algorithms.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "md2",
    ()=>md2,
    "md2WithRSAEncryption",
    ()=>md2WithRSAEncryption,
    "md4",
    ()=>md4,
    "md5WithRSAEncryption",
    ()=>md5WithRSAEncryption,
    "mgf1SHA1",
    ()=>mgf1SHA1,
    "pSpecifiedEmpty",
    ()=>pSpecifiedEmpty,
    "rsaEncryption",
    ()=>rsaEncryption,
    "sha1",
    ()=>sha1,
    "sha1WithRSAEncryption",
    ()=>sha1WithRSAEncryption,
    "sha224",
    ()=>sha224,
    "sha224WithRSAEncryption",
    ()=>sha224WithRSAEncryption,
    "sha256",
    ()=>sha256,
    "sha256WithRSAEncryption",
    ()=>sha256WithRSAEncryption,
    "sha384",
    ()=>sha384,
    "sha384WithRSAEncryption",
    ()=>sha384WithRSAEncryption,
    "sha512",
    ()=>sha512,
    "sha512WithRSAEncryption",
    ()=>sha512WithRSAEncryption,
    "sha512_224",
    ()=>sha512_224,
    "sha512_224WithRSAEncryption",
    ()=>sha512_224WithRSAEncryption,
    "sha512_256",
    ()=>sha512_256,
    "sha512_256WithRSAEncryption",
    ()=>sha512_256WithRSAEncryption
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/convert.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/object_identifiers.js [app-route] (ecmascript)");
;
;
;
function create(algorithm) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
        algorithm,
        parameters: null
    });
}
const md2 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_md2"]);
const md4 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_md5"]);
const sha1 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha1"]);
const sha224 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha224"]);
const sha256 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha256"]);
const sha384 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha384"]);
const sha512 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512"]);
const sha512_224 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512_224"]);
const sha512_256 = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512_256"]);
const mgf1SHA1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
    algorithm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_mgf1"],
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnConvert"].serialize(sha1)
});
const pSpecifiedEmpty = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
    algorithm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_pSpecified"],
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnConvert"].serialize(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnOctetStringConverter"].toASN(new Uint8Array([
        0xda,
        0x39,
        0xa3,
        0xee,
        0x5e,
        0x6b,
        0x4b,
        0x0d,
        0x32,
        0x55,
        0xbf,
        0xef,
        0x95,
        0x60,
        0x18,
        0x90,
        0xaf,
        0xd8,
        0x07,
        0x09
    ]).buffer))
});
const rsaEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_rsaEncryption"]);
const md2WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_md2WithRSAEncryption"]);
const md5WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_md5WithRSAEncryption"]);
const sha1WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha1WithRSAEncryption"]);
const sha224WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512_224WithRSAEncryption"]);
const sha256WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512_256WithRSAEncryption"]);
const sha384WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha384WithRSAEncryption"]);
const sha512WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512WithRSAEncryption"]);
const sha512_224WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512_224WithRSAEncryption"]);
const sha512_256WithRSAEncryption = create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_sha512_256WithRSAEncryption"]);
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsaes_oaep.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RSAES_OAEP",
    ()=>RSAES_OAEP,
    "RsaEsOaepParams",
    ()=>RsaEsOaepParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/convert.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/object_identifiers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/algorithms.js [app-route] (ecmascript)");
;
;
;
;
;
class RsaEsOaepParams {
    constructor(params = {}){
        this.hashAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha1"]);
        this.maskGenAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
            algorithm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_mgf1"],
            parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnConvert"].serialize(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha1"])
        });
        this.pSourceAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pSpecifiedEmpty"]);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"],
        context: 0,
        defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha1"]
    })
], RsaEsOaepParams.prototype, "hashAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"],
        context: 1,
        defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mgf1SHA1"]
    })
], RsaEsOaepParams.prototype, "maskGenAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"],
        context: 2,
        defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pSpecifiedEmpty"]
    })
], RsaEsOaepParams.prototype, "pSourceAlgorithm", void 0);
const RSAES_OAEP = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
    algorithm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_RSAES_OAEP"],
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnConvert"].serialize(new RsaEsOaepParams())
});
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pss.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RSASSA_PSS",
    ()=>RSASSA_PSS,
    "RsaSaPssParams",
    ()=>RsaSaPssParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/convert.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/object_identifiers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/algorithms.js [app-route] (ecmascript)");
;
;
;
;
;
class RsaSaPssParams {
    constructor(params = {}){
        this.hashAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha1"]);
        this.maskGenAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
            algorithm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_mgf1"],
            parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnConvert"].serialize(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha1"])
        });
        this.saltLength = 20;
        this.trailerField = 1;
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"],
        context: 0,
        defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha1"]
    })
], RsaSaPssParams.prototype, "hashAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"],
        context: 1,
        defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mgf1SHA1"]
    })
], RsaSaPssParams.prototype, "maskGenAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        context: 2,
        defaultValue: 20
    })
], RsaSaPssParams.prototype, "saltLength", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        context: 3,
        defaultValue: 1
    })
], RsaSaPssParams.prototype, "trailerField", void 0);
const RSASSA_PSS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]({
    algorithm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_RSASSA_PSS"],
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$convert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnConvert"].serialize(new RsaSaPssParams())
});
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pkcs1_v1_5.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DigestInfo",
    ()=>DigestInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
;
;
;
class DigestInfo {
    constructor(params = {}){
        this.digestAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]();
        this.digest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]
    })
], DigestInfo.prototype, "digestAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], DigestInfo.prototype, "digest", void 0);
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$parameters$2f$rsaes_oaep$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsaes_oaep.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$parameters$2f$rsassa_pss$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pss.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$parameters$2f$rsassa_pkcs1_v1_5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pkcs1_v1_5.js [app-route] (ecmascript)");
;
;
;
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/other_prime_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OtherPrimeInfo",
    ()=>OtherPrimeInfo,
    "OtherPrimeInfos",
    ()=>OtherPrimeInfos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var OtherPrimeInfos_1;
;
;
class OtherPrimeInfo {
    constructor(params = {}){
        this.prime = new ArrayBuffer(0);
        this.exponent = new ArrayBuffer(0);
        this.coefficient = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], OtherPrimeInfo.prototype, "prime", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], OtherPrimeInfo.prototype, "exponent", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], OtherPrimeInfo.prototype, "coefficient", void 0);
let OtherPrimeInfos = OtherPrimeInfos_1 = class OtherPrimeInfos extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, OtherPrimeInfos_1.prototype);
    }
};
OtherPrimeInfos = OtherPrimeInfos_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: OtherPrimeInfo
    })
], OtherPrimeInfos);
;
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_private_key.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RSAPrivateKey",
    ()=>RSAPrivateKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$other_prime_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/other_prime_info.js [app-route] (ecmascript)");
;
;
;
class RSAPrivateKey {
    constructor(params = {}){
        this.version = 0;
        this.modulus = new ArrayBuffer(0);
        this.publicExponent = new ArrayBuffer(0);
        this.privateExponent = new ArrayBuffer(0);
        this.prime1 = new ArrayBuffer(0);
        this.prime2 = new ArrayBuffer(0);
        this.exponent1 = new ArrayBuffer(0);
        this.exponent2 = new ArrayBuffer(0);
        this.coefficient = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], RSAPrivateKey.prototype, "version", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "modulus", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "publicExponent", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "privateExponent", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "prime1", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "prime2", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "exponent1", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "exponent2", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPrivateKey.prototype, "coefficient", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$other_prime_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OtherPrimeInfos"],
        optional: true
    })
], RSAPrivateKey.prototype, "otherPrimeInfos", void 0);
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_public_key.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RSAPublicKey",
    ()=>RSAPublicKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/converters.js [app-route] (ecmascript)");
;
;
class RSAPublicKey {
    constructor(params = {}){
        this.modulus = new ArrayBuffer(0);
        this.publicExponent = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPublicKey.prototype, "modulus", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        converter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$converters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnIntegerArrayBufferConverter"]
    })
], RSAPublicKey.prototype, "publicExponent", void 0);
}),
"[project]/node_modules/@peculiar/asn1-rsa/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$parameters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/algorithms.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$other_prime_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/other_prime_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$rsa_private_key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_private_key.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$rsa_public_key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_public_key.js [app-route] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/node_modules/tsyringe/dist/esm5/types/lifecycle.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var Lifecycle;
(function(Lifecycle) {
    Lifecycle[Lifecycle["Transient"] = 0] = "Transient";
    Lifecycle[Lifecycle["Singleton"] = 1] = "Singleton";
    Lifecycle[Lifecycle["ResolutionScoped"] = 2] = "ResolutionScoped";
    Lifecycle[Lifecycle["ContainerScoped"] = 3] = "ContainerScoped";
})(Lifecycle || (Lifecycle = {}));
const __TURBOPACK__default__export__ = Lifecycle;
}),
"[project]/node_modules/tsyringe/dist/esm5/types/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/types/lifecycle.js [app-route] (ecmascript)");
;
}),
"[project]/node_modules/tsyringe/dist/esm5/reflection-helpers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INJECTION_TOKEN_METADATA_KEY",
    ()=>INJECTION_TOKEN_METADATA_KEY,
    "defineInjectionTokenMetadata",
    ()=>defineInjectionTokenMetadata,
    "getParamInfo",
    ()=>getParamInfo
]);
var INJECTION_TOKEN_METADATA_KEY = "injectionTokens";
function getParamInfo(target) {
    var params = Reflect.getMetadata("design:paramtypes", target) || [];
    var injectionTokens = Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};
    Object.keys(injectionTokens).forEach(function(key) {
        params[+key] = injectionTokens[key];
    });
    return params;
}
function defineInjectionTokenMetadata(data, transform) {
    return function(target, _propertyKey, parameterIndex) {
        var descriptors = Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};
        descriptors[parameterIndex] = transform ? {
            token: data,
            transform: transform.transformToken,
            transformArgs: transform.args || []
        } : data;
        Reflect.defineMetadata(INJECTION_TOKEN_METADATA_KEY, descriptors, target);
    };
}
}),
"[project]/node_modules/tsyringe/dist/esm5/lazy-helpers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DelayedConstructor",
    ()=>DelayedConstructor,
    "delay",
    ()=>delay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)");
;
var DelayedConstructor = function() {
    function DelayedConstructor(wrap) {
        this.wrap = wrap;
        this.reflectMethods = [
            "get",
            "getPrototypeOf",
            "setPrototypeOf",
            "getOwnPropertyDescriptor",
            "defineProperty",
            "has",
            "set",
            "deleteProperty",
            "apply",
            "construct",
            "ownKeys"
        ];
    }
    DelayedConstructor.prototype.createProxy = function(createObject) {
        var _this = this;
        var target = {};
        var init = false;
        var value;
        var delayedObject = function() {
            if (!init) {
                value = createObject(_this.wrap());
                init = true;
            }
            return value;
        };
        return new Proxy(target, this.createHandler(delayedObject));
    };
    DelayedConstructor.prototype.createHandler = function(delayedObject) {
        var handler = {};
        var install = function(name) {
            handler[name] = function() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++){
                    args[_i] = arguments[_i];
                }
                args[0] = delayedObject();
                var method = Reflect[name];
                return method.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])(args));
            };
        };
        this.reflectMethods.forEach(install);
        return handler;
    };
    return DelayedConstructor;
}();
;
function delay(wrappedConstructor) {
    if (typeof wrappedConstructor === "undefined") {
        throw new Error("Attempt to `delay` undefined. Constructor must be wrapped in a callback");
    }
    return new DelayedConstructor(wrappedConstructor);
}
}),
"[project]/node_modules/tsyringe/dist/esm5/providers/injection-token.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isConstructorToken",
    ()=>isConstructorToken,
    "isNormalToken",
    ()=>isNormalToken,
    "isTokenDescriptor",
    ()=>isTokenDescriptor,
    "isTransformDescriptor",
    ()=>isTransformDescriptor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$lazy$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/lazy-helpers.js [app-route] (ecmascript)");
;
function isNormalToken(token) {
    return typeof token === "string" || typeof token === "symbol";
}
function isTokenDescriptor(descriptor) {
    return typeof descriptor === "object" && "token" in descriptor && "multiple" in descriptor;
}
function isTransformDescriptor(descriptor) {
    return typeof descriptor === "object" && "token" in descriptor && "transform" in descriptor;
}
function isConstructorToken(token) {
    return typeof token === "function" || token instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$lazy$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DelayedConstructor"];
}
}),
"[project]/node_modules/tsyringe/dist/esm5/providers/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/injection-token.js [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/node_modules/tsyringe/dist/esm5/providers/class-provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isClassProvider",
    ()=>isClassProvider
]);
function isClassProvider(provider) {
    return !!provider.useClass;
}
}),
"[project]/node_modules/tsyringe/dist/esm5/providers/factory-provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFactoryProvider",
    ()=>isFactoryProvider
]);
function isFactoryProvider(provider) {
    return !!provider.useFactory;
}
}),
"[project]/node_modules/tsyringe/dist/esm5/providers/token-provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isTokenProvider",
    ()=>isTokenProvider
]);
function isTokenProvider(provider) {
    return !!provider.useToken;
}
}),
"[project]/node_modules/tsyringe/dist/esm5/providers/value-provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isValueProvider",
    ()=>isValueProvider
]);
function isValueProvider(provider) {
    return provider.useValue != undefined;
}
}),
"[project]/node_modules/tsyringe/dist/esm5/providers/provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isProvider",
    ()=>isProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$class$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/class-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$value$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/value-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$token$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/token-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$factory$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/factory-provider.js [app-route] (ecmascript)");
;
;
;
;
function isProvider(provider) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$class$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isClassProvider"])(provider) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$value$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValueProvider"])(provider) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$token$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTokenProvider"])(provider) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$factory$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFactoryProvider"])(provider);
}
}),
"[project]/node_modules/tsyringe/dist/esm5/registry-base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var RegistryBase = function() {
    function RegistryBase() {
        this._registryMap = new Map();
    }
    RegistryBase.prototype.entries = function() {
        return this._registryMap.entries();
    };
    RegistryBase.prototype.getAll = function(key) {
        this.ensure(key);
        return this._registryMap.get(key);
    };
    RegistryBase.prototype.get = function(key) {
        this.ensure(key);
        var value = this._registryMap.get(key);
        return value[value.length - 1] || null;
    };
    RegistryBase.prototype.set = function(key, value) {
        this.ensure(key);
        this._registryMap.get(key).push(value);
    };
    RegistryBase.prototype.setAll = function(key, value) {
        this._registryMap.set(key, value);
    };
    RegistryBase.prototype.has = function(key) {
        this.ensure(key);
        return this._registryMap.get(key).length > 0;
    };
    RegistryBase.prototype.clear = function() {
        this._registryMap.clear();
    };
    RegistryBase.prototype.ensure = function(key) {
        if (!this._registryMap.has(key)) {
            this._registryMap.set(key, []);
        }
    };
    return RegistryBase;
}();
const __TURBOPACK__default__export__ = RegistryBase;
}),
"[project]/node_modules/tsyringe/dist/esm5/registry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$registry$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/registry-base.js [app-route] (ecmascript)");
;
;
var Registry = function(_super) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__extends"])(Registry, _super);
    function Registry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Registry;
}(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$registry$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = Registry;
}),
"[project]/node_modules/tsyringe/dist/esm5/resolution-context.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var ResolutionContext = function() {
    function ResolutionContext() {
        this.scopedResolutions = new Map();
    }
    return ResolutionContext;
}();
const __TURBOPACK__default__export__ = ResolutionContext;
}),
"[project]/node_modules/tsyringe/dist/esm5/error-helpers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatErrorCtor",
    ()=>formatErrorCtor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)");
;
function formatDependency(params, idx) {
    if (params === null) {
        return "at position #" + idx;
    }
    var argName = params.split(",")[idx].trim();
    return "\"" + argName + "\" at position #" + idx;
}
function composeErrorMessage(msg, e, indent) {
    if (indent === void 0) {
        indent = "    ";
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
        msg
    ], e.message.split("\n").map(function(l) {
        return indent + l;
    })).join("\n");
}
function formatErrorCtor(ctor, paramIdx, error) {
    var _a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__read"])(ctor.toString().match(/constructor\(([\w, ]+)\)/) || [], 2), _b = _a[1], params = _b === void 0 ? null : _b;
    var dep = formatDependency(params, paramIdx);
    return composeErrorMessage("Cannot inject the dependency " + dep + " of \"" + ctor.name + "\" constructor. Reason:", error);
}
}),
"[project]/node_modules/tsyringe/dist/esm5/types/disposable.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDisposable",
    ()=>isDisposable
]);
function isDisposable(value) {
    if (typeof value.dispose !== "function") return false;
    var disposeFun = value.dispose;
    if (disposeFun.length > 0) {
        return false;
    }
    return true;
}
}),
"[project]/node_modules/tsyringe/dist/esm5/interceptors.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostResolutionInterceptors",
    ()=>PostResolutionInterceptors,
    "PreResolutionInterceptors",
    ()=>PreResolutionInterceptors,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$registry$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/registry-base.js [app-route] (ecmascript)");
;
;
var PreResolutionInterceptors = function(_super) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__extends"])(PreResolutionInterceptors, _super);
    function PreResolutionInterceptors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PreResolutionInterceptors;
}(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$registry$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
;
var PostResolutionInterceptors = function(_super) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__extends"])(PostResolutionInterceptors, _super);
    function PostResolutionInterceptors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostResolutionInterceptors;
}(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$registry$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
;
var Interceptors = function() {
    function Interceptors() {
        this.preResolution = new PreResolutionInterceptors();
        this.postResolution = new PostResolutionInterceptors();
    }
    return Interceptors;
}();
const __TURBOPACK__default__export__ = Interceptors;
}),
"[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "instance",
    ()=>instance,
    "typeInfo",
    ()=>typeInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$class$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/class-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$factory$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/factory-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/injection-token.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$token$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/token-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$value$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/value-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/registry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/types/lifecycle.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$resolution$2d$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/resolution-context.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$error$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/error-helpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$lazy$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/lazy-helpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$disposable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/types/disposable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$interceptors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/interceptors.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
var typeInfo = new Map();
var InternalDependencyContainer = function() {
    function InternalDependencyContainer(parent) {
        this.parent = parent;
        this._registry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        this.interceptors = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$interceptors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        this.disposed = false;
        this.disposables = new Set();
    }
    InternalDependencyContainer.prototype.register = function(token, providerOrConstructor, options) {
        if (options === void 0) {
            options = {
                lifecycle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].Transient
            };
        }
        this.ensureNotDisposed();
        var provider;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProvider"])(providerOrConstructor)) {
            provider = {
                useClass: providerOrConstructor
            };
        } else {
            provider = providerOrConstructor;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$token$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTokenProvider"])(provider)) {
            var path = [
                token
            ];
            var tokenProvider = provider;
            while(tokenProvider != null){
                var currentToken = tokenProvider.useToken;
                if (path.includes(currentToken)) {
                    throw new Error("Token registration cycle detected! " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])(path, [
                        currentToken
                    ]).join(" -> "));
                }
                path.push(currentToken);
                var registration = this._registry.get(currentToken);
                if (registration && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$token$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTokenProvider"])(registration.provider)) {
                    tokenProvider = registration.provider;
                } else {
                    tokenProvider = null;
                }
            }
        }
        if (options.lifecycle === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].Singleton || options.lifecycle == __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ContainerScoped || options.lifecycle == __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ResolutionScoped) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$value$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValueProvider"])(provider) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$factory$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFactoryProvider"])(provider)) {
                throw new Error("Cannot use lifecycle \"" + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"][options.lifecycle] + "\" with ValueProviders or FactoryProviders");
            }
        }
        this._registry.set(token, {
            provider: provider,
            options: options
        });
        return this;
    };
    InternalDependencyContainer.prototype.registerType = function(from, to) {
        this.ensureNotDisposed();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNormalToken"])(to)) {
            return this.register(from, {
                useToken: to
            });
        }
        return this.register(from, {
            useClass: to
        });
    };
    InternalDependencyContainer.prototype.registerInstance = function(token, instance) {
        this.ensureNotDisposed();
        return this.register(token, {
            useValue: instance
        });
    };
    InternalDependencyContainer.prototype.registerSingleton = function(from, to) {
        this.ensureNotDisposed();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNormalToken"])(from)) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNormalToken"])(to)) {
                return this.register(from, {
                    useToken: to
                }, {
                    lifecycle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].Singleton
                });
            } else if (to) {
                return this.register(from, {
                    useClass: to
                }, {
                    lifecycle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].Singleton
                });
            }
            throw new Error('Cannot register a type name as a singleton without a "to" token');
        }
        var useClass = from;
        if (to && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNormalToken"])(to)) {
            useClass = to;
        }
        return this.register(from, {
            useClass: useClass
        }, {
            lifecycle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].Singleton
        });
    };
    InternalDependencyContainer.prototype.resolve = function(token, context, isOptional) {
        if (context === void 0) {
            context = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$resolution$2d$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        }
        if (isOptional === void 0) {
            isOptional = false;
        }
        this.ensureNotDisposed();
        var registration = this.getRegistration(token);
        if (!registration && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNormalToken"])(token)) {
            if (isOptional) {
                return undefined;
            }
            throw new Error("Attempted to resolve unregistered dependency token: \"" + token.toString() + "\"");
        }
        this.executePreResolutionInterceptor(token, "Single");
        if (registration) {
            var result = this.resolveRegistration(registration, context);
            this.executePostResolutionInterceptor(token, result, "Single");
            return result;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isConstructorToken"])(token)) {
            var result = this.construct(token, context);
            this.executePostResolutionInterceptor(token, result, "Single");
            return result;
        }
        throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.");
    };
    InternalDependencyContainer.prototype.executePreResolutionInterceptor = function(token, resolutionType) {
        var e_1, _a;
        if (this.interceptors.preResolution.has(token)) {
            var remainingInterceptors = [];
            try {
                for(var _b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__values"])(this.interceptors.preResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()){
                    var interceptor = _c.value;
                    if (interceptor.options.frequency != "Once") {
                        remainingInterceptors.push(interceptor);
                    }
                    interceptor.callback(token, resolutionType);
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
            this.interceptors.preResolution.setAll(token, remainingInterceptors);
        }
    };
    InternalDependencyContainer.prototype.executePostResolutionInterceptor = function(token, result, resolutionType) {
        var e_2, _a;
        if (this.interceptors.postResolution.has(token)) {
            var remainingInterceptors = [];
            try {
                for(var _b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__values"])(this.interceptors.postResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()){
                    var interceptor = _c.value;
                    if (interceptor.options.frequency != "Once") {
                        remainingInterceptors.push(interceptor);
                    }
                    interceptor.callback(token, result, resolutionType);
                }
            } catch (e_2_1) {
                e_2 = {
                    error: e_2_1
                };
            } finally{
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally{
                    if (e_2) throw e_2.error;
                }
            }
            this.interceptors.postResolution.setAll(token, remainingInterceptors);
        }
    };
    InternalDependencyContainer.prototype.resolveRegistration = function(registration, context) {
        this.ensureNotDisposed();
        if (registration.options.lifecycle === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ResolutionScoped && context.scopedResolutions.has(registration)) {
            return context.scopedResolutions.get(registration);
        }
        var isSingleton = registration.options.lifecycle === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].Singleton;
        var isContainerScoped = registration.options.lifecycle === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ContainerScoped;
        var returnInstance = isSingleton || isContainerScoped;
        var resolved;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$value$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValueProvider"])(registration.provider)) {
            resolved = registration.provider.useValue;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$token$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTokenProvider"])(registration.provider)) {
            resolved = returnInstance ? registration.instance || (registration.instance = this.resolve(registration.provider.useToken, context)) : this.resolve(registration.provider.useToken, context);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$class$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isClassProvider"])(registration.provider)) {
            resolved = returnInstance ? registration.instance || (registration.instance = this.construct(registration.provider.useClass, context)) : this.construct(registration.provider.useClass, context);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$factory$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFactoryProvider"])(registration.provider)) {
            resolved = registration.provider.useFactory(this);
        } else {
            resolved = this.construct(registration.provider, context);
        }
        if (registration.options.lifecycle === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ResolutionScoped) {
            context.scopedResolutions.set(registration, resolved);
        }
        return resolved;
    };
    InternalDependencyContainer.prototype.resolveAll = function(token, context, isOptional) {
        var _this = this;
        if (context === void 0) {
            context = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$resolution$2d$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        }
        if (isOptional === void 0) {
            isOptional = false;
        }
        this.ensureNotDisposed();
        var registrations = this.getAllRegistrations(token);
        if (!registrations && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNormalToken"])(token)) {
            if (isOptional) {
                return [];
            }
            throw new Error("Attempted to resolve unregistered dependency token: \"" + token.toString() + "\"");
        }
        this.executePreResolutionInterceptor(token, "All");
        if (registrations) {
            var result_1 = registrations.map(function(item) {
                return _this.resolveRegistration(item, context);
            });
            this.executePostResolutionInterceptor(token, result_1, "All");
            return result_1;
        }
        var result = [
            this.construct(token, context)
        ];
        this.executePostResolutionInterceptor(token, result, "All");
        return result;
    };
    InternalDependencyContainer.prototype.isRegistered = function(token, recursive) {
        if (recursive === void 0) {
            recursive = false;
        }
        this.ensureNotDisposed();
        return this._registry.has(token) || recursive && (this.parent || false) && this.parent.isRegistered(token, true);
    };
    InternalDependencyContainer.prototype.reset = function() {
        this.ensureNotDisposed();
        this._registry.clear();
        this.interceptors.preResolution.clear();
        this.interceptors.postResolution.clear();
    };
    InternalDependencyContainer.prototype.clearInstances = function() {
        var e_3, _a;
        this.ensureNotDisposed();
        try {
            for(var _b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__values"])(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()){
                var _d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__read"])(_c.value, 2), token = _d[0], registrations = _d[1];
                this._registry.setAll(token, registrations.filter(function(registration) {
                    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$value$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValueProvider"])(registration.provider);
                }).map(function(registration) {
                    registration.instance = undefined;
                    return registration;
                }));
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
    };
    InternalDependencyContainer.prototype.createChildContainer = function() {
        var e_4, _a;
        this.ensureNotDisposed();
        var childContainer = new InternalDependencyContainer(this);
        try {
            for(var _b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__values"])(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()){
                var _d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__read"])(_c.value, 2), token = _d[0], registrations = _d[1];
                if (registrations.some(function(_a) {
                    var options = _a.options;
                    return options.lifecycle === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ContainerScoped;
                })) {
                    childContainer._registry.setAll(token, registrations.map(function(registration) {
                        if (registration.options.lifecycle === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$lifecycle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ContainerScoped) {
                            return {
                                provider: registration.provider,
                                options: registration.options
                            };
                        }
                        return registration;
                    }));
                }
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        return childContainer;
    };
    InternalDependencyContainer.prototype.beforeResolution = function(token, callback, options) {
        if (options === void 0) {
            options = {
                frequency: "Always"
            };
        }
        this.interceptors.preResolution.set(token, {
            callback: callback,
            options: options
        });
    };
    InternalDependencyContainer.prototype.afterResolution = function(token, callback, options) {
        if (options === void 0) {
            options = {
                frequency: "Always"
            };
        }
        this.interceptors.postResolution.set(token, {
            callback: callback,
            options: options
        });
    };
    InternalDependencyContainer.prototype.dispose = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__awaiter"])(this, void 0, void 0, function() {
            var promises;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__generator"])(this, function(_a) {
                switch(_a.label){
                    case 0:
                        this.disposed = true;
                        promises = [];
                        this.disposables.forEach(function(disposable) {
                            var maybePromise = disposable.dispose();
                            if (maybePromise) {
                                promises.push(maybePromise);
                            }
                        });
                        return [
                            4,
                            Promise.all(promises)
                        ];
                    case 1:
                        _a.sent();
                        return [
                            2
                        ];
                }
            });
        });
    };
    InternalDependencyContainer.prototype.getRegistration = function(token) {
        if (this.isRegistered(token)) {
            return this._registry.get(token);
        }
        if (this.parent) {
            return this.parent.getRegistration(token);
        }
        return null;
    };
    InternalDependencyContainer.prototype.getAllRegistrations = function(token) {
        if (this.isRegistered(token)) {
            return this._registry.getAll(token);
        }
        if (this.parent) {
            return this.parent.getAllRegistrations(token);
        }
        return null;
    };
    InternalDependencyContainer.prototype.construct = function(ctor, context) {
        var _this = this;
        if (ctor instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$lazy$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DelayedConstructor"]) {
            return ctor.createProxy(function(target) {
                return _this.resolve(target, context);
            });
        }
        var instance = function() {
            var paramInfo = typeInfo.get(ctor);
            if (!paramInfo || paramInfo.length === 0) {
                if (ctor.length === 0) {
                    return new ctor();
                } else {
                    throw new Error("TypeInfo not known for \"" + ctor.name + "\"");
                }
            }
            var params = paramInfo.map(_this.resolveParams(context, ctor));
            return new (ctor.bind.apply(ctor, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
                void 0
            ], params)))();
        }();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$disposable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDisposable"])(instance)) {
            this.disposables.add(instance);
        }
        return instance;
    };
    InternalDependencyContainer.prototype.resolveParams = function(context, ctor) {
        var _this = this;
        return function(param, idx) {
            var _a, _b, _c;
            try {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTokenDescriptor"])(param)) {
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTransformDescriptor"])(param)) {
                        return param.multiple ? (_a = _this.resolve(param.transform)).transform.apply(_a, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
                            _this.resolveAll(param.token, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$resolution$2d$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](), param.isOptional)
                        ], param.transformArgs)) : (_b = _this.resolve(param.transform)).transform.apply(_b, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
                            _this.resolve(param.token, context, param.isOptional)
                        ], param.transformArgs));
                    } else {
                        return param.multiple ? _this.resolveAll(param.token, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$resolution$2d$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](), param.isOptional) : _this.resolve(param.token, context, param.isOptional);
                    }
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTransformDescriptor"])(param)) {
                    return (_c = _this.resolve(param.transform, context)).transform.apply(_c, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
                        _this.resolve(param.token, context)
                    ], param.transformArgs));
                }
                return _this.resolve(param, context);
            } catch (e) {
                throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$error$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatErrorCtor"])(ctor, idx, e));
            }
        };
    };
    InternalDependencyContainer.prototype.ensureNotDisposed = function() {
        if (this.disposed) {
            throw new Error("This container has been disposed, you cannot interact with a disposed container");
        }
    };
    return InternalDependencyContainer;
}();
var instance = new InternalDependencyContainer();
const __TURBOPACK__default__export__ = instance;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/auto-injectable.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/reflection-helpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/injection-token.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$error$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/error-helpers.js [app-route] (ecmascript)");
;
;
;
;
;
function autoInjectable() {
    return function(target) {
        var paramInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getParamInfo"])(target);
        return function(_super) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__extends"])(class_1, _super);
            function class_1() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++){
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])(args.concat(paramInfo.slice(args.length).map(function(type, index) {
                    var _a, _b, _c;
                    try {
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTokenDescriptor"])(type)) {
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTransformDescriptor"])(type)) {
                                return type.multiple ? (_a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolve(type.transform)).transform.apply(_a, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolveAll(type.token)
                                ], type.transformArgs)) : (_b = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolve(type.transform)).transform.apply(_b, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolve(type.token)
                                ], type.transformArgs));
                            } else {
                                return type.multiple ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolveAll(type.token) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolve(type.token);
                            }
                        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$injection$2d$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTransformDescriptor"])(type)) {
                            return (_c = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolve(type.transform)).transform.apply(_c, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__spread"])([
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolve(type.token)
                            ], type.transformArgs));
                        }
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].resolve(type);
                    } catch (e) {
                        var argIndex = index + args.length;
                        throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$error$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatErrorCtor"])(target, argIndex, e));
                    }
                })))) || this;
            }
            return class_1;
        }(target);
    };
}
const __TURBOPACK__default__export__ = autoInjectable;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/inject.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/reflection-helpers.js [app-route] (ecmascript)");
;
function inject(token, options) {
    var data = {
        token: token,
        multiple: false,
        isOptional: options && options.isOptional
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defineInjectionTokenMetadata"])(data);
}
const __TURBOPACK__default__export__ = inject;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/injectable.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/reflection-helpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)");
;
;
;
function injectable(options) {
    return function(target) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["typeInfo"].set(target, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getParamInfo"])(target));
        if (options && options.token) {
            if (!Array.isArray(options.token)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].register(options.token, target);
            } else {
                options.token.forEach(function(token) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].register(token, target);
                });
            }
        }
    };
}
const __TURBOPACK__default__export__ = injectable;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/registry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/node_modules/tslib/tslib.es6.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)");
;
;
function registry(registrations) {
    if (registrations === void 0) {
        registrations = [];
    }
    return function(target) {
        registrations.forEach(function(_a) {
            var token = _a.token, options = _a.options, provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__rest"])(_a, [
                "token",
                "options"
            ]);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].register(token, provider, options);
        });
        return target;
    };
}
const __TURBOPACK__default__export__ = registry;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/singleton.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/injectable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)");
;
;
function singleton() {
    return function(target) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])()(target);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].registerSingleton(target);
    };
}
const __TURBOPACK__default__export__ = singleton;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/inject-all.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/reflection-helpers.js [app-route] (ecmascript)");
;
function injectAll(token, options) {
    var data = {
        token: token,
        multiple: true,
        isOptional: options && options.isOptional
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defineInjectionTokenMetadata"])(data);
}
const __TURBOPACK__default__export__ = injectAll;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/inject-all-with-transform.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/reflection-helpers.js [app-route] (ecmascript)");
;
function injectAllWithTransform(token, transformer) {
    var args = [];
    for(var _i = 2; _i < arguments.length; _i++){
        args[_i - 2] = arguments[_i];
    }
    var data = {
        token: token,
        multiple: true,
        transform: transformer,
        transformArgs: args
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defineInjectionTokenMetadata"])(data);
}
const __TURBOPACK__default__export__ = injectAllWithTransform;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/inject-with-transform.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/reflection-helpers.js [app-route] (ecmascript)");
;
function injectWithTransform(token, transformer) {
    var args = [];
    for(var _i = 2; _i < arguments.length; _i++){
        args[_i - 2] = arguments[_i];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$reflection$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defineInjectionTokenMetadata"])(token, {
        transformToken: transformer,
        args: args
    });
}
const __TURBOPACK__default__export__ = injectWithTransform;
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/scoped.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>scoped
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/injectable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)");
;
;
function scoped(lifecycle, token) {
    return function(target) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])()(target);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"].register(token || target, target, {
            lifecycle: lifecycle
        });
    };
}
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$auto$2d$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/auto-injectable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$inject$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/inject.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/injectable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/registry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$singleton$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/singleton.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$inject$2d$all$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/inject-all.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$inject$2d$all$2d$with$2d$transform$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/inject-all-with-transform.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$inject$2d$with$2d$transform$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/inject-with-transform.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$scoped$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/scoped.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/tsyringe/dist/esm5/factories/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
}),
"[project]/node_modules/tsyringe/dist/esm5/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$types$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/types/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$factories$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/factories/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$providers$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/providers/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$lazy$2d$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/lazy-helpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)");
if (typeof Reflect === "undefined" || !Reflect.getMetadata) {
    throw new Error("tsyringe requires a reflect polyfill. Please add 'import \"reflect-metadata\"' to the top of your entry point.");
}
;
;
;
;
;
;
}),
"[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript) <export instance as container>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "container",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["instance"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$dependency$2d$container$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/dependency-container.js [app-route] (ecmascript)");
}),
"[project]/node_modules/tsyringe/dist/esm5/decorators/injectable.js [app-route] (ecmascript) <export default as injectable>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "injectable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tsyringe$2f$dist$2f$esm5$2f$decorators$2f$injectable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tsyringe/dist/esm5/decorators/injectable.js [app-route] (ecmascript)");
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/attribute.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PKCS12AttrSet",
    ()=>PKCS12AttrSet,
    "PKCS12Attribute",
    ()=>PKCS12Attribute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var PKCS12AttrSet_1;
;
;
class PKCS12Attribute {
    constructor(params = {}){
        this.attrId = "";
        this.attrValues = [];
        Object.assign(params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], PKCS12Attribute.prototype, "attrId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any,
        repeated: "set"
    })
], PKCS12Attribute.prototype, "attrValues", void 0);
let PKCS12AttrSet = PKCS12AttrSet_1 = class PKCS12AttrSet extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, PKCS12AttrSet_1.prototype);
    }
};
PKCS12AttrSet = PKCS12AttrSet_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: PKCS12Attribute
    })
], PKCS12AttrSet);
;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/authenticated_safe.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthenticatedSafe",
    ()=>AuthenticatedSafe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$content_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/content_info.js [app-route] (ecmascript)");
var AuthenticatedSafe_1;
;
;
;
let AuthenticatedSafe = AuthenticatedSafe_1 = class AuthenticatedSafe extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, AuthenticatedSafe_1.prototype);
    }
};
AuthenticatedSafe = AuthenticatedSafe_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$content_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentInfo"]
    })
], AuthenticatedSafe);
;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/object_identifiers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "id_bagtypes",
    ()=>id_bagtypes,
    "id_pbeWithSHAAnd128BitRC2_CBC",
    ()=>id_pbeWithSHAAnd128BitRC2_CBC,
    "id_pbeWithSHAAnd128BitRC4",
    ()=>id_pbeWithSHAAnd128BitRC4,
    "id_pbeWithSHAAnd2_KeyTripleDES_CBC",
    ()=>id_pbeWithSHAAnd2_KeyTripleDES_CBC,
    "id_pbeWithSHAAnd3_KeyTripleDES_CBC",
    ()=>id_pbeWithSHAAnd3_KeyTripleDES_CBC,
    "id_pbeWithSHAAnd40BitRC4",
    ()=>id_pbeWithSHAAnd40BitRC4,
    "id_pbewithSHAAnd40BitRC2_CBC",
    ()=>id_pbewithSHAAnd40BitRC2_CBC,
    "id_pkcs",
    ()=>id_pkcs,
    "id_pkcs_12",
    ()=>id_pkcs_12,
    "id_pkcs_12PbeIds",
    ()=>id_pkcs_12PbeIds,
    "id_rsadsi",
    ()=>id_rsadsi
]);
const id_rsadsi = "1.2.840.113549";
const id_pkcs = `${id_rsadsi}.1`;
const id_pkcs_12 = `${id_pkcs}.12`;
const id_pkcs_12PbeIds = `${id_pkcs_12}.1`;
const id_pbeWithSHAAnd128BitRC4 = `${id_pkcs_12PbeIds}.1`;
const id_pbeWithSHAAnd40BitRC4 = `${id_pkcs_12PbeIds}.2`;
const id_pbeWithSHAAnd3_KeyTripleDES_CBC = `${id_pkcs_12PbeIds}.3`;
const id_pbeWithSHAAnd2_KeyTripleDES_CBC = `${id_pkcs_12PbeIds}.4`;
const id_pbeWithSHAAnd128BitRC2_CBC = `${id_pkcs_12PbeIds}.5`;
const id_pbewithSHAAnd40BitRC2_CBC = `${id_pkcs_12PbeIds}.6`;
const id_bagtypes = `${id_pkcs_12}.10.1`;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "id_CRLBag",
    ()=>id_CRLBag,
    "id_SafeContents",
    ()=>id_SafeContents,
    "id_SecretBag",
    ()=>id_SecretBag,
    "id_certBag",
    ()=>id_certBag,
    "id_keyBag",
    ()=>id_keyBag,
    "id_pkcs8ShroudedKeyBag",
    ()=>id_pkcs8ShroudedKeyBag,
    "id_pkcs_9",
    ()=>id_pkcs_9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/object_identifiers.js [app-route] (ecmascript)");
;
const id_keyBag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_bagtypes"]}.1`;
const id_pkcs8ShroudedKeyBag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_bagtypes"]}.2`;
const id_certBag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_bagtypes"]}.3`;
const id_CRLBag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_bagtypes"]}.4`;
const id_SecretBag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_bagtypes"]}.5`;
const id_SafeContents = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_bagtypes"]}.6`;
const id_pkcs_9 = "1.2.840.113549.1.9";
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/cert_bag.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CertBag",
    ()=>CertBag,
    "id_certTypes",
    ()=>id_certTypes,
    "id_sdsiCertificate",
    ()=>id_sdsiCertificate,
    "id_x509Certificate",
    ()=>id_x509Certificate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/types.js [app-route] (ecmascript)");
;
;
;
class CertBag {
    constructor(params = {}){
        this.certId = "";
        this.certValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], CertBag.prototype, "certId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any,
        context: 0
    })
], CertBag.prototype, "certValue", void 0);
const id_certTypes = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_pkcs_9"]}.22`;
const id_x509Certificate = `${id_certTypes}.1`;
const id_sdsiCertificate = `${id_certTypes}.2`;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/crl_bag.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CRLBag",
    ()=>CRLBag,
    "id_crlTypes",
    ()=>id_crlTypes,
    "id_x509CRL",
    ()=>id_x509CRL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/types.js [app-route] (ecmascript)");
;
;
;
class CRLBag {
    constructor(params = {}){
        this.crlId = "";
        this.crltValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], CRLBag.prototype, "crlId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any,
        context: 0
    })
], CRLBag.prototype, "crltValue", void 0);
const id_crlTypes = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_pkcs_9"]}.23`;
const id_x509CRL = `${id_crlTypes}.1`;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/key_bag.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyBag",
    ()=>KeyBag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/private_key_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
;
;
;
let KeyBag = class KeyBag extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrivateKeyInfo"] {
};
KeyBag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], KeyBag);
;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/pkcs8_shrouded_key_bag.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PKCS8ShroudedKeyBag",
    ()=>PKCS8ShroudedKeyBag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$encrypted_private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/encrypted_private_key_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
;
;
;
let PKCS8ShroudedKeyBag = class PKCS8ShroudedKeyBag extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$encrypted_private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EncryptedPrivateKeyInfo"] {
};
PKCS8ShroudedKeyBag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], PKCS8ShroudedKeyBag);
;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/secret_bag.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SecretBag",
    ()=>SecretBag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
;
;
class SecretBag {
    constructor(params = {}){
        this.secretTypeId = "";
        this.secretValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], SecretBag.prototype, "secretTypeId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any,
        context: 0
    })
], SecretBag.prototype, "secretValue", void 0);
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$cert_bag$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/cert_bag.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$crl_bag$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/crl_bag.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$key_bag$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/key_bag.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$pkcs8_shrouded_key_bag$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/pkcs8_shrouded_key_bag.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$secret_bag$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/secret_bag.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/types.js [app-route] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/mac_data.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MacData",
    ()=>MacData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$parameters$2f$rsassa_pkcs1_v1_5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pkcs1_v1_5.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
;
;
;
class MacData {
    constructor(params = {}){
        this.mac = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$parameters$2f$rsassa_pkcs1_v1_5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DigestInfo"]();
        this.macSalt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.iterations = 1;
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$rsa$2f$build$2f$es2015$2f$parameters$2f$rsassa_pkcs1_v1_5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DigestInfo"]
    })
], MacData.prototype, "mac", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], MacData.prototype, "macSalt", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        defaultValue: 1
    })
], MacData.prototype, "iterations", void 0);
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/pfx.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PFX",
    ()=>PFX
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$content_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/content_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$mac_data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/mac_data.js [app-route] (ecmascript)");
;
;
;
;
class PFX {
    constructor(params = {}){
        this.version = 3;
        this.authSafe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$content_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentInfo"]();
        this.macData = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$mac_data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MacData"]();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], PFX.prototype, "version", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$content_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentInfo"]
    })
], PFX.prototype, "authSafe", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$mac_data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MacData"],
        optional: true
    })
], PFX.prototype, "macData", void 0);
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/safe_bag.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SafeBag",
    ()=>SafeBag,
    "SafeContents",
    ()=>SafeContents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/attribute.js [app-route] (ecmascript)");
var SafeContents_1;
;
;
;
class SafeBag {
    constructor(params = {}){
        this.bagId = "";
        this.bagValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], SafeBag.prototype, "bagId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Any,
        context: 0
    })
], SafeBag.prototype, "bagValue", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PKCS12Attribute"],
        repeated: "set",
        optional: true
    })
], SafeBag.prototype, "bagAttributes", void 0);
let SafeContents = SafeContents_1 = class SafeContents extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, SafeContents_1.prototype);
    }
};
SafeContents = SafeContents_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: SafeBag
    })
], SafeContents);
;
}),
"[project]/node_modules/@peculiar/asn1-pfx/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/attribute.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$authenticated_safe$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/authenticated_safe.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$bags$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/bags/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$mac_data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/mac_data.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$pfx$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/pfx.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$safe_bag$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/safe_bag.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/encrypted_private_key_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EncryptedData",
    ()=>EncryptedData,
    "EncryptedPrivateKeyInfo",
    ()=>EncryptedPrivateKeyInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
;
;
;
class EncryptedData extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"] {
}
class EncryptedPrivateKeyInfo {
    constructor(params = {}){
        this.encryptionAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]();
        this.encryptedData = new EncryptedData();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]
    })
], EncryptedPrivateKeyInfo.prototype, "encryptionAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: EncryptedData
    })
], EncryptedPrivateKeyInfo.prototype, "encryptedData", void 0);
}),
"[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/private_key_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Attributes",
    ()=>Attributes,
    "PrivateKey",
    ()=>PrivateKey,
    "PrivateKeyInfo",
    ()=>PrivateKeyInfo,
    "Version",
    ()=>Version
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/attribute.js [app-route] (ecmascript)");
var Attributes_1;
;
;
;
var Version;
(function(Version) {
    Version[Version["v1"] = 0] = "v1";
})(Version || (Version = {}));
class PrivateKey extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"] {
}
let Attributes = Attributes_1 = class Attributes extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, Attributes_1.prototype);
    }
};
Attributes = Attributes_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Attribute"]
    })
], Attributes);
;
class PrivateKeyInfo {
    constructor(params = {}){
        this.version = Version.v1;
        this.privateKeyAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]();
        this.privateKey = new PrivateKey();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], PrivateKeyInfo.prototype, "version", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]
    })
], PrivateKeyInfo.prototype, "privateKeyAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: PrivateKey
    })
], PrivateKeyInfo.prototype, "privateKey", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: Attributes,
        implicit: true,
        context: 0,
        optional: true
    })
], PrivateKeyInfo.prototype, "attributes", void 0);
}),
"[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$encrypted_private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/encrypted_private_key_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/private_key_info.js [app-route] (ecmascript)");
;
;
}),
"[project]/node_modules/@peculiar/asn1-pkcs9/build/es2015/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChallengePassword",
    ()=>ChallengePassword,
    "ContentType",
    ()=>ContentType,
    "CounterSignature",
    ()=>CounterSignature,
    "CountryOfCitizenship",
    ()=>CountryOfCitizenship,
    "CountryOfResidence",
    ()=>CountryOfResidence,
    "DateOfBirth",
    ()=>DateOfBirth,
    "EmailAddress",
    ()=>EmailAddress,
    "EncryptedPrivateKeyInfo",
    ()=>EncryptedPrivateKeyInfo,
    "ExtendedCertificateAttributes",
    ()=>ExtendedCertificateAttributes,
    "ExtensionRequest",
    ()=>ExtensionRequest,
    "FriendlyName",
    ()=>FriendlyName,
    "Gender",
    ()=>Gender,
    "LocalKeyId",
    ()=>LocalKeyId,
    "MessageDigest",
    ()=>MessageDigest,
    "PKCS9String",
    ()=>PKCS9String,
    "Pkcs7PDU",
    ()=>Pkcs7PDU,
    "PlaceOfBirth",
    ()=>PlaceOfBirth,
    "Pseudonym",
    ()=>Pseudonym,
    "RandomNonce",
    ()=>RandomNonce,
    "SMIMECapabilities",
    ()=>SMIMECapabilities,
    "SMIMECapability",
    ()=>SMIMECapability,
    "SequenceNumber",
    ()=>SequenceNumber,
    "SigningDescription",
    ()=>SigningDescription,
    "SigningTime",
    ()=>SigningTime,
    "UnstructuredAddress",
    ()=>UnstructuredAddress,
    "UnstructuredName",
    ()=>UnstructuredName,
    "UserPKCS12",
    ()=>UserPKCS12,
    "crlTypes",
    ()=>crlTypes,
    "id_at_pseudonym",
    ()=>id_at_pseudonym,
    "id_certTypes",
    ()=>id_certTypes,
    "id_ietf_at",
    ()=>id_ietf_at,
    "id_pkcs9",
    ()=>id_pkcs9,
    "id_pkcs9_at",
    ()=>id_pkcs9_at,
    "id_pkcs9_at_challengePassword",
    ()=>id_pkcs9_at_challengePassword,
    "id_pkcs9_at_contentType",
    ()=>id_pkcs9_at_contentType,
    "id_pkcs9_at_counterSignature",
    ()=>id_pkcs9_at_counterSignature,
    "id_pkcs9_at_countryOfCitizenship",
    ()=>id_pkcs9_at_countryOfCitizenship,
    "id_pkcs9_at_countryOfResidence",
    ()=>id_pkcs9_at_countryOfResidence,
    "id_pkcs9_at_dateOfBirth",
    ()=>id_pkcs9_at_dateOfBirth,
    "id_pkcs9_at_emailAddress",
    ()=>id_pkcs9_at_emailAddress,
    "id_pkcs9_at_encryptedPrivateKeyInfo",
    ()=>id_pkcs9_at_encryptedPrivateKeyInfo,
    "id_pkcs9_at_extendedCertificateAttributes",
    ()=>id_pkcs9_at_extendedCertificateAttributes,
    "id_pkcs9_at_extensionRequest",
    ()=>id_pkcs9_at_extensionRequest,
    "id_pkcs9_at_friendlyName",
    ()=>id_pkcs9_at_friendlyName,
    "id_pkcs9_at_gender",
    ()=>id_pkcs9_at_gender,
    "id_pkcs9_at_localKeyId",
    ()=>id_pkcs9_at_localKeyId,
    "id_pkcs9_at_messageDigest",
    ()=>id_pkcs9_at_messageDigest,
    "id_pkcs9_at_pkcs15Token",
    ()=>id_pkcs9_at_pkcs15Token,
    "id_pkcs9_at_pkcs7PDU",
    ()=>id_pkcs9_at_pkcs7PDU,
    "id_pkcs9_at_placeOfBirth",
    ()=>id_pkcs9_at_placeOfBirth,
    "id_pkcs9_at_randomNonce",
    ()=>id_pkcs9_at_randomNonce,
    "id_pkcs9_at_sequenceNumber",
    ()=>id_pkcs9_at_sequenceNumber,
    "id_pkcs9_at_signingDescription",
    ()=>id_pkcs9_at_signingDescription,
    "id_pkcs9_at_signingTime",
    ()=>id_pkcs9_at_signingTime,
    "id_pkcs9_at_smimeCapabilities",
    ()=>id_pkcs9_at_smimeCapabilities,
    "id_pkcs9_at_unstructuredAddress",
    ()=>id_pkcs9_at_unstructuredAddress,
    "id_pkcs9_at_unstructuredName",
    ()=>id_pkcs9_at_unstructuredName,
    "id_pkcs9_at_userPKCS12",
    ()=>id_pkcs9_at_userPKCS12,
    "id_pkcs9_mo",
    ()=>id_pkcs9_mo,
    "id_pkcs9_mr",
    ()=>id_pkcs9_mr,
    "id_pkcs9_mr_caseIgnoreMatch",
    ()=>id_pkcs9_mr_caseIgnoreMatch,
    "id_pkcs9_mr_signingTimeMatch",
    ()=>id_pkcs9_mr_signingTimeMatch,
    "id_pkcs9_oc",
    ()=>id_pkcs9_oc,
    "id_pkcs9_oc_naturalPerson",
    ()=>id_pkcs9_oc_naturalPerson,
    "id_pkcs9_oc_pkcsEntity",
    ()=>id_pkcs9_oc_pkcsEntity,
    "id_pkcs9_sx",
    ()=>id_pkcs9_sx,
    "id_pkcs9_sx_pkcs9String",
    ()=>id_pkcs9_sx_pkcs9String,
    "id_pkcs9_sx_signingTime",
    ()=>id_pkcs9_sx_signingTime,
    "id_smime",
    ()=>id_smime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$content_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/content_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$signer_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/signer_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-cms/build/es2015/attribute.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$pfx$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pfx/build/es2015/pfx.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$encrypted_private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-pkcs8/build/es2015/encrypted_private_key_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/name.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/time.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$extension$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/extension.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_identifiers.js [app-route] (ecmascript)");
var ExtensionRequest_1, ExtendedCertificateAttributes_1, SMIMECapabilities_1;
;
;
;
;
;
;
;
const id_pkcs9 = "1.2.840.113549.1.9";
const id_pkcs9_mo = `${id_pkcs9}.0`;
const id_pkcs9_oc = `${id_pkcs9}.24`;
const id_pkcs9_at = `${id_pkcs9}.25`;
const id_pkcs9_sx = `${id_pkcs9}.26`;
const id_pkcs9_mr = `${id_pkcs9}.27`;
const id_pkcs9_oc_pkcsEntity = `${id_pkcs9_oc}.1`;
const id_pkcs9_oc_naturalPerson = `${id_pkcs9_oc}.2`;
const id_pkcs9_at_emailAddress = `${id_pkcs9}.1`;
const id_pkcs9_at_unstructuredName = `${id_pkcs9}.2`;
const id_pkcs9_at_contentType = `${id_pkcs9}.3`;
const id_pkcs9_at_messageDigest = `${id_pkcs9}.4`;
const id_pkcs9_at_signingTime = `${id_pkcs9}.5`;
const id_pkcs9_at_counterSignature = `${id_pkcs9}.6`;
const id_pkcs9_at_challengePassword = `${id_pkcs9}.7`;
const id_pkcs9_at_unstructuredAddress = `${id_pkcs9}.8`;
const id_pkcs9_at_extendedCertificateAttributes = `${id_pkcs9}.9`;
const id_pkcs9_at_signingDescription = `${id_pkcs9}.13`;
const id_pkcs9_at_extensionRequest = `${id_pkcs9}.14`;
const id_pkcs9_at_smimeCapabilities = `${id_pkcs9}.15`;
const id_pkcs9_at_friendlyName = `${id_pkcs9}.20`;
const id_pkcs9_at_localKeyId = `${id_pkcs9}.21`;
const id_pkcs9_at_userPKCS12 = `2.16.840.1.113730.3.1.216`;
const id_pkcs9_at_pkcs15Token = `${id_pkcs9_at}.1`;
const id_pkcs9_at_encryptedPrivateKeyInfo = `${id_pkcs9_at}.2`;
const id_pkcs9_at_randomNonce = `${id_pkcs9_at}.3`;
const id_pkcs9_at_sequenceNumber = `${id_pkcs9_at}.4`;
const id_pkcs9_at_pkcs7PDU = `${id_pkcs9_at}.5`;
const id_ietf_at = `1.3.6.1.5.5.7.9`;
const id_pkcs9_at_dateOfBirth = `${id_ietf_at}.1`;
const id_pkcs9_at_placeOfBirth = `${id_ietf_at}.2`;
const id_pkcs9_at_gender = `${id_ietf_at}.3`;
const id_pkcs9_at_countryOfCitizenship = `${id_ietf_at}.4`;
const id_pkcs9_at_countryOfResidence = `${id_ietf_at}.5`;
const id_pkcs9_sx_pkcs9String = `${id_pkcs9_sx}.1`;
const id_pkcs9_sx_signingTime = `${id_pkcs9_sx}.2`;
const id_pkcs9_mr_caseIgnoreMatch = `${id_pkcs9_mr}.1`;
const id_pkcs9_mr_signingTimeMatch = `${id_pkcs9_mr}.2`;
const id_smime = `${id_pkcs9}.16`;
const id_certTypes = `${id_pkcs9}.22`;
const crlTypes = `${id_pkcs9}.23`;
const id_at_pseudonym = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2d$attr$2f$build$2f$es2015$2f$object_identifiers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["id_at"]}.65`;
let PKCS9String = class PKCS9String extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DirectoryString"] {
    constructor(params = {}){
        super(params);
    }
    toString() {
        const o = {};
        o.toString();
        return this.ia5String || super.toString();
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].IA5String
    })
], PKCS9String.prototype, "ia5String", void 0);
PKCS9String = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], PKCS9String);
;
let Pkcs7PDU = class Pkcs7PDU extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$content_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentInfo"] {
};
Pkcs7PDU = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], Pkcs7PDU);
;
let UserPKCS12 = class UserPKCS12 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pfx$2f$build$2f$es2015$2f$pfx$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PFX"] {
};
UserPKCS12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], UserPKCS12);
;
let EncryptedPrivateKeyInfo = class EncryptedPrivateKeyInfo extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$pkcs8$2f$build$2f$es2015$2f$encrypted_private_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EncryptedPrivateKeyInfo"] {
};
EncryptedPrivateKeyInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], EncryptedPrivateKeyInfo);
;
let EmailAddress = class EmailAddress {
    constructor(value = ""){
        this.value = value;
    }
    toString() {
        return this.value;
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].IA5String
    })
], EmailAddress.prototype, "value", void 0);
EmailAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], EmailAddress);
;
let UnstructuredName = class UnstructuredName extends PKCS9String {
};
UnstructuredName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], UnstructuredName);
;
let UnstructuredAddress = class UnstructuredAddress extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DirectoryString"] {
};
UnstructuredAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], UnstructuredAddress);
;
let DateOfBirth = class DateOfBirth {
    constructor(value = new Date()){
        this.value = value;
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].GeneralizedTime
    })
], DateOfBirth.prototype, "value", void 0);
DateOfBirth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], DateOfBirth);
;
let PlaceOfBirth = class PlaceOfBirth extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DirectoryString"] {
};
PlaceOfBirth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], PlaceOfBirth);
;
let Gender = class Gender {
    constructor(value = "M"){
        this.value = value;
    }
    toString() {
        return this.value;
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].PrintableString
    })
], Gender.prototype, "value", void 0);
Gender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], Gender);
;
let CountryOfCitizenship = class CountryOfCitizenship {
    constructor(value = ""){
        this.value = value;
    }
    toString() {
        return this.value;
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].PrintableString
    })
], CountryOfCitizenship.prototype, "value", void 0);
CountryOfCitizenship = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], CountryOfCitizenship);
;
let CountryOfResidence = class CountryOfResidence extends CountryOfCitizenship {
};
CountryOfResidence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], CountryOfResidence);
;
let Pseudonym = class Pseudonym extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DirectoryString"] {
};
Pseudonym = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], Pseudonym);
;
let ContentType = class ContentType {
    constructor(value = ""){
        this.value = value;
    }
    toString() {
        return this.value;
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].ObjectIdentifier
    })
], ContentType.prototype, "value", void 0);
ContentType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], ContentType);
;
class MessageDigest extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"] {
}
let SigningTime = class SigningTime extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Time"] {
};
SigningTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], SigningTime);
;
class RandomNonce extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"] {
}
let SequenceNumber = class SequenceNumber {
    constructor(value = 0){
        this.value = value;
    }
    toString() {
        return this.value.toString();
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], SequenceNumber.prototype, "value", void 0);
SequenceNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], SequenceNumber);
;
let CounterSignature = class CounterSignature extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$signer_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignerInfo"] {
};
CounterSignature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], CounterSignature);
;
let ChallengePassword = class ChallengePassword extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DirectoryString"] {
};
ChallengePassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], ChallengePassword);
;
let ExtensionRequest = ExtensionRequest_1 = class ExtensionRequest extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$extension$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Extensions"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, ExtensionRequest_1.prototype);
    }
};
ExtensionRequest = ExtensionRequest_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], ExtensionRequest);
;
let ExtendedCertificateAttributes = ExtendedCertificateAttributes_1 = class ExtendedCertificateAttributes extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, ExtendedCertificateAttributes_1.prototype);
    }
};
ExtendedCertificateAttributes = ExtendedCertificateAttributes_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Set,
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$cms$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Attribute"]
    })
], ExtendedCertificateAttributes);
;
let FriendlyName = class FriendlyName {
    constructor(value = ""){
        this.value = value;
    }
    toString() {
        return this.value;
    }
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BmpString
    })
], FriendlyName.prototype, "value", void 0);
FriendlyName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], FriendlyName);
;
class LocalKeyId extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"] {
}
class SigningDescription extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DirectoryString"] {
}
let SMIMECapability = class SMIMECapability extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"] {
};
SMIMECapability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], SMIMECapability);
;
let SMIMECapabilities = SMIMECapabilities_1 = class SMIMECapabilities extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, SMIMECapabilities_1.prototype);
    }
};
SMIMECapabilities = SMIMECapabilities_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: SMIMECapability
    })
], SMIMECapabilities);
;
}),
"[project]/node_modules/@peculiar/asn1-csr/build/es2015/attributes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Attributes",
    ()=>Attributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/attribute.js [app-route] (ecmascript)");
var Attributes_1;
;
;
;
let Attributes = Attributes_1 = class Attributes extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, Attributes_1.prototype);
    }
};
Attributes = Attributes_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$attribute$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Attribute"]
    })
], Attributes);
;
}),
"[project]/node_modules/@peculiar/asn1-csr/build/es2015/certification_request_info.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CertificationRequestInfo",
    ()=>CertificationRequestInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/name.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$subject_public_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/subject_public_key_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$attributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-csr/build/es2015/attributes.js [app-route] (ecmascript)");
;
;
;
;
class CertificationRequestInfo {
    constructor(params = {}){
        this.version = 0;
        this.subject = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Name"]();
        this.subjectPKInfo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$subject_public_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SubjectPublicKeyInfo"]();
        this.attributes = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$attributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Attributes"]();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], CertificationRequestInfo.prototype, "version", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$name$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Name"]
    })
], CertificationRequestInfo.prototype, "subject", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$subject_public_key_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SubjectPublicKeyInfo"]
    })
], CertificationRequestInfo.prototype, "subjectPKInfo", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$attributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Attributes"],
        implicit: true,
        context: 0,
        optional: true
    })
], CertificationRequestInfo.prototype, "attributes", void 0);
}),
"[project]/node_modules/@peculiar/asn1-csr/build/es2015/certification_request.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CertificationRequest",
    ()=>CertificationRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$certification_request_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-csr/build/es2015/certification_request_info.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js [app-route] (ecmascript)");
;
;
;
;
class CertificationRequest {
    constructor(params = {}){
        this.certificationRequestInfo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$certification_request_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CertificationRequestInfo"]();
        this.signatureAlgorithm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]();
        this.signature = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$certification_request_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CertificationRequestInfo"],
        raw: true
    })
], CertificationRequest.prototype, "certificationRequestInfo", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$x509$2f$build$2f$es2015$2f$algorithm_identifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmIdentifier"]
    })
], CertificationRequest.prototype, "signatureAlgorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].BitString
    })
], CertificationRequest.prototype, "signature", void 0);
}),
"[project]/node_modules/@peculiar/asn1-csr/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$attributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-csr/build/es2015/attributes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$certification_request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-csr/build/es2015/certification_request.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$csr$2f$build$2f$es2015$2f$certification_request_info$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-csr/build/es2015/certification_request_info.js [app-route] (ecmascript)");
;
;
;
}),
"[project]/node_modules/@peculiar/asn1-android/build/es2015/key_description.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthorizationList",
    ()=>AuthorizationList,
    "IntegerSet",
    ()=>IntegerSet,
    "KeyDescription",
    ()=>KeyDescription,
    "KeyMintKeyDescription",
    ()=>KeyMintKeyDescription,
    "RootOfTrust",
    ()=>RootOfTrust,
    "SecurityLevel",
    ()=>SecurityLevel,
    "VerifiedBootState",
    ()=>VerifiedBootState,
    "Version",
    ()=>Version,
    "id_ce_keyDescription",
    ()=>id_ce_keyDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var IntegerSet_1;
;
;
const id_ce_keyDescription = "1.3.6.1.4.1.11129.2.1.17";
var VerifiedBootState;
(function(VerifiedBootState) {
    VerifiedBootState[VerifiedBootState["verified"] = 0] = "verified";
    VerifiedBootState[VerifiedBootState["selfSigned"] = 1] = "selfSigned";
    VerifiedBootState[VerifiedBootState["unverified"] = 2] = "unverified";
    VerifiedBootState[VerifiedBootState["failed"] = 3] = "failed";
})(VerifiedBootState || (VerifiedBootState = {}));
class RootOfTrust {
    constructor(params = {}){
        this.verifiedBootKey = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.deviceLocked = false;
        this.verifiedBootState = VerifiedBootState.verified;
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], RootOfTrust.prototype, "verifiedBootKey", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Boolean
    })
], RootOfTrust.prototype, "deviceLocked", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], RootOfTrust.prototype, "verifiedBootState", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], RootOfTrust.prototype, "verifiedBootHash", void 0);
let IntegerSet = IntegerSet_1 = class IntegerSet extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, IntegerSet_1.prototype);
    }
};
IntegerSet = IntegerSet_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Set,
        itemType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], IntegerSet);
;
class AuthorizationList {
    constructor(params = {}){
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 1,
        type: IntegerSet,
        optional: true
    })
], AuthorizationList.prototype, "purpose", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 2,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "algorithm", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 3,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "keySize", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 5,
        type: IntegerSet,
        optional: true
    })
], AuthorizationList.prototype, "digest", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 6,
        type: IntegerSet,
        optional: true
    })
], AuthorizationList.prototype, "padding", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 10,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "ecCurve", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 200,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "rsaPublicExponent", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 203,
        type: IntegerSet,
        optional: true
    })
], AuthorizationList.prototype, "mgfDigest", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 303,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "rollbackResistance", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 305,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "earlyBootOnly", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 400,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "activeDateTime", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 401,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "originationExpireDateTime", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 402,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "usageExpireDateTime", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 405,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "usageCountLimit", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 503,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "noAuthRequired", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 504,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "userAuthType", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 505,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "authTimeout", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 506,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "allowWhileOnBody", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 507,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "trustedUserPresenceRequired", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 508,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "trustedConfirmationRequired", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 509,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "unlockedDeviceRequired", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 600,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "allApplications", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 601,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "applicationId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 701,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "creationDateTime", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 702,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "origin", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 703,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "rollbackResistant", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 704,
        type: RootOfTrust,
        optional: true
    })
], AuthorizationList.prototype, "rootOfTrust", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 705,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "osVersion", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 706,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "osPatchLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 709,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationApplicationId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 710,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdBrand", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 711,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdDevice", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 712,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdProduct", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 713,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdSerial", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 714,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdImei", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 715,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdMeid", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 716,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdManufacturer", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 717,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdModel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 718,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "vendorPatchLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 719,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer,
        optional: true
    })
], AuthorizationList.prototype, "bootPatchLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 720,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Null,
        optional: true
    })
], AuthorizationList.prototype, "deviceUniqueAttestation", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 723,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "attestationIdSecondImei", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        context: 724,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"],
        optional: true
    })
], AuthorizationList.prototype, "moduleHash", void 0);
var SecurityLevel;
(function(SecurityLevel) {
    SecurityLevel[SecurityLevel["software"] = 0] = "software";
    SecurityLevel[SecurityLevel["trustedEnvironment"] = 1] = "trustedEnvironment";
    SecurityLevel[SecurityLevel["strongBox"] = 2] = "strongBox";
})(SecurityLevel || (SecurityLevel = {}));
var Version;
(function(Version) {
    Version[Version["KM2"] = 1] = "KM2";
    Version[Version["KM3"] = 2] = "KM3";
    Version[Version["KM4"] = 3] = "KM4";
    Version[Version["KM4_1"] = 4] = "KM4_1";
    Version[Version["keyMint1"] = 100] = "keyMint1";
    Version[Version["keyMint2"] = 200] = "keyMint2";
    Version[Version["keyMint3"] = 300] = "keyMint3";
    Version[Version["keyMint4"] = 400] = "keyMint4";
})(Version || (Version = {}));
class KeyDescription {
    constructor(params = {}){
        this.attestationVersion = Version.KM4;
        this.attestationSecurityLevel = SecurityLevel.software;
        this.keymasterVersion = 0;
        this.keymasterSecurityLevel = SecurityLevel.software;
        this.attestationChallenge = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.uniqueId = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.softwareEnforced = new AuthorizationList();
        this.teeEnforced = new AuthorizationList();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], KeyDescription.prototype, "attestationVersion", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], KeyDescription.prototype, "attestationSecurityLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], KeyDescription.prototype, "keymasterVersion", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], KeyDescription.prototype, "keymasterSecurityLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], KeyDescription.prototype, "attestationChallenge", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], KeyDescription.prototype, "uniqueId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: AuthorizationList
    })
], KeyDescription.prototype, "softwareEnforced", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: AuthorizationList
    })
], KeyDescription.prototype, "teeEnforced", void 0);
class KeyMintKeyDescription {
    constructor(params = {}){
        this.attestationVersion = Version.keyMint4;
        this.attestationSecurityLevel = SecurityLevel.software;
        this.keyMintVersion = 0;
        this.keyMintSecurityLevel = SecurityLevel.software;
        this.attestationChallenge = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.uniqueId = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.softwareEnforced = new AuthorizationList();
        this.hardwareEnforced = new AuthorizationList();
        Object.assign(this, params);
    }
    toLegacyKeyDescription() {
        return new KeyDescription({
            attestationVersion: this.attestationVersion,
            attestationSecurityLevel: this.attestationSecurityLevel,
            keymasterVersion: this.keyMintVersion,
            keymasterSecurityLevel: this.keyMintSecurityLevel,
            attestationChallenge: this.attestationChallenge,
            uniqueId: this.uniqueId,
            softwareEnforced: this.softwareEnforced,
            teeEnforced: this.hardwareEnforced
        });
    }
    static fromLegacyKeyDescription(keyDesc) {
        return new KeyMintKeyDescription({
            attestationVersion: keyDesc.attestationVersion,
            attestationSecurityLevel: keyDesc.attestationSecurityLevel,
            keyMintVersion: keyDesc.keymasterVersion,
            keyMintSecurityLevel: keyDesc.keymasterSecurityLevel,
            attestationChallenge: keyDesc.attestationChallenge,
            uniqueId: keyDesc.uniqueId,
            softwareEnforced: keyDesc.softwareEnforced,
            hardwareEnforced: keyDesc.teeEnforced
        });
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], KeyMintKeyDescription.prototype, "attestationVersion", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], KeyMintKeyDescription.prototype, "attestationSecurityLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], KeyMintKeyDescription.prototype, "keyMintVersion", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], KeyMintKeyDescription.prototype, "keyMintSecurityLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], KeyMintKeyDescription.prototype, "attestationChallenge", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], KeyMintKeyDescription.prototype, "uniqueId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: AuthorizationList
    })
], KeyMintKeyDescription.prototype, "softwareEnforced", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: AuthorizationList
    })
], KeyMintKeyDescription.prototype, "hardwareEnforced", void 0);
}),
"[project]/node_modules/@peculiar/asn1-android/build/es2015/nonstandard.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NonStandardAuthorization",
    ()=>NonStandardAuthorization,
    "NonStandardAuthorizationList",
    ()=>NonStandardAuthorizationList,
    "NonStandardKeyDescription",
    ()=>NonStandardKeyDescription,
    "NonStandardKeyMintKeyDescription",
    ()=>NonStandardKeyMintKeyDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/objects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$key_description$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-android/build/es2015/key_description.js [app-route] (ecmascript)");
var NonStandardAuthorizationList_1;
;
;
;
let NonStandardAuthorization = class NonStandardAuthorization extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$key_description$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthorizationList"] {
};
NonStandardAuthorization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Choice
    })
], NonStandardAuthorization);
;
let NonStandardAuthorizationList = NonStandardAuthorizationList_1 = class NonStandardAuthorizationList extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$objects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnArray"] {
    constructor(items){
        super(items);
        Object.setPrototypeOf(this, NonStandardAuthorizationList_1.prototype);
    }
    findProperty(key) {
        const prop = this.find((o)=>key in o);
        if (prop) {
            return prop[key];
        }
        return undefined;
    }
};
NonStandardAuthorizationList = NonStandardAuthorizationList_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence,
        itemType: NonStandardAuthorization
    })
], NonStandardAuthorizationList);
;
class NonStandardKeyDescription {
    get keyMintVersion() {
        return this.keymasterVersion;
    }
    set keyMintVersion(value) {
        this.keymasterVersion = value;
    }
    get keyMintSecurityLevel() {
        return this.keymasterSecurityLevel;
    }
    set keyMintSecurityLevel(value) {
        this.keymasterSecurityLevel = value;
    }
    get hardwareEnforced() {
        return this.teeEnforced;
    }
    set hardwareEnforced(value) {
        this.teeEnforced = value;
    }
    constructor(params = {}){
        this.attestationVersion = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$key_description$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Version"].KM4;
        this.attestationSecurityLevel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$key_description$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SecurityLevel"].software;
        this.keymasterVersion = 0;
        this.keymasterSecurityLevel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$key_description$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SecurityLevel"].software;
        this.attestationChallenge = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.uniqueId = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]();
        this.softwareEnforced = new NonStandardAuthorizationList();
        this.teeEnforced = new NonStandardAuthorizationList();
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], NonStandardKeyDescription.prototype, "attestationVersion", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], NonStandardKeyDescription.prototype, "attestationSecurityLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], NonStandardKeyDescription.prototype, "keymasterVersion", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Enumerated
    })
], NonStandardKeyDescription.prototype, "keymasterSecurityLevel", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], NonStandardKeyDescription.prototype, "attestationChallenge", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$types$2f$octet_string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OctetString"]
    })
], NonStandardKeyDescription.prototype, "uniqueId", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: NonStandardAuthorizationList
    })
], NonStandardKeyDescription.prototype, "softwareEnforced", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: NonStandardAuthorizationList
    })
], NonStandardKeyDescription.prototype, "teeEnforced", void 0);
let NonStandardKeyMintKeyDescription = class NonStandardKeyMintKeyDescription extends NonStandardKeyDescription {
    constructor(params = {}){
        if ("keymasterVersion" in params && !("keyMintVersion" in params)) {
            params.keyMintVersion = params.keymasterVersion;
        }
        if ("keymasterSecurityLevel" in params && !("keyMintSecurityLevel" in params)) {
            params.keyMintSecurityLevel = params.keymasterSecurityLevel;
        }
        if ("teeEnforced" in params && !("hardwareEnforced" in params)) {
            params.hardwareEnforced = params.teeEnforced;
        }
        super(params);
    }
};
NonStandardKeyMintKeyDescription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnType"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnTypeTypes"].Sequence
    })
], NonStandardKeyMintKeyDescription);
;
}),
"[project]/node_modules/@peculiar/asn1-android/build/es2015/attestation.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttestationApplicationId",
    ()=>AttestationApplicationId,
    "AttestationPackageInfo",
    ()=>AttestationPackageInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-schema/build/es2015/enums.js [app-route] (ecmascript)");
;
;
class AttestationPackageInfo {
    constructor(params = {}){
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].OctetString
    })
], AttestationPackageInfo.prototype, "packageName", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].Integer
    })
], AttestationPackageInfo.prototype, "version", void 0);
class AttestationApplicationId {
    constructor(params = {}){
        Object.assign(this, params);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: AttestationPackageInfo,
        repeated: "set"
    })
], AttestationApplicationId.prototype, "packageInfos", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$decorators$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnProp"])({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$schema$2f$build$2f$es2015$2f$enums$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsnPropTypes"].OctetString,
        repeated: "set"
    })
], AttestationApplicationId.prototype, "signatureDigests", void 0);
}),
"[project]/node_modules/@peculiar/asn1-android/build/es2015/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$key_description$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-android/build/es2015/key_description.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$nonstandard$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-android/build/es2015/nonstandard.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$peculiar$2f$asn1$2d$android$2f$build$2f$es2015$2f$attestation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@peculiar/asn1-android/build/es2015/attestation.js [app-route] (ecmascript)");
;
;
;
}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3-90e2652d1716b047", () => require("better-sqlite3-90e2652d1716b047"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0q7r.sk._.js.map