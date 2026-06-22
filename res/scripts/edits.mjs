/**
 * J-Card Template: Edit Actions
 *
 * Functions modifying the current instance.
 */

import { NUL_STRING } from "./common/constants.mjs";
import { replaceLineEnds } from "./common/functions.mjs";

/**
 * Sets the back contents to the given output. This operates on one side only.
 */
export function setBackContents(output, label, contents, separator, shortBack) {
  output.element.innerHTML = contents.valueOrLkgOrPreset
    ? replaceLineEnds(contents.valueOrLkgOrPreset, separator.valueOrLkgOrPreset)
    : NUL_STRING;
  return true;
}

/** Sets the front contents to the given output. */
export function setFrontContents(output, aContents, separator) {
  output.element.innerHTML = replaceLineEnds(
    aContents.valueOrLkgOrPreset,
    separator.valueOrLkgOrPreset
  );
  return true;
}
