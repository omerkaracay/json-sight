self.onmessage = function (e) {
  const file = e.data;
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const json = JSON.parse(event.target.result);
      self.postMessage({ type: "SUCCESS", data: json });
    } catch (error) {
      self.postMessage({ type: "ERROR", error: "Invalid Json File!" });
    }
  };

  reader.onerror = function () {
    self.postMessage({ type: "ERROR", error: "The file cannot read." });
  };

  reader.readAsText(file);
};
