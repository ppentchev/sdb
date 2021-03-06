var FFI = require ("node-ffi");

// TODO: this is not CAS-safe yet
var SDB = new FFI.Library ("libsdb", {
        "sdb_new": [ "pointer", ["string", "int32"]]
,	"sdb_create": [ "int", ["pointer"]]
//,	"malloc": [ "pointer", ["int"]]
,	"sdb_append": [ "int", ["pointer", "string", "string"]]
,	"sdb_finish": [ "int", ["pointer"]]
,	"sdb_remove": [ "int", ["pointer", "string", "int"]]
,	"sdb_query": [ "int", ["pointer", "string"]]
,	"sdb_querys": [ "string", ["pointer", "string", "pointer", "int", "pointer"]]]
,	"sdb_get": [ "string", ["pointer", "string", "pointer"]]
,	"sdb_set": [ "int", ["pointer", "string", "string", "uint32"]]
,	"sdb_add": [ "int", ["pointer", "string", "string", "uint32"]]
,	"sdb_inc": [ "int", ["pointer", "string", "int64"]]
,	"sdb_dec": [ "int", ["pointer", "string", "int64"]]
,	"sdb_getn": [ "int64", ["pointer", "string", "pointer"]]
,	"sdb_setn": [ "int", ["pointer", "string", "int64"]]
,	"sdb_hash": [ "int32", []]
,	"sdb_now": [ "int64", []]
//,	"sdb_lock": [ "int", ["string"]]
//,	"sdb_unlock": [ "void", ["string"]]
,	"sdb_exists": ["int", ["pointer", "string"]]
,	"sdb_expire": [ "int32", ["pointer", "string", "int64"]]
,	"sdb_get_expire": [ "int64", ["pointer", "string"]]
,	"sdb_json_get": [ "string", ["pointer", "string", "string", "pointer"]]
,	"sdb_json_geti": [ "int", ["pointer", "string", "string"]]
,	"sdb_json_set": [ "int", ["pointer", "string", "string", "string"]]
,	"sdb_json_seti": [ "int", ["pointer", "string", "string", "int"]]
,	"sdb_json_indent": [ "string", ["string"]]
,	"sdb_json_unindent": [ "string", ["string"]]
,	"sdb_sync": [ "int32", ["pointer"]]
});

exports.open = function (file) {
	this.o = SDB.sdb_new (file, 0);
	this.jsonGet = function (key, path) {
		return SDB.sdb_json_get (this.o, key, path, null);
	}
	this.jsonSet = function (key, path, val) {
		return SDB.sdb_json_set (this.o, key, path, val, 0);
	}
	this.jsonIndent = function (str) {
		return SDB.sdb_json_indent (str);
	}
	this.jsonUnindent = function (str) {
		return SDB.sdb_json_unindent (str);
	}
	this.get = function (x) {
		return SDB.sdb_get (this.o, x, null);
	}
	//this.malloc = function (x){ return SDB.malloc (x); }
	this.exists = function (key) {
		return SDB.exists (this.o, key);
	}
	this.inc = function (x, y) {
		return SDB.sdb_inc (this.o, x, y, 0);
	}
	this.dec = function (x, y) {
		return SDB.sdb_dec (this.o, x, y, 0);
	}
	this.setn = function (x, y) {
		return SDB.sdb_setn (this.o, x, y, 0);
	}
	this.getn = function (x) {
		return SDB.sdb_getn (this.o, x);
	}
	this.set = function (x, y) {
		return SDB.sdb_set (this.o, x, y, 0);
	}
	this.add = function (x, y) {
		return SDB.sdb_add (this.o, x, y, 0);
	}
	this.remove = function (x, y) {
		return SDB.sdb_remove (this.o, x, y);
	}
	this.sync = function () {
		SDB.sdb_sync (this.o);
	}
	return this;
}
