import assert from "node:assert/strict";
import { join } from "node:path";
import test from "node:test";
import { systemFirefoxCandidates } from "../support/browser-package.mjs";

test("Windows Firefox discovery includes system and per-user installs without PATH", () => {
  const paths = systemFirefoxCandidates("win32", {
    ProgramW6432: "system64",
    ProgramFiles: "system64",
    "ProgramFiles(x86)": "system32",
    LOCALAPPDATA: "user",
  });
  assert.deepEqual(paths, [
    join("system64", "Mozilla Firefox", "firefox.exe"),
    join("system32", "Mozilla Firefox", "firefox.exe"),
    join("user", "Mozilla Firefox", "firefox.exe"),
  ]);
});

test("Firefox discovery handles missing Windows environment and the macOS application", () => {
  assert.deepEqual(systemFirefoxCandidates("win32", {}), []);
  assert.deepEqual(systemFirefoxCandidates("darwin", {}), ["/Applications/Firefox.app/Contents/MacOS/firefox"]);
  assert.deepEqual(systemFirefoxCandidates("linux", {}), []);
});
