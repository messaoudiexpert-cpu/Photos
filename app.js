let userCode = localStorage.getItem("userCode");

function saveCode() {
  userCode = document.getElementById("userCode").value;
  localStorage.setItem("userCode", userCode);
  document.getElementById("welcome").style.display = "none";
  document.getElementById("data").style.display = "block";
}

function startCamera() {
  document.getElementById("data").style.display = "none";
  document.getElementById("camera").style.display = "block";

  navigator.mediaDevices.getUserMedia({ video: { width: 1080, height: 1920, aspectRatio: 4/3 } })
    .then(stream => {
      document.getElementById("video").srcObject = stream;
    })
    .catch(err => alert("خطأ في فتح الكاميرا: " + err));
}

function capturePhoto() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const timeStamp = new Date().toISOString().replace(/[:.]/g,"-");
  const fileName = `${userCode}_${timeStamp}.jpg`;

  canvas.toBlob(blob => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  }, "image/jpeg");
}

function finish() {
  alert("تم إنهاء جلسة التصوير ✅");
  location.reload();
}
