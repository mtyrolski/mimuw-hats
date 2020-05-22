from scipy.stats import wasserstein_distance
import numpy as np
import imageio
from PIL import Image
import math

BEGIN = 0.35
END = 1 - BEGIN
WASSERT_DIST_TRASHHOLD = 130
COLOR_DIST_DIFF = 200
CHANNELS = 3
def rgb_wasserstein_distance(imga, imgb):
    acc=0.0
    h1, h2 = get_histogram(imga), get_histogram(imgb)
    for j in range(CHANNELS):
        acc += wasserstein_distance(h1[j], h2[j]) ** 2 
    return 10000*math.sqrt(acc)


def get_histogram(img):
    h, w, _ = img.shape
    hist = [[0.0] * 2**8]*CHANNELS
    for c in range(CHANNELS):
        for i in range(h):
            for j in range(w):
                hist[c][img[i, j, c]] += 1
        hist[c] = np.array(hist[c]) / (h * w)
    return hist


def sim(a, b):
    a=imageio.imread(a, as_gray=False, pilmode="RGB")
    b=imageio.imread(b, as_gray=False, pilmode="RGB")
    d = rgb_wasserstein_distance(a,b)
    h, w, _ = a.shape
    a = np.moveaxis(a, -1, 0)
    b = np.moveaxis(b, -1, 0)
    mean1 = [a[i, int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h)].mean() for i in range(3)]
    mean2 = [b[i,int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h)].mean() for i in range(3)]
    acc = 0.0 
    for k in range(CHANNELS):
        acc += (mean1[k] - mean2[k])**2
    acc = math.sqrt(acc)
    return {'similar', acc < COLOR_DIST_DIFF and d < WASSERT_DIST_TRASHHOLD}



