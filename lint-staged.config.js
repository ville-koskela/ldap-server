const commonSettings = require("@operationmonkey/lint-staged-config-core");

const settingsWithoutJest = {};

Object.entries(commonSettings).forEach(([key, value]) => {
  /**
   * @note a bit nasty way to filter out jest here
   *       but for now we want to maintain lint-staged
   *       settings centrally. Maybe in future we will
   *       remove jest from the centralized settings
   */
  Object.defineProperty(settingsWithoutJest, key, {
    value: value.filter((val) => val.indexOf("jest") === -1),
    enumerable: true,
  });
});

module.exports = settingsWithoutJest;
