from scipy.stats import wasserstein_distance
import numpy as np
import imageio
from PIL import Image
import math

BEGIN = 0.25
END = 1 - BEGIN
WASSERT_DIST_TRASHHOLD = 130
COLOR_DIST_DIFF = 200
CHANNELS = 3

def rgb_wasserstein_distance(imga, imgb):
    """Compares two images in use of wasserstein distance

    Args:
        imga (numpy array): first image
        imgb (numpy array): second image

    Returns:
        float: similarity
    """
    acc=0.0
    h1, h2 = get_histogram(imga), get_histogram(imgb)
    for j in range(CHANNELS):
        acc += wasserstein_distance(h1[j], h2[j]) ** 2 
    return 10000*math.sqrt(acc)


def get_histogram(img):
    """Calculates histogram from image

    Args:
        img (numpy array): image

    Returns:
        array: histogram
    """
    h, w, _ = img.shape
    hist = [[0.0] * 2**8]*CHANNELS
    for c in range(CHANNELS):
        for i in range(h):
            for j in range(w):
                hist[c][img[i, j, c]] += 1
        hist[c] = np.array(hist[c]) / (h * w)
    return hist

from PIL import Image
import skimage.transform as st

def sim(a, b):
    """Decides if two images are similar

    Args:
        a (numpy array): first image
        b (numpy array): second image

    Returns:
        dict: json-like dictionary 'similar': TRUE|FALSE
    """
    a,b = np.asarray(a), np.asarray(b)
    st.resize(a, (128, 128))
    st.resize(b, (128, 128))

    d = rgb_wasserstein_distance(a,b)
    h, w = 128, 128
    a = np.moveaxis(a, -1, 0)
    b = np.moveaxis(b, -1, 0)
    mean1 = [a[i, int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h)].mean() for i in range(3)]
    mean2 = [b[i,int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h)].mean() for i in range(3)]
    acc = 0.0 
    for k in range(CHANNELS):
        acc += (mean1[k] - mean2[k])**2
    acc = math.sqrt(acc)
    return {'similar' : acc < COLOR_DIST_DIFF and d < WASSERT_DIST_TRASHHOLD}



