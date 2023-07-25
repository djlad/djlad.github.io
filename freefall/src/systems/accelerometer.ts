export function addGyroPermissionButton(handleOrientation: (e)=>void) {
    //@ts-ignore
    if (typeof DeviceOrientationEvent.requestPermission !== 'function'){
      window.addEventListener('deviceorientation', handleOrientation);
      return;
    }
    const button = document.createElement("button");
    button.innerHTML = "Play";
    // button.textContent = "Allow Gyroscope";
    button.style.zIndex = "1000";
    button.style.position = "fixed";
    button.style.top = "0%";
    button.style.left = "0%";
    button.style.color = "red";
    button.style.height = "100%";
    button.style.width = "100%";
    button.style.fontSize = "20vw";
    let alerted = false;
    button.onclick = ()=>{
      onGyroClick(handleOrientation)();
      document.body.removeChild(button);
    }
    document.body.appendChild(button);
}

function onGyroClick(handleOrientation: (e)=>void) {
  return ()=>{
    //@ts-ignore
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Handle iOS 13+ devices.
      //@ts-ignore
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            const error = 'Request to access the orientation was rejected';
            alert(error);
            console.error(error);
          }
        })
        .catch(alert);
        // .catch(console.error);
    } else {
      // Handle regular non iOS 13+ devices.
      window.addEventListener('devicemotion', handleOrientation);
    }
  }
}