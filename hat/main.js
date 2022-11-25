function main() {
  // get the 2 canvas from the DOM:
  const canvasFace = document.getElementById('WebARRocksFaceCanvas');
  const canvasThree = document.getElementById('threeCanvas');

  // init WebAR.rock.mirror:
  WebARRocksMirror.init({
    isGlasses: false,

    //videoURL: '../../../../testVideos/1056010826-hd.mp4', // use a video from a file instead of camera video

    specWebARRocksFace: {
      NNCPath: '../../neuralNets/NN_HEADPHONESL_2.json',
      scanSettings: {
        threshold: 0.6,
      },
    },

    // lighting:
    isLightReconstructionEnabled: true,

    // increase stabilization:
    landmarksStabilizerSpec: {
      beta: 20,
      forceFilterNNInputPxRange: [1.5, 4],
    },

    solvePnPObjPointsPositions: {
      noseLeft: [21.86215, -0.121031, 67.803383], // 1791
      noseRight: [-20.539499, 0.170727, 69.944778], // 2198

      leftEyeExt: [44.507431, 34.942841, 38.750019], // 1808
      rightEyeExt: [-44.064968, 35.39967, 39.36293], // 2214

      leftEarTop: [89.165428, 16.312811, -49.06498], // 3870
      leftEarBase: [78.738243, -6.04455, -23.17749], // 2994
      leftEarBottom: [78.78685, -41.321789, -24.603769], // 1741

      rightEarTop: [-88.488602, 17.2714, -48.199409], // 5622
      rightEarBase: [-78.156998, -5.305619, -22.164619], // 4779
      rightEarBottom: [-78.945511, -41.2551, -26.536131], // 5641

      leftTemple: [60.26297, 83.790382, -13.54031], // 108
      rightTemple: [-60.03476, 83.584427, -13.24853], // 286

      foreHead: [-1.057755, 97.894547, 24.65494], // 696
    },
    solvePnPImgPointsLabels: [
      'foreHead',
      'leftTemple',
      'rightTemple',
      'leftEarTop',
      'rightEarTop',
      'leftEyeExt',
      'rightEyeExt',
      'rightEarBottom',
      'leftEarBottom',
    ],

    canvasFace: canvasFace,
    canvasThree: canvasThree,

    // initial canvas dimensions:
    width: window.innerWidth,
    height: window.innerHeight,

    // The occluder is a placeholder for the head. It is rendered with a transparent color
    // (only the depth buffer is updated).
    occluderURL: 'assets/models3D/occluder.glb',
    modelURL: 'assets/models3D/hatDraco.glb', //initial model loaded. false or null -> no model
    envmapURL: 'assets/envmaps/venice_sunset_512.hdr',

    // temporal anti aliasing - Number of samples. 0 -> disabled:
    taaLevel: 0,

    // called once all is loaded:
    callback: function () {
      document.getElementById('loading').style.display = 'none';
    },

    // debug flags - all should be false for production:
    debugLandmarks: false,
    debugOccluder: false,
  })
    .then(function () {
      console.log('WebARRocksMirror initialized successfully');

      // display controls:
      document.getElementById('controls').style.display = 'flex';

      // handle orientation change or window resizing:
      const resizeCallback = function () {
        WebARRocksMirror.resize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('orientationchange', resizeCallback);
      window.addEventListener('resize', resizeCallback);
    })
    .catch(function (err) {
      alert('An error happens with WebARRocksMirror: ' + err.toString());
    });
}

// this function is executed when the user clicks on CAPTURE IMAGE button
// it opens the captured image in a new tab:
function capture_image() {
  WebARRocksMirror.capture_image(function (cv) {
    const dataURL = cv.toDataURL('image/png');
    const img = new Image();
    img.src = dataURL;
    img.onload = function () {
      const win = window.open('');
      win.document.write(img.outerHTML);
    };
  });
}

window.addEventListener('load', main);
