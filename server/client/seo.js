document.addEventListener("DOMContentLoaded", () => {
    // Set page title
    document.title = "JavaScript SEO Optimization Guide | YourSite";

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Learn practical JavaScript SEO optimization techniques to rank your site on Google.";

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Set Open Graph tags for social sharing
    const setOgTag = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.content = content;
    };

    setOgTag("og:title", "Entrepreneurship Hub - Yolec Hub");
    setOgTag("og:description", "transformative educational events that inspire, connect, and empower professionals around the world.");
    setOgTag("og:url", window.location.href.replace(https://yolechub.com.ng/,));
    setOgTag("og:type", "website");
});
