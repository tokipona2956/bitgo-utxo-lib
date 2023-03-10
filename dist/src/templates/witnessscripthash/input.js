// <scriptSig> {serialized scriptPubKey script}
var bscript = require('../../script');
var types = require('../../types');
var typeforce = require('typeforce');
var p2ms = require('../multisig/');
var p2pk = require('../pubkey/');
var p2pkh = require('../pubkeyhash/');
function check(chunks, allowIncomplete) {
    typeforce(types.Array, chunks);
    if (chunks.length < 1)
        return false;
    var witnessScript = chunks[chunks.length - 1];
    if (!Buffer.isBuffer(witnessScript))
        return false;
    var witnessScriptChunks = bscript.decompile(witnessScript);
    // is witnessScript a valid script?
    if (witnessScriptChunks.length === 0)
        return false;
    var witnessRawScriptSig = bscript.compile(chunks.slice(0, -1));
    // match types
    if (p2pkh.input.check(witnessRawScriptSig) &&
        p2pkh.output.check(witnessScriptChunks))
        return true;
    if (p2ms.input.check(witnessRawScriptSig, allowIncomplete) &&
        p2ms.output.check(witnessScriptChunks))
        return true;
    if (p2pk.input.check(witnessRawScriptSig) &&
        p2pk.output.check(witnessScriptChunks))
        return true;
    return false;
}
check.toJSON = function () { return 'witnessScriptHash input'; };
function encodeStack(witnessData, witnessScript) {
    typeforce({
        witnessData: [types.Buffer],
        witnessScript: types.Buffer
    }, {
        witnessData: witnessData,
        witnessScript: witnessScript
    });
    return [].concat(witnessData, witnessScript);
}
function decodeStack(chunks) {
    typeforce(check, chunks);
    return {
        witnessData: chunks.slice(0, -1),
        witnessScript: chunks[chunks.length - 1]
    };
}
module.exports = {
    check: check,
    decodeStack: decodeStack,
    encodeStack: encodeStack
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGVtcGxhdGVzL3dpdG5lc3NzY3JpcHRoYXNoL2lucHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtDQUErQztBQUUvQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDckMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ2xDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUVwQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDbEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ2hDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRXJDLFNBQVMsS0FBSyxDQUFFLE1BQU0sRUFBRSxlQUFlO0lBQ3JDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzlCLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFFbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFFakQsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRTFELG1DQUFtQztJQUNuQyxJQUFJLG1CQUFtQixDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFFbEQsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUU5RCxjQUFjO0lBQ2QsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUN4QyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXRELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFckQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXJELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQztBQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsY0FBYyxPQUFPLHlCQUF5QixDQUFBLENBQUMsQ0FBQyxDQUFBO0FBRS9ELFNBQVMsV0FBVyxDQUFFLFdBQVcsRUFBRSxhQUFhO0lBQzlDLFNBQVMsQ0FBQztRQUNSLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDM0IsYUFBYSxFQUFFLEtBQUssQ0FBQyxNQUFNO0tBQzVCLEVBQUU7UUFDRCxXQUFXLEVBQUUsV0FBVztRQUN4QixhQUFhLEVBQUUsYUFBYTtLQUM3QixDQUFDLENBQUE7SUFFRixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQzlDLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBRSxNQUFNO0lBQzFCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDeEIsT0FBTztRQUNMLFdBQVcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQyxhQUFhLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ3pDLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLEtBQUssRUFBRSxLQUFLO0lBQ1osV0FBVyxFQUFFLFdBQVc7SUFDeEIsV0FBVyxFQUFFLFdBQVc7Q0FDekIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIDxzY3JpcHRTaWc+IHtzZXJpYWxpemVkIHNjcmlwdFB1YktleSBzY3JpcHR9XG5cbnZhciBic2NyaXB0ID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0JylcbnZhciB0eXBlcyA9IHJlcXVpcmUoJy4uLy4uL3R5cGVzJylcbnZhciB0eXBlZm9yY2UgPSByZXF1aXJlKCd0eXBlZm9yY2UnKVxuXG52YXIgcDJtcyA9IHJlcXVpcmUoJy4uL211bHRpc2lnLycpXG52YXIgcDJwayA9IHJlcXVpcmUoJy4uL3B1YmtleS8nKVxudmFyIHAycGtoID0gcmVxdWlyZSgnLi4vcHVia2V5aGFzaC8nKVxuXG5mdW5jdGlvbiBjaGVjayAoY2h1bmtzLCBhbGxvd0luY29tcGxldGUpIHtcbiAgdHlwZWZvcmNlKHR5cGVzLkFycmF5LCBjaHVua3MpXG4gIGlmIChjaHVua3MubGVuZ3RoIDwgMSkgcmV0dXJuIGZhbHNlXG5cbiAgdmFyIHdpdG5lc3NTY3JpcHQgPSBjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDFdXG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHdpdG5lc3NTY3JpcHQpKSByZXR1cm4gZmFsc2VcblxuICB2YXIgd2l0bmVzc1NjcmlwdENodW5rcyA9IGJzY3JpcHQuZGVjb21waWxlKHdpdG5lc3NTY3JpcHQpXG5cbiAgLy8gaXMgd2l0bmVzc1NjcmlwdCBhIHZhbGlkIHNjcmlwdD9cbiAgaWYgKHdpdG5lc3NTY3JpcHRDaHVua3MubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2VcblxuICB2YXIgd2l0bmVzc1Jhd1NjcmlwdFNpZyA9IGJzY3JpcHQuY29tcGlsZShjaHVua3Muc2xpY2UoMCwgLTEpKVxuXG4gIC8vIG1hdGNoIHR5cGVzXG4gIGlmIChwMnBraC5pbnB1dC5jaGVjayh3aXRuZXNzUmF3U2NyaXB0U2lnKSAmJlxuICAgIHAycGtoLm91dHB1dC5jaGVjayh3aXRuZXNzU2NyaXB0Q2h1bmtzKSkgcmV0dXJuIHRydWVcblxuICBpZiAocDJtcy5pbnB1dC5jaGVjayh3aXRuZXNzUmF3U2NyaXB0U2lnLCBhbGxvd0luY29tcGxldGUpICYmXG4gICAgcDJtcy5vdXRwdXQuY2hlY2sod2l0bmVzc1NjcmlwdENodW5rcykpIHJldHVybiB0cnVlXG5cbiAgaWYgKHAycGsuaW5wdXQuY2hlY2sod2l0bmVzc1Jhd1NjcmlwdFNpZykgJiZcbiAgICBwMnBrLm91dHB1dC5jaGVjayh3aXRuZXNzU2NyaXB0Q2h1bmtzKSkgcmV0dXJuIHRydWVcblxuICByZXR1cm4gZmFsc2Vcbn1cbmNoZWNrLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICd3aXRuZXNzU2NyaXB0SGFzaCBpbnB1dCcgfVxuXG5mdW5jdGlvbiBlbmNvZGVTdGFjayAod2l0bmVzc0RhdGEsIHdpdG5lc3NTY3JpcHQpIHtcbiAgdHlwZWZvcmNlKHtcbiAgICB3aXRuZXNzRGF0YTogW3R5cGVzLkJ1ZmZlcl0sXG4gICAgd2l0bmVzc1NjcmlwdDogdHlwZXMuQnVmZmVyXG4gIH0sIHtcbiAgICB3aXRuZXNzRGF0YTogd2l0bmVzc0RhdGEsXG4gICAgd2l0bmVzc1NjcmlwdDogd2l0bmVzc1NjcmlwdFxuICB9KVxuXG4gIHJldHVybiBbXS5jb25jYXQod2l0bmVzc0RhdGEsIHdpdG5lc3NTY3JpcHQpXG59XG5cbmZ1bmN0aW9uIGRlY29kZVN0YWNrIChjaHVua3MpIHtcbiAgdHlwZWZvcmNlKGNoZWNrLCBjaHVua3MpXG4gIHJldHVybiB7XG4gICAgd2l0bmVzc0RhdGE6IGNodW5rcy5zbGljZSgwLCAtMSksXG4gICAgd2l0bmVzc1NjcmlwdDogY2h1bmtzW2NodW5rcy5sZW5ndGggLSAxXVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjaGVjazogY2hlY2ssXG4gIGRlY29kZVN0YWNrOiBkZWNvZGVTdGFjayxcbiAgZW5jb2RlU3RhY2s6IGVuY29kZVN0YWNrXG59XG4iXX0=