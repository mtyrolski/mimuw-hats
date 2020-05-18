from keras.preprocessing import image
import numpy as np
import matplotlib.pyplot as plt

def load_image(img_path, shape):
    img = image.load_img(img_path, target_size=shape, color_mode='rgb')
    return prepare_image(img)


def prepare_image(image, shape):
    img_tensor = image.img_to_array(img)
    img_tensor = np.expand_dims(img_tensor, axis=0)
    img_tensor /= 255.
    return img_tensor