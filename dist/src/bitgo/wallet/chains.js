"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInternalChainCode = exports.isExternalChainCode = exports.getInternalChainCode = exports.getExternalChainCode = exports.scriptTypeForChain = exports.toChainPair = exports.isChainCode = exports.chainCodes = exports.chainCodesP2tr = exports.chainCodesP2wsh = exports.chainCodesP2shP2wsh = exports.chainCodesP2sh = void 0;
/**
 * All valid chain codes
 */
exports.chainCodesP2sh = [0, 1];
exports.chainCodesP2shP2wsh = [10, 11];
exports.chainCodesP2wsh = [20, 21];
exports.chainCodesP2tr = [30, 31];
exports.chainCodes = [...exports.chainCodesP2sh, ...exports.chainCodesP2shP2wsh, ...exports.chainCodesP2wsh, ...exports.chainCodesP2tr];
function isChainCode(n) {
    return exports.chainCodes.includes(n);
}
exports.isChainCode = isChainCode;
const map = new Map([
    ['p2sh', exports.chainCodesP2sh],
    ['p2shP2wsh', exports.chainCodesP2shP2wsh],
    ['p2wsh', exports.chainCodesP2wsh],
    ['p2tr', exports.chainCodesP2tr],
].map(([k, v]) => [k, Object.freeze(v)]));
const pairs = [...map.values()];
/**
 * @return ChainCodePair for input
 */
function toChainPair(v) {
    let pair;
    if (Array.isArray(v)) {
        if (pairs.includes(v)) {
            pair = v;
        }
    }
    if (typeof v === 'string') {
        pair = map.get(v);
    }
    if (typeof v === 'number') {
        pair = pairs.find((p) => p.includes(v));
    }
    if (!pair) {
        throw new Error(`no pair for input ${v}`);
    }
    return pair;
}
exports.toChainPair = toChainPair;
/**
 * @return ScriptType2Of3 for input
 */
function scriptTypeForChain(chain) {
    for (const [scriptType, pair] of map.entries()) {
        if (pair.includes(chain)) {
            return scriptType;
        }
    }
    throw new Error(`invalid chain ${chain}`);
}
exports.scriptTypeForChain = scriptTypeForChain;
/**
 * @return chain code intended for external addresses
 */
function getExternalChainCode(v) {
    return toChainPair(v)[0];
}
exports.getExternalChainCode = getExternalChainCode;
/**
 * @return chain code intended for change outputs
 */
function getInternalChainCode(v) {
    return toChainPair(v)[1];
}
exports.getInternalChainCode = getInternalChainCode;
/**
 * @return true iff chain code is external
 */
function isExternalChainCode(v) {
    return toChainPair(v).indexOf(v) === 0;
}
exports.isExternalChainCode = isExternalChainCode;
/**
 * @return true iff chain code is internal
 */
