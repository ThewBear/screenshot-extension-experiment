const capture = document.getElementById("capture");
const img = document.getElementById("img");

let debuggee = null;

chrome.tabs.query({ active: true }, (tabs) => {
  debuggee = { tabId: tabs[0].id };
  chrome.debugger.attach(debuggee, "1.3");
});

capture.addEventListener("click", () => {
  chrome.debugger.sendCommand(
    debuggee,
    "Emulation.setDeviceMetricsOverride",
    {
      height: 1080,
      width: 1920,
      deviceScaleFactor: 3,
      mobile: false,
      scale: 0.8,
    },
    () => {
      chrome.debugger.sendCommand(
        debuggee,
        "Page.captureScreenshot",
        { captureBeyondViewport: true },
        ({data}) => {img.src = `data:image/png;base64,${data}`}
      );
    }
    // () =>
    //   chrome.tabCapture.capture(
    //     {
    //       video: true,
    //       videoConstraints: {
    //         mandatory: {
    //           minWidth: 1920,
    //           minHeight: 1080,
    //         },
    //       },
    //     },
    //     (stream) => {
    //       console.log(stream.getVideoTracks()[0].getSettings());
    //     }
    //   )
  );
});
