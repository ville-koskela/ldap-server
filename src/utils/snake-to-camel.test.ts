import assert from "node:assert";
import { describe, it } from "node:test";

import { snakeObjToCamel } from ".";

export const name = "Snake-to-camel";

void describe("Snake to camel", undefined, () => {
  void it("should map snake_case to camelCase in property names", () => {
    const snakeObj = {
      snake_prop: "foobar",
      nonSnakeProp: "foo",
      ALL_CAPS_CASE: "bar",
      "strange-prop": "foobaz",
      "Another-Strange-Prop": "baz",
    };

    const expectedResult = {
      snakeProp: "foobar",
      nonsnakeprop: "foo",
      allCapsCase: "bar",
      strangeProp: "foobaz",
      anotherStrangeProp: "baz",
    };

    const result = snakeObjToCamel(snakeObj);

    assert.deepStrictEqual(result, expectedResult);
  });
});
