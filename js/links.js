toastr.options.timeOut = 2000;
toastr.options.preventDuplicates = true;
toastr.options.progressBar = true;
document.getElementById("image_title").addEventListener("click", function () {
  toastr.remove();
  navigator.clipboard.writeText(
    document.location.origin + document.location.pathname
  );
  toastr.info(
    "URL saved to clipboard.<br>" +
      document.location.origin +
      document.location.pathname
  );
});
function usefulSite(useful_webtitles) {
  document.getElementById("num_websites").innerHTML =
    "(" + useful_webtitles.length + ")";
  document.getElementById("body-inline-block").innerHTML = "";
  useful_webtitles.forEach(function (website, index) {
    let numOf = document.createElement("p");
    numOf.className = "web_count";
    numOf.innerHTML = index + 1 + ".";

    let img = document.createElement("img");
    img.title = "Save URL to clipboard";
    img.className = "copy_hyperlink website_link";
    img.src = "./img/copy_hypherlink.png";
    img.alt = "Copy Hyperlink";
    img.addEventListener("click", function () {
      toastr.remove();
      navigator.clipboard.writeText(website.url);
      toastr.info("URL saved to clipboard.<br>" + website.url);
    });
    let link;
    if (website.url.toString().includes("http")) {
      link = document.createElement("a");
      link.title = "Open " + website.title + " in new Tab";
      link.className = "title";
      link.href = website.url;
      link.innerHTML = website.title;
      link.target = "_blank";
    } else {
      link = document.createElement("div");
      link.className = "title dead_link";
      img.className = "copy_hyperlink website_link dead_link";
      link.innerHTML = website.title + "<br>" + website.url;
    }

    let description = document.createElement("p");
    description.innerHTML = website.description;

    let container = document.createElement("div");
    container.id = "container-inline-block";
    container.appendChild(numOf);
    container.appendChild(img);
    container.appendChild(link);
    container.appendChild(description);
    document.getElementById("body-inline-block").appendChild(container);
    resize();
  });
}

function usefulSiteChange() {
  let selectedValue = document.getElementById("useful_sites").value;
  console.log("Selected value: " + selectedValue);
  if (selectedValue == 1) {
    console.log("Selected 1");
    usefulSite(useful_webtitles);
  } else if (selectedValue == 2) {
    console.log("Selected 2");
    usefulSite(useful_websites_2023_07_07);
  } else {
    console.log("Selected 3");
    usefulSite(useful_websites_2023_12_09);
  }
}
function resize() {
  let elements = document.querySelectorAll("#container-inline-block");
  let height = 0;
  let y = 0;
  let listSameHeight = [];
  elements.forEach(function (element, index, nodeList) {
    element.style.height = "auto";
    if (
      listSameHeight.length == 0 ||
      (height < element.offsetHeight && element.offsetTop == y)
    ) {
      y = element.offsetTop;
      height = element.offsetHeight;
      listSameHeight.push(index);
    } else if (element.offsetTop == y) {
      listSameHeight.push(index);
      if (index == nodeList.length - 1) {
        listSameHeight.forEach(function (index) {
          nodeList[index].style.height = height + "px";
        });
        while (listSameHeight.length != 0) listSameHeight.pop();
      }
    } else if (element.offsetTop != y) {
      listSameHeight.forEach(function (index) {
        nodeList[index].style.height = height + "px";
      });
      while (listSameHeight.length != 0) listSameHeight.pop();
      y = element.offsetTop;
      height = element.offsetHeight;
      listSameHeight.push(index);
    }
  });
  return true;
}

usefulSite(useful_webtitles);

window.addEventListener("load", () => resize());
window.addEventListener("resize", () => resize());
window.addEventListener("click", function (event) {
  let clickEvent = {
    href: document.location.href,
    pathname: document.location.pathname,
    port: document.location.port,
    protocol: document.location.protocol,
    hash: document.location.hash,
    search: document.location.search,
    origin: document.location.origin,
    x: event.clientX,
    y: event.clientY,
  };
  document
    .elementsFromPoint(event.clientX, event.clientY)
    .forEach(function (element, index) {
      if (index == 0)
        clickEvent["innerHTML" + index] = element.innerHTML.substring(0, 100);
      clickEvent["tagName" + index] = element.tagName;
      if (element.hasAttribute("id")) clickEvent["id" + index] = element.id;
      if (element.attributes.length != 0) {
        let attrList = {};
        for (let i = 0; i < element.attributes.length; i++) {
          attrList[element.attributes.item(i).name] =
            element.attributes.item(i).value;
        }
        clickEvent["attrList" + index] = attrList;
      }
    });
  if (!window.sessionStorage.clickEvent)
    window.sessionStorage.clickEvent = JSON.stringify(clickEvent);
  else if (window.sessionStorage.clickEvent.startsWith("{")) {
    window.sessionStorage.clickEvent =
      "[" +
      window.sessionStorage.clickEvent.substring(
        0,
        window.sessionStorage.clickEvent.length
      ) +
      "," +
      JSON.stringify(clickEvent) +
      "]";
  } else {
    window.sessionStorage.clickEvent =
      "[" +
      window.sessionStorage.clickEvent.substring(
        1,
        window.sessionStorage.clickEvent.length - 1
      ) +
      "," +
      JSON.stringify(clickEvent) +
      "]";
  }
});
