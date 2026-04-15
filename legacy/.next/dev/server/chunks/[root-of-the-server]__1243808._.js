module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'paes_auth.db');
const db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__["default"](dbPath);
// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    current_challenge TEXT
  );

  CREATE TABLE IF NOT EXISTS credentials (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    public_key BLOB,
    counter INTEGER,
    device_type TEXT,
    backed_up BOOLEAN,
    transports TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password_hash TEXT,
    current_challenge TEXT
  );

  CREATE TABLE IF NOT EXISTS admin_credentials (
    id TEXT PRIMARY KEY,
    admin_id TEXT,
    public_key BLOB,
    counter INTEGER,
    transports TEXT,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
  );

  CREATE TABLE IF NOT EXISTS user_data (
    user_id TEXT PRIMARY KEY,
    data TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS global_exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metadata TEXT,
    questions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
const __TURBOPACK__default__export__ = db;
}),
"[project]/src/lib/auth_server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteAdmin",
    ()=>deleteAdmin,
    "deleteGlobalExam",
    ()=>deleteGlobalExam,
    "deleteUser",
    ()=>deleteUser,
    "getAdminById",
    ()=>getAdminById,
    "getAdminByUsername",
    ()=>getAdminByUsername,
    "getAdminCredentials",
    ()=>getAdminCredentials,
    "getAllAdmins",
    ()=>getAllAdmins,
    "getAllUsers",
    ()=>getAllUsers,
    "getGlobalExams",
    ()=>getGlobalExams,
    "getUserById",
    ()=>getUserById,
    "getUserByUsername",
    ()=>getUserByUsername,
    "getUserCredentials",
    ()=>getUserCredentials,
    "getUserData",
    ()=>getUserData,
    "origin",
    ()=>origin,
    "rpID",
    ()=>rpID,
    "rpName",
    ()=>rpName,
    "saveAdminChallenge",
    ()=>saveAdminChallenge,
    "saveAdminCredential",
    ()=>saveAdminCredential,
    "saveCredential",
    ()=>saveCredential,
    "saveGlobalExam",
    ()=>saveGlobalExam,
    "saveUserChallenge",
    ()=>saveUserChallenge,
    "saveUserData",
    ()=>saveUserData,
    "saveUserRegistrationOptions",
    ()=>saveUserRegistrationOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
// Replying Party (RP) info
const rpName = 'aPAES Entrenamiento';
const rpID = process.env.NEXT_PUBLIC_RP_ID || 'localhost';
const origin = process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3000';
function getUserByUsername(username) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM users WHERE username = ?').get(username);
}
function getUserById(userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM users WHERE id = ?').get(userId);
}
function getUserCredentials(userId) {
    const rows = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM credentials WHERE user_id = ?').all(userId);
    return rows.map((row)=>({
            id: row.id,
            public_key: new Uint8Array(row.public_key),
            counter: row.counter,
            device_type: row.device_type,
            backed_up: !!row.backed_up,
            transports: JSON.parse(row.transports || '[]')
        }));
}
function saveUserRegistrationOptions(userId, challenge, username) {
    // upsert user if registration starts
    const existing = getUserById(userId);
    if (!existing) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('INSERT INTO users (id, username, current_challenge) VALUES (?, ?, ?)').run(userId, username, challenge);
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE users SET current_challenge = ? WHERE id = ?').run(challenge, userId);
    }
}
function saveUserChallenge(userId, challenge) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE users SET current_challenge = ? WHERE id = ?').run(challenge, userId);
}
function saveCredential(userId, credential) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare(`
    INSERT INTO credentials (id, user_id, public_key, counter, device_type, backed_up, transports)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(credential.id, userId, Buffer.from(credential.public_key), credential.counter, credential.device_type, credential.backed_up ? 1 : 0, JSON.stringify(credential.transports));
}
function getUserData(userId) {
    const row = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT data FROM user_data WHERE user_id = ?').get(userId);
    return row ? JSON.parse(row.data) : null;
}
function saveUserData(userId, data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare(`
    INSERT INTO user_data (user_id, data, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP
  `).run(userId, JSON.stringify(data));
}
function getAdminByUsername(user) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM admins WHERE username = ?').get(user);
}
function getAdminById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM admins WHERE id = ?').get(id);
}
function saveAdminChallenge(id, challenge) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE admins SET current_challenge = ? WHERE id = ?').run(challenge, id);
}
function getAdminCredentials(id) {
    const rows = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM admin_credentials WHERE admin_id = ?').all(id);
    return rows.map((r)=>({
            id: r.id,
            publicKey: new Uint8Array(r.public_key),
            counter: r.counter,
            transports: JSON.parse(r.transports || '[]')
        }));
}
function saveAdminCredential(adminId, credential) {
    const transaction = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].transaction(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO admin_credentials (id, admin_id, public_key, counter, transports)
      VALUES (?, ?, ?, ?, ?)
    `).run(credential.id, adminId, Buffer.from(credential.publicKey), credential.counter, JSON.stringify(credential.transports));
        // Deactivate normal password for admin
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE admins SET password_hash = NULL WHERE id = ?').run(adminId);
    });
    transaction();
}
function getAllUsers() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT id, username FROM users').all();
}
function getAllAdmins() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT id, username, (password_hash IS NOT NULL) as has_password FROM admins').all();
}
function deleteUser(id) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM credentials WHERE user_id = ?').run(id);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM users WHERE id = ?').run(id);
}
function deleteAdmin(id) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM admin_credentials WHERE admin_id = ?').run(id);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM admins WHERE id = ?').run(id);
}
function getGlobalExams() {
    const rows = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM global_exams ORDER BY created_at DESC').all();
    return rows.map((r)=>({
            id: r.id,
            metadata: JSON.parse(r.metadata),
            data: JSON.parse(r.questions),
            isGlobal: true
        }));
}
function saveGlobalExam(metadata, questions) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('INSERT INTO global_exams (metadata, questions) VALUES (?, ?)').run(JSON.stringify(metadata), JSON.stringify(questions));
}
function deleteGlobalExam(id) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM global_exams WHERE id = ?').run(id);
}
;
}),
"[project]/src/app/api/auth/login/options/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$simplewebauthn$2f$server$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@simplewebauthn/server/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$simplewebauthn$2f$server$2f$esm$2f$authentication$2f$generateAuthenticationOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@simplewebauthn/server/esm/authentication/generateAuthenticationOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth_server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth_server.ts [app-route] (ecmascript)");
;
;
;
async function POST() {
    try {
        const options = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$simplewebauthn$2f$server$2f$esm$2f$authentication$2f$generateAuthenticationOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateAuthenticationOptions"])({
            rpID: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth_server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rpID"],
            userVerification: 'preferred'
        });
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(options);
        // Temporary challenge for generic login session
        response.cookies.set('login_challenge', options.challenge, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 600
        });
        return response;
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1243808._.js.map