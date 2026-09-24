import test from "node:test";
import assert from "node:assert/strict";
import { formatViews, viewsLabel } from "./views.ts";

test("formatViews keeps small numbers plain", () => {
  assert.equal(formatViews(0), "0");
  assert.equal(formatViews(1), "1");
  assert.equal(formatViews(999), "999");
});

test("formatViews abbreviates thousands", () => {
  assert.equal(formatViews(1000), "1k");
  assert.equal(formatViews(1234), "1.2k");
  assert.equal(formatViews(1500), "1.5k");
});

test("viewsLabel singularizes one view", () => {
  assert.equal(viewsLabel(1), "1 view");
  assert.equal(viewsLabel(2), "2 views");
  assert.equal(viewsLabel(2500), "2.5k views");
});
