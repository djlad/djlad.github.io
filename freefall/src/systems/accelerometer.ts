export async function requestAccessAsync(onDeviceOrientation, setError): Promise<boolean> {
    if (!DeviceOrientationEvent) {
      setError(new Error('Device orientation event is not supported by your browser'));
      return false;
    }
    const requester = 'requestPermission';
    const hasRequester = DeviceOrientationEvent.hasOwnProperty(requester);
    const requesterIsFunc = hasRequester && typeof DeviceOrientationEvent[requester] === 'function';
    if (hasRequester && requesterIsFunc) {
      let permission: PermissionState;
      try {
        permission = await DeviceOrientationEvent[requester]();
      } catch (err) {
        setError(err);
        return false;
      }
      if (permission !== 'granted') {
        setError(new Error('Request to access the device orientation was rejected'));
        return false;
      }
    }

    window.addEventListener('deviceorientation', onDeviceOrientation);

    return true;
  };