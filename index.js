//Sign up
function signUp(){
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let user = {
        username: username,
        password: password,
    }

    if(username == 0 || password == 0){
        alert('Please fill in information')
    }
    else {
    let json = JSON.stringify(user);
    localStorage.setItem(username, json);
    window.location.assign('signin.html')
    }
}

//Sign in
function signIn(){
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let user = localStorage.getItem(username);
    let data = JSON.parse(user);

    if(user == null){
        alert('Invalid username or password')
    }
    else if (username == data.username && password == data.password){
        window.location.assign('alreadysignin.html')
    }
    else{
        alert('Invalid username or password')
    }
}

//Require login
function loginUse(){
    alert('Please sign in to use')
}

//Fetch API
function getAd(){
    const resDiv = document.querySelector('#results');
    const resBtn = document.querySelector('#getData');
  
resBtn.addEventListener('click', () => {
    getAdvice();
});
  
window.onload = () => {
    getAdvice();
};
    fetch('https://api.adviceslip.com/advice').then(response => {
      return response.json();
    })
    .then(adviceData => {
      const Adviceobj = adviceData.slip;
      resDiv.innerHTML = `<p>${Adviceobj.advice}</p>`;
    })
  }

const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);

const defaultUrl = "hungditga99";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}

async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
}

function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
generateQRCode();
















