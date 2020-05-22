from scipy.stats import wasserstein_distance
import numpy as np
import imageio
from PIL import Image
import math
import cv2

def rgb_wasserstein_distance(imga, imgb):
    acc=0.0
    h1, h2 = get_histogram(imga), get_histogram(imgb)
    for j in range(3):
        acc += wasserstein_distance(h1[j], h2[j]) ** 2 
    return 10000*math.sqrt(acc) # (100*sqrt{4}(acc)) ** 2


def get_histogram(img):
    h, w, _ = img.shape
    hist = [[0.0] * 256]*3
    for c in range(3):
        for i in range(h):
            for j in range(w):
                hist[c][img[i, j, c]] += 1
        hist[c] = np.array(hist[c]) / (h * w)
    return hist

BEGIN = 0.3
END = 1 - BEGIN
for i in range(1,6):
    for j in range(1,6):
        if i >= j:
            a=imageio.imread(f'{i}.jpg', as_gray=False, pilmode="RGB")
            b=imageio.imread(f'{j}.jpg', as_gray=False, pilmode="RGB")
            print(i,j,'result',rgb_wasserstein_distance(a,b))
            print(a.mean())
            print(b.mean())
            print('ended')
            h, w, _ = a.shape
            print(a[int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h)].mean())
            print(b[int(BEGIN*w):int(END*w), int(BEGIN*h):int(END*h)].mean())

            exit(0)


