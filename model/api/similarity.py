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
    SIZE=224
    a,b = np.asarray(a), np.asarray(b)
    a=st.resize(a, (SIZE, SIZE)).copy()
    b=st.resize(b, (SIZE, SIZE)).copy()
    a,b = a*255, b*255
    a,b = a.astype(int), b.astype(int)
    d = rgb_wasserstein_distance(a,b)
    h, w = SIZE, SIZE
    mean1 = [a[int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h), i].mean() for i in range(3)]
    mean2 = [b[int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h), i].mean() for i in range(3)]
    acc = 0.0 
    for k in range(CHANNELS):
        acc += (mean1[k] - mean2[k])**2
    acc = math.sqrt(acc)
    return {'similar' : acc < COLOR_DIST_DIFF and d < WASSERT_DIST_TRASHHOLD}