function isInternalChainCode(v) {
    return toChainPair(v).indexOf(v) === 1;
}
exports.isInternalChainCode = isInternalChainCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2JpdGdvL3dhbGxldC9jaGFpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBYUE7O0dBRUc7QUFDVSxRQUFBLGNBQWMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQVUsQ0FBQztBQUNqQyxRQUFBLG1CQUFtQixHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBVSxDQUFDO0FBQ3hDLFFBQUEsZUFBZSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBVSxDQUFDO0FBQ3BDLFFBQUEsY0FBYyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBVSxDQUFDO0FBQ25DLFFBQUEsVUFBVSxHQUFHLENBQUMsR0FBRyxzQkFBYyxFQUFFLEdBQUcsMkJBQW1CLEVBQUUsR0FBRyx1QkFBZSxFQUFFLEdBQUcsc0JBQWMsQ0FBQyxDQUFDO0FBRTdHLFNBQWdCLFdBQVcsQ0FBQyxDQUFVO0lBQ3BDLE9BQU8sa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBYyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUZELGtDQUVDO0FBUUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQ2pCO0lBQ0UsQ0FBQyxNQUFNLEVBQUUsc0JBQWMsQ0FBQztJQUN4QixDQUFDLFdBQVcsRUFBRSwyQkFBbUIsQ0FBQztJQUNsQyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDO0lBQzFCLENBQUMsTUFBTSxFQUFFLHNCQUFjLENBQUM7Q0FDekIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFtQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFrQixDQUFDLENBQUMsQ0FDNUUsQ0FBQztBQUVGLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVoQzs7R0FFRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxDQUE2QztJQUN2RSxJQUFJLElBQUksQ0FBQztJQUNULElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNwQixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBa0IsQ0FBQyxFQUFFO1lBQ3RDLElBQUksR0FBRyxDQUFDLENBQUM7U0FDVjtLQUNGO0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDekIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN6QixJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDO0lBQ0QsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDM0M7SUFDRCxPQUFPLElBQXFCLENBQUM7QUFDL0IsQ0FBQztBQWpCRCxrQ0FpQkM7QUFFRDs7R0FFRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLEtBQWdCO0lBQ2pELEtBQUssTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sVUFBVSxDQUFDO1NBQ25CO0tBQ0Y7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFQRCxnREFPQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsQ0FBNkM7SUFDaEYsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUZELG9EQUVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxDQUE2QztJQUNoRixPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsb0RBRUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLENBQVk7SUFDOUMsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRkQsa0RBRUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLENBQVk7SUFDOUMsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRkQsa0RBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmluZXMgQml0R28gbWFwcGluZ3MgYmV0d2VlbiBiaXAzMiBkZXJpdmF0aW9uIHBhdGggYW5kIHNjcmlwdCB0eXBlLlxuICpcbiAqIFRoZSBzY3JpcHRzIGZvciBhIEJpdEdvIHdhbGxldCBhZGRyZXNzIGFyZSBkZWZpbmVkIGJ5IHRoZWlyIGRlcml2YXRpb24gcGF0aC5cbiAqXG4gKiBUaGUgZGVyaXZhdGlvbiBwYXRoIGhhcyB0aGUgZm9ybWF0IGAwLzAvJHtjaGFpbn0vJHtpbmRleH1gIChpbiByYXJlIGNhc2VzIHRoZSBwcmVmaXggaXMgbm90IDAvMClcbiAqXG4gKiBUaGUgYWRkcmVzcyBzY3JpcHQgdHlwZSAoU2NyaXB0VHlwZTJPZjMpIGlzIGRlZmluZWQgYnkgdGhlIGBjaGFpbmAgcGFyYW1ldGVyLlxuICpcbiAqIFRoaXMgZmlsZSBkZWZpbmVzIHRoZSBtYXBwaW5nIGJldHdlZW4gY2hhaW4gcGFyYW1ldGVyIGFuZCBhZGRyZXNzIHR5cGUuXG4gKi9cbmltcG9ydCB7IFNjcmlwdFR5cGUyT2YzIH0gZnJvbSAnLi4vb3V0cHV0U2NyaXB0cyc7XG5cbi8qKlxuICogQWxsIHZhbGlkIGNoYWluIGNvZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBjaGFpbkNvZGVzUDJzaCA9IFswLCAxXSBhcyBjb25zdDtcbmV4cG9ydCBjb25zdCBjaGFpbkNvZGVzUDJzaFAyd3NoID0gWzEwLCAxMV0gYXMgY29uc3Q7XG5leHBvcnQgY29uc3QgY2hhaW5Db2Rlc1Ayd3NoID0gWzIwLCAyMV0gYXMgY29uc3Q7XG5leHBvcnQgY29uc3QgY2hhaW5Db2Rlc1AydHIgPSBbMzAsIDMxXSBhcyBjb25zdDtcbmV4cG9ydCBjb25zdCBjaGFpbkNvZGVzID0gWy4uLmNoYWluQ29kZXNQMnNoLCAuLi5jaGFpbkNvZGVzUDJzaFAyd3NoLCAuLi5jaGFpbkNvZGVzUDJ3c2gsIC4uLmNoYWluQ29kZXNQMnRyXTtcbmV4cG9ydCB0eXBlIENoYWluQ29kZSA9IHR5cGVvZiBjaGFpbkNvZGVzW251bWJlcl07XG5leHBvcnQgZnVuY3Rpb24gaXNDaGFpbkNvZGUobjogdW5rbm93bik6IG4gaXMgQ2hhaW5Db2RlIHtcbiAgcmV0dXJuIGNoYWluQ29kZXMuaW5jbHVkZXMobiBhcyBDaGFpbkNvZGUpO1xufVxuXG4vKipcbiAqIEEgc2NyaXB0IHR5cGUgbWFwcyB0byB0d28gQ2hhaW5Db2RlczpcbiAqIEV4dGVybmFsIGFkZHJlc3NlcyBhcmUgaW50ZW5kZWQgZm9yIGRlcG9zaXRzLCBpbnRlcm5hbCBhZGRyZXNzZXMgYXJlIGludGVuZGVkIGZvciBjaGFuZ2Ugb3V0cHV0cy5cbiAqL1xuZXhwb3J0IHR5cGUgQ2hhaW5Db2RlUGFpciA9IFJlYWRvbmx5PFtleHRlcm5hbDogQ2hhaW5Db2RlLCBpbnRlcm5hbDogQ2hhaW5Db2RlXT47XG5cbmNvbnN0IG1hcCA9IG5ldyBNYXA8U2NyaXB0VHlwZTJPZjMsIENoYWluQ29kZVBhaXI+KFxuICBbXG4gICAgWydwMnNoJywgY2hhaW5Db2Rlc1Ayc2hdLFxuICAgIFsncDJzaFAyd3NoJywgY2hhaW5Db2Rlc1Ayc2hQMndzaF0sXG4gICAgWydwMndzaCcsIGNoYWluQ29kZXNQMndzaF0sXG4gICAgWydwMnRyJywgY2hhaW5Db2Rlc1AydHJdLFxuICBdLm1hcCgoW2ssIHZdKSA9PiBbayBhcyBTY3JpcHRUeXBlMk9mMywgT2JqZWN0LmZyZWV6ZSh2KSBhcyBDaGFpbkNvZGVQYWlyXSlcbik7XG5cbmNvbnN0IHBhaXJzID0gWy4uLm1hcC52YWx1ZXMoKV07XG5cbi8qKlxuICogQHJldHVybiBDaGFpbkNvZGVQYWlyIGZvciBpbnB1dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9DaGFpblBhaXIodjogQ2hhaW5Db2RlUGFpciB8IENoYWluQ29kZSB8IFNjcmlwdFR5cGUyT2YzKTogQ2hhaW5Db2RlUGFpciB7XG4gIGxldCBwYWlyO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgIGlmIChwYWlycy5pbmNsdWRlcyh2IGFzIENoYWluQ29kZVBhaXIpKSB7XG4gICAgICBwYWlyID0gdjtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xuICAgIHBhaXIgPSBtYXAuZ2V0KHYpO1xuICB9XG4gIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpIHtcbiAgICBwYWlyID0gcGFpcnMuZmluZCgocCkgPT4gcC5pbmNsdWRlcyh2KSk7XG4gIH1cbiAgaWYgKCFwYWlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBubyBwYWlyIGZvciBpbnB1dCAke3Z9YCk7XG4gIH1cbiAgcmV0dXJuIHBhaXIgYXMgQ2hhaW5Db2RlUGFpcjtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIFNjcmlwdFR5cGUyT2YzIGZvciBpbnB1dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NyaXB0VHlwZUZvckNoYWluKGNoYWluOiBDaGFpbkNvZGUpOiBTY3JpcHRUeXBlMk9mMyB7XG4gIGZvciAoY29uc3QgW3NjcmlwdFR5cGUsIHBhaXJdIG9mIG1hcC5lbnRyaWVzKCkpIHtcbiAgICBpZiAocGFpci5pbmNsdWRlcyhjaGFpbikpIHtcbiAgICAgIHJldHVybiBzY3JpcHRUeXBlO1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgY2hhaW4gJHtjaGFpbn1gKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIGNoYWluIGNvZGUgaW50ZW5kZWQgZm9yIGV4dGVybmFsIGFkZHJlc3Nlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXh0ZXJuYWxDaGFpbkNvZGUodjogQ2hhaW5Db2RlUGFpciB8IFNjcmlwdFR5cGUyT2YzIHwgQ2hhaW5Db2RlKTogQ2hhaW5Db2RlIHtcbiAgcmV0dXJuIHRvQ2hhaW5QYWlyKHYpWzBdO1xufVxuXG4vKipcbiAqIEByZXR1cm4gY2hhaW4gY29kZSBpbnRlbmRlZCBmb3IgY2hhbmdlIG91dHB1dHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEludGVybmFsQ2hhaW5Db2RlKHY6IENoYWluQ29kZVBhaXIgfCBTY3JpcHRUeXBlMk9mMyB8IENoYWluQ29kZSk6IENoYWluQ29kZSB7XG4gIHJldHVybiB0b0NoYWluUGFpcih2KVsxXTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHRydWUgaWZmIGNoYWluIGNvZGUgaXMgZXh0ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRXh0ZXJuYWxDaGFpbkNvZGUodjogQ2hhaW5Db2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiB0b0NoYWluUGFpcih2KS5pbmRleE9mKHYpID09PSAwO1xufVxuXG4vKipcbiAqIEByZXR1cm4gdHJ1ZSBpZmYgY2hhaW4gY29kZSBpcyBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlcm5hbENoYWluQ29kZSh2OiBDaGFpbkNvZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHRvQ2hhaW5QYWlyKHYpLmluZGV4T2YodikgPT09IDE7XG59XG4iXX0=