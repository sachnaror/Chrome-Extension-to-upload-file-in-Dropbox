document.getElementById('uploadBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    const folderName = `new-folder-${Date.now()}`;
    const fileName = file.name;
    const dropboxToken = 'sl.B5hnURugxchPouco_RBQuNRRCvhXDtoyj6VbGUwULPR3anw8otbGR5rcZvaUKIIw9Y0JMV39MA7U-anhnHCl05RsieAX3SIKJfV8F6CiiNn6jYQSOZmMABM8Eb7nXyU8Q';  // Use the new token

    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      chrome.runtime.sendMessage({
        action: 'uploadFile',
        data: {
          file: arrayBuffer,
          folderName,
          fileName,
          dropboxToken
        }
      }, (response) => {
        if (response.success) {
          document.getElementById('output').innerHTML = `<a href="${response.url}" target="_blank">File Uploaded: ${response.url}</a>`;
        } else {
          document.getElementById('output').innerText = response.message;
        }
      });
    };
    reader.readAsArrayBuffer(file);
  } else {
    document.getElementById('output').innerText = 'Please select a file';
  }
});
