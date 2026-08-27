// Browser-side allowlist sanitizer for CMS rich text.
// The raw HTML is never inserted into the DOM before this function removes
// executable elements, event handlers, and unsafe URL schemes.
const ALLOWED_TAGS = new Set([
  "P", "BR", "STRONG", "B", "EM", "I", "U", "S", "H1", "H2", "H3",
  "H4", "H5", "H6", "UL", "OL", "LI", "BLOCKQUOTE", "CODE", "PRE",
  "A", "IMG", "DIV", "SPAN",
]);

const ALLOWED_ATTRIBUTES = new Set(["href", "src", "alt", "title", "target", "rel"]);

function isSafeUrl(value: string, allowDataImage = false) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (allowDataImage && /^data:image\/(png|jpeg|gif|webp);base64,/i.test(trimmed)) return true;
  if (/^(https?:|mailto:)/i.test(trimmed)) return true;
  return trimmed.startsWith("/") || trimmed.startsWith("#") || trimmed.startsWith("?");
}

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return "";

  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  const walk = (root: ParentNode) => {
    for (const node of Array.from(root.childNodes)) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      const element = node as HTMLElement;

      if (!ALLOWED_TAGS.has(element.tagName)) {
        // Preserve safe text/children for unknown formatting containers, but
        // completely remove executable/embedded elements.
        if (["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "SVG", "MATH", "FORM"].includes(element.tagName)) {
          element.remove();
          continue;
        }
        const parent = element.parentNode;
        if (parent) {
          while (element.firstChild) parent.insertBefore(element.firstChild, element);
          parent.removeChild(element);
        }
        continue;
      }

      for (const attribute of Array.from(element.attributes)) {
        const name = attribute.name.toLowerCase();
        if (name.startsWith("on") || name === "style" || !ALLOWED_ATTRIBUTES.has(name)) {
          element.removeAttribute(attribute.name);
        }
      }

      if (element.hasAttribute("href") && !isSafeUrl(element.getAttribute("href") || "")) {
        element.removeAttribute("href");
      }
      if (element.hasAttribute("src") && !isSafeUrl(element.getAttribute("src") || "", true)) {
        element.removeAttribute("src");
      }

      if (element.tagName === "A" && element.getAttribute("target") === "_blank") {
        element.setAttribute("rel", "noopener noreferrer");
      }

      walk(element);
    }
  };

  walk(document.body);
  return document.body.innerHTML;
}
