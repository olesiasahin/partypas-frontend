// Renders "\n" in a translation string as <br /> (the prototype's copy uses
// hard line breaks for the headline rhythm).
export default function withBreaks(text) {
  return String(text)
    .split("\n")
    .map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));
}
